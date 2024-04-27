// MovimientoContext.js
import React, { createContext, useContext } from 'react';

// Creamos el contexto
const MovimientoContext = createContext();

// Hook personalizado para consumir el contexto en componentes hijos
export const useMovimiento = () => useContext(MovimientoContext);

export default MovimientoContext;
