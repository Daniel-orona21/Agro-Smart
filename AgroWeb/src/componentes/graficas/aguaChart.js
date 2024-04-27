import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { promedios } from '../operaciones';

const AguaChart = ({ datosAgua, datosAguaFiltrados, datosAguaNoFiltrados, estafiltrado }) => {
  let titulo = "A lo largo del día";

  if (estafiltrado) {
    datosAgua = datosAguaFiltrados;
    titulo = "Consultar fecha";
  } else {
    datosAgua = datosAguaNoFiltrados;
    datosAgua = datosAgua.slice(0, 24);
  }

  const aguaData = datosAgua.map(([dato, fecha], index) => ({
    hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    Temperatura: dato,
  }));

  return (
    <div>
      <h1>{titulo}</h1>
      {aguaData.length === 0 ? (
        <p>No hay datos disponibles para mostrar...</p>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <LineChart
            width={aguaData.length * 30}
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
      )}
    </div>
  );
};

AguaChart.Promedio = ({ datosAgua }) => {
  const promedio2 = [
    { dia: 'Lunes', promedio: promedios(0, datosAgua) },
    { dia: 'Martes', promedio: promedios(24, datosAgua) },
    { dia: 'Miércoles', promedio: promedios(48, datosAgua) },
    { dia: 'Jueves', promedio: promedios(72, datosAgua) },
    { dia: 'Viernes', promedio: promedios(96, datosAgua) },
    { dia: 'Sábado', promedio: promedios(120, datosAgua) },
    { dia: 'Domingo', promedio: promedios(144, datosAgua) },
  ];

  return (
    <div>
      <h1>Promedio diario</h1>
      <div style={{ width: '750px', marginTop: '20px' }}>
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
  );
};

export default AguaChart;
