import React from "react";
import { Link } from "react-router-dom";
import cart from "../images/fon.jpg";
import Logo from "../images/cart.gif";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import img6 from "../images/img6.png";
import img7 from "../images/img7.png";
import img8 from "../images/img8.png";
import img9 from "../images/img9.png";
import imghellen from "../images/imghellen.jpeg";
import imgmelissa from "../images/imgmelissa.jpeg";
import imgpatricia from "../images/imgpatricia.jpeg";
import imghillary from "../images/imghillary.jpg";
import imgmariliny from "../images/imgmariliny.jpeg";
import "./Ad.css";

const Contant = () => {
  const year = new Date().getFullYear();

  return (

    <>
      {/* Masthead*/}
      <header className="masthead" id="contact">

        <div className="container4">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                {/* Page heading*/}
                <img
                  src={Logo}
                  alt="Logo"
                  width={300}
                  height={300}
                  className="d-inline-block img-fluid align-text-top mx-3 rounded-1"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content*/}
      <div className="container-fluid p-0 mt-3">
        {/* About*/}
        <section className="resume-section" id="about">
          <div className="resume-section-content">
            <div className="rowa">
              <div className="col-12 col-md-6">
                <h3 className="mb-0 mt-4">
                  Grupo MERN
                  <span className="text-danger"> CodingDojo</span>
                </h3>

                <h4 className="mt-2 mb-4"> Costa Rica</h4>

                <a className="lista-correos " href="mailto:name@email.com">
                  maryzambrana98@gmail.com
                </a>
                <br />
                <a className="lista-correos " href="mailto:name@email.com">
                  cherrypsmr@gmail.com
                </a>
                <br />
                <a className="lista-correos " href="mailto:name@email.com">
                  hellencamacho93@gmail.com
                </a>
                <br />
                <a className="lista-correos " href="mailto:name@email.com">
                  hila0919@hotmail.com
                </a>
                <br />
                <a className="lista-correos " href="mailto:name@email.com">
                  m.solanof13@gmail.com
                </a>

                <ul className=" list-group list-group-horizontal list-unstyled mt-5 ">
                  <li>
                  <a href="https://www.linkedin.com/in/hellen-camacho-2997b31b4/"><img className="rounded-circle" src={imghellen} width="80" height="80" alt="imghellen"/></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/melissa-solano-webdeveloper-fullstackmern-front-end-back-end-javascript-bootstrap-html-css/"><img className="rounded-circle" src={imgmelissa} width="80" height="80" alt="imgmelissa"/></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/patricia-s-m-960232100/"><img className="rounded-circle" src={imgpatricia} width="80" height="80" alt="imgpatricia"/></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/hillary-diaz-saborio-480724167/"><img className="rounded-circle" src={imghillary} width="80" height="80" alt="imghillary"/></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/mariliny-zambrana-jim%C3%A9nez-608b34236/"><img className="rounded-circle" src={imgmariliny} width="80" height="80" alt="imgmariliny"/></a>
                  </li>
                </ul>
                

                <p className="lead my-5">
                  We are an self-taught students, we like to be constantly learning
                  new web programming technologies. we have experience and we
                  like to work collaboratively to enrich the projects in which
                  were participate.
                </p>
              </div>

              <div className="col-12 col-md-6 d-flex align-self-center">
                <img
                  className="rounded-circle mx-auto mb-2"
                  src={cart}
                  alt="Avatar "
                  width={180}
                  height={180}
                />
              </div>
            </div>

            <div className="social-icons">
              <a className="social-icon" href="#!">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="social-icon" href="#!">
                <i className="fab fa-github" />
              </a>
              <a className="social-icon" href="#!">
                <i className="fab fa-twitter" />
              </a>
              <a className="social-icon" href="#!">
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        </section>
        <hr className="m-0" />
        {/* Education*/}
        <section className="resume-section" id="education">
          <div className="resume-section-content ms-md-3 mt-3">
            <h2 className="mb-5">Education</h2>
            <div className="d-flex flex-column flex-md-row gap-5 mb-4">
              <div className="flex-grow-0">
                <h3 className="mb-0">CodingDojo</h3>
                <div className="subheading mb-3">
                  MERN
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-secondary">2023 - {year}</span>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />
        {/* Skills*/}
        <section className="resume-section ms-md-3 mt-3" id="skills">
          <div className="resume-section-content">
            <h2 className="mb-5">Skills</h2>
            <div className="subheading mb-3">
              Programming Languages &amp; Tools
            </div>
            <ul className="list-inline dev-icons">
              <li className="list-inline-item">
                <img src={img8} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img7} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img6} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img5} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img9} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img1} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img2} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img3} alt="Mi Icono" />
              </li>
              <li className="list-inline-item">
                <img src={img4} alt="Mi Icono" />
              </li>
              <Link to="/" className="btn btn-primary" style={{ marginLeft: "620px", clear: "both", fontWeight: 'bold', fontSize: '19px', marginTop: '40px', marginBottom: '20px' }}>
                Volver a la Principal
              </Link>
            </ul>

          </div>

        </section>
      </div>

    </>
  );
};

export default Contant;
