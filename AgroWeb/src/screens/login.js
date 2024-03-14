import '../css/login.css';
import React from 'react';
import { Link } from 'react-router-dom';


// Crea un componente funcional para tu barra de navegación deslizante
const Login = () => {
  return (
    <div className="main">
    
    
      <p className="titulo">Agro Smart Tech</p>

    <div className="caja">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true">Registrarse</label>
          <input type="text" name="txt" placeholder="Nombre de usuario" required="" />
          <input type="email" name="email" placeholder="Correo electrónico" required="" />
          <input type="password" name="pswd" placeholder="Contraseña" required="" />
          <button>Registrarse</button>
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
