import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes también
import HomeScreen from './screens/homeScreen';
import PantallaPez from './screens/PantallaPez';
import PantallaCultivo from './screens/PantallaCultivo';

import { Inicios } from './screens/Inicios';

function App() {
  return (
    <Router>
      <Routes>PantallaCultivo
        <Route path="/" element={<Inicios />} />
        <Route path="/home-screen" element={<HomeScreen />} />
        <Route path="/Seleccion-pez" element={<PantallaPez />} />
        <Route path="/Seleccion-cultivo" element={<PantallaCultivo />} />


      </Routes>
    </Router>
  );
}

export default App;
