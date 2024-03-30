import React from 'react';
import { useForm } from 'react-hook-form';
  // import { useHistory } from 'react-router-dom';

function PantallaPez() {
  const { register, handleSubmit } = useForm();
  // const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    // history.push('/cultivo');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Elegir tipo de pez:</label>
        <select {...register("pez")}>
          <option value="trucha">Trucha</option>
          <option value="tilapia">Tilapia</option>
        </select>
      </div>
      <button type="submit">Siguiente</button>
    </form>
  );
}

export default PantallaPez;
