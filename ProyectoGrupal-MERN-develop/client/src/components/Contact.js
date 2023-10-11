import React from "react";
import Layout from "../components/Layout";
import cart from "../images/fon.jpg";
import Logo from "../images/cart.gif";
// import { FaNodeJs,FaBootstrap,FaGithub,FaReact,FaCss3Alt, FaHtml5} from 'react-icons/fa';
// import { SiJavascript,SiRedux } from 'react-icons/si';


const Contant = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <Layout>
        {/* Masthead*/}
        <header className="masthead bg-danger" id="contact">
          <div className="container position-relative">
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
              <div className="row align-items-center justify-content-center mb-2">
                <div className="col-12 col-md-6">
                  <h3 className="mb-0">
                    Grupo MERN 
                    <span className="text-danger"> CodingDojo</span>
                  </h3>

                  <h4 className="mt-2"> Costa Rica</h4>

                  <a className="text-seconday h-4" href="mailto:name@email.com">
                    maryzambrana98@gmail.com
                  </a>

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
            <div className="resume-section-content">
              <h2 className="mb-5">Education</h2>
              <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                <div className="flex-grow-1">
                  <h3 className="mb-0">CodingDojo</h3>
                  <div className="subheading mb-3">
                    MERN
                  </div>
                  <div>Currently studying MERN</div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-secondary">2023 - {year}</span>
                </div>
              </div>
            </div>
          </section>
          <hr className="m-0" />
          {/* Skills*/}
          <section className="resume-section" id="skills">
            <div className="resume-section-content">
              <h2 className="mb-5">Skills</h2>
              <div className="subheading mb-3">
                Programming Languages &amp; Tools
              </div>
              <ul className="list-inline dev-icons">
                <li className="list-inline-item">
                  {/* <FaHtml5 /> */}
                </li>
                <li className="list-inline-item">
                  {/* <FaCss3Alt /> */}
                </li>
                <li className="list-inline-item">
                  {/* <SiJavascript /> */}
                </li>
                <li className="list-inline-item">
                  {/* <FaBootstrap /> */}
                </li>
              
                <li className="list-inline-item">
                  {/* <FaReact /> */}
                </li>
                <li className="list-inline-item">
                  {/* <SiRedux /> */}
                </li>
                <li className="list-inline-item">
                  {/* <FaNodeJs /> */}
                </li>
               
                
                
                
              
                <li className="list-inline-item">
                  {/* <FaGithub /> */}
                </li>
               
               
              </ul>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Contant;
