import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import swal from 'sweetalert'

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [errores, setErrores] = useState({
    nombre: false,
    email: false,
    contraseña: false,
    confirmarContraseña: false
  });

  const registroExitoso = () => {
    swal({
      title: "¡Registro Exitoso!",
      text: "Ahora puedes ingresar con tu nueva cuenta",
      icon: "success",
      buttons: false,
      timer: 2000
    });
      
  };

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

  const handleSubmit = (e) => {
    e.preventDefault(); 
    registroExitoso();
    // logica para enviar los datos del formulario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'txt') {
      setNombre(value);
      setErrores({ ...errores, nombre: value === '' });
    } else if (name === 'email') {
      setEmail(value);
      setErrores({ ...errores, email: !validarEmail(value) });
    } else if (name === 'pswd') {
      setContraseña(value);
      setErrores({ ...errores, contraseña: value === '' });
    } else if (name === 'confirmarPswd') {
      setConfirmarContraseña(value);
      setErrores({ ...errores, confirmarContraseña: value !== contraseña });
    }
  };

  return (
    <div className="main">
      <h1 className="titulo">Agro Smart Tech</h1>
      <div className="caja">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">Registrarse</label>
            <input
              type="text"
              name="txt"
              value={nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className={errores.nombre ? 'error' : ''}
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className={errores.email ? 'error' : ''}
              required
            />
            <input
              type="password"
              name="pswd"
              value={contraseña}
              onChange={handleChange}
              placeholder="Contraseña"
              className={errores.contraseña ? 'error' : ''}
              required
            />
            <input
              type="password"
              name="confirmarPswd"
              value={confirmarContraseña}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              className={errores.confirmarContraseña ? 'error' : ''}
              required
            />
            <button className='button2' type="submit" aria-hidden="true" disabled={!botonHabilitado}>Registrarse</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk">Iniciar Sesión</label>
            <input type="email" name="email" placeholder="Correo electrónico" required="" />
            <input type="password" name="pswd" placeholder="Contraseña" required="" />
            <Link to="/home-screen" className='button1'>Iniciar Sesión</Link>
          </form>
        </div>  
      </div>
    </div>
  );
};

export default Login;
