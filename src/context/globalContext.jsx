import { createContext, useEffect, useReducer } from "react";
import { produce } from "immer";

export const GlobalContext = createContext();

function stateFromLocalStorage() {
  const storedState = localStorage.getItem("mystore");
  if (storedState) {
    try {
      return JSON.parse(storedState);
    } catch (error) {
      console.error("Failed to parse stored state:", error);
      return {
        user: null,
        total: 0,
        products: [],
        isAuthChange: false,
      };
    }
  }
  return {
    user: null,
    total: 0,
    products: [],
    isAuthChange: false,
  };
}

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "AUTH_CHANGE":
      return { ...state, isAuthChange: true };
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    case "CHANGE_TOTAL":
      return { ...state, total: payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, stateFromLocalStorage());

  const calculateTotal = () => {
    let counter = 0;
    state.products.forEach((item) => {
      counter += item.amount;
    });
    dispatch({ type: "CHANGE_TOTAL", payload: counter });
  };

  const deleteProduct = (id) => {
    const deletedProducts = state.products.filter(
      (product) => product.id !== id
    );

    dispatch({ type: "ADD_PRODUCT", payload: deletedProducts });
    calculateTotal();
  };

  const increaseAmount = (id) => {
    function toggleItem(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((item) => item.id === id);
        product.amount = product.amount + 1;
      });
    }
    const result = toggleItem(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: result.products });
  };
  const decreaseAmount = (id) => {
    function toggleItem(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((item) => item.id === id);
        product.amount = product.amount - 1;
      });
    }
    const result = toggleItem(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: result.products });
  };

  useEffect(() => {
    localStorage.setItem("mystore", JSON.stringify(state));
  }, [state]);

  const addProduct = (prod) => {
    if (state.products.find((product) => product.id === prod.id)) {
      const result = produce(state, (draft) => {
        const product = draft.products.find((item) => item.id === prod.id);
        product.amount += prod.amount;
      });
      dispatch({ type: "ADD_PRODUCT", payload: result.products });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: [...state.products, prod] });
    }
  };
  useEffect(() => {
    calculateTotal();
  }, [state.products]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        addProduct,
        deleteProduct,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
