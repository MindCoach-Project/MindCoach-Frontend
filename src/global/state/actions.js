import { SET_IS_LOGIN, SET_USER } from "./constants";

export const setIsLogin = (payload) => ({
   type: SET_IS_LOGIN,
   payload,
});

export const setUser = (payload) => ({  
   type: SET_USER,
   payload,
});
