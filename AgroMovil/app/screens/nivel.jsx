import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView, Platform} from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { fuenteAdaptable, obtenerHoraRedondeada } from './valores';
import { GraficaNivel } from '../components/graficaNivel';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

let alto;
let widthTanke;

if (DimensionesPantalla >= 600 && DimensionesPantalla <= 700) {
    alto= 219;
    widthTanke= 38
  } if (DimensionesPantalla >= 700 && DimensionesPantalla <= 800) {
    alto= 230;
    widthTanke= 39
  } if (DimensionesPantalla >= 800 && DimensionesPantalla <= 900) {
    alto= 258;
    widthTanke= 38
  } if (DimensionesPantalla >= 900 && DimensionesPantalla <= 1000) {
    alto= 280;
    widthTanke= 44
  }

const fondoClaro = require('../../assets/fondoph5.jpg');
const fondoOscuro = require('../../assets/fondoph3.jpg');
const infoB = require('../../assets/info.png');
const infoN = require('../../assets/info2.png');
const tankB = require('../../assets/tank.png');
const tankN = require('../../assets/tank2.png');

const NivelAguaScreen = ( ) => {
  let estiloColor;
  const { theme } = useTheme(); 
  const { nivelValue } = useAuth();
  const nivel = nivelValue;
  const horaActual = obtenerHoraRedondeada();

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

    if (niveltxt === 'Lleno') {
      estiloColor = {
        width: 10,
        height: 70,
        backgroundColor: '#00D80F',
        position: 'absolute',
        left: widthTanke,
        bottom: windowWidth*.13,
      };
    } else if (niveltxt === 'Medio') {
      estiloColor = {
        width: 10,
        height: 37,
        backgroundColor: 'orange',
        position: 'absolute',
        left: widthTanke,
        bottom: windowWidth*.13,
      };
    } else if (niveltxt === 'Bajo') {
      estiloColor = {
        width: 10,
        height: 15,
        backgroundColor: 'red',
        position: 'absolute',
        left: widthTanke,
        bottom: windowWidth*.13,
      };
    } 

  const textColor = theme === 'dark' ? '#fff' : '#585858';
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const info = theme === 'dark' ? infoB : infoN;
  const tank = theme === 'dark' ? tankB : tankN;

  return (
      <ImageBackground source={imagenFondo} blurRadius={0} style={styles.fondo}>
        <SafeAreaView>
      <Text style={[styles.nombre, { color: textColor }]}>Nivel del Agua</Text>

      <View style={styles.contenedor}>
        <Text style={[styles.valor, { color: textColor }]}>{niveltxt}</Text>
        <Text style={[styles.hora, { color: textColor }]}>Registrado a las: {horaActual}</Text>
      
      <View style={styles.caja}>
      <BlurView intensity={50} tint={theme} style={styles.subcaja1}>
      <View style={estiloColor}></View>
      <Image source={tank} style={styles.tanque}></Image>
      </BlurView>

      <BlurView intensity={50} tint={theme} style={styles.recomendaciones}>
        <Text style={[styles.h1, { color: textColor }]}>Recomendación</Text>
        <Text style={[styles.h2, { color: textColor }]}>Procura no dejar a tus Peces sin Agua! 😁</Text>
        <Image source={info} style={styles.info}></Image>
      </BlurView>
      </View>

      <BlurView intensity={50} tint={theme} style={styles.contenedorGrafica}>
      <Text style={[styles.txt, { color: textColor }]}>A lo largo del Día</Text>
      <View style={[styles.cajaG, { color: textColor }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <GraficaNivel />
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
  cajaG: {
    marginLeft: 15,
    marginRight: 15
  },
  contenedor: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '90%',
  },
  nombre: {
    fontSize: fuenteAdaptable*.065,
    marginTop: Platform.OS === 'android' ? '10%' : 0 ,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  valor: {
    color: 'white',
    fontSize: windowWidth*.18,
    fontWeight: '100',
    margin: -20
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
    width: '95%',
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
tanque:{
  width: windowWidth*.37,
  height: windowWidth*.37,
    resizeMode: 'contain',
  },
});



export default NivelAguaScreen;

