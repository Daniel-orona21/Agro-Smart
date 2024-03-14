import React from 'react';
import { tanque } from './Dashborard';
import '../css/home.css';
import descargando from '../img/descargando.png';
import { nivel } from './datos';
import NivelChart from './graficas/nivelChart';

export const  Nivel = () => {
  return (
    
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo4'>NIVEL DE AGUA</p>
        <NivelChart />
      </div>

      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>Nivel del Agua</p>
               <p className='boxTitulo2'>{nivel}</p>
            <img src={tanque()} alt="semaforo" className="semaforo" />
        </div>
        <div className='box'>
               <p className='boxTitulo1'>Informe</p>
               <img src={descargando} alt="sistema" className="sistema" />
               <p className='boxTitulo3'>Download</p>
        </div>
      </div>
    </div>
  );
};


