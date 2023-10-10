import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./HistorialPedidos.css"
import { UserName } from "./globals";

const HistorialPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/pedidos", { withCredentials: true })
            .then(res => setPedidos(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/");
                }
            });
    }, [])

    const borrarPedido = idPedido => {
        axios.delete("http://localhost:8000/api/pedidos/" + idPedido)
            .then(res => {
                let nuevaLista = pedidos.filter(pedido => pedido._id !== idPedido);
                setPedidos(nuevaLista);
            })
    }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => navigate("/"))
            .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="fondo5"></div>
            <nav className='nav-historial'>
                <h1 className='hist-tit'>Historial de Pedidos</h1>
                <Link to="/hacerpedido" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>Nuevo Pedido</Link>
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
                                    <Link to={`/editarpedido/${pedido._id}`} className="btn btn-warning"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>Editar</Link>
                                    <button className="btn btn-danger" onClick={() => borrarPedido(pedido._id)} > <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>Borrar</button>
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