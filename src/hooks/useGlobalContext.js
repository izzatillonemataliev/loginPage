import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Use global context here not");
  }
  return context;
}

export { useGlobalContext };
