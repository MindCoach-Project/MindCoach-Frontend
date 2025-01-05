import { Fragment } from "react";

function Login({ children }) {
   return (
      <Fragment>
            <div className="container">{children}</div>
      </Fragment>
   );
}

export default Login;
