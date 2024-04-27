import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { temperatura, temperaturaAmbiente } from './datos';
import { readtemperatura } from '../servicios/compService';
import { aguaTemperatura, ambiente } from './Dashborard';
import React, {useState, useEffect} from 'react';
import TemperaturaChart from './graficas/temperaturaChart'

import '../css/home.css';
import {promedios} from './operaciones';
import { combinar, filtrarFechas} from './operaciones'
export const  TemperaturaScreen = ({usuario}) => {
    const [datosAmbiente, setDatosAmbiente] = useState([]);
    const [datosAgua, setDatosAgua] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [dataAgua, setDataAgua] = useState([]);
    const [dataAmbiente, setDataAmbiente] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estafiltrado, setEstaFiltrado] = useState(false);
    const [datosAmbienteFiltrados, setDatosAmbienteFiltrados] = useState([]);
    const [datosAguaFiltrados, setDatosAguaFiltrados] = useState([]);

    useEffect(() => {
        const fetchTemperatura = async (usuario) => {
          try {
            const response = await readtemperatura(usuario);
            setDataAgua(response.traertemperatura.datosAgua);
            setFechas(response.traertemperatura.fechaInsercion); //aqui es traerph pq ese es el nombre del objeto JSON
            setDataAmbiente(response.traertemperatura.datosAmbiente);
          } catch (err) {
            console.error(err);
          }
        };
        fetchTemperatura(usuario);
    }, [usuario]); 

    useEffect(() => {
        // console.log(data)
        if (dataAmbiente.length > 0 && fechas.length > 0) {
          try {
            setDatosAmbiente(combinar(dataAmbiente, fechas));
            
            console.log(datosAmbiente)
          } catch (err) {
            console.error(err.message);
          }
        }
      }, [dataAmbiente, fechas]);


      useEffect(() => {
        // console.log(data)
        if (dataAgua.length > 0 && fechas.length > 0) {
          try {
            setDatosAgua(combinar(dataAgua, fechas));
            
    
          } catch (err) {
            console.error(err.message);
          }
        }
      }, [dataAgua, fechas]);


      const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
      };
    
      const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
      };

      const handleFiltrarClick = () => {
        console.log("Filtrar datos con fecha de inicio:", fechaInicio, "y fecha de fin:", fechaFin);
        console.log(datosAgua,datosAmbiente)
        let perro = filtrarFechas(datosAgua)
        console.log(perro)
        setDatosAmbienteFiltrados(filtrarFechas(datosAmbiente, fechaInicio, fechaFin));
        setDatosAguaFiltrados(filtrarFechas(datosAgua, fechaInicio, fechaFin));
        setEstaFiltrado(true);
      };
    
      useEffect(() => {
        console.log("Datos filtrados:", datosAguaFiltrados, datosAmbienteFiltrados);
      }, [datosAguaFiltrados, datosAmbienteFiltrados]);


        const handleRecienteClick = () => {
    console.log("Mostrar datos recientes");
    setEstaFiltrado(false);
  };
  return(
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo4'>TEMPERATURA AMBIENTE</p>
        <TemperaturaChart 
        dataAmbiente={dataAmbiente}
        datosAmbiente={datosAmbiente}
        dataAgua={dataAgua}
        datosAgua={datosAgua}
        datosAguaFiltrados={datosAguaFiltrados}
        datosAguaNoFiltrados={datosAgua}
        datosAmbienteFiltrados={datosAmbienteFiltrados}
        datosAmbienteNoFiltrados={datosAmbiente}
        estafiltrado={estafiltrado}

        />
      </div>
      <div>
          <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
          <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
          <button type="button" className='button3' onClick={handleFiltrarClick}>Filtrar</button>
          <button type="button" className='button3' onClick={handleRecienteClick}>Reciente</button>
        </div>
      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>Temparetura ambiente</p>
               <p className='boxTitulo2'>{temperaturaAmbiente}°C</p>
            <img src={ambiente()} alt="semaforo" className="semaforo" />
        </div>

        <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>Temparetura en Agua</p>
               <p className='boxTitulo2'>{temperatura}°C</p>
            <img src={aguaTemperatura()} alt="semaforo" className="semaforo" />
        </div>

      </div>
    </div>
      </div>
    
  )


}