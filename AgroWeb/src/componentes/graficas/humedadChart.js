import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HumedadChart = () => {
  const humedadData = [
    { hour: '00:00', Humedad: 39 },
    { hour: '01:00', Humedad: 35 },
    { hour: '02:00', Humedad: 42 },
    { hour: '03:00', Humedad: 55 },
    { hour: '04:00', Humedad: 50 },
    { hour: '05:00', Humedad: 55 },
    { hour: '06:00', Humedad: 64 },
    { hour: '07:00', Humedad: 60 },
    { hour: '08:00', Humedad: 60 },
    { hour: '09:00', Humedad: 55 },
    { hour: '10:00', Humedad: 65 },
    { hour: '11:00', Humedad: 70 },
    { hour: '12:00', Humedad: 72 },
    { hour: '13:00', Humedad: 68 },
    { hour: '14:00', Humedad: 65 },
    { hour: '15:00', Humedad: 73 },
    { hour: '16:00', Humedad: 64 },
    { hour: '17:00', Humedad: 53 },
    { hour: '18:00', Humedad: 52 },
    { hour: '19:00', Humedad: 53 },
    { hour: '20:00', Humedad: 48 },
    { hour: '21:00', Humedad: 47 },
    { hour: '22:00', Humedad: 41 },
    { hour: '23:00', Humedad: 38 },
  ];


  const promedio = [
    { dia: 'Lunes', promedio: 58 },
    { dia: 'Martes', promedio: 71 },
    { dia: 'Miercoles', promedio: 57 },
    { dia: 'Jueves', promedio: 70 },
    { dia: 'Viernes', promedio: 64 },
    { dia: 'Sabado', promedio: 63 },
    { dia: 'Domingo', promedio: 72 },

  ];

  return (
    <div>
      <h1>Porcentaje a lo largo del día</h1>


      <div style={{ width: '750px',  }}>
        <LineChart
          width={750}
          height={300}
          data={humedadData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Humedad" stroke="#8884d8" name="%" />
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
  );
};

export default HumedadChart;
