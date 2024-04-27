import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {promedios} from '../operaciones';
import { temperatura } from '../datos';
const TemperaturaChart = ({dataAmbiente,datosAmbiente,dataAgua,datosAgua,datosAguaFiltrados,datosAguaNoFiltrados,datosAmbienteFiltrados,datosAmbienteNoFiltrados,estafiltrado}) => {

    if (estafiltrado) {
        datosAgua=datosAguaFiltrados
        datosAmbiente=datosAmbienteFiltrados
        console.log(datosAmbiente, datosAgua  )
      }else{
        datosAgua=datosAguaNoFiltrados
        datosAmbiente=datosAmbienteNoFiltrados
  
        datosAmbiente=datosAmbiente.slice(0,24)
        datosAgua=datosAgua.slice(0,24)
  
      }
  
const ambienteData = datosAmbiente.map(([dato, fecha], index) => ({
    hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    Temperatura: dato,
  }));
  
  
    const promedio = [
      { dia: 'Lunes', promedio: promedios(0,dataAmbiente) },
      { dia: 'Martes', promedio: promedios(24,dataAmbiente) }, 
      { dia: 'Miercoles', promedio: promedios(48,dataAmbiente) },
      { dia: 'Jueves', promedio: promedios(72,dataAmbiente) },
      { dia: 'Viernes', promedio: promedios(96,dataAmbiente) },
      { dia: 'Sabado', promedio: promedios(120,dataAmbiente) },
      { dia: 'Domingo', promedio: promedios(144,dataAmbiente) },
  
    ];
      
    const aguaData = datosAgua.map(([dato, fecha], index) => ({
      hour: new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Temperatura: dato,
    }));
  
    const promedio2 = [
      { dia: 'Lunes', promedio: promedios(0,dataAgua) },
      { dia: 'Martes', promedio: promedios(24,dataAgua) }, 
      { dia: 'Miercoles', promedio: promedios(48,dataAgua) },
      { dia: 'Jueves', promedio: promedios(72,dataAgua) },
      { dia: 'Viernes', promedio: promedios(96,dataAgua) },
      { dia: 'Sabado', promedio: promedios(120,dataAgua) },
      { dia: 'Domingo', promedio: promedios(144,dataAgua) },
  
    ];
    
    return(
        <div>
        <h1>A lo largo del día</h1>
  
  
        <div style={{ width: '100%', overflowx: 'Auto' }}>
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
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo5'>TEMPERATURA DEL AGUA</p>
      <div>
      <h1>A lo largo del día</h1>


      <div style={{ width: '100%', overflowX: 'auto'  }}>
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

      </div>
      </div>
    )

};

export default TemperaturaChart;