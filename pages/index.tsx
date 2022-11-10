import { Context, useState } from "react";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import { getLatestPostsByAllUsers } from "../lib/api-endpoints";
import { firestore, Timestamp } from "../lib/firebase";
import { Post } from "../models/Post";

export default function Home({ serverPosts }: { serverPosts: Post[] }) {
  const [posts, setPosts] = useState(serverPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [postsEnded, setPostsEnded] = useState(false);

  const getMorePosts = async () => {
    if (posts.length === 0) return;

    setIsLoading(true);
    const last = posts[posts.length - 1];

    let cursor = Timestamp.fromMillis(last.createdAt);
    const newPosts = await getLatestPostsByAllUsers(LIMIT, cursor);

    setPosts((oldPosts) => [...oldPosts, ...newPosts]);
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnded(true);
    }
  };

  return (
    <main>
      <PostFeed admin={false} posts={posts} />

      {/* {!isLoading && !postsEnded && !!posts && !!posts.length && (
        <button onClick={getMorePosts}>Load more...</button>
      )} */}

      <Loader show={isLoading} />

      {postsEnded && "You have reached the end!"}
    </main>
  );
}

const LIMIT = 1;

export async function getServerSideProps(context: Context<{}>) {
  const posts = await getLatestPostsByAllUsers(LIMIT);

  return {
    props: { serverPosts: posts },
  };
}
