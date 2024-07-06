// styles
import "./App.css";

// components
import ProtectedRoutes from "./components/ProtectedRoutes";

// action

import { action as signInAction } from "./pages/Signin";
// layout
import MainLayout from "./layout/MainLayout";

// pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Purchased from "./pages/Purchased";
import Signin from "./pages/Login";
import Signup from "./pages/Signin";


// react router dom imports
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// action
import { action as signupAction } from "./pages/Login";
import { action as signinAction } from "./pages/Signin";

// context
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const { user, dispatch, isAuthChange } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Signin />,
      action: signinAction,
    },
    {
      path: "/signin",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: signupAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "LOG_IN",
        payload: user,
      });
      dispatch({
        type: "AUTH_CHANGE",
      });
    });
  }, []);

  return <>{isAuthChange && <RouterProvider router={routes} />}</>;
}

export default App;
