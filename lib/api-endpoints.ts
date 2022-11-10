import { Post } from "../models/Post";
import { firestore, FireStoreDocData, Timestamp } from "./firebase";

export async function getUserByUserName(userName: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("userName", "==", userName).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc as FireStoreDocData;
}

export async function getUserPostsByDoc(userDoc: FireStoreDocData) {
  const postsQuery = userDoc.ref
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(5);

  const queryDocs = await postsQuery.get();
  return queryDocs.docs.map(postToJson);
}

export async function getLatestPostsByAllUsers(
  limit: number,
  afterTimestamp?: Timestamp
) {
  let postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc");
  if (afterTimestamp) {
    postsQuery = postsQuery.startAfter(afterTimestamp);
  }
  postsQuery = postsQuery.limit(limit);

  return (await postsQuery.get()).docs.map(postToJson);
}

function postToJson(doc: FireStoreDocData) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  } as Post;
}
