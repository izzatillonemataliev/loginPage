import { auth } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const useLogin = () => {
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await firebaseSignInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email va parol bilan tizimga kirishda xatolik", error);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google bilan tizimga kirishda xatolik", error);
    }
  };

  return { signInWithEmailAndPassword, signUpWithGoogle };
};
    