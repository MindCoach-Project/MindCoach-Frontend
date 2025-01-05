import { useContext } from 'react';
import Context from './Context';

export const useGlobalState = () => {
   const [state, dispatch] = useContext(Context);
   return [state, dispatch];
};