import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { fuenteAdaptable, obtenerHoraRedondeada } from './valores';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { GraficaTemperaturaAmbiente } from '../components/graficaTempAmbiente';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

console.log('Dimenciones:', DimensionesPantalla);

let alto;

if (DimensionesPantalla >= 600 && DimensionesPantalla <= 700) {
    alto= 219;
  } if (DimensionesPantalla >= 700 && DimensionesPantalla <= 800) {
    alto= 230;
  } if (DimensionesPantalla >= 800 && DimensionesPantalla <= 900) {
    alto= 258;
  } if (DimensionesPantalla >= 900 && DimensionesPantalla <= 1000) {
    alto= 280;
  }

const fondoClaro = require('../../assets/fondoph5.jpg');
const fondoOscuro = require('../../assets/fondoph3.jpg');
const infoB = require('../../assets/info.png');
const infoN = require('../../assets/info2.png');
const flechaB = require('../../assets/flecha3.png');
const flechaN = require('../../assets/flecha4.png');

const Ambiente = () => {
  const { theme } = useTheme(); 
  const { ambienteValue } = useAuth();
  const temperaturaAmbiente = ambienteValue;
  const temp = temperaturaAmbiente;
  const horaActual = obtenerHoraRedondeada();

  const [rotationDegree, setRotationDegree] = useState(0);

  useEffect(() => {
   
    setRotationDegree(0);
  }, []);
 
  useEffect(() => {
    
    setRotationDegree((temp / 60) * 220);
  }, [temp]);

  const [fontsLoaded] = useFonts({
    'Digital': require('../../assets/fuentes/Digital.ttf'),
  });



  if (!fontsLoaded) {
    return null;
  }

  const textColor = theme === 'dark' ? '#fff' : '#585858';
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const info = theme === 'dark' ? infoB : infoN;
  const flecha = theme === 'dark' ? flechaB : flechaN;

  return (
      <ImageBackground source={imagenFondo} blurRadius={10} style={styles.fondo}>
      <SafeAreaView>

      <View style={styles.contenedor}>
        <Text style={[styles.valor, { color: textColor }]}>{temperaturaAmbiente}°</Text>
        <Text style={[styles.hora, { color: textColor }]}>Registrado a las: {horaActual}</Text>
      
      <View style={styles.caja}>
      <BlurView intensity={60} tint={theme} style={styles.subcaja1}>
      <Image source={require('../../assets/temperatura.png')} style={styles.tacometro}></Image>

       <Animatable.Image
          animation={{
            from: { rotate: '0deg' },
            to: { rotate: `${rotationDegree}deg` }
          }}
          easing="linear"
          duration={1000}
          iterationCount={1}
          source={flecha}
          style={styles.flecha}
        />
      <Text style={[styles.txtmedidor, { color: textColor }]}>{temperaturaAmbiente}</Text>
      </BlurView>

      <BlurView intensity={60} tint={theme} style={styles.recomendaciones}>
        <Text style={[styles.h1, { color: textColor }]}>Recomendación</Text>
        <Text style={[styles.h2, { color: textColor }]}>Mantén la temperatura dentro del invernadero entre 18°C y 24°C para proporcionar un entorno favorable para el crecimiento de las plantas.</Text>
        <Image source={info} style={styles.info}></Image>
      </BlurView>
      </View>

      <BlurView intensity={60} tint={theme} style={styles.contenedorGrafica}>
      <Text style={[styles.txt, { color: textColor }]}>A lo largo del Día</Text>
      <View style={styles.cajaG}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
     <GraficaTemperaturaAmbiente />
     </ScrollView>
     </View>
     </BlurView>
    </View>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  contenedor: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  valor: {
    color: 'white',
    fontSize: windowWidth*.22,
    fontWeight: '100',
    margin: -20,
    marginLeft: 5
  },
  hora: {
    color: 'white',
    fontSize: fuenteAdaptable*.04
  },
  caja: {
    flexDirection: 'row',
    height: 'auto',
    width: '95%',
    justifyContent: 'space-between'
  },
  subcaja1: {
    width: windowWidth*.45,
    height: windowWidth*.45,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bola: {
    position: 'absolute',
    width: 15, 
    height: 15, 
    borderRadius: 25, 
    backgroundColor: 'white',
  },
  txt: {
    color: 'white',
    margin: 10,
    fontSize: fuenteAdaptable * 0.05,
    fontWeight: '400',
  },
  contenedorGrafica: {
    height: alto*1.15,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    width: '95%'
  },
  cajaG: {
    marginLeft: 15,
    marginRight: 15,
  },
  tacometro: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute'
  },
  flecha: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 45,
  },
  txtmedidor: {
    color: 'white',
    fontFamily: 'Digital',
    fontSize: 40,
    marginTop: -20
  },
  recomendaciones: {
    width: windowWidth*.45,
    height: windowWidth*.45,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16
  },
  h1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  h2: {
    color: 'white',
    fontSize: windowWidth*.035,
    marginTop: 10,
    textAlign: 'justify'
  },
  info: {
    width: 19,
    height: 19,
    position: 'absolute',
    right: 14,
    top: 14
  },
});

export default Ambiente;

