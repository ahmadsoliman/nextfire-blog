import React from "react";

type Props = {
  userName: string;
  isValid: boolean;
  isLoading: boolean;
  error: any;
};

export default function UserNameFormMessage({
  userName,
  isValid,
  isLoading,
  error,
}: Props) {
  if (isLoading) {
    return <p>Checking...</p>;
  }
  if (error) {
    return <p className="font-bold text-red-600">An error occurred!</p>;
  }
  if (isValid) {
    return <p className="font-bold text-green-400">{userName} is available!</p>;
  } else if (userName) {
    return <p className="font-bold text-red-600">That user name is taken!</p>;
  }
  return <></>;
}
