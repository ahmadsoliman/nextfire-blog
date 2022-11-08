import React from "react";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserByUserName, getUserPostsByDoc } from "../../lib/api-endpoints";
import { Post } from "../../models/Post";
import { User } from "../../models/User";

type Props = {
  user: User;
  posts: Post[];
};

const UserProfilePage = ({ user, posts }: Props) => {
  posts = posts?.map((post: Post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  }));

  return (
    <main>
      {!!user && <UserProfile user={user} />}
      {!!posts && <PostFeed posts={posts} admin={false} />}
    </main>
  );
};

export default UserProfilePage;

export async function getServerSideProps({
  query,
}: {
  query: { username: string };
}) {
  const { username } = query;

  const userDoc = await getUserByUserName(username);

  let user: User = null;
  let posts: Post[] = null;

  if (userDoc && userDoc.exists) {
    user = userDoc.data() as User;
    posts = await getUserPostsByDoc(userDoc);
  }

  return {
    props: {
      user,
      posts,
    },
  };
}
