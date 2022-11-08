import React, { useContext } from "react";
import AuthContext from "../lib/auth-context";
import { LoginButton } from "../components/login/LoginButton";
import { LogoutButton } from "../components/login/LogoutButton";
import { UserNameForm } from "../components/login/UserNameForm";

type Props = {};

const Login = (props: Props) => {
  const { user, userName } = useContext(AuthContext);

  return (
    <main>
      {!user && <LoginButton />}
      {user && !userName && <UserNameForm />}
      {user && <LogoutButton />}
    </main>
  );
};

export default Login;
