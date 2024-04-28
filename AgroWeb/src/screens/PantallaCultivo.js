import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css';
import swal from 'sweetalert';
import { addsensor } from '../servicios/compService';
import { addinvernadero } from '../servicios/compService';
function PantallaCultivo() {


  const registroExitoso = () => {
    swal({
      title: "¡Registro Exitoso!",
      text: "Ahora puedes ingresar con tu nueva cuenta",
      icon: "success",
      buttons: false,
      timer: 2000
    });
  };

  const navigate = useNavigate(); // Obtiene la función de navegación

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usuario = queryParams.get('usuario');
  const pez = queryParams.get('pez');


  const onSubmit = async (data) => {
    const invernadero = data.name
    const datos = { ...data, usuario: usuario, pez: pez }
    console.log(datos);
    const res = await addinvernadero(datos);
    console.log(res)
    sensor(usuario, pez, invernadero)
    registroExitoso();
    navigate('/')
    // Aquí puedes hacer lo que quieras con los datos, como enviarlos al servidor, etc.
  };

  const sensor = async (usuario, pez, invernadero) => {
    let datosi = {
      usuario: usuario,
      pez: pez,
      invernadero: invernadero
    }
    console.log(datosi)
    const res = await addsensor(datosi)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='main1'>
        <h1 className="titulo1">Agro Smart Tech</h1>
        <div className="caja1">
          <h2 className='tituloForms'>Elegir tipo de Cultivo:</h2>
          <select className='opciones' {...register("cultivo")}>
            <option value="lechuga">Lechuga</option>
            <option value="chile">Chile</option>
          </select>

          <input className='cantidades' type="number" placeholder="cantidad" {...register("capacidad", { required: true })} />
          <input className='cantidades' type="text" placeholder="Nombre de tu invernadero" {...register("name", { required: true })} />

          <button className='buttonPez' type="submit">Enviar</button>
        </div>
      </div>
    </form>
  );
}

export default PantallaCultivo;