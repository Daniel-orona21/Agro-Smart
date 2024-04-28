import React from 'react';
import { promediosN } from '../operaciones';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const NivelChart = ({ datos, data, datosFiltrados, estafiltrado, datosNoFiltrados }) => {
    let nivelData = [];
    let mensaje = "";

    if (estafiltrado) {
        datos = datosFiltrados;
        mensaje = "Consultar fecha";
    } else {
        datos = datosNoFiltrados;
        mensaje = "Escala a lo largo del día";
        datos = datos.slice(0, 24);
        nivelData = datos.map(([dato, fecha], index) => ({
            hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            Nivel: dato,
        }));
    }

    const promedio = [
        { dia: 'Lunes', promedio: promediosN(0, data) },
        { dia: 'Martes', promedio: promediosN(24, data) },
        { dia: 'Miércoles', promedio: promediosN(48, data) },
        { dia: 'Jueves', promedio: promediosN(72, data) },
        { dia: 'Viernes', promedio: promediosN(96, data) },
        { dia: 'Sábado', promedio: promediosN(120, data) },
        { dia: 'Domingo', promedio: promediosN(144, data) },
    ];

    switch (promedio) {
        case 0:
            promedio = 'Bajo';
            break;
        case 1:
            promedio = 'Medio';
            break;
        case 2:
            promedio = 'Lleno';
            break;
        default:
            break;
    }
    const niveles = ['Bajo', 'Medio', 'Lleno'];

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
                    <YAxis type="category" ticks={niveles} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="promedio" stroke="#82ca9d" name="Promedio" />
                </LineChart>
                </div>
                <h1>{mensaje}</h1>
                <div className='grafica2'>
                {nivelData.length === 0 ? (
          <p>No hay datos disponibles para mostrar...</p>
        ) : (
          <LineChart
                        width={nivelData.length * 30}
                        height={300}
                        data={nivelData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Nivel" stroke="#8884d8" name="Nivel" />
                    </LineChart>
               
            )}
            </div>
          </div>
        );
      };

export default NivelChart;
