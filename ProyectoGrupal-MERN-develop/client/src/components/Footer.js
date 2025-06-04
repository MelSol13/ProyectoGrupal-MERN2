import React from "react";
import Avatar from "../images/fon.jpg";
import "./Ad.css";
import { Link } from "react-router-dom";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="con">
      <div className="container p-2 text-center">
        <div className="center">
          <div className="">
            <h6 className="align-items-center">
              Design And Developed By: Mariliny-Patricia-Hellen-Hilary-Melissa
            </h6>

            <p className="small m-0">
              All Right Reserved by &copy; <strong>Grupo MERN</strong>~ {year}
            </p>
          </div>
          <div className="foo">
            <Link to="/contact">
              <img
                src={Avatar}
                alt="Avatar"
                className="rounded-circle ms-3 align-middle"
                width="42"
                height="40"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;