import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { promedios } from '../operaciones';

const HumedadChart = ({ datos, data, datosFiltrados, estafiltrado, datosNoFiltrados }) => {
  let dataHumedad = [];
  let mensaje = "";

  if (estafiltrado) {
    datos = datosFiltrados;
    mensaje = "Consultar fecha";
  } else {
    datos = datosNoFiltrados.slice(0, 24);
    mensaje = "Escala a lo largo del día";

    dataHumedad = datos.map(([dato, fecha], index) => ({
      hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Humedad: dato,
    }));
  }

  const promedio = [
    { dia: 'Lunes', promedio: promedios(0, data) },
    { dia: 'Martes', promedio: promedios(24, data) },
    { dia: 'Miércoles', promedio: promedios(48, data) },
    { dia: 'Jueves', promedio: promedios(72, data) },
    { dia: 'Viernes', promedio: promedios(96, data) },
    { dia: 'Sábado', promedio: promedios(120, data) },
    { dia: 'Domingo', promedio: promedios(144, data) },
  ];

  return (
    <div>
      <h1>Promedio diario</h1>
      <div className='grafica1'>
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

      <h1>{mensaje}</h1>
      <div className='grafica2'>
        {dataHumedad.length === 0 ? (
          <p>No hay datos disponibles para mostrar.</p>
        ) : (
          <LineChart
            width={dataHumedad.length * 30}
            height={300}
            data={dataHumedad}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Humedad" stroke="#8884d8" name="%" />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default HumedadChart;
