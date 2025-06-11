import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserName } from "./globals";
import Swal from 'sweetalert2';
import "./IniciarSesion.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function IniciarSesion() {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [errors, setErrors] = useState({
    emailLogin: false,
    passwordLogin: false
    });

    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();

        const newErrors = {
        emailLogin: !emailLogin.trim(),
        passwordLogin: !passwordLogin.trim()
    };

    setErrors(newErrors);

    if (newErrors.emailLogin || newErrors.passwordLogin) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.'
            });
            return;
        }

        axios.post(`${API_BASE_URL}/api/login`, {
            email: emailLogin,
            password: passwordLogin
        }, { withCredentials: true })
            .then(res => {
        console.log(res);
        if (res.data.error) {
            let message = res.data.message.toLowerCase();
            if (message.includes("correo electronico")) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo incorrecto',
                    text: 'El correo electrónico ingresado no es válido o no está registrado.'
                });
            } else if (message.includes("contrasena")) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña incorrecta',
                    text: 'La contraseña ingresada es incorrecta.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.message
                });
            }
        } else if (res.data.type === 1) {
            navigate("/admin");
        } else {
            navigate("/crearsitio", {
                state: {
                    userName: res.data.userName,
                    userLastName: res.data.lastName
                }
            });
            UserName = res.data.userName;
        }
    })
    .catch(err => {
        console.error("Error en login:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error del servidor',
            text: 'Ocurrió un error al intentar iniciar sesión. Intente más tarde.'
        });
    });
    }

    return (
        <div className='sesion'>
            <div className='row2'>
                <div className='col-3'></div>
                <h1 className='inic-tit'>Bienvenido Nuevamente!</h1>
                <form className="form-inic" onSubmit={login}>
                    <div className='form-group mb-3'>
                        <label htmlFor="emailLogin">Email:</label>
                        <input type="email" name="emailLogin" id="emailLogin" className={`form-control mb-2 ${errors.emailLogin ? 'input-error' : ''}`}
                        value={emailLogin} onChange={(e) => {setEmailLogin(e.target.value);
                            if (errors.emailLogin && e.target.value.trim()) {
                                setErrors(prev => ({ ...prev, emailLogin: false })); 
                                } 
                            }}/>
                        {errors.emailLogin && <small className="error-text">Este campo es requerido</small>}
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor="passwordLogin">Contraseña:</label>
                        <input type="password" id="passwordLogin" className={`form-control mb-2 ${errors.passwordLogin ? 'input-error' : ''}`}
                            value={passwordLogin} onChange={(e) => {setPasswordLogin(e.target.value);
                                if (errors.passwordLogin && e.target.value.trim()) {
                                    setErrors(prev => ({ ...prev, passwordLogin: false }));
                                }
                            }}
                        />
                        {errors.passwordLogin && <small className="error-text">Este campo es requerido</small>}
                    </div>
                    <input type="submit" value="Iniciar Sesión" className='bot-inic mt-3' />
                </form>
            </div>
        </div>
    );
}

export default IniciarSesion;