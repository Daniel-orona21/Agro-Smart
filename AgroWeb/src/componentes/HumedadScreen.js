import React from 'react';
import { humedadS } from './Dashborard';
import '../css/home.css';
import descargando from '../img/descargando.png';
import HumedadChart from './graficas/humedadChart';
import { humedadConstante } from './datos';

export const  HumedadScreen = () => {
  return (
    
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
      <p className='titulo4'>HUMEDAD</p>
        <HumedadChart />
      </div>

      <div className='botonsiños'>
      <div className='box'>
               <p className='boxTitulo1'>% Actual:</p>
               <p className='boxTitulo2'>{humedadConstante}</p>
            <img src={humedadS()} alt="semaforo" className="semaforo" />
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


