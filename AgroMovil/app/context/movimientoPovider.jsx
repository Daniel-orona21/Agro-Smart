// MovimientoProvider.js
import React, { useState } from 'react';
import MovimientoContext from './movimiento'; // Importa el contexto

const MovimientoProvider = ({ children }) => {
  const [movementEnabled, setMovementEnabled] = useState(false);

  return (
    <MovimientoContext.Provider value={{ movementEnabled, setMovementEnabled }}>
      {children}
    </MovimientoContext.Provider>
  );
};

export default MovimientoProvider;
