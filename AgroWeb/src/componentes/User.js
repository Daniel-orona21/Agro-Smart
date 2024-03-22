import React from 'react';
import swal from 'sweetalert';
import '../css/user.css';

export const User = () => {
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
        <p className='letraslogo'>JD</p>
      </div>
      <p className='username'>Juan Diaz</p>
      <p className='usermail'>juan@gmail.com</p>
      <button onClick={alertaSesion} className='volver'>Cerrar Sesión</button>
    </div>
  );
};
