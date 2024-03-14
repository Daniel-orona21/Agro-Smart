import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes también
import Login from './screens/login';
import HomeScreen from './screens/homeScreen';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-screen" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
