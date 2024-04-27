import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { fuenteAdaptable, obtenerHoraRedondeada } from './valores';
import { GraficaTemperaturaAgua } from '../components/graficaTempAgua';
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

const TempAgua = () => {

  const { theme } = useTheme(); 
  const { aguaValue } = useAuth();
  const temperatura = aguaValue;
  const horaActual = obtenerHoraRedondeada();

  const obtenerImagenSegunTemperatura = () => {
    if (temperatura >= 10 && temperatura <= 24) {
      return require('../../assets/pez1.png');
    } else if ((temperatura >= 2 && temperatura < 10) || (temperatura > 24 && temperatura <= 32)) {
      return require('../../assets/pez2.png');
    } else {
      return require('../../assets/pez3.png');
    }
  };

  const textColor = theme === 'dark' ? '#fff' : '#585858';
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const info = theme === 'dark' ? infoB : infoN;


  return (
      <ImageBackground source={imagenFondo} blurRadius={10} style={styles.fondo}>
        <SafeAreaView>

        <View style={styles.contenedor}>
        <Text style={[styles.valor, { color: textColor }]}>{temperatura}°</Text>
        <Text style={[styles.hora, { color: textColor }]}>Registrado a las: {horaActual}</Text>

      <View style={styles.caja}>
      <BlurView intensity={70} tint={theme} style={styles.subcaja1}>
      <Image source={obtenerImagenSegunTemperatura()} style={styles.pez}></Image>
      </BlurView>

      <BlurView intensity={70} tint={theme} style={styles.recomendaciones}>
      <Text style={[styles.h1, { color: textColor }]}>Recomendación</Text>
        <Text style={[styles.h2, { color: textColor }]}>Es fundamental mantener un rango de 10°C a 24°C, ya que esto favorece un entorno propicio para el desarrollo saludable de tus peces.</Text>
        <Image source={info} style={styles.info}></Image>
      </BlurView>
      </View>

      <BlurView intensity={70} tint={theme} style={styles.contenedorGrafica}>
      <Text style={[styles.txt, { color: textColor }]}>A lo largo del Día</Text>
      <View style={styles.cajaG}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <GraficaTemperaturaAgua />
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
  cajaG: {
    marginLeft: 15,
    marginRight: 15
  },
  hora: {
    color: 'white',
    fontSize: fuenteAdaptable*.04
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
  tacometro: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute'
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
    width: windowWidth*.045,
    height: windowWidth*.045,
    position: 'absolute',
    right: 14,
    top: 14
  },
pez:{
    width: windowWidth*.39,
    height: windowWidth*.39,
    resizeMode: 'contain'
  },
});


export default TempAgua;

