import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { UserName } from "./globals";
import "./HacerPedido.css"
import { getFirestore } from "firebase/firestore/lite";  
import { collection, addDoc, getDocs } from "firebase/firestore";  
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../credenciales"; 

const db = getFirestore(app);
const storage = getStorage(app);

const HacerPedido = () => {

    const { id } = useParams();
    const [pedido, setPedido] = useState({});
    const [emprendimiento, setEmprendimiento] = useState('');
    const [cliente, setCliente] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [urlImDesc, setUrlImDesc] = useState('');
    const [imagendb, setImagendb] = useState({});
    const [comentarios, setComentarios] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [errores, setErrores] = useState({});
    const { state } = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/pedidos/${id}`, { withCredentials: true })
            .then(res => setPedido(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion");
                }
            });

        const imagendb = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'imagen'))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                setImagendb(docs)
            } catch (error) {
                console.log(error);
            }

        }
        imagendb();

    }, [id,API_BASE_URL, navigate])

    const limpiarFormulario = () => {
        setEmprendimiento('');
        setCliente('');
        setProducto('');
        setCantidad('');
        setUrlImDesc('');
        setComentarios('');
        setFecha('');
        setHora('');
    };

    const guardarPedido = async (e) => {
        e.preventDefault();
        const newImagen = {
            imagen: urlImDesc
        }
        console.log("urlImDesc:", urlImDesc);

        try {
            await addDoc(collection(db,'imagen'),{
                imagen: urlImDesc
            })
        } catch (error) {
            console.log('Error saving data:', error);
        }

        axios.post(`${API_BASE_URL}/api/pedidos`, {
            emprendimiento,
            cliente,
            producto,
            cantidad,
            imagen:urlImDesc,
            comentarios,
            fecha,
            hora
        }, { withCredentials: true })
            .then(res => {
                console.log("Haciendo pedido");
                setPedido(res.data);
                limpiarFormulario();
            })
            .catch(err => {
                console.log("Error al hacer el pedido:", err);
                if (err.response && err.response.status === 401) {
                    navigate("/iniciar-sesion");
                } else {
                    setErrores(err.response ? err.response.data.errors : {});
                    console.error("Detalles del error:", err);
                }
            });
    }

    const borrarPedido = (id) => {
        axios.delete(`${API_BASE_URL}/api/pedidos/${id}`, { withCredentials: true })
            .then(res => {
                setPedido(res.data);
                navigate("/hacerpedido", { state: false });
            })
            .catch(err => console.log(err));
    }

    const cerrarSesion = () => {
        axios.get(`${API_BASE_URL}/api/logout`, { withCredentials: true })
            .then(res => navigate("/"))
            .catch(err => console.log(err));
    }

    const fileHandler = async (e) => {
        const archivoL = e.target.files[0];
        const refArchivo = ref(storage, `imagen/${archivoL.name}`);
        try {
            await uploadBytes(refArchivo, archivoL);
            const imageUrl = await getDownloadURL(refArchivo);
            setUrlImDesc(imageUrl); 
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };


    return (
        <div className='container'>
            <div className="fondo3"></div>
            <nav className='nav'>
                <h1 className='pedido-tit2'>Realizar Pedido</h1>
                <svg onClick={e => alert("¿Olvidaste Algo? ¡Continua con tu compra!")} xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>

                <input type="text" className="buscar" placeholder="Buscar"></input>


                <div className="user-actions" style={{ textAlign: "right", color: 'teal', fontSize: '22px', fontWeight: 'bold', padding: "10px 25px" }}>
                    <span className='username'>{UserName}</span>
                </div>
                <button className="log-out" onClick={cerrarSesion}>Cerrar Sesión</button>
            </nav>
            <div className='row'>
                <form className='form' onSubmit={guardarPedido}>
                    <div className='col-md-4'>
                        <div className='form-group1'>
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
                                <label>Si gusta adjunte una foto de referencia:</label>
                                <input type="file" className="form-control"  onChange={fileHandler} />
                            </div>
                            <div className='form-group'>
                                <label>Comentarios:</label>
                                <textarea type="text" className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
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
                        </div>
                        <div>
                            <button type="submit" className="btn-vista" onClick={guardarPedido}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                </svg> Realizar Pedido </button>
                        </div>
                    </div>
                </form>
            </div>
            {
                state ?
                    <div className='card'>
                        <h1 className='Titulo'>Carrito de Compras</h1>
                        <p>Emprendimiento:{state.emprendimiento}</p>
                        <p>Cliente:{state.cliente}</p>
                        <p>Producto:{state.producto}</p>
                        <p>Cantidad:{state.cantidad}</p>
                        <p>Comentarios:{state.comentarios}</p>
                        <p>Fecha de Retiro:{state.fecha}</p>
                        <p>Hora de Retiro:{state.hora}</p>
                        <img id="imagen-pedido" className="img" src={state.imagen} ></img>
                    </div> :

                    <div className='card1'>
                        <div className='carrito'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            <h2>Carrito De Compras</h2>
                        </div>
                        <p>Emprendimiento:{pedido.emprendimiento}</p>
                        <p>Cliente:{pedido.cliente}</p>
                        <p>Producto:{pedido.producto}</p>
                        <p>Cantidad:{pedido.cantidad}</p>
                        <p>Comentarios:{pedido.comentarios}</p>
                        <p>Fecha de Retiro:{pedido.fecha}</p>
                        <p>Hora de Retiro:{pedido.hora}</p>
                        <p>Imagen de Referencia:</p><img id="imagen-pedido" className="img" src={pedido.imagen} ></img>
                    </div>
            }
            <div>
                <Link className="btn-cambios1" to={"/editarpedido/" + pedido._id}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>Editar</Link>
                <button className="btn-borrar" onClick={() => borrarPedido(pedido._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg> Borrar </button>
                <Link className="btn-confirmar" to={"/historialpedidos/" + pedido._id}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                </svg>Confirmar</Link>
            </div>
        </div>
    );
};

export default HacerPedido;