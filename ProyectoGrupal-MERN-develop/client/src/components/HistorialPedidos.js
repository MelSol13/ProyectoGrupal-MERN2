import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./HistorialPedidos.css"
import { UserName } from "./globals";

const HistorialPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/api/pedidos", {withCredentials: true})
            .then(res => setPedidos(res.data))
            .catch(err => {
                if(err.response.status === 401){
                    navigate("/");
                }
            });
    }, [])

    const borrarPedido = idPedido => {
        axios.delete("http://localhost:8000/api/pedidos/"+idPedido)
            .then(res => {
                let nuevaLista = pedidos.filter(pedido => pedido._id !== idPedido);
                setPedidos(nuevaLista);
            })
    }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
        .then( res => navigate("/"))
        .catch(err => console.log (err));
    }


    return (
        <div>
            <div className="fondo5"></div>
            <nav className='nav-historial'>
            <h1 className='hist-tit'>Historial de Pedidos</h1>
            <Link to="/hacerpedido" className="btn btn-success">Nuevo Pedido</Link>
            <div className="user-actions" style={{ textAlign: "right", color: 'teal', fontSize: '22px', fontWeight: 'bold', padding: "10px 25px" }}>
                    <span className='username'>{UserName}</span>
                </div>
            <button className="log-out2" onClick={cerrarSesion}>Cerrar Sesión</button>
            </nav>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Comentarios</th>
                        <th>Fecha Retiro</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.map((pedido, index) => (
                            <tr key={index}>
                                <td>{pedido.producto}</td>
                                <td>{pedido.cantidad}</td>
                                <td>{pedido.comentarios}</td>
                                <td>{pedido.fecha}</td>
                                <td>{pedido.hora}</td>
                                <td><img className="img-fluid" src={pedido.imagen} /></td>
                                <td>
                                    <Link to={`/editarpedido/${pedido._id}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-danger" onClick={() => borrarPedido(pedido._id)}>Borrar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default HistorialPedidos;