import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import { addinvernadero } from '../servicios/compService';
function PantallaCultivo() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usuario = queryParams.get('usuario');
  const pez = queryParams.get('pez');

  const onSubmit = async (data) => {
    const datos={...data, usuario:usuario, pez:pez  }
    console.log(datos);
    const res = await addinvernadero(datos);
    console.log(res)
    navigate('/home-screen')
    // Aquí puedes hacer lo que quieras con los datos, como enviarlos al servidor, etc.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Elegir tipo de cultivo:</label>
        <select {...register("cultivo")}>
          <option value="lechuga">Lechuga</option>
          <option value="chile">Chile</option>
        </select>
        <input type="number"  placeholder="cantidad" {...register("capacidad", { required: true })} />
        <input type="text"  placeholder="Nombre de tu invernadero" {...register("name", { required: true })} />
      
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default PantallaCultivo;
