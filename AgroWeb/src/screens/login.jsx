import '../css/login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addUser } from '../servicios/authService'
// Crea un componente funcional para tu barra de navegación deslizante
const Login = () => {

  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res =await addUser(data);
    console.log(res);
  };

  return (
    <div className="main">    
      <p className="titulo">Agro Smart Tech</p>

      <div className="caja">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            
            <input type="text" name="txt" placeholder="Nombre de usuario"{...register("username", { required: true })} />
            <input type="text" name="email" placeholder="Correo electrónico"{...register("email", { required: true })} />
            <input type="text" name="pswd" placeholder="Contraseña"{...register("password", { required: true })} />
            <button type="submit">Registrarse</button> 
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">Iniciar Sesión</label>
            <input type="email" name="email" placeholder="Correo electrónico" required="" />
            <input type="password" name="pswd" placeholder="Contraseña" required="" />
            <Link to="/home-screen" className='button'>Iniciar Sesión</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
