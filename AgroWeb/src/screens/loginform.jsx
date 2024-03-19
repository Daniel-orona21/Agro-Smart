import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../servicios/authService';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate(); // Obtiene la función de navegación

  const onSubmitlogin = async (data) => {
    console.log(data);
    const res = await loginUser(data);
    console.log(res);
    if (res) {
      console.log("Usuario logeado");
      navigate('/home-screen'); // Redirige al usuario a la pantalla home-screen
    }
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">Iniciar Sesión</label>
        <input type="text" name="email" placeholder="Correo electrónico" {...register("email", { required: true })} />
        <input type="text" name="password" placeholder="Contraseña" {...register("password", { required: true })} />
        <button type="button" onClick={handleSubmit(onSubmitlogin)}>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
