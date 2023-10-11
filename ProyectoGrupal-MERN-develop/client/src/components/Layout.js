import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Ad.css";
const Layout = ({ children }) => {
  
  return (
    <div className="d">
      <Header/>
      <div className="conta">
        <div className="content">{children}</div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;