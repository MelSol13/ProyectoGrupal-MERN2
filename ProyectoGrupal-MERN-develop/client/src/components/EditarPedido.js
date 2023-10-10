import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { UserName } from "./globals";
import "./Editarpedido.css"



const ActualizarPedido = () => {

    const { id } = useParams();
    const [pedido, setPedido] = useState({});
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
        axios.get(`http://localhost:8000/api/pedidos/${id}`, { withCredentials: true })
            .then(res => {
                const pedido = res.data;
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
    }, [id]);

    const editarPedido = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pedidos/${id}`, {
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
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => navigate("/"))
            .catch(err => console.log(err));
    }


    return (
        <div className='container-4'>
            <nav className='nav-editar'>
                <h1 className='pedido-tit'>Editar pedido</h1>
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
                            <label>Producto:</label>
                            <input type="text" name="producto" className="form-control" value={producto} onChange={e => setProducto(e.target.value)} />
                            {errores.producto ? <span className='text-danger'>{errores.producto.message}</span> : null}
                       
                        <div>
                            <label>Cantidad:</label>
                            <input type="text" name="cantidad" className="form-control" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                            {errores.cantidad ? <span className='text-danger'>{errores.cantidad.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Si su pedido es un articulo que necesita foto de referencia adjuntela aqui:</label>
                            <input type="text" className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Comentarios:</label>
                            <input type="text" className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
                            {errores.comentarios ? <span className='text-danger'>{errores.comentarios.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Fecha De Retiro:</label>
                            <textarea className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            {errores.fecha ? <span className='text-danger'>{errores.fecha.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Hora De Retiro:</label>
                            <textarea className="form-control" value={hora} onChange={(e) => setHora(e.target.value)} />
                            {errores.hora ? <span className='text-danger'>{errores.hora.message}</span> : null}
                        </div>
                        <div>
                        </div>
                            <button type="submit" className="btn-vista" onClick={editarPedido}>
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