import React, {useState, useEffect} from 'react';
import { tanque } from './Dashborard';
import { readnivel } from '../servicios/compService';
import NivelChart from './graficas/nivelChart';
import { combinar, filtrarFechas} from './operaciones'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import '../css/home.css';

export const  Nivel = ({nivel,usuario}) => {

  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estafiltrado, setEstaFiltrado] = useState(false);

  const [datosFiltrados, setDatosFiltrados] = useState([]);
//todo esto simplemente es como se manejan las variables en react
  useEffect(() => {
  
    const fetchNivel = async (usuario) => {
      try {
        const response = await readnivel(usuario);//peticion a back
        setData(response.traernivel.datos);//se asignan los datos en su respectiva variable
        console.log("prueba datos",data)

        setFechas(response.traernivel.fechaInsercion); //aqui es traernivel pq ese es el nombre del objeto JSON
      } catch (err) {
        console.error(err);
      }
    };

    fetchNivel(usuario);
  }, [usuario]); //por aqui se pasan las variables que se usaran en el efecto

  useEffect(() => {
    // console.log(data)
    if (data.length > 0 && fechas.length > 0) {
      try {
        setDatos(combinar(data, fechas));//esto hace la matriz solo si fechas y datos son iguales (que deberia ser siempre)
      } catch (err) {
        console.error(err.message);
      }
    }
    console.log(datos)
  }, [data, fechas]);

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);//trae la fecha seleccionada del calendario
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);//trae la fecha seleccionada del calendario
  };

  const handleFiltrarClick = () => {
    console.log("Filtrar datos con fecha de inicio:", fechaInicio, "y fecha de fin:", fechaFin);
    setDatosFiltrados(filtrarFechas(datos, fechaInicio, fechaFin));
    console.log(datosFiltrados  )
    setEstaFiltrado(true);//esto es para que sepa si traer los datos filtrados o no 
    //se filtran los datos cuando se presiona filtrar
  };
  useEffect(() => {
    console.log("Datos filtrados:", datosFiltrados);
  }, [datosFiltrados]);//esto simplemente hay que ponerlo para que jale el filtro
  
  //la explicacion larga es que como todo son funciones asincronas
  //js puede pasar al siguiente paso sin que las funciones mas lentas acaben bien
  //en vez de usar promesas que es mas tardado hacemos un log para que js tenga que usar
  //si o si la funcion antes de acabar los procesos 
  

  const handleRecienteClick = () => {
    console.log("Mostrar datos recientes");
    setEstaFiltrado(false);
  };
  console.log(datos)
  return (
    
    <div className='cuerpoPH'>
      <p className='titulo4'>NIVEL DE AGUA</p>
      <div className='contenedorph'>
      <div className='graficas'>
        <NivelChart //se mandan los datos al componente
        datos={datos}
        data={data}
        datosFiltrados={datosFiltrados}
        estafiltrado={estafiltrado}
        datosNoFiltrados={datos}//esto es para que diferencie entre filtrados o no
        />
        </div>
        <div className='cosas'>
        <div className='box2'>
        <p className='boxTitulo1'>Nivel del Agua</p>
        <p className='boxTitulo2'>{nivel}</p>
            <img src={tanque(nivel)} alt="semaforo" className="semaforo" />
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


