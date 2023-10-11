import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Ad.css";
import { contact } from './Contact';



const Admin = () => {


  
  const [sitios, setSitios] = useState([]);

  useEffect( ()=>{
      axios.get("http://localhost:8000/api/sitios", { withCredentials: true })
          .then(res => setSitios(res.data))
          .catch(err => console.log(err));
  }, [])
  

  const eliminar = (id) => {
    axios
      .delete("http://localhost:8000/api/sitios/" + id, { withCredentials: true })
      .then((res) => {
        let nuevaLista = sitios.filter((sitio) => sitio._id !== id);
        setSitios(nuevaLista);
      })
      .catch((err) => console.log(err));
  };

  const titleStyle = {
    color: 'black',
    borderBottom: '2px solid black',
    width: '130%',
    paddingBottom: '10px',
    textAlign: 'center', 
  };
  
  const navStyle = {
    backgroundColor: 'teal',
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
    width: '130%',
  }
  

  return (
    
    <div className="todos-container">

      <header>
      <div style={containerStyle}>
      
      </div>
      
      <nav style={navStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-check" width="72" height="72" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M11.5 17h-5.5v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
        <path d="M15 19l2 2l4 -4" />
      </svg>
        <Link  to="/" style={linkStyle}  className="nav-link">
          Inicio
        </Link>
        <Link className="nav-link" to="/contact" style={linkStyle}>
          Contacto
        </Link>
        <Link className="nav-link" to="/pedidos" style={linkStyle}>
          Pedidos
        </Link>
       
      </nav>
      
      <h1 style={titleStyle}>Diseños disponibles</h1>
      </header>

      {/* Lista de sitios */}
      <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sitios.map((sitio, index) => (
                            <tr key={index}>
                                <td>{sitio.nombre}</td>
                                <td>
                                    <img src={sitio.imagen1} alt="autor" className="img-fluid"/>
                                </td>
                              
                                <td>
                                    <Link className='btn btn-warning' to={`/editarsitio/${sitio._id}`}>Editar</Link>
                                    <button className='btn btn-danger' onClick={()=>eliminar(sitio._id) }>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
  );
};

export default Admin;
