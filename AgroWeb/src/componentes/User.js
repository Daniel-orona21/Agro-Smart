import React from 'react';
import swal from 'sweetalert';
import '../css/user.css';

export const User = ({ username, userEmail }) => {
  const alertaSesion = () => {
    swal({
      title: "¿Cerrar la sesión de tu cuenta?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          className: "botonCancelar",
          value: null,
          visible: true
        },
        confirm: {
          text: "Confirmar",
          className: "botonConfirmar",
          value: true,
          visible: true
        }
      },
    }).then((value) => {
      if (value) {
        window.location.href = "/";
      } else {
 
      }
    });
  };

  return (
    <div className='usuarioCuerpo'>
      <div className='logoUser'>
        <p className='letraslogo'>{username.charAt(0).toUpperCase()}</p> {/* Solo la primera letra del nombre de usuario */}
      </div>
      <p className='username'>{username}</p> {/* Mostrar el nombre de usuario */}
      <p className='usermail'>{userEmail}</p> {/* Mostrar el correo electrónico */}
      <button onClick={alertaSesion} className='volver'>Cerrar Sesión</button>
    </div>
  );
};
