import React, { useState, useEffect } from 'react';
import AguaChart from './graficas/aguaChart'; // Asegúrate de importar el componente correcto
import { combinar, filtrarFechas, promedios } from './operaciones'; // Importa las funciones necesarias
import { aguaTemperatura } from './Dashborard'; // Verifica la ruta correcta
import { readtemperatura } from '../servicios/compService';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export const TemperaturaAgua = ({ usuario, temperatura }) => {
  const [datosAgua, setDatosAgua] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [dataAgua, setDataAgua] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estafiltrado, setEstaFiltrado] = useState(false);
  const [datosAguaFiltrados, setDatosAguaFiltrados] = useState([]);
  const [datosAguaNoFiltrados, setDatosAguaNoFiltrados] = useState([]);

  useEffect(() => {
    const fetchTemperatura = async (usuario) => {
      try {
        const response = await readtemperatura(usuario);
        setFechas(response.traertemperatura.fechaInsercion);
        setDataAgua(response.traertemperatura.datosAgua);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTemperatura(usuario);
  }, [usuario]);

  useEffect(() => {
    if (dataAgua.length > 0 && fechas.length > 0) {
      try {
        setDatosAgua(combinar(dataAgua, fechas));
        setDatosAguaNoFiltrados(combinar(dataAgua, fechas));
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
    setDatosAguaFiltrados(filtrarFechas(datosAgua, fechaInicio, fechaFin));
    setEstaFiltrado(true);
  };

  const handleRecienteClick = () => {
    setEstaFiltrado(false);
  };

  let datosAguaFinal = estafiltrado ? datosAguaFiltrados : datosAguaNoFiltrados;
  datosAguaFinal = datosAguaFinal.slice(0, 24);

  return (
    <div className='cuerpoPH'>
      <p className='titulopantallas'>TEMPERATURA DEL AGUA</p>
      <div className='contenedorph'>
        <div className='graficas'>
            <AguaChart.Promedio
              datosAgua={dataAgua}
            />
          <AguaChart
            datosAgua={datosAguaFinal}
            datosAguaFiltrados={datosAguaFiltrados}
            datosAguaNoFiltrados={datosAguaNoFiltrados}
            estafiltrado={estafiltrado}
          />
        </div>
        <div className='cosas'>
          <div className='box2'>
          <p className='boxTitulo1'>Temperatura en Agua</p>
          <p className='boxTitulo2'>{temperatura}°C</p>
          <img src={aguaTemperatura()} alt="semaforo" className="semaforo" />
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
