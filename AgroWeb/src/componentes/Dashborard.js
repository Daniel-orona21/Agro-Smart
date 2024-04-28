import React from 'react'
import '../css/dash.css';
import semaforo1 from '../img/semaforo1.png';
import semaforo2 from '../img/semaforo2.png';
import semaforo3 from '../img/semaforo3.png';
import bien from '../img/bien.png';
import mal from '../img/mal.png';


//Semaforo para ph
const semaforoPH = (nPH) => {
  nPH = Math.round(nPH);
  if (nPH >= 6 && nPH <= 8) {
    return semaforo1;
  } else if ((nPH >= 3 && nPH <= 6) || (nPH >= 8 && nPH <= 9)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para temperatura del agua
const aguaTemperatura = (temperatura) => {
  if (temperatura >= 20 && temperatura <= 35) {
    return semaforo1;
  } else if ((temperatura >= 13 && temperatura < 19) || (temperatura > 36 && temperatura <= 40)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//Semaforo para Ambiente
const ambiente = (temperaturaAmbiente) => {
  if (temperaturaAmbiente >= 15 && temperaturaAmbiente <= 35) {
    return semaforo1;
  } else if ((temperaturaAmbiente >= 5 && temperaturaAmbiente <= 14) || (temperaturaAmbiente > 35 && temperaturaAmbiente <= 40)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para Nivel
const tanque = (nivel) => {
  if (nivel === 'Lleno') {
    return semaforo1;
  } else if (nivel === 'Medio') {
    return semaforo2;
  } else {
    return semaforo3;
  }
};

//semaforo para humedad
const humedadS = (humedadConstante) => {
  if (humedadConstante >= 0 && humedadConstante <= 45) {
    return semaforo1;
  } else if ((humedadConstante >= 40 && humedadConstante < 50) || (humedadConstante > 55 && humedadConstante <= 80)) {
    return semaforo2;
  } else {
    return semaforo3;
  }
};


//estado del sistema
const sistema = (estado) => {
  let estadoImg, estadoTexto;
  if (estado === 'ok') {
    estadoImg = bien;
    estadoTexto = 'Conectado';
  } else {
    estadoImg = mal;
    estadoTexto = 'Desconectado';
  }
  return { img: estadoImg, texto: estadoTexto };
};



export const Dashborard = ({ nPH, temperatura, temperaturaAmbiente, nivel, humedadConstante, estado }) => {
  // console.log(nPH,temperatura,temperaturaAmbiente,nivel,humedadConstante,estado)
  const { img: estadoImg, texto: estadoTexto } = sistema(estado);
  return (
    <div className='dashboard'>
      <p className='titulo2'>INVERNADERO</p>

      <div className='datosDash'>
        <div className='datos'>
          <div className='box'>
            <p className='boxTitulo1'>Nivel de ph:</p>
            <p className='boxTitulo2'>{Math.round(nPH)}</p>
            <img src={semaforoPH(nPH)} alt="semaforo" className="semaforo" />
          </div>

          <div className='box'>
            <p className='boxTitulo1'>Temparetura en Agua</p>
            <p className='boxTitulo2'>{temperatura}°C</p>
            <img src={aguaTemperatura(temperatura)} alt="semaforo" className="semaforo" />
          </div>
          <div className='box'>
            <p className='boxTitulo1'>Temparetura ambiente</p>
            <p className='boxTitulo2'>{temperaturaAmbiente}°C</p>
            <img src={ambiente(temperaturaAmbiente)} alt="semaforo" className="semaforo" />
          </div>
          <div className='box'>
            <p className='boxTitulo1'>Nivel del Agua</p>
            <p className='boxTitulo2'>{nivel}</p>
            <img src={tanque(nivel)} alt="semaforo" className="semaforo" />
          </div>
          <div className='box'>
            <p className='boxTitulo1'>Humedad</p>
            <p className='boxTitulo2'>{humedadConstante}%</p>
            <img src={humedadS(humedadConstante)} alt="semaforo" className="semaforo" />
          </div>
          <div className='box'>
            <p className='boxTitulo1'>Estado de Sistema</p>
            <img src={estadoImg} alt="sistema" className="sistema" />
            <p className='boxTitulo3'>{estadoTexto}</p>
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

export { semaforoPH };
export { aguaTemperatura };
export { ambiente };
export { tanque };
export { humedadS };

