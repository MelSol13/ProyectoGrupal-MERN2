import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { UserName } from "./globals";
import "./Editarpedido.css"



const ActualizarPedido = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const [pedido, setPedido] = useState({});
    const [emprendimiento, setEmprendimiento] = useState('');
    const [cliente, setCliente] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [errores, setErrores] = useState({});
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/pedidos/${id}`, { withCredentials: true })
            .then(res => {
                const pedido = res.data;
                setEmprendimiento(pedido.emprendimiento);
                setCliente(pedido.cliente);
                setProducto(pedido.producto);
                setCantidad(pedido.cantidad);
                setImagen(pedido.imagen);
                setComentarios(pedido.comentarios);
                setFecha(pedido.fecha);
                setHora(pedido.hora);

            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion");
                }
            });
    }, [id, API_BASE_URL, navigate]);

    const editarPedido = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/pedidos/${id}`, {
            emprendimiento,
            cliente,
            producto,
            cantidad,
            imagen,
            comentarios,
            fecha,
            hora
        }, { withCredentials: true })
            .then(res => navigate("/hacerpedido", { state: res.data }))
            .catch(err => setErrors(err.response.data.errors))
    };
    const cerrarSesion = () => {
        axios.get(`${API_BASE_URL}/logout`, { withCredentials: true })
            .then(res => navigate("/"))
            .catch(err => console.log(err));
    }


    return (
        <div className='container-4'>
            <nav className='nav-editar'>
                <h1 className='pedido-tit'>Editar Pedido</h1>
                <svg onClick={e => alert("¿Olvidaste Algo? ¡Continua con tu compra!")} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <input type="text" className="buscar" placeholder="Buscar"></input>
                <div className="user-actions" style={{ textAlign: "right", color: 'teal', fontSize: '22px', fontWeight: 'bold', padding: "10px 25px" }}>
                    <span className='username'>{UserName}</span>
                </div>
                <button className="log-out" onClick={cerrarSesion}>Cerrar Sesión</button>
            </nav>
            <div className="fondo4"></div>
            <div className='row'>
                <form className='form' onSubmit={editarPedido}>
                    <div className='col-md-4'>

                        <div className='form-group2'>
                            <div>
                                <label>Emprendimiento:</label>
                                <input type="text" name="emprendimiento" className="form-control" value={emprendimiento} onChange={e => setEmprendimiento(e.target.value)} />
                                {errores.emprendimiento ? <span className='text-danger'>{errores.emprendimiento.message}</span> : null}
                            </div>
                            <div>
                                <label>Cliente:</label>
                                <input type="text" name="cliente" className="form-control" value={cliente} onChange={e => setCliente(e.target.value)} />
                                {errores.cliente ? <span className='text-danger'>{errores.cliente.message}</span> : null}
                            </div>
                            <div>
                            <label>Producto:</label>
                            <input type="text" name="producto" className="form-control" value={producto} onChange={e => setProducto(e.target.value)} />
                            {errores.producto ? <span className='text-danger'>{errores.producto.message}</span> : null}
                            </div>
                            <div>
                                <label>Cantidad:</label>
                                <input type="text" name="cantidad" className="form-control" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                                {errores.cantidad ? <span className='text-danger'>{errores.cantidad.message}</span> : null}
                            </div>
                            <div className='form-group'>
                                <label>Foto de referencia:</label>
                                <input type="text" className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label>Comentarios:</label>
                                <input type="text" className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
                                {errores.comentarios ? <span className='text-danger'>{errores.comentarios.message}</span> : null}
                            </div>
                            <div className='form-group'>
                                <label>Fecha De Retiro:</label>
                                <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                {errores.fecha ? <span className='text-danger'>{errores.fecha.message}</span> : null}
                            </div>
                            <div className='form-group'>
                                <label>Hora De Retiro:</label>
                                <input type="time" className="form-control" value={hora} onChange={(e) => setHora(e.target.value)} />
                                {errores.hora ? <span className='text-danger'>{errores.hora.message}</span> : null}
                            </div>
                            <div>
                            </div>
                            <button type="submit" className="btn-vista2" onClick={editarPedido}><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" className="bi bi-clipboard2-check" viewBox="0 0 16 16">
                                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
                                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
                                <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z" />
                            </svg>
                                Confirmar Pedido
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default ActualizarPedido;