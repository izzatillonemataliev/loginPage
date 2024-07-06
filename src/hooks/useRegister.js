import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function useRegister() {
  const signUpWithEmailAndPassword = async (userData) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const userCredential = result.user;
    } catch (error) {}
  };
  return { signUpWithEmailAndPassword };
}

export { useRegister };
