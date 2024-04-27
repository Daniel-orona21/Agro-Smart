import React, {useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { promedios, filtrarFechas } from '../operaciones';

const PhChart = ({ datos, data, datosFiltrados, estafiltrado, datosNoFiltrados }) => {
  let dataPh = [];
  let mensaje = "";
  useEffect(() => {
    console.log("data: "+ data +" datos: "+ datos[0])
  }, [data, datos]);
  if (estafiltrado) {
    datos = datosFiltrados;
    mensaje = "Consultar fecha";
  } else {
    datos = datosNoFiltrados.slice(0, 24);
    mensaje = "Escala a lo largo del día";

    dataPh = datos.map(([dato, fecha], index) => ({
      hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pH: dato,
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
        <LineChart width={700} height={300} data={promedio} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
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
        {dataPh.length === 0 ? (
          <p>No hay datos disponibles para mostrar...</p>
        ) : (
          <LineChart
            width={dataPh.length * 30}
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
        )}
      </div>
    </div>
  );
};

export default PhChart;
