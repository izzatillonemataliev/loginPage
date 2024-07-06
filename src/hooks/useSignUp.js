import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";

function useSignUp() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useGlobalContext();

  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const signupWithEmailAndPassword = (name, photo, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          photoURL: photo,
          displayName: name,
        });
        const user = userCredential.user;
        dispatch({ type: "SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  return { signupWithGoogle, signupWithEmailAndPassword, user, error };
}

export { useSignUp };
