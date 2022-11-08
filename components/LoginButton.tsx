import React from "react";
import { auth, googleAuthProvider } from "../lib/firebase";

export function LoginButton({ }) {
  const loginWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch { }
  };
  return (
    <button className="bg-white text-gray-900" onClick={loginWithGoogle}>
      <img className="w-16 mr-2" src="/google.png" />
      Login with Google
    </button>
  );
}
