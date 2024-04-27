import React, { useState } from 'react';
import { TemperaturaAmbiente } from './temperaturaAmbiente';
import { TemperaturaAgua } from './temperaturAgua';

export const Temperatura = ({ usuario, temperatura, temperaturaAmbiente }) => {
  const [tabSeleccionada, setTabSeleccionada] = useState('ambiente');

  const seleccionarTab = (tab) => {
    setTabSeleccionada(tab);
  };

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor:'#DCDCDC', width: '500px', borderRadius: '10px', padding: '2.5px' }}>
        <div
          onClick={() => seleccionarTab('ambiente')}
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            width: '250px',
            cursor: 'pointer',
            backgroundColor: tabSeleccionada === 'ambiente' ? 'white' : 'transparent',
            borderRadius: '8px 8px 8px 8px',
          }}
        >
          <p style={{ margin: '0' }}>Temperatura Ambiente</p>
        </div>
        <div
          onClick={() => seleccionarTab('agua')}
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            width: '250px',
            cursor: 'pointer',
            backgroundColor: tabSeleccionada === 'agua' ? 'white' : 'transparent',
            borderRadius: '8px 8px 8px 8px',
          }}
        >
          <p style={{ margin: '0' }}>Temperatura del Agua</p>
        </div>
      </div>
      <div style={{ width: '100%' }}>
      {tabSeleccionada === 'ambiente' ? (
        <TemperaturaAmbiente usuario={usuario} temperatura={temperaturaAmbiente} />
      ) : (
        <TemperaturaAgua usuario={usuario} temperatura={temperatura} />
      )}
      </div>
    </div>
  );
};
