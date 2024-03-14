import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const NivelChart = () => {
  const dataNivel = [
    { hour: '00:00', Nivel: 'bajo' },
    { hour: '01:00', Nivel: 'medio' },
    { hour: '02:00', Nivel: 'medio' },
    { hour: '03:00', Nivel: 'lleno' },
    { hour: '04:00', Nivel: 'medio' },
    { hour: '05:00', Nivel: 'medio' },
    { hour: '06:00', Nivel: 'lleno' },
    { hour: '07:00', Nivel: 'medio' },
    { hour: '08:00', Nivel: 'medio' },
    { hour: '09:00', Nivel: 'medio' },
    { hour: '10:00', Nivel: 'lleno' },
    { hour: '11:00', Nivel: 'lleno' },
    { hour: '12:00', Nivel: 'medio' },
    { hour: '13:00', Nivel: 'medio' },
    { hour: '14:00', Nivel: 'medio' },
    { hour: '15:00', Nivel: 'lleno' },
    { hour: '16:00', Nivel: 'lleno' },
    { hour: '17:00', Nivel: 'lleno' },
    { hour: '18:00', Nivel: 'medio' },
    { hour: '19:00', Nivel: 'medio' },
    { hour: '20:00', Nivel: 'medio' },
    { hour: '21:00', Nivel: 'medio' },
    { hour: '22:00', Nivel: 'lleno' },
    { hour: '23:00', Nivel: 'medio' },
  ];

  const promedio = [
    { dia: 'Lunes', promedio: 'bajo' },
    { dia: 'Martes', promedio: 'medio' },
    { dia: 'Miércoles', promedio: 'medio' },
    { dia: 'Jueves', promedio: 'lleno' },
    { dia: 'Viernes', promedio: 'medio' },
    { dia: 'Sábado', promedio: 'medio' },
    { dia: 'Domingo', promedio: 'medio' },
  ];

  const niveles = ['bajo', 'medio', 'lleno']; // Definir niveles posibles

  return (
    <div>
      <h1>Nivel a lo largo del día</h1>

      <div style={{ width: '750px' }}>
        <LineChart
          width={750}
          height={300}
          data={dataNivel}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis type="category" ticks={niveles} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Nivel" stroke="#8884d8" name="Nivel" />
        </LineChart>
      </div>

      <h1>Promedio diario</h1>

      <div style={{ width: '750px', marginTop: '20px' }}>
        <LineChart
          width={750}
          height={300}
          data={promedio}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis type="category" ticks={niveles} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="promedio" stroke="#82ca9d" name="Promedio" />
        </LineChart>
      </div>
    </div>
  );
};

export default NivelChart;
