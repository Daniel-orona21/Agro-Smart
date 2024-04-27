import React from 'react';
import { useForm } from 'react-hook-form';
import { addpez } from '../servicios/compService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../css/forms.css';


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
        <div className='main1'>
        <h1 className="titulo1">Agro Smart Tech</h1>
        <div className="caja1">
            <h2 className='tituloForms'>Elegir tipo de pez:</h2>  
            <select className='opciones' {...register("tipo")}>
                <option value="trucha">Trucha</option>
                <option value="tilapia">Tilapia</option>
            </select>
            <input className='cantidades' type="number"  placeholder="Cantidad" {...register("cantidad", { required: true })} />
            <button className='buttonPez' type="submit">Siguiente</button>
        </div>
        </div>
    </form>
);
}

export default PantallaPez;