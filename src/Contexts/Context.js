import React, { createContext, useEffect, useState } from "react";
import app from "../common/Firebase/FirebaseInit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export let AuthContext = createContext();
let auth = getAuth(app);

const Context = ({ children }) => {
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(true);

  let createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  let signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  let logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("ss");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  let authinfo = { user, loading, createUser, signIn, logOut };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Context;
