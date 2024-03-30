import React from 'react';
import { useForm } from 'react-hook-form';
import { addpez } from '../servicios/authService';
import { useLocation } from 'react-router-dom';
  // import { useHistory } from 'react-router-dom';

function PantallaPez() {
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  const onSubmit = async (data) => {
    console.log(data +"usuario: " + username);
    const res = await addpez(data);
    console.log(res)
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
