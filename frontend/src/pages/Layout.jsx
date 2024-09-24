import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Header />
        <main>
          <WrappedComponent {...props} />
        </main>
        <Footer />
      </>
    );
  };
};

export default Layout;
