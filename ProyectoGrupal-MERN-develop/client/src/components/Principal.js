import React from 'react';
import { Link } from 'react-router-dom';
import"./Principal.css"
import 'animate.css';
import Layout from './Layout';

function Principal() {
    const imagen = "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRpc2UlQzMlQjFvJTIwd2VifGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";

    return (
        
        <div className="container-princ">
            <Layout>
            <div>
            <img src={imagen} id='img-princ' className='animate__animated animate__backInLeft' alt="Imagen predeterminada" />
            </div>
            <div className='creayboton'>
            <h2 className='crea'> Crea tu sitio web || Visita tu emprendimiento Favorito</h2>
            <Link className="btn-principal" to={"/crearcuenta"}>¡Pruébalo Gratis!</Link>
            </div>
            </Layout>
        </div>
    );
}

export default Principal;