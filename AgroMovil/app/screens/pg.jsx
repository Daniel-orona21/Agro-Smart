import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Animated, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { fuenteAdaptable, obtenerHoraRedondeada } from './valores';
import { GraficaPh } from '../components/graficaPh';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';


const windowWidth = Dimensions.get('window').width;
const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

console.log('Dimenciones:', DimensionesPantalla);

export let alto;

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

const Ph = () => {
  const { theme } = useTheme(); 
  const animacion = new Animated.Value(0);
  const { phValue } = useAuth();
  const nPH = phValue;
  const horaActual = obtenerHoraRedondeada();

  useEffect(() => {
    const escalaMaxima = windowWidth - 50; 
    const posicionHorizontal = nPH / 14 * escalaMaxima;
    Animated.timing(animacion, {
      toValue: posicionHorizontal,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  const textColor = theme === 'dark' ? '#fff' : '#585858';
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const info = theme === 'dark' ? infoB : infoN;

  return (
      <ImageBackground source={imagenFondo} blurRadius={0} style={styles.fondo}>
        <SafeAreaView>

        <Text style={[styles.nombre, { color: textColor }]}>PH</Text>

        <View style={styles.contenedor}>

        <Text style={[styles.valor, { color: textColor }]}>{nPH}</Text>
        <Text style={[styles.hora, { color: textColor }]}>Registrado a las: {horaActual}</Text>

        <View style={styles.medidor}>
          <Image source={require('../../assets/rainbow.png')} style={styles.escala}></Image>
          <Animated.View style={[styles.bola, { left: animacion }]}></Animated.View>
        </View>
      
      <BlurView intensity={60} tint={theme} style={styles.contenedorGrafica}>
      <Text style={[styles.txt, { color: textColor }]}>A lo largo del Día</Text>
      <View style={styles.cajaG}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <GraficaPh />
      </ScrollView>
      </View>
      </BlurView>

        <BlurView intensity={60} tint={theme} style={styles.recomendacion}>
        <Text style={[styles.h1, { color: textColor }]}>Recomendación</Text>
        <Text style={[styles.h2, { color: textColor }]}>Monitorea y ajusta el pH del agua entre 6.5 y 7.5 para garantizar un ambiente óptimo para los peces. Esto es crucial para su salud y bienestar.</Text>
        <Image source={info} style={styles.info}></Image>
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
    height: '90%',
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'column'
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
    fontSize: windowWidth*.22,
    fontWeight: '100',
    margin: -20
  },
  hora: {
    color: 'white',
    fontSize: fuenteAdaptable*.04
  },
  medidor: {
    width: '90%',
    height: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  escala: {
    width: windowWidth*.92,
    height: windowWidth*.01,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: 'blue'
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
    height: 'auto',
  },
  recomendacion: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 13,
    width: '95%'
  },
  h1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  h2: {
    color: 'white',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'justify'
  },
  info: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 13,
    top: 13
  }
});


export default Ph;

