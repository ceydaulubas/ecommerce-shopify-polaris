import React, { useEffect, useState, useContext } from "react";
import firebase from "../firebase";
import { AuthData } from "../interfaces/AuthData";

// export const AuthContext = React.createContext({});
export const AuthContext = React.createContext<{
  user: AuthData | null;
  authenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<AuthData | null | any>>;
  loadingAuthState: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}>({ user: null, authenticated: false, setUser: () => {}, loadingAuthState: false, setIsLoggedIn: () => {}, isLoggedIn: true });

export function useAuthContext(): any {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthData | null | any>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const db = firebase.firestore();
      user
        ? db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((querySnapshot) => {
              console.log(querySnapshot);

              setUser({ ...querySnapshot.data(), id: user.uid });
              setIsLoggedIn(true);
            })
        : setUser(null);

      setTimeout(() => {
        setLoadingAuthState(false);
      }, 1000);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
