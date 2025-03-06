import { useReducer, useEffect } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  // Kiểm tra token trong localStorage khi app khởi chạy
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "SET_IS_LOGIN", payload: true });
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
