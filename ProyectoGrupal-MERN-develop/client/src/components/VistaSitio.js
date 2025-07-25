import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ButtonLogout from './ButtonLogout';
import "./VistaSitio.css"
import { UserName } from "./globals";
import 'animate.css';
import { getFirestore } from "firebase/firestore/lite";  
import { collection, addDoc, getDocs } from "firebase/firestore";  
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../credenciales"; 

const db = getFirestore(app);
const storage = getStorage(app);

const VistaSitio = () => {
    const [sitio, setSitio] = useState({});
    const[imagendb, setImagendb] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const imagensinpe = "https://seeklogo.com/images/S/sinpe-movil-logo-D694F98AE5-seeklogo.com.png"
    const imagen = "data:image/png;base64,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"

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/sitios/${id}`, { withCredentials: true })
            .then(res => setSitio(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion");
                }
            });

            const imagendb = async()=>{
                try {
                    const querySnapshot = await getDocs(collection(db,'imagen'))
                    const docs = []
                    querySnapshot.forEach((doc)=>{
                        docs.push({...doc.data(), id: doc.id})
                    })
                    setImagendb(docs)
                } catch (error) {
                    console.log(error);
                }
    
            }
            imagendb();
        
    }, [id, API_BASE_URL, navigate]);


    const borrarSitio = (id) => {
        axios.delete(`${API_BASE_URL}/api/sitios/${id}`, { withCredentials: true })
            .then(res => navigate("/crearsitio"))
            .catch(err => console.log(err));
    }

    const verSitio = (id) => {
        axios.delete(`${API_BASE_URL}/api/sitios/${id}`, { withCredentials: true })
            .then(res => navigate("/admin"))
            .catch(err => console.log(err));
    }

    const linkStyle = {
        marginLeft: '150px',
        color: 'white',
    }

    return (
        <div>
            <nav>
                <div className="user-actions" style={{ color: 'teal', fontSize: '22px', fontWeight: 'bold', paddingLeft: "20px", marginTop: "15px 15px" }}>
                    <span className='username'>{UserName}</span>
                    <ButtonLogout />
                </div>
            </nav>
            <div className='fondo' style={{ background: `${sitio.colorFondo}` }}>
                <div className='barraSuperior' style={{ background: `${sitio.colorBarra}` }}>
                    <p className='sitioNombre' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.nombre}</p>
                    <img src={sitio.logo} className='sitio-logo' alt="logo"></img>
                </div>
                <div className='body'>
                    <div className='columna-izquierda' style={{ background: `${sitio.colorInformacion}` }}>
                        <div>
                            <p className='eslogan' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.eslogan}</p>
                        </div>
                        <p className='descripcion' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.descripcion}</p>
                        <ul>
                            <li><p className='servicio1' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.servicio1}</p></li>
                            <li><p className='servicio2' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.servicio2}</p></li>
                            <li><p className='servicio3' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.servicio3}</p></li>
                        </ul>
                        <div className="contacto">
                            <img src={imagen} className='logo-whats' alt="logoWhats" />
                            <p className='numero' style={{ fontFamily: `${sitio.fuenteSeleccionada}` }}>{sitio.contacto}</p>
                            <img src={imagensinpe} className='logo-sinpe' alt='sinpe' />
                        </div>
                    </div>
                    <div className='columna-derecha'>
                        <div>
                            <img src={sitio.imagen1} id='imagen1' className='animate__animated animate__rollIn' alt="imagen1"></img>
                        </div>
                        <div>
                            <img src={sitio.imagen2} id='imagen2' className='animate__animated animate__jackInTheBox' alt="imagen2"></img>
                        </div>
                        <div>
                            <img src={sitio.imagen3} id='imagen3' className='animate__animated animate__zoomInUp' alt="imagen3"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className='botones'>
                <Link className="btn-cambios" to={"/editarsitio/" + sitio._id}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>Realizar cambios</Link>
                <Link className="btn-guardar" to={"/admin"}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                </svg>Guardar</Link>
                {/* <button className="btn-sitio" onClick={() => verSitio(sitio)}>Crear Sitio</button> */}
                <button className="btn-borrar" onClick={() => borrarSitio(sitio._id)}><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>Borrar</button>
                <Link className='btn btn-info' to={`/historialpedidos/${sitio._id}`} style={linkStyle}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-description" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    <path d="M9 17h6" />
                    <path d="M9 13h6" />
                </svg>Historial Pedidos</Link>
            </div>
        </div>
    );
};

export default VistaSitio;