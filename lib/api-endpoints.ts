import { Post } from "../models/Post";
import { firestore } from "./firebase";

export async function getUserByUserName(userName: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("userName", "==", userName).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export async function getUserPostsByDoc(userDoc: any) {
  const postsQuery = userDoc.ref
    .collection("posts")
    // .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(5);

  const queryDocs = await postsQuery.get();
  return queryDocs.docs.map(postToJson);
}

function postToJson(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  } as Post;
}
