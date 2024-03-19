import '../css/login.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { addUser } from '../servicios/authService';
import LoginForm from './loginform'; 

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await addUser(data);
    console.log(res);
  };

  return (
    <div className="main">    
      <p className="titulo">Agro Smart Tech</p>

      <div className="caja">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            <input type="text" name="txt" placeholder="Nombre de usuario" {...register("username", { required: true })} />
            <input type="text" name="email" placeholder="Correo electrónico" {...register("email", { required: true })} />
            <input type="text" name="pswd" placeholder="Contraseña" {...register("password", { required: true })} />
            <button type="button" onClick={handleSubmit(onSubmit)}>Registrarse</button> 
          </form>
        </div>

        {/* Aquí importamos y usamos el componente LoginForm */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
