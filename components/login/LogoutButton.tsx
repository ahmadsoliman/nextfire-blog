import React from "react";
import { auth } from "../../lib/firebase";

export function LogoutButton({ }) {
  return (
    <button className="" onClick={() => auth.signOut()}>
      Logout
    </button>
  );
}
