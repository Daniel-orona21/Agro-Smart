import React, { useState, useEffect } from 'react';
import AmbienteChart from './graficas/ambienteChart';

import { combinar, filtrarFechas } from './operaciones'; 
import { ambiente } from './Dashborard'; 
import { readtemperatura } from '../servicios/compService';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import '../css/home.css';

export const TemperaturaAmbiente = ({ usuario, temperatura }) => {
  const [datosAmbiente, setDatosAmbiente] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [dataAmbiente, setDataAmbiente] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estafiltrado, setEstaFiltrado] = useState(false);
  const [datosAmbienteFiltrados, setDatosAmbienteFiltrados] = useState([]);
  const [datosAmbienteNoFiltrados, setDatosAmbienteNoFiltrados] = useState([]);

  useEffect(() => {
    const fetchTemperatura = async (usuario) => {
      try {
        const response = await readtemperatura(usuario);
        setFechas(response.traertemperatura.fechaInsercion);
        setDataAmbiente(response.traertemperatura.datosAmbiente);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTemperatura(usuario);
  }, [usuario]);

  useEffect(() => {
    if (dataAmbiente.length > 0 && fechas.length > 0) {
      try {
        setDatosAmbiente(combinar(dataAmbiente, fechas));
        setDatosAmbienteNoFiltrados(combinar(dataAmbiente, fechas));
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [dataAmbiente, fechas]);

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const handleFiltrarClick = () => {
    setDatosAmbienteFiltrados(filtrarFechas(datosAmbiente, fechaInicio, fechaFin));
    setEstaFiltrado(true);
  };

  const handleRecienteClick = () => {
    setEstaFiltrado(false);
  };

  let datosAmbienteFinal = estafiltrado ? datosAmbienteFiltrados : datosAmbienteNoFiltrados;
  datosAmbienteFinal = datosAmbienteFinal.slice(0, 24);

  return (
    <div className='cuerpoPH'>
      <p className='titulopantallas'>TEMPERATURA AMBIENTE</p>
      <div className='contenedorph'>
        <div className='graficas'>
          <AmbienteChart
            datosAmbiente={datosAmbienteFinal}
            datosAmbienteFiltrados={datosAmbienteFiltrados}
            datosAmbienteNoFiltrados={datosAmbienteNoFiltrados}
            estafiltrado={estafiltrado}
          />
        </div>
        <div className='cosas'>
          <div className='box2'>
          <p className='boxTitulo1'>Temperatura ambiente</p>
          <p className='boxTitulo2'>{temperatura}°C</p>
          <img src={ambiente()} alt="semaforo" className="semaforo" />
          </div>
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <Typography>Consulta</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div className='consulta'>
                <input className='filtro' type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
                <input className='filtro' type="date" value={fechaFin} onChange={handleFechaFinChange} />
                <Button type="button" className='buttonf' onClick={handleRecienteClick}>Reciente</Button>
                <Button type="button" className='buttonf' onClick={handleFiltrarClick}>Filtrar</Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
