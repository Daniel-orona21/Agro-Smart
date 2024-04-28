import React, { useState, useEffect } from 'react';
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
import { profile } from '../servicios/authService';
import { getFirstDataFromAllCharts } from '../servicios/compService';
import Cookies from "js-cookie";

const HomeScreen = () => {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [userData, setUserData] = useState(null);
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || '');
  const [temperatura, setTemperatura] = useState(null);
  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState('');
  const [humedadConstante, setHumedadConstante] = useState('');
  const [nivel, setNivel] = useState('');
  const [nPH, setNPH] = useState('');
  const [response, setResponse] = useState('');
  const [estado, setEstado] = useState('');
  // const getTokenFromCookie = () => {

  //   const cookies = Cookies.get();   
  //   if (cookies) {
  //     const token = tokenCookie.split('=')[1];
  //     //localStorage.setItem('token',token) // <- token en local
  //     return token;
  //   }
  //   return null;
  // };
  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  const getProfile = async () => {
    try {
      // const token = getTokenFromCookie();
      const cookies = Cookies.get();   

      if (!cookies) {
        console.error('No se encontró el token en la cookie');
        //window.location.href = "/";
        return;
      }
      const res = await profile(cookies);
      setUserData(res.data);
      const user = res.data.usuario;
      setUsuario(user);
      localStorage.setItem('usuario', user); // Almacena el usuario en el localStorage
      console.log(user)
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  };

  const fetchData = async (usuario) => {
    try {
      const response = await getFirstDataFromAllCharts(usuario);
      if (response) {
        const { firstPhData, firstHumedadData, firstNivelData, firstTemperaturaDataAgua, firstTemperaturaDataAmbiente } = response;
        setNPH(firstPhData);
        setHumedadConstante(firstHumedadData);
        setNivel(firstNivelData);
        setTemperatura(firstTemperaturaDataAgua);
        setTemperaturaAmbiente(firstTemperaturaDataAmbiente);
        setEstado('ok');
      } else {
        console.error('No se recibieron datos del servidor');
      }
    } catch (error) {
      console.error('Error al obtener los datos de los gráficos:', error);
    }
  };


  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    fetchData(usuario)
  }, [usuario]);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  // console.log(nPH,temperatura,temperaturaAmbiente,nivel,humedadConstante,estado)

  const renderSelectedComponent = () => {
    switch (selectedIcon) {
      case 'home':
        return <Dashborard nPH={nPH} temperatura={temperatura} temperaturaAmbiente={temperaturaAmbiente} nivel={nivel} humedadConstante={humedadConstante} estado={estado} />;
      case 'termometro':
        return <Temperatura temperatura={temperatura} temperaturaAmbiente={temperaturaAmbiente} usuario={usuario} />;
      case 'user':
        return <User username={usuario} userEmail={userData.email} />;
      case 'ph':
        return <PhScreen nPH={nPH} usuario={usuario} />;
      case 'nivel':
        return <Nivel nivel={nivel} usuario={usuario} />;
      case 'humedad':
        return <HumedadScreen humedadConstante={humedadConstante} usuario={usuario} />;
      default:
        return null;
    }
  };

  return (
    <div className='cuerpo'>
      <div className='header'>
        <div className='subheader'>

          <a href="https://agrosmrt.vercel.app/">
            <img src={hojaLogo} alt="Visita el sitio Web!" className="logoPrincipal" />
          </a>
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
      </div>
      <div className='contenido'>
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default HomeScreen;
