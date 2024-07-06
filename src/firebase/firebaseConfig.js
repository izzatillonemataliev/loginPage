import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeoyCC-iifE-yiHwDtQ9SPdvmWMOJWyNA",
  authDomain: "mystore-e6f30.firebaseapp.com",
  projectId: "mystore-e6f30",
  storageBucket: "mystore-e6f30.appspot.com",
  messagingSenderId: "268837844136",
  appId: "1:268837844136:web:93b76f7e15eaaa8dafbe9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth
export const auth = getAuth(app);
