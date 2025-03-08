import { createContext } from "react";

const Context = createContext({ state: {}, dispatch: () => {} });

export default Context;
