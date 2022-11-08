import { firestore } from "./firebase";

export default async (userName: string) => {
  const ref = firestore.doc(`username/${userName}`);
  const { exists } = await ref.get();

  return exists;
};
