import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { addsensor } from '../servicios/compService';
import { addinvernadero } from '../servicios/compService';
function PantallaCultivo() {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usuario = queryParams.get('usuario');
  const pez = queryParams.get('pez');

  const onSubmit = async (data) => {
    const nombreInvernadero = data.name; 
    const datos={...data, usuario:usuario, pez:pez  }
    console.log(datos);
    const res = await addinvernadero(datos);
    console.log(res)
    const datosensor ={pez:pez,usuario:usuario,invernadero:nombreInvernadero}
    navigate('/home-screen')
    sensores(datosensor)
    // Aquí puedes hacer lo que quieras con los datos, como enviarlos al servidor, etc.
  };
  const sensores = async (datosensor) =>{
    const res= await addsensor(datosensor)
  }
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
