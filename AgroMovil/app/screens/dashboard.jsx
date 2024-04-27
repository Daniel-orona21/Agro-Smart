import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ImageBackground, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';
import { BlurView } from 'expo-blur';

// valores


import { useMovimiento } from '../context/movimiento';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';


const windowWidth = Dimensions.get('window').width;
const boxSize = (windowWidth * .92) / 1.99 - 20; 
const windowHeight = Dimensions.get('window').height;

const h1 = Math.min(windowWidth, windowHeight) * .05; 
const h2 = Math.min(windowWidth, windowHeight) * .22; 
const h3 = Math.min(windowWidth, windowHeight) * .14; 
const h4 = Math.min(windowWidth, windowHeight) * .035; 

const fondoClaro = require('../../assets/fondo7.jpg');
const fondoOscuro = require('../../assets/fondo2.jpeg');


export default function Dashboard( ) {
  const navigation = useNavigation();
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const { movementEnabled } = useMovimiento();
  const { theme } = useTheme(); 
  const { phValue, ambienteValue, aguaValue, nivelValue, humedadValue  } = useAuth();

  const nPH = phValue;
  const temperaturaAmbiente = ambienteValue;
  const temperatura = aguaValue;
  const humedadConstante = humedadValue;

  useEffect(() => {
    let subscription;
    if (movementEnabled) {
      subscription = Accelerometer.addListener(accelerometerData => {
        setAccelerometerData(accelerometerData);
      });
    } else {
      // Si el movimiento está desactivado, remueve la suscripción
      subscription?.remove();
    }

    return () => {
      subscription?.remove();
    };
  }, [movementEnabled]);

  const calculateMovement = () => {
    const { x, y } = accelerometerData;
    const offsetX = x * -10; 
    const offsetY = y * -10; 
    return { offsetX, offsetY };
  };

let niveltxt;

  switch (nivelValue) {
    case "0":
        niveltxt = 'Bajo';
        break;
    case "1":
        niveltxt = 'Medio';
        break;
    case "2":
        niveltxt = 'Lleno';
        break;
    default:
        break;
}

  //Semaforo para ph
  const semaforoPH = () => {
    if (nPH >= 6 && nPH <= 8) {
      return require('../../assets/semaforo1.png');
    } else if ((nPH >= 5 && nPH <= 6) || (nPH >= 8 && nPH <= 9)) {
      return require('../../assets/semaforo2.png');
    } else {
      return require('../../assets/semaforo3.png');
    }
  };
  
  //Semaforo para Ambiente
  const ambiente = () => {
    if (temperaturaAmbiente >= 18 && temperaturaAmbiente <= 24) {
      return require('../../assets/semaforo1.png');
    } else if ((temperaturaAmbiente >= 15 && temperaturaAmbiente <= 17) || (temperaturaAmbiente > 24 && temperaturaAmbiente <= 27)) {
      return require('../../assets/semaforo2.png');
    } else {
      return require('../../assets/semaforo3.png');
    }
  };
  
  //semaforo para agua
  const aguaTemperatura = () => {
    if (temperatura >= 10 && temperatura <= 24) {
      return require('../../assets/semaforo1.png');
    } else if ((temperatura >= 2 && temperatura < 10) || (temperatura > 24 && temperatura <= 32)) {
      return require('../../assets/semaforo2.png');
    } else {
      return require('../../assets/semaforo3.png');
    }
  };
  
  //semaforo para Nivel
  const tanque = () => {
    if (niveltxt === 'Lleno') {
      return require('../../assets/semaforo1.png');
    } else if (niveltxt === 'Medio') {
      return require('../../assets/semaforo2.png');
    } else {
      return require('../../assets/semaforo3.png');
    }
  };
  
  //semaforo para humedad
  const humedadS = () => {
    if (humedadConstante >= 60 && humedadConstante <= 70) {
      return require('../../assets/semaforo1.png');
    } else if ((humedadConstante >= 50 && humedadConstante < 60) || (humedadConstante > 70 && humedadConstante <= 80)) {
      return require('../../assets/semaforo2.png');
    } else {
      return require('../../assets/semaforo3.png');
    }
  };
  
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const textColor = theme === 'dark' ? '#fff' : '#343434';
  const textColor2 = theme === 'dark' ? '#fff' : '#737373';

  const { offsetX, offsetY } = calculateMovement();

  return (
    <ImageBackground source={imagenFondo} style={styles.backgroundImage}>
      <View style={[styles.contenido,  { transform: [{ translateX: -offsetX }, { translateY: offsetY }] }]}>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>PH</Text>
          <Text style={[styles.h2, {color: textColor2}]}>{nPH}</Text>
          <Image source={semaforoPH()} style={styles.semaforo} />  
        </BlurView>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>Ambiente C°</Text>
          <Text style={[styles.h2, {color: textColor2}]}>{temperaturaAmbiente}</Text>
          <Image source={ambiente()} style={styles.semaforo} /> 
        </BlurView>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>Agua C°</Text>
          <Text style={[styles.h2, {color: textColor2}]}>{temperatura}</Text>
          <Image source={aguaTemperatura()} style={styles.semaforo} /> 
        </BlurView>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>Nivel de agua</Text>
          <Text style={[styles.h3, {marginTop: 15, marginBottom: 16, color: textColor2}]}>{niveltxt}</Text>
          <Image source={tanque()} style={styles.semaforo} /> 
        </BlurView>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>Humedad %</Text>
          <Text style={[styles.h2, {color: textColor2}]}>{humedadConstante}</Text>
          <Image source={humedadS()} style={styles.semaforo} /> 
        </BlurView>
        <BlurView intensity={60} tint={theme} style={styles.blurContainer}>
          <Text style={[styles.h1, {color: textColor}]}>Sistema</Text>
          <Image source={require('../../assets/bien.png')} style={styles.sistema} /> 
          <Text style={[styles.h4, {color: textColor}]}>¡Conectado!</Text>
        </BlurView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contenido: {
    width: '100%',
    height: '76%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center'
  },
  blurContainer: {
    width: boxSize,
    height: boxSize,
    borderRadius: 20,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  h1: {
    fontSize: h1,
    fontWeight: '600',
    color: 'white',
    marginBottom: -5,
  },
  h2: {
    fontSize: h2,
    fontWeight: '600',
    color: 'white'
  },
  h3: {
    fontSize: h3,
    fontWeight: '600',
    color: 'white'
  },
  h4: {
    fontSize: h4,
    fontWeight: '600',
    color: 'white'
  },
  semaforo: {
    width: '34%',
    height: '10%',
  },
  sistema: {
    width: '40%',
    height: '40%',
    margin: 15
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
