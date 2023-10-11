import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Ad.css";
import Layout from './Layout';




const titleStyle = {
  color: 'black',
  borderBottom: '2px solid black',
  width: '130%',
  paddingBottom: '10px',
  textAlign: 'center',
};

const navStyle = {
  backgroundColor: 'rgba(149, 217, 218, 0.999)',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '30px',
  width: '130%',

}
const navStyle1 = {
  backgroundImage: `url("images/fon.jpg")`, // Reemplaza con la ruta de tu imagen
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};


const linkStyle = {
  color: 'white',
  textDecoration: 'none',
}
const containerStyle = {
  width: '200%',
}


const Admin = () => {
  const [sitios, setSitios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sitios", { withCredentials: true })
      .then((res) => setSitios(res.data))
      .catch((err) => console.log(err));
  }, []);

  const eliminar = (id) => {
    axios
      .delete("http://localhost:8000/api/sitios/" + id, { withCredentials: true })
      .then((res) => {
        let nuevaLista = sitios.filter((sitio) => sitio._id !== id);
        setSitios(nuevaLista);
      })
      .catch((err) => console.log(err));
  };


  return (
    <Layout>
      <div className="todos-container">
        {/* Encabezado */}
        <header>

          <div style={containerStyle}>

          </div>

          <nav style={navStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-check" width="72" height="72" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M11.5 17h-5.5v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
              <path d="M15 19l2 2l4 -4" />
            </svg>
            <Link to="/" style={linkStyle} className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
              </svg> Inicio
            </Link>
            <Link className="nav-link" to="/contact" style={linkStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                <path d="M10 16h6" />
                <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M4 8h3" />
                <path d="M4 12h3" />
                <path d="M4 16h3" />
              </svg> Contacto
            </Link>
            <Link className="nav-link" to="/hacerpedido" style={linkStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-loading" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15" />
                <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z" />
                <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              </svg> Pedidos
            </Link>

          </nav>

          <h1 style={titleStyle}>Diseños disponibles</h1>
          <Link to="/crearsitio" className="btn btn-success">
            Nueva Plantilla +
          </Link>
          <div className="fondo3 text-center">


          </div>
        </header>

        {/* Lista de sitios */}

        <table className='table table-hover'>

          <thead>
            <tr>
              <th>Diseño</th>
              <th>Imagen Ilustrativa</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              sitios.map((sitio, index) => (
                <tr key={index}>
                  <td>{sitio.nombre}</td>
                  <td>
                    <img src={sitio.imagen1} alt="autor" className="img-fluid" />
                  </td>

                  <td>
                    <Link className='btn btn-warning' to={`/editarsitio/${sitio._id}`}>Editar</Link>
                    <button className='btn btn-danger' onClick={() => eliminar(sitio._id)}>Eliminar</button>
                    <Link className='btn btn-success' to={`/vistaprevia/${sitio._id}`}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg></Link><Link className='btn btn-info' to={`/historialpedidos/${sitio._id}`}> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-loading" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15" />
                      <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z" />
                      <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    </svg></Link>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>
    </Layout>
  );
};

export default Admin;
