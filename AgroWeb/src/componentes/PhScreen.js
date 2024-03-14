import React from 'react';
import PhChart from './graficas/PhChart';
import { nPH } from './datos';
import { semaforoPH } from './Dashborard';
import '../css/home.css';
import descargando from '../img/descargando.png';

export const  PhScreen = () => {
  return (
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo4'>PH</p>
        <PhChart />
      </div>

      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>ph Actual:</p>
               <p className='boxTitulo2'>{nPH}</p>
            <img src={semaforoPH()} alt="semaforo" className="semaforo" />
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


