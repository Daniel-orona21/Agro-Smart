import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PhChart = () => {
  const dataPh = [
    { hour: '00:00', pH: 6 },
    { hour: '01:00', pH: 7 },
    { hour: '02:00', pH: 5 },
    { hour: '03:00', pH: 8 },
    { hour: '04:00', pH: 7 },
    { hour: '05:00', pH: 6 },
    { hour: '06:00', pH: 8 },
    { hour: '07:00', pH: 7 },
    { hour: '08:00', pH: 6 },
    { hour: '09:00', pH: 7 },
    { hour: '10:00', pH: 7.5 },
    { hour: '11:00', pH: 8 },
    { hour: '12:00', pH: 7 },
    { hour: '13:00', pH: 6 },
    { hour: '14:00', pH: 6.5 },
    { hour: '15:00', pH: 7 },
    { hour: '16:00', pH: 8 },
    { hour: '17:00', pH: 8.1 },
    { hour: '18:00', pH: 7.5 },
    { hour: '19:00', pH: 7.5 },
    { hour: '20:00', pH: 7 },
    { hour: '21:00', pH: 7 },
    { hour: '22:00', pH: 8 },
    { hour: '23:00', pH: 8.3 },
  ];


  const promedio = [
    { dia: 'Lunes', promedio: 6 },
    { dia: 'Martes', promedio: 6.5 },
    { dia: 'Miercoles', promedio: 7 },
    { dia: 'Jueves', promedio: 7 },
    { dia: 'Viernes', promedio: 6.5 },
    { dia: 'Sabado', promedio: 7 },
    { dia: 'Domingo', promedio: 7.5 },

  ];

  return (
    <div>
      <h1>Escala a lo largo del día</h1>


      <div style={{ width: '750px',  }}>
        <LineChart
          width={750}
          height={300}
          data={dataPh}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pH" stroke="#8884d8" name="Ph" />
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

export default PhChart;
