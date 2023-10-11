import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Ad.css";
const Layout = ({ children }) => {
  
  return (
    <div className="di">
      <Header/>
      <div className="conta">
        <div className="s">{children}</div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;