import React from 'react';
import { Link } from 'react-router-dom';
import '../css/user.css';

export const User = () => {
  return (
    <div className='usuarioCuerpo'>
      <div className='logoUser'>
        <p className='letraslogo'>JD</p>
      </div>
      <p className='username'>Juan Diaz</p>
      <p className='usermail'>juan@gmail.com</p>
      <Link className='volver' to="/">Cerrar Sesión</Link>
    </div>
  );
};


