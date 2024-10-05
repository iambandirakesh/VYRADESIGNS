import React from "react";
import AuthHeader from "./AuthHeader";
const AuthLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <AuthHeader />
        <main>
          <WrappedComponent {...props} />
        </main>
      </>
    );
  };
};

export default AuthLayout;
