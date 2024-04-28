import React, { useState, useEffect } from 'react';
import '../css/login.css';
import { addUser } from '../servicios/authService';
import { useForm } from 'react-hook-form';
import LoginForm from './loginform';
import { useNavigate } from 'react-router-dom';
import ops from '../componentes/sweet.js'
const Login = ({ desplazarCaja }) => {
    const { handleSubmit, register, formState: { errors }, getValues } = useForm();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const navigate = useNavigate(); // Obtiene la función de navegación

    useEffect(() => {
        // Agregar la etiqueta viewport al head del documento
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'viewport');
        metaTag.setAttribute('content', 'width=device-width, initial-scale=1.0');
        document.head.appendChild(metaTag);

        // Limpiar la etiqueta viewport cuando el componente se desmonte
        return () => {
            document.head.removeChild(metaTag);
        };
    }, []);

    useEffect(() => {
        setBotonHabilitado(
            nombre !== '' &&
            validarEmail(email) &&
            contraseña !== '' &&
            contraseña === confirmarContraseña
        );
    }, [nombre, email, contraseña, confirmarContraseña]);

    const validarEmail = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const res = await addUser(data);
            console.log(res);
            navigate(`/Seleccion-pez?usuario=${data.usuario}`);

        } catch (error) {
            ops()
        }
    };

    return (
        <div>
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="signup">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="chk" aria-hidden="true">Registrarse</label>
                    <input
                        type="text"
                        name="txt"
                        {...register("usuario", { required: true })}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                        className={errors.username ? 'error' : ''}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        {...register("email", { required: true })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        className={errors.email ? 'error' : ''}
                        required
                    />
                    <input
                        type="password"
                        name="pswd"
                        {...register("password", { required: true })}
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        placeholder="Contraseña"
                        className={errors.password ? 'error' : ''}
                        required
                    />
                    <input
                        type="password"
                        name="confirmarPswd"
                        {...register("confirmPassword", {
                            required: true,
                            validate: value => value === getValues("password") || "Las contraseñas no coinciden"
                        })}
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        placeholder="Confirmar contraseña"
                        className={errors.confirmPassword ? 'error' : ''}
                        required
                    />
                    <button className='button2' type="submit" aria-hidden="true" disabled={!botonHabilitado}>Registrarse</button>
                </form>
            </div>
            <LoginForm />
        </div>
    );
};

export default Login;