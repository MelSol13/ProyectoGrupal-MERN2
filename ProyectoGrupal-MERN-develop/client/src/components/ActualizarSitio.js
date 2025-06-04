import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import "./ActualizarSitio.css"
import { UserName } from "./globals";
import ButtonLogout from './ButtonLogout';
import { getFirestore } from "firebase/firestore/lite";  
import { collection, addDoc, getDocs } from "firebase/firestore";  
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../credenciales"; 

const db = getFirestore(app);
const storage = getStorage(app);

let urlImDesc;

const ActualizarSitio = () => {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const [sitio, setSitio] = useState({});
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');
    const [categoria, setCategoria] = useState('');
    const [logo, setLogo] = useState('');
    const [eslogan, setEslogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [colorBarra, setColorBarra] = useState('#000000');
    const [colorFondo, setColorFondo] = useState('#FFFFFF');
    const [colorInformacion, setColorInformacion] = useState('#000000');
    const [fuenteSeleccionada, setFuenteSeleccionada] = useState('');
    const [servicio1, setServicio1] = useState('');
    const [servicio2, setServicio2] = useState('');
    const [servicio3, setServicio3] = useState('');
    const [contacto, setContacto] = useState('');
    const [imagen1, setImagen1] = useState('');
    const [imagen2, setImagen2] = useState('');
    const [imagen3, setImagen3] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/sitios/${id}`, { withCredentials: true })
            .then(res => {
                const sitio = res.data;
                setNombre(sitio.nombre);
                setUrl(sitio.url);
                setCategoria(sitio.categoria);
                setLogo(sitio.logo);
                setEslogan(sitio.eslogan);
                setDescripcion(sitio.descripcion);
                setServicio1(sitio.servicio1);
                setServicio2(sitio.servicio2);
                setServicio3(sitio.servicio3);
                setContacto(sitio.contacto);
                setImagen1(sitio.imagen1);
                setImagen2(sitio.imagen2);
                setImagen3(sitio.imagen3);
                setColorBarra(sitio.colorBarra);
                setColorFondo(sitio.colorFondo);
                setColorInformacion(sitio.colorInformacion);
                setFuenteSeleccionada(sitio.fuenteSeleccionada);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion");
                }
            });
    }, [id]);


    const actualizarSitio = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/api/sitios/${id}`, {
            nombre,
            url,
            categoria,
            logo:urlImDesc,
            eslogan,
            descripcion,
            servicio1,
            servicio2,
            servicio3,
            contacto,
            imagen1:urlImDesc,
            imagen2:urlImDesc,
            imagen3:urlImDesc,
            colorBarra,
            colorFondo,
            colorInformacion,
            fuenteSeleccionada
        }, { withCredentials: true })
            .then(res => navigate(`/vistaprevia/${res.data._id}`))
            .catch(err => setErrors(err.response.data.errors))
    }; 
    


    const opcionesCategorias = [
        { value: 'pasteleria', label: 'Pastelería' },
        { value: 'unas', label: 'Uñas' },
        { value: 'tienda', label: 'Tienda' },
    ];

    const fontOptions = [
        { value: 'Croissant One', label: 'Croissant One' },
        { value: 'Lexend Peta', label: 'Lexend Peta' },
        { value: 'Love Ya Like A Sister', label: 'Love Ya Like A Sister' },
        { value: 'Loved by the King', label: 'Loved by the King' },
        { value: 'Mooli', label: 'Mooli' },
        { value: 'Pathway Extreme', label: 'Pathway Extreme' },
        { value: 'Quicksand', label: 'Quicksand' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Skranji', label: 'Skranji' },
    ];

    const fileHandler = async (e) => {
        //detectar el archivo
        const archivoI = e.target.files[0];
        //cargar al storage
        const refArchivo = ref(storage,`imagenes/${archivoI.name}`)
        await uploadBytes(refArchivo, archivoI)
        //obtener url de la imagen de storage
        urlImDesc = await getDownloadURL(refArchivo)
    }


    return (
        <div className="container-3">
            <div className="user-actions" style={{ textAlign: "right", color: 'teal', fontSize: '22px', fontWeight: 'bold', padding: "10px 25px" }}>
                <span className='username'>{UserName}</span>
            </div>
            <ButtonLogout />
            <div className="row">
                <h1 className="titulo-2">Realizar Cambios</h1>
                <form className="form-2" onSubmit={actualizarSitio}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Nombre del sitio:</label>
                            <input type="text" className="form-control" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Categoría:</label>
                            <Select options={opcionesCategorias} value={categoria} onChange={(opcionSeleccionada) => setCategoria(opcionSeleccionada)} />
                        </div>
                        <div className="form-group">
                            <label>URL:</label>
                            <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Logo:</label>
                            <input type="file" className="form-control"  onChange={fileHandler} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 1:</label>
                            <input type="file" className="form-control"  onChange={fileHandler} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 2:</label>
                            <input type="file" className="form-control" onChange={fileHandler} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 3:</label>
                            <input type="file" className="form-control"  onChange={fileHandler} />
                        </div>
                        <div className="form-group">
                            <label>Eslogan:</label>
                            <input type="text" className="form-control" value={eslogan} onChange={(e) => setEslogan(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Descripción:</label>
                            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Servicio 1:</label>
                            <input type="text" className="form-control" value={servicio1} onChange={(e) => setServicio1(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Servicio 2:</label>
                            <input type="text" className="form-control" value={servicio2} onChange={(e) => setServicio2(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Servicio 3:</label>
                            <input type="text" className="form-control" value={servicio3} onChange={(e) => setServicio3(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Contacto</label>
                            <input type="text" className="form-control" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Fuente:</label>
                            <Select className="mb-5" options={fontOptions} value={fontOptions.find(option => option.value === fuenteSeleccionada)} onChange={(selectedOption) => setFuenteSeleccionada(selectedOption.value)} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h2 className="titulo-colores">Elegir Colores:</h2>
                        <div>
                            <label>Barra Superior:</label>
                            <ChromePicker className="color-barra2 mb-4" color={colorBarra} onChange={(color) => setColorBarra(color.hex)} />
                        </div>
                        <div>
                            <label>Fondo:</label>
                            <ChromePicker className="color-fondo2 mb-4" color={colorFondo} onChange={(color) => setColorFondo(color.hex)} />
                        </div>
                        <div>
                            <label>Información:</label>
                            <ChromePicker className="color-informacion2 mb-4" color={colorInformacion} onChange={(color) => setColorInformacion(color.hex)} />
                        </div>
                        <div>
                            <button type="submit" className="btn-vista3" onClick={actualizarSitio}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                                Vista Previa
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ActualizarSitio;