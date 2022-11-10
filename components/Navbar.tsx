import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "../lib/auth-context";
import styles from "./Navbar.module.scss";

type Props = {};

const Navbar = (props: Props) => {
  const { user, userName } = useContext(AuthContext);

  return (
    <nav
      className={`${styles.navbar} w-full bg-white fixed top-0 font-bold border-b border-solid z-99`}
    >
      <ul className="list-none m-0 p-0 h-full flex justify-between items-center">
        <li className="rounded-[50%]">
          <Link href="/">
            <button className="bg-gray-900 py-2 px-4 text-white uppercase text-2xl">
              FEED
            </button>
          </Link>
        </li>
        {!!userName && (
          <>
            <li className="rounded-[50%] ml-auto mr-4">
              <Link href="/admin">
                <button className="bg-blue-700 text-white">Write Posts</button>
              </Link>
            </li>
            <li className="rounded-[50%]">
              <Link href={`/${userName}`}>
                <img
                  src={user?.photoURL}
                  className="rounded-[50%] w-12 h-12 cursor-pointer"
                />
              </Link>
            </li>
          </>
        )}

        {!userName && (
          <>
            <li className="rounded-[50%]">
              <Link href="/login">
                <button>Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
