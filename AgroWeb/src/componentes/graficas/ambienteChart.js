import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { promedios } from '../operaciones';

const AmbienteChart = ({ datosAmbiente, datosAmbienteFiltrados, datosAmbienteNoFiltrados, estafiltrado }) => {
    let ambienteData = [];
    let titulo = "A lo largo del día";

    if (estafiltrado) {
        datosAmbiente = datosAmbienteFiltrados;
        titulo = "Consultar fecha";
    } else {
        datosAmbiente = datosAmbienteNoFiltrados;
        datosAmbiente = datosAmbiente.slice(0, 24);
         ambienteData = datosAmbiente.map(([dato, fecha], index) => ({
            hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            Temperatura: dato,
          }));
    }

    const promedio = [
        { dia: 'Lunes', promedio: promedios(0, datosAmbiente) },
        { dia: 'Martes', promedio: promedios(24, datosAmbiente) },
        { dia: 'Miércoles', promedio: promedios(48, datosAmbiente) },
        { dia: 'Jueves', promedio: promedios(72, datosAmbiente) },
        { dia: 'Viernes', promedio: promedios(96, datosAmbiente) },
        { dia: 'Sábado', promedio: promedios(120, datosAmbiente) },
        { dia: 'Domingo', promedio: promedios(144, datosAmbiente) },
    ];

    return (
        <div>
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
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="promedio" stroke="#82ca9d" name="Promedio" />
          </LineChart>
            </div>

            <h1>{titulo}</h1>

            {ambienteData.length === 0 ? (
                <p>No hay datos disponibles para mostrar...</p>
            ) : (
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <LineChart
                        width={ambienteData.length * 30}
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
            )}
        </div>
    );
};

export default AmbienteChart;
