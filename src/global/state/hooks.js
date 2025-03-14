import { useContext } from "react";
import Context from "./Context";

export const useGlobalState = () => {
  return useContext(Context); 
};
