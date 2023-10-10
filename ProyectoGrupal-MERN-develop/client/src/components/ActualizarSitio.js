import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { ChromePicker } from 'react-color';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import "./ActualizarSitio.css"
import { UserName } from "./globals";
import ButtonLogout from './ButtonLogout';


const ActualizarSitio = () => {


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
        axios.get(`http://localhost:8000/api/sitios/${id}`, { withCredentials: true })
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
        axios.put(`http://localhost:8000/api/sitios/${id}`, {
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
                            <input type="text" className="form-control" value={logo} onChange={(e) => setLogo(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 1:</label>
                            <input type="text" className="form-control" value={imagen1} onChange={(e) => setImagen1(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 2:</label>
                            <input type="text" className="form-control" value={imagen2} onChange={(e) => setImagen2(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Imagen 3:</label>
                            <input type="text" className="form-control" value={imagen3} onChange={(e) => setImagen3(e.target.value)} />
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
                            <button type="submit" className="btn-vista2" onClick={actualizarSitio}>
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