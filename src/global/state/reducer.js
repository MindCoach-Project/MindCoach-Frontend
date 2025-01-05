import { SET_IS_LOGIN } from './constants';
export const initState = {
   isLogin: false,
};

async function reducer(state, action) {
   switch (action.type) {
      case SET_IS_LOGIN:
         return { ...state, isLogin: action.payload };
      default:
         throw new Error('Invalid action!');
   }
}

export default reducer;
