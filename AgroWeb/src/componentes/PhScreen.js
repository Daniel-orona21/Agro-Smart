import React, { useState, useEffect } from 'react';
import PhChart from './graficas/PhChart';
import descargando from '../img/descargando.png';
import { semaforoPH } from './Dashborard';
import { readph } from '../servicios/compService';
import { combinar, filtrarFechas} from './operaciones'
import { useForm } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import '../css/home.css';

export const PhScreen = ({ nPH, usuario }) => {
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estafiltrado, setEstaFiltrado] = useState(false);
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  useEffect(() => {
    const fetchPh = async (usuario) => {
      try {
        const response = await readph(usuario);
        setData(response.traerph.datos);
        setFechas(response.traerph.fechaInsercion);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPh(usuario);
  }, [usuario]);

  useEffect(() => {
    if (data.length > 0 && fechas.length > 0) {
      try {
        setDatos(combinar(data, fechas));
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [data, fechas]);
  
  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };
  
  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };
  
  const handleFiltrarClick = () => {
    setDatosFiltrados(filtrarFechas(datos, fechaInicio, fechaFin));
    setEstaFiltrado(true);
  };
  
  const handleRecienteClick = () => {
    setEstaFiltrado(false);
  };
  
  useEffect(() => {
    console.log("data: "+ data +" datos: "+ datos[0])
  }, [data, datos]);
  return (
    <div className='cuerpoPH'>
      <p className='titulo4'>PH</p>
      <div className='contenedorph'>
        <div className='graficas'>
          <PhChart
            datos={datos}
            data={data}
            datosFiltrados={datosFiltrados}
            estafiltrado={estafiltrado}
            datosNoFiltrados={datos}
          />
        </div>
        <div className='cosas'>
          <div className='box2'>
            <p className='boxTitulo1'>ph Actual:</p>
            <p className='boxTitulo2'>{Math.round(nPH)}</p>
            <img src={semaforoPH(nPH)} alt="semaforo" className="semaforo" />
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
