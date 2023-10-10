import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import "./CrearCuenta.css"

function CrearCuenta() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // Accede a las props pasadas desde IniciarSesion.js

    const registro = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        })
            .then(res => navigate("/crearsitio"))
            .catch(err => setErrors(err.response.data.errors));
    }

    return (
        <div className='cuenta'>
            <div className='row1'>
                <div className='col-8'>
                    <h2 className='cuenta-tit'>Crear una cuenta</h2>
                    <form onSubmit={registro}>
                        <div className='form-group'>
                            <label htmlFor="firstName">Nombre:</label>
                            <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName ? <span className='text-danger'>{errors.firstName.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastName'>Apellido:</label>
                            <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName ? <span className='text-danger'>{errors.lastName.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email ? <span className='text-danger'>{errors.email.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Contraseña:</label>
                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password ? <span className='text-danger'>{errors.password.message}</span> : null}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirmar Contraseña:</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" className="form-control mb-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            {errors.confirmPassword ? <span className='text-danger'>{errors.confirmPassword.message}</span> : null}
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