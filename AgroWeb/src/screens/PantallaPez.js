import React from 'react';
import { useForm } from 'react-hook-form';
import { addpez } from '../servicios/compService';
import { useLocation } from 'react-router-dom';
  // import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function PantallaPez() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usuario = queryParams.get('usuario');

  const onSubmit = async (data) => {
    // Agregar el nombre de usuario a los datos antes de enviarlos
    const datosConUsuario = { ...data, usuario: usuario };
    console.log(datosConUsuario);
    const res = await addpez(datosConUsuario);
    console.log(res);
    navigate(`/Seleccion-cultivo?usuario=${encodeURIComponent(usuario)}&pez=${encodeURIComponent(data.tipo)}`);


  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Elegir tipo de pez:</label>
        <select {...register("tipo")}>
          <option value="trucha">Trucha</option>
          <option value="tilapia">Tilapia</option>
        </select>
        <input type="number"  placeholder="cantidad" {...register("cantidad", { required: true })} />
        
      </div>
      <button type="submit">Siguiente</button>
    </form>
  );
}

export default PantallaPez;
