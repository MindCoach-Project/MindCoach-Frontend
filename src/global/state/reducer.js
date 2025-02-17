import { SET_IS_LOGIN, SET_USER } from "./constants";

export const initState = {
  isLogin: false,
  isLogout: false,
  user: null,  
};

async function reducer(state, action) {
  switch (action.type) {
    case SET_IS_LOGIN:
      return { ...state, isLogin: action.payload };
    case SET_USER:  
      return { ...state, user: action.payload };  
    default:
      throw new Error("Invalid action!");
  }
}

export default reducer;
