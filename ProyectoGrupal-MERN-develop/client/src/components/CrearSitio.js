import React, { useState } from 'react';
import Select from 'react-select';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./CrearSitio.css"
import ButtonLogout from './ButtonLogout';

const CrearSitio = () => {
    const imagen = "https://media.istockphoto.com/id/1387782756/es/foto/pc-de-computadora-moderna-con-carta-de-colores-en-la-pantalla-del-monitor-taza-de-caf%C3%A9-y.jpg?s=612x612&w=0&k=20&c=M94eQcTWc4bp4Z9_4VC_PO0olEwnoqpF7NT1kna6LaY=";

    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [logo, setLogo] = useState('');
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
    const [imagen1, setImagen1] = useState('');
    const [imagen2, setImagen2] = useState('');
    const [imagen3, setImagen3] = useState('');
    const [contacto, setContacto] = useState('');

    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // Accede a las props pasadas desde IniciarSesion.js

    const guardarSitio = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/sitios", {
            nombre,
            url,
            categoria,
            logo,
            eslogan,
            descripcion,
            servicio1,
            servicio2,
            servicio3,
            contacto,
            imagen1,
            imagen2,
            imagen3,
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
                            <input type="text" name="nombre " className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {errores.nombre ? <span className='text-danger'>{errores.nombre.message}</span> : null}
                        </div>
                        <div>
                            <label>Categoría:</label>
                            <Select options={opcionesCategorias} value={categoria} onChange={(opcionSeleccionada) => setCategoria(opcionSeleccionada)} />
                        </div>
                        <div className='form-group'>
                            <label>URL:</label>
                            <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
                            {errores.url ? <span className='text-danger'>{errores.url.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Logo:</label>
                            <input type="text" className="form-control" value={logo} onChange={(e) => setLogo(e.target.value)} />
                            {errores.logo ? <span className='text-danger'>{errores.logo.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Imagen 1:</label>
                            <input type="text" className="form-control" value={imagen1} onChange={(e) => setImagen1(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Imagen 2:</label>
                            <input type="text" className="form-control" value={imagen2} onChange={(e) => setImagen2(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Imagen 3:</label>
                            <input type="text" className="form-control" value={imagen3} onChange={(e) => setImagen3(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Eslogan:</label>
                            <input type="text" className="form-control" value={eslogan} onChange={(e) => setEslogan(e.target.value)} />
                            {errores.eslogan ? <span className='text-danger'>{errores.eslogan.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label>Descripción:</label>
                            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
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
                            <button type="submit" className="btn-vista" onClick={guardarSitio}>
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

