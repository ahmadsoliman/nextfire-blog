import { Auth, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

const AuthContext = createContext<{
  user: User | null;
  userName: string | null;
}>({ user: null, userName: null });

export const AuthContextProvider = ({ children }) => {
  const [user] = useAuthState(auth as unknown as Auth);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUserName(doc.data()?.userName);
      });
    }

    return unsubscribe;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
