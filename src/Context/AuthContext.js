import { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../Auth/Farebase";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    userObserver();
  }, []);
  // register ------------------
  const createUser = (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // signin -------------------
  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // signOut ----------------------------
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  // SignIn with Google account
  const GoogleProvider = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const passwordReset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your mail box!");
      })
      .catch((err) => {
        // alert(err.message);
      });
  };

  // Observer ---------------------
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
      }
    });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    currentUser,
    GoogleProvider,
    passwordReset,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
