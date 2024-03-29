import React from 'react';
import { useForm } from 'react-hook-form';

function PantallaCultivo() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default PantallaCultivo;
