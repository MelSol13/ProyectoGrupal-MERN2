import React, { useState} from 'react';
import axios from "axios";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./CrearCuenta.css"

function CrearCuenta() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState(null);
    const [errors, setErrors] = useState({});

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // Accede a las props pasadas desde IniciarSesion.js

    const registro = e => {
        e.preventDefault();

        const newErrors = {
            firstName: !firstName.trim() ? { message: 'Este campo es requerido' } : null,
            lastName: !lastName.trim() ? { message: 'Este campo es requerido' } : null,
            email: !email.trim() ? { message: 'Este campo es requerido' } : null,
            password: !password.trim()
        ? { message: 'Este campo es requerido' }
        : password.length < 8
        ? { message: 'La contraseña debe tener al menos 8 caracteres' }
        : null,
        confirmPassword: !confirmPassword.trim()
        ? { message: 'Este campo es requerido' }
        : password !== confirmPassword
        ? { message: 'Las contraseñas no coinciden' }
        : null,
        type: type === null ? { message: 'Debe seleccionar un tipo' } : null,
        };

        setErrors(newErrors);

                if (newErrors.password?.message === 'La contraseña debe tener al menos 8 caracteres') {
            Swal.fire({
                icon: 'warning',
                title: 'Contraseña inválida',
                text: 'La contraseña debe tener al menos 8 caracteres.'
            });
            return;
        }


        if (newErrors.confirmPassword?.message === 'Las contraseñas no coinciden') {
            Swal.fire({
                icon: 'warning',
                title: 'Confirmación incorrecta',
                text: 'Las contraseñas no coinciden.'
            });
            return;
        }

        if (Object.values(newErrors).some(error => error !== null)) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.'
            });
            return;
        }

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            type
        },{
            withCredentials: true
        })
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Su cuenta ha sido registrada exitosamente. Ahora puede iniciar sesión.',
                confirmButtonText: 'Ir a Iniciar Sesión'
            }).then(() => {
                navigate("/iniciar-sesion");
            });
        })
        .catch(err => {
            console.log("Status recibido:", err.response.status);
            console.log("Mensaje recibido:", err.response.data.message);
            console.log('err.response:', err.response);
            if (err.response) {
                if (err.response.status === 400 && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de validación',
                        text: 'Revise los campos del formulario.'
                    });
                } else if (err.response.status === 409 && err.response.data.message?.includes("Correo ya registrado")) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Correo ya registrado',
                        text: 'El correo electrónico ingresado ya está en uso.',
                    });
                } else if (err.response.data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.message
                    });
                } else {
                    console.error("Error inesperado:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error inesperado',
                        text: 'Ocurrió un error. Intente nuevamente más tarde.',
                    });
                }
            } else {
                console.error("Error inesperado:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: 'Ocurrió un error. Intente nuevamente más tarde.',
                });
            }
        });
    }

    return (
        <div className='cuenta'>
            <div className='row1'>
                <div className='col-8'>
                    <h2 className='cuenta-tit'>Crear una cuenta</h2>
                    <form onSubmit={registro}>
                        <div className='form-group mb-3'>
                            <label htmlFor="firstName">Nombre:</label>
                            <input type="text" name="firstName" id="firstName" className={`form-control mb-2 ${errors.firstName ? 'input-error' : ''}`}
                            value={firstName} onChange={(e) => {setFirstName(e.target.value);
                                if (errors.firstName) setErrors(prev => ({ ...prev, firstName: null })); 
                                }}/>
                            {errors.firstName && <small className="error-text">{errors.firstName.message}</small>}
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='lastName'>Apellido:</label>
                            <input type="text" name="lastName" id="lastName" className={`form-control mb-2 ${errors.lastName ? 'input-error' : ''}`}
                            value={lastName} onChange={(e) => {setLastName(e.target.value);
                                if (errors.lastName) setErrors(prev => ({ ...prev, lastName: null })); 
                                }}/>
                            {errors.lastName && <small className="error-text">{errors.lastName.message}</small>}
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='email'>Email:</label>
                            <input type="text" name="email" id="email" className={`form-control mb-2 ${errors.email ? 'input-error' : ''}`}
                            value={email} onChange={(e) => {setEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: null })); 
                                }}/>
                            {errors.email && <small className="error-text">{errors.email.message}</small>}
                        </div>
                        <div className='form-group4 mb-3'>
                            <label>Tipo:</label>
                            <select
                            name="type" className={`form-control mb-2 ${errors.type ? 'input-error' : ''}`}
                            value={type === null ? "DEFAULT" : type.toString()}
                            onChange={e => {
                                const value = e.target.value;
                                setType(value === 'true' ? true : value === 'false' ? false : null);
                                if (errors.type) setErrors(prev => ({ ...prev, type: null }));
                            }}
                            >
                            <option value="DEFAULT" disabled>Seleccione uno</option>
                            <option value="true">Cliente</option>
                            <option value="false">Emprendedor</option>
                            </select>
                            {errors.type && <small className="error-text">{errors.type.message}</small>}
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='password'>Contraseña:</label>
                            <input type="password" name="password" id="password" className={`form-control mb-2 ${errors.password ? 'input-error' : ''}`}
                            value={password} onChange={(e) => {setPassword(e.target.value);
                                if (errors.password) setErrors(prev => ({ ...prev, password: null })); 
                                }}/>
                            {errors.password && <small className="error-text">{errors.password.message}</small>}
                        </div>
                        <div className='form-group mb-4'>
                            <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" className={`form-control mb-2 ${errors.confirmPassword ? 'input-error' : ''}`}
                            value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: null })); 
                                }}/>
                            {errors.confirmPassword && <small className="error-text">{errors.confirmPassword.message}</small>}
                        </div>
                        <input type="submit" value="Registrarme" id="regis" className='btn btn-success mb-3' />
                    </form>
                </div>
                <p className='ya'>¿Ya tienes una cuenta?<Link to="/iniciar-sesion" className='link'>Iniciar Sesión</Link></p>
            </div>
        </div>
    );
}

export default CrearCuenta;