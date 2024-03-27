import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import swal from 'sweetalert';
import { addUser } from '../servicios/authService';
import { useForm } from 'react-hook-form';
import LoginForm from './loginform'; 

const Login = () => {
  const { handleSubmit, register, formState: { errors }, getValues } = useForm();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [botonHabilitado, setBotonHabilitado] = useState(false);

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

  const registroExitoso = () => {
    swal({
      title: "¡Registro Exitoso!",
      text: "Ahora puedes ingresar con tu nueva cuenta",
      icon: "success",
      buttons: false,
      timer: 2000
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const res = await addUser(data);
    console.log(res);
    registroExitoso();
  };

  return (
    <div className="main">
      <h1 className="titulo">Agro Smart Tech</h1>
      <div className="caja">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            <input
              type="text"
              name="txt"
              {...register("username", { required: true })}
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
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;
