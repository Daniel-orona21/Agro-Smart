import React from 'react'
import '../css/dash.css';

import semaforo1 from '../img/semaforo1.png';
import semaforo2 from '../img/semaforo2.png';
import semaforo3 from '../img/semaforo3.png';
import bien from '../img/bien.png';
import mal from '../img/mal.png';

import { estado, humedadConstante, nPH, nivel, temperatura, temperaturaAmbiente } from './datos';

//Semaforo para ph
const semaforoPH = () => {
  if (nPH >= 6 && nPH <= 8) {
    return semaforo1;
  } else if ((nPH >= 3 && nPH <= 6) || (nPH >= 8 && nPH <= 9)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para temperatura del agua
const aguaTemperatura = () => {
  if (temperatura >= 18 && temperatura <= 24) {
    return semaforo1;
  } else if ((temperatura >= 2 && temperatura < 18) || (temperatura > 24 && temperatura <= 32)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//Semaforo para Ambiente
const ambiente = () => {
  if (temperaturaAmbiente >= 18 && temperaturaAmbiente <= 24) {
    return semaforo1;
  } else if ((temperaturaAmbiente >= 15 && temperaturaAmbiente <= 17) || (temperaturaAmbiente > 24 && temperaturaAmbiente <= 27)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para Nivel
const tanque = () => {
  if (nivel === 'Lleno') {
    return semaforo1;
  } else if (nivel === 'Medio') {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para humedad
const humedadS = () => {
  if (humedadConstante >= 60 && humedadConstante <= 70) {
    return semaforo1;
  } else if ((humedadConstante >= 50 && humedadConstante < 60) || (humedadConstante > 70 && humedadConstante <= 80)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//estado del sistema
const sistema = () => {
  if (estado === 'ok') {
    return bien;
  } else {
    return mal;
  }
};


export const Dashborard = () => {
  return (
    <div className='dashboard'>
      <p className='titulo2'>INVERNADERO</p>

      <div className='datosDash'>
      <div className='datos'>
        <div className='box'>
               <p className='boxTitulo1'>Nivel de ph:</p>
               <p className='boxTitulo2'>{nPH}</p>
            <img src={semaforoPH()} alt="semaforo" className="semaforo" />
        </div>

        <div className='box'>
               <p className='boxTitulo1'>Temparetura en Agua</p>
               <p className='boxTitulo2'>{temperatura}°C</p>
            <img src={aguaTemperatura()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Temparetura ambiente</p>
               <p className='boxTitulo2'>{temperaturaAmbiente}°C</p>
            <img src={ambiente()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Nivel del Agua</p>
               <p className='boxTitulo2'>{nivel}</p>
            <img src={tanque()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Humedad</p>
               <p className='boxTitulo2'>{humedadConstante}%</p>
            <img src={humedadS()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Estado de Sistema</p>
               <img src={sistema()} alt="sistema" className="sistema" />
               <p className='boxTitulo3'>Conexion a BD</p>
        </div>
      </div>

      <div className='recomendaciones'>
    <p className='tituloR'>Recomendaciones ✅</p>
    <div className='contenidoR'>
        <ul>
            <li>
                <strong>Temperatura:</strong> Mantén la temperatura dentro del invernadero entre 18°C y 24°C para proporcionar un entorno favorable para el crecimiento de las plantas.
            </li>
            <li>
                <strong>Humedad:</strong> Ajusta la humedad alrededor del 70% para crear condiciones ideales, especialmente durante la fase de germinación y crecimiento inicial de las plantas.
            </li>
            <li>
                <strong>Temperatura para Peces Trucha:</strong> Si tienes un sistema acuapónico con peces trucha, asegúrate de que la temperatura del agua se encuentre entre 10°C y 24°C para un cultivo saludable.
            </li>
            <li>
                <strong>pH para Peces Trucha:</strong> Monitorea y ajusta el pH del agua entre 6.5 y 7.5 para garantizar un ambiente óptimo para los peces.
            </li>
            <li>
                <strong>Iluminación:</strong> Proporciona iluminación adecuada, preferiblemente luz natural complementada con luces artificiales, para alcanzar al menos 12 horas de luz al día, estimulando así el crecimiento de las plantas.
            </li>
            <li>
                <strong>Control de Plagas:</strong> Implementa un programa de control de plagas preventivo y orgánico para proteger las plantas sin comprometer la calidad y seguridad alimentaria.
            </li>
            <li>
                <strong>Riego:</strong> Ajusta el riego de acuerdo con las necesidades específicas de las plantas, evitando tanto la sequedad como el exceso de humedad en el sustrato.
            </li>
            <li>
                <strong>Fertilización:</strong> Utiliza fertilizantes orgánicos o soluciones nutritivas adecuadas para mantener un equilibrio nutricional en el sustrato.
            </li>
            <li>
                <strong>Ventilación:</strong> Asegúrate de una buena circulación de aire dentro del invernadero para evitar problemas de humedad y enfermedades.
            </li>

        </ul>
    </div>
</div>


      </div>
    </div>
  )
}

export {semaforoPH};
export {aguaTemperatura};
export {ambiente};
export {tanque};
export {humedadS};

