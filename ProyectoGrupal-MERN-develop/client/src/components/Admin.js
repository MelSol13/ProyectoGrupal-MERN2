import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Admin = () => {
  const [sitios, setSitios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sitios")
      .then((res) => setSitios(res.data))
      .catch((err) => console.log(err));
  }, []);

  const eliminar = (id) => {
    axios
      .delete("http://localhost:8000/api/sitios/" + id)
      .then((res) => {
        let nuevaLista = sitios.filter((sitio) => sitio._id !== id);
        setSitios(nuevaLista);
      })
      .catch((err) => console.log(err));
  };

  const titleLineStyle = {
    borderBottom: '2px solid goldenrod', // Cambiar a tu preferencia de estilo de línea
    paddingBottom: '5px', // Espacio entre el texto y la línea
  };

  return (
    
    <div className="todos-container">
      {/* Encabezado */}
      <header>
        <div className="text-center"> 
        <h1 style={{ color: 'goldenrod', ...titleLineStyle }}>Diseños disponibles</h1>
          <Link to="/nuevoSitio" className="btn btn-success">
            Nueva Plantilla +
          </Link>
        </div>
      </header>

      {/* Lista de sitios */}
      <div className="row">
        {sitios.map((rec, index) => (
          <div className="card col-3" key={index}>
            <h2>{rec.nombre}</h2>
            <img
                src={rec.imagen} 
                alt={rec.imagenUrl}
                className="img-fluid"
            />
            <p>{rec.contenido}</p>
            <Link className="btn btn-success" to={`/editar/${rec._id}`}>
              Editar
            </Link>
            <button
              className="btn btn-info"
              onClick={() => eliminar(rec._id)}
            >
              Plantilla de Diseños 
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
