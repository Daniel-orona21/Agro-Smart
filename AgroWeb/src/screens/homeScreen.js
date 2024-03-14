import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faChartSimple, faTemperatureHalf, faHouseFloodWater, faDroplet } from '@fortawesome/free-solid-svg-icons';
import '../css/home.css';
import { Dashborard } from '../componentes/Dashborard';
import { User } from '../componentes/User';
import { Temperatura } from '../componentes/Temperatura';
import hojaLogo from '../img/hoja.png'
import { PhScreen } from '../componentes/PhScreen';
import { Nivel } from '../componentes/nivelScreen';
import { HumedadScreen } from '../componentes/HumedadScreen';



const HomeScreen = () => {
  const [selectedIcon, setSelectedIcon] = useState('home');

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  const renderSelectedComponent = () => {
    switch (selectedIcon) {
      case 'home':
        return <Dashborard />;
      case 'termometro':
        return <Temperatura />;
      case 'user':
        return <User />;
        case 'ph':
        return <PhScreen />;
        case 'nivel':
        return <Nivel />;
        case 'humedad':
        return <HumedadScreen />;
      default:
        return null;
    }
  };

  return (
    <div className='cuerpo'>
      <div className='header'>
      
      <img src={hojaLogo} alt="" className="logoPrincipal" />

        <div className='iconos'>
        <FontAwesomeIcon
          icon={faHome}
          className={selectedIcon === 'home' ? 'icon selected' : 'icon'}
          onClick={() => handleIconClick('home')}
          />
          <FontAwesomeIcon
            icon={faChartSimple}
            className={selectedIcon === 'ph' ? 'icon selected' : 'icon'}
            onClick={() => handleIconClick('ph')}
            />
          <FontAwesomeIcon
            icon={faTemperatureHalf}
            className={selectedIcon === 'termometro' ? 'icon selected' : 'icon'}
            onClick={() => handleIconClick('termometro')}
            />
            <FontAwesomeIcon
            icon={faHouseFloodWater}
            className={selectedIcon === 'nivel' ? 'icon selected' : 'icon'}
            onClick={() => handleIconClick('nivel')}
            />
        <FontAwesomeIcon
          icon={faDroplet}
          className={selectedIcon === 'humedad' ? 'icon selected' : 'icon'}
          onClick={() => handleIconClick('humedad')}
          />
          </div>
          <div className='perfil'>
          <FontAwesomeIcon
          icon={faUser}
          className={selectedIcon === 'user' ? 'icon selected' : 'icon'}
          onClick={() => handleIconClick('user')}
          />
          </div>
      </div>
      <div className='contenido'>
      {renderSelectedComponent()}
        {/* <Link to="/">Volver al inicio</Link> */}
      </div>
    </div>
  );
};

export default HomeScreen;
