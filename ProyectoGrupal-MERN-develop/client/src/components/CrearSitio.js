import React, { useState } from 'react';
import Select from 'react-select';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./CrearSitio.css"
import ButtonLogout from './ButtonLogout';
import { getFirestore } from "firebase/firestore/lite";  
import { collection, addDoc, getDocs } from "firebase/firestore";  
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../credenciales"; 

const db = getFirestore(app);
const storage = getStorage(app);

const CrearSitio = () => {

    const imagen = "https://media.istockphoto.com/id/1387782756/es/foto/pc-de-computadora-moderna-con-carta-de-colores-en-la-pantalla-del-monitor-taza-de-caf%C3%A9-y.jpg?s=612x612&w=0&k=20&c=M94eQcTWc4bp4Z9_4VC_PO0olEwnoqpF7NT1kna6LaY=";

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [eslogan, setEslogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [colorBarra, setColorBarra] = useState('#000000');
    const [colorFondo, setColorFondo] = useState('#FFFFFF');
    const [colorInformacion, setColorInformacion] = useState('#000000');
    const [url, setUrl] = useState('');
    const [fuenteSeleccionada, setFuenteSeleccionada] = useState('');
    const [servicio1, setServicio1] = useState('');
    const [servicio2, setServicio2] = useState('');
    const [servicio3, setServicio3] = useState('');
    const [imagenUrls, setImagenUrls] = useState(['', '', '']);
    const [contacto, setContacto] = useState('');


    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // Accede a las props pasadas desde IniciarSesion.js


    const guardarSitio = async (e) => {
        e.preventDefault();
        try {
            const logoDocRef = await addDoc(collection(db, 'imagen'), {
                imagen: logoUrl,
            });

            const imagenDocs = await Promise.all(
                imagenUrls.map(async (url) => {
                    const docRef = await addDoc(collection(db, 'imagen'), {
                        imagen: url,
                    });
                    return docRef;
                })
            );
        } catch (error) {
            console.log('Error saving data:', error);
        }


        axios.post("http://localhost:8000/api/sitios", {
            nombre,
            url,
            categoria,
            logo: logoUrl,
            eslogan,
            descripcion,
            servicio1,
            servicio2,
            servicio3,
            contacto,
            imagen1: imagenUrls[0],
            imagen2: imagenUrls[1],
            imagen3: imagenUrls[2],
            fuenteSeleccionada,
            colorBarra,
            colorFondo,
            colorInformacion
        }, { withCredentials: true })
            .then(res => navigate(`/vistaprevia/${res.data._id}`))
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/iniciar-sesion")
                } else {
                    setErrores(err.response.data.errors)
                }
            });
    }

    const fileHandler = async (e, index) => {
        const archivoL = e.target.files[0];
        const refArchivo = ref(storage, `imagen/${archivoL.name}`);
        try {
            await uploadBytes(refArchivo, archivoL);
            const imageUrl = await getDownloadURL(refArchivo);

            if (index === 'logo') {
                setLogoUrl(imageUrl);
            } else {
                const updatedUrls = [...imagenUrls];
                updatedUrls[index] = imageUrl;
                setImagenUrls(updatedUrls);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
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

    return (
        <div className='container-2'>
            <nav className="navbar" >
                <div className="user-actions" style={{ textAlign: "right", color: 'teal', fontSize: '22px', fontWeight: 'bold', padding: "10px 25px" }}>
                    <span className='username'>{state?.userName}</span>
                    <ButtonLogout />
                </div>
            </nav>
            <img src={imagen} id='imagen-princ' className='animate__animated animate__jello' alt="Imagen predeterminada" />
            <div className='row'>
                <h1 className='titulo'>Diseña a tu gusto</h1>
                <form className='form' onSubmit={guardarSitio}>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Nombre del sitio:</label>
                            <input type="text" placeholder='Ingresar nombre del sitio' name="nombre " className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {errores.nombre ? <span className='text-danger'>{errores.nombre.message}</span> : null}
                        </div>
                        <div>
                            <label>Categoría:</label>
                            <Select options={opcionesCategorias} value={categoria} onChange={(opcionSeleccionada) => setCategoria(opcionSeleccionada)} />
                        </div>
                        <div className='form-group'>
                            <label>URL:</label>
                            <input type="text" placeholder='Ingresar su URL única' className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
                            {errores.url ? <span className='text-danger'>{errores.url.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Logo: </label>
                            <input type="file" id="file" className="form-control" onChange={(e) => fileHandler(e, 'logo')} />
                            {errores.logo ? <span className='text-danger'>{errores.logo.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Imagen 1:</label>
                            <input type="file" className="form-control" onChange={(e) => fileHandler(e, 0)} />
                        </div>
                        <div className='form-group'>
                            <label>Imagen 2:</label>
                            <input type="file" className="form-control" onChange={(e) => fileHandler(e, 1)} />
                        </div>
                        <div className='form-group'>
                            <label>Imagen 3:</label>
                            <input type="file" className="form-control" onChange={(e) => fileHandler(e, 2)} />
                        </div>
                        <div className='form-group'>
                            <label>Eslogan:</label>
                            <input type="text" placeholder='Ingresar su eslogan' className="form-control" value={eslogan} onChange={(e) => setEslogan(e.target.value)} />
                            {errores.eslogan ? <span className='text-danger'>{errores.eslogan.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Descripción:</label>
                            <textarea className="form-control" placeholder='Ingresar una descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            {errores.descripcion ? <span className='text-danger'>{errores.descripcion.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Servicio 1:</label>
                            <input type="text" className="form-control" value={servicio1} onChange={(e) => setServicio1(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Servicio 2:</label>
                            <input type="text" className="form-control" value={servicio2} onChange={(e) => setServicio2(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Servicio 3:</label>
                            <input type="text" className="form-control" value={servicio3} onChange={(e) => setServicio3(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Contacto</label>
                            <input type="text" className="form-control" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Fuente:</label>
                            <Select className='mb-5' options={fontOptions} value={fontOptions.find(option => option.value === fuenteSeleccionada)} onChange={(selectedOption) => setFuenteSeleccionada(selectedOption.value)}
                            />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h2 className='titulo-colores1'>Elegir Colores:</h2>
                        <div>
                            <label>Barra Superior:</label>
                            <ChromePicker className="color-barra mb-4" color={colorBarra} onChange={(color) => setColorBarra(color.hex)} />
                        </div>
                        <div>
                            <label>Fondo:</label>
                            <ChromePicker className="color-fondo mb-4" color={colorFondo} onChange={(color) => setColorFondo(color.hex)} />
                        </div>
                        <div>
                            <label>Información:</label>
                            <ChromePicker className="color-informacion mb-4" color={colorInformacion} onChange={(color) => setColorInformacion(color.hex)} />
                        </div>
                        <div>
                            <button type="submit" className="btn-vista1" onClick={guardarSitio}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
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

export default CrearSitio;

