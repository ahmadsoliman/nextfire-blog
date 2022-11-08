import React from "react";
import { User } from "../models/User";

type Props = {
  user: User;
};

function UserProfile({ user }: Props) {
  return (
    <div className="flex flex-col content-center text-center">
      <img
        src={user.photoURL || "/hacker.png"}
        className="w-1/5 block m-auto max-w-[150px] rounded-[50%] mb-4"
      />
      <p>
        <i>@{user.userName}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
}

export default UserProfile;
