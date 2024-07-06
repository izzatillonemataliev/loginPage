// react router dom imports
import { Link, NavLink } from "react-router-dom";

// auth && firebase components
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
// react icons
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { RiShoppingCartFill } from "react-icons/ri";

// components
import NavLinks from "./NavLinks";

// react hooks

import { useEffect, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Navbar() {
  const { total, user } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  function themeFromLocalStorage() {
    return localStorage.getItem("theme") || "emerland";
  }

  const handleTheme = () => {
    const newTheme = theme == "emerald" ? "dim" : "emerald";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="bg-base-200 mb-8">
      <div className="navbar site-container">
        <div className="navbar-start">
          <Link className="btn btn-secondary font-bold text-2xl" to="/">
            MyStore
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary"> {total}</span>
          <NavLink to="/purchased">
            <button className="btn">
              <RiShoppingCartFill className="w-5 h-5" />
            </button>
          </NavLink>
        </div>
        <div className="navbar-end flex gap-4">
          <button onClick={logOut} className="btn btn-secondary">
            Log out
          </button>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={handleTheme}
              type="checkbox"
              checked={theme == "dim"}
              readOnly
            />

            {/* sun icon */}
            <IoMdSunny className="swap-on fill-current w-10 h-10" />

            {/* moon icon */}
            <IoMdMoon className="swap-off fill-current w-10 h-10" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
