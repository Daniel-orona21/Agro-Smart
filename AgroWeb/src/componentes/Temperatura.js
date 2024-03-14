import React from 'react';
import { aguaTemperatura, ambiente } from './Dashborard';
import '../css/home.css';
import descargando from '../img/descargando.png';
import { temperatura, temperaturaAmbiente } from './datos';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ambienteData = [
  { hour: '00:00', Temperatura: 22 },
  { hour: '01:00', Temperatura: 23 },
  { hour: '02:00', Temperatura: 24 },
  { hour: '03:00', Temperatura: 24 },
  { hour: '04:00', Temperatura: 24 },
  { hour: '05:00', Temperatura: 24 },
  { hour: '06:00', Temperatura: 25 },
  { hour: '07:00', Temperatura: 26 },
  { hour: '08:00', Temperatura: 25 },
  { hour: '09:00', Temperatura: 25 },
  { hour: '10:00', Temperatura: 26 },
  { hour: '11:00', Temperatura: 27 },
  { hour: '12:00', Temperatura: 27 },
  { hour: '13:00', Temperatura: 27 },
  { hour: '14:00', Temperatura: 27 },
  { hour: '15:00', Temperatura: 27 },
  { hour: '16:00', Temperatura: 26 },
  { hour: '17:00', Temperatura: 26 },
  { hour: '18:00', Temperatura: 26 },
  { hour: '19:00', Temperatura: 27 },
  { hour: '20:00', Temperatura: 26 },
  { hour: '21:00', Temperatura: 25 },
  { hour: '22:00', Temperatura: 24 },
  { hour: '23:00', Temperatura: 22 },
];


const promedio = [
  { dia: 'Lunes', promedio: 25 },
  { dia: 'Martes', promedio: 26 },
  { dia: 'Miercoles', promedio: 26 },
  { dia: 'Jueves', promedio: 24 },
  { dia: 'Viernes', promedio: 24 },
  { dia: 'Sabado', promedio: 23 },
  { dia: 'Domingo', promedio: 24 },

];






const aguaData = [
  { hour: '00:00', Temperatura: 14 },
  { hour: '01:00', Temperatura: 15 },
  { hour: '02:00', Temperatura: 14 },
  { hour: '03:00', Temperatura: 15 },
  { hour: '04:00', Temperatura: 17 },
  { hour: '05:00', Temperatura: 15 },
  { hour: '06:00', Temperatura: 15 },
  { hour: '07:00', Temperatura: 14 },
  { hour: '08:00', Temperatura: 13 },
  { hour: '09:00', Temperatura: 16 },
  { hour: '10:00', Temperatura: 18 },
  { hour: '11:00', Temperatura: 18 },
  { hour: '12:00', Temperatura: 19 },
  { hour: '13:00', Temperatura: 20 },
  { hour: '14:00', Temperatura: 23 },
  { hour: '15:00', Temperatura: 24 },
  { hour: '16:00', Temperatura: 21 },
  { hour: '17:00', Temperatura: 20 },
  { hour: '18:00', Temperatura: 18 },
  { hour: '19:00', Temperatura: 17 },
  { hour: '20:00', Temperatura: 17 },
  { hour: '21:00', Temperatura: 16 },
  { hour: '22:00', Temperatura: 15 },
  { hour: '23:00', Temperatura: 14 },
];


const promedio2 = [
  { dia: 'Lunes', promedio: 20 },
  { dia: 'Martes', promedio: 23 },
  { dia: 'Miercoles', promedio: 17 },
  { dia: 'Jueves', promedio: 19 },
  { dia: 'Viernes', promedio: 20 },
  { dia: 'Sabado', promedio: 21 },
  { dia: 'Domingo', promedio: 22 },

];

export const  Temperatura = () => {
  return (
    <div>
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo4'>TEMPERATURA AMBIENTE</p>
      <div>
      <h1>A lo largo del día</h1>


      <div style={{ width: '750px',  }}>
        <LineChart
          width={750}
          height={300}
          data={ambienteData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temperatura" stroke="#8884d8" name="°C" />
        </LineChart>
      </div>

      <h1>Promedio diario</h1>


      <div style={{ width: '750px',  marginTop: '20px' }}>
        <LineChart
          width={750}
          height={300}
          data={promedio}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="promedio" stroke="#82ca9d" name="Promedio" />
        </LineChart>
      </div>
    </div>
      </div>

      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>Temparetura ambiente</p>
               <p className='boxTitulo2'>{temperaturaAmbiente}°C</p>
            <img src={ambiente()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Informe</p>
               <img src={descargando} alt="sistema" className="sistema" />
               <p className='boxTitulo3'>Download</p>
        </div>
      </div>
    </div>






    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo5'>TEMPERATURA DEL AGUA</p>
      <div>
      <h1>A lo largo del día</h1>


      <div style={{ width: '750px',  }}>
        <LineChart
          width={750}
          height={300}
          data={aguaData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temperatura" stroke="#8884d8" name="°C" />
        </LineChart>
      </div>

      <h1>Promedio diario</h1>


      <div style={{ width: '750px',  marginTop: '20px' }}>
        <LineChart
          width={750}
          height={300}
          data={promedio2}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="promedio" stroke="#82ca9d" name="Promedio" />
        </LineChart>
      </div>
    </div>
      </div>

      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>Temparetura en Agua</p>
               <p className='boxTitulo2'>{temperatura}°C</p>
            <img src={aguaTemperatura()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Informe</p>
               <img src={descargando} alt="sistema" className="sistema" />
               <p className='boxTitulo3'>Download</p>
        </div>
      </div>
    </div>
    </div>
  );
};


