import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView, Platform, Animated, Easing, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { fuenteAdaptable, obtenerHoraRedondeada } from './valores';
import { GraficaHumedad } from '../components/graficaHumedad';
import { useTheme } from '../context/themeContext';
import { useFonts } from 'expo-font';
import Dona from '../components/dona';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

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

const HumedadScreen = () => {

  const [animations] = useState([...Array(8)].map(() => new Animated.Value(0)));

  useEffect(() => {
    const animateBars = () => {
      Animated.stagger(100, animations.map((animation) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ])
        )
      )).start();
    };

    animateBars();
  }, []);

  const barHeights = animations.map((animation) =>
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '100%'],
    })
  );

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 0.8],
    outputRange: [0, 1],
  });

  const shadowOpacity = animation.interpolate({
    inputRange: [0, .8],
    outputRange: [0, 1], // Cambia estos valores según desees
  });

  const [fontsLoaded] = useFonts({
    'Digital': require('../../assets/fuentes/Digital.ttf'),
  });
  
  const { theme } = useTheme(); 
  const textColor = theme === 'dark' ? '#fff' : '#585858';
  const aparato = theme === 'dark' ? '#212121' : '#D2D2D2';
  const bordedelmendigoaparato = theme === 'dark' ? '#323232' : '#B1B1B1';
  const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
  const info = theme === 'dark' ? infoB : infoN;
  const { humedadValue } = useAuth();
  const humedadConstante = humedadValue;
  const horaActual = obtenerHoraRedondeada();

  if (!fontsLoaded) {
    return null;
  }

  const estado = () => {
    if (humedadConstante >= 60 && humedadConstante <= 70) {
      return 'OK';
    } else if (humedadConstante < 50) {
      return 'BAJO';
    } else if (humedadConstante > 70) {
      return 'ALTO';
    }
  };

  return (
    <ImageBackground source={imagenFondo} blurRadius={0} style={styles.fondo}>
      <SafeAreaView>
        <Text style={[styles.nombre, { color: textColor }]}>Humedad</Text>
        <View style={styles.contenedor}>
          <Text style={[styles.valor, { color: textColor }]}>{humedadConstante}%</Text>
          <Text style={[styles.hora, { color: textColor }]}>Registrado a las: {horaActual}</Text>

          <View style={styles.caja}>
            <View style={[styles.medidor, { backgroundColor: aparato, borderColor: bordedelmendigoaparato }]}>
              <View style={[styles.humedad, { borderColor: bordedelmendigoaparato }]}>
              <Animated.View style={[styles.foco, { opacity, shadowOpacity }]} />
                <Text style={styles.humedadtxt}>HUMEDAD</Text>
                <Animated.View style={[styles.foco, { opacity, shadowOpacity }]} />
              </View>
              <View style={styles.subcajaHumedad}>
                <View style={[styles.visual, { borderColor: bordedelmendigoaparato }]}>
                  <View style={styles.barras}>
                    {barHeights.map((barHeight, index) => (
                      <Animated.View key={index} style={[styles.bar, { height: barHeight }]} />
                    ))}
                  </View>
                  <View style={styles.visual2}>
                    <Dona />
                  </View>
                </View>
                <View style={styles.datos}>
                  <View style={[styles.indicador, { borderColor: bordedelmendigoaparato }]}>
                    <Text style={styles.indicadortxt}>{humedadConstante}%</Text>
                  </View>
                  <View style={styles.estado}>
                    <Text style={styles.estadotxt}>{estado()}</Text>
                  </View>
                </View>
              </View>
            </View>

            <BlurView intensity={50} tint={theme} style={styles.recomendaciones}>
              <Text style={[styles.h1, { color: textColor }]}>Recomendación</Text>
              <Text style={[styles.h2, { color: textColor }]}>Ajusta la humedad alrededor del 70% para crear condiciones ideales, especialmente durante la fase de germinación y crecimiento inicial de las plantas.</Text>
              <Image source={info} style={styles.info}></Image>
            </BlurView>
          </View>

          <BlurView intensity={70} tint={theme} style={styles.contenedorGrafica}>
            <Text style={[styles.txt, { color: textColor }]}>A lo largo del Día</Text>
            <View style={styles.cajaG}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <GraficaHumedad />
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
    height: '90%',
  },
  nombre: {
    fontSize: fuenteAdaptable * 0.065,
    marginTop: Platform.OS === 'android' ? '10%' : 0,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  valor: {
    color: 'white',
    fontSize: windowWidth * 0.18,
    fontWeight: '100',
    margin: -20
  },
  hora: {
    color: 'white',
    fontSize: fuenteAdaptable * 0.04
  },
  txt: {
    color: 'white',
    margin: 10,
    fontSize: fuenteAdaptable * 0.05,
    fontWeight: '400',
  },
  contenedorGrafica: {
    height: alto * 1.15,
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
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },

  recomendaciones: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
  },
  medidor: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#323232'
  },
  humedad: {
    borderBottomWidth: 4,
    borderColor: '#323232',
    width: '100%',
    height: '24%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  humedadtxt: {
    color: '#0098FF',
    fontSize: windowWidth * 0.07,
    textShadowColor: 'rgba(0, 155, 255, 0.75)',
    textShadowRadius: 5,
    fontFamily: 'Digital',
    letterSpacing: 3,
    textAlign: 'center'
  },
  foco: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: windowWidth * 0.012,
    shadowColor: '#FF6262',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  subcajaHumedad: {
    flexDirection: 'row',
    height: '100%'
  },
  visual: {
    width: '50%',
    height: '76%',
    borderRightWidth: 4,
    borderColor: '#323232',
  },
  barras: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'flex-end',
  },
  bar: {
    width: '3%',
    backgroundColor: '#0098FF',
    shadowColor: '#5FBEFF',
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  visual2: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  datos: {
    flexDirection: 'column',
    height: '100%',
    width: '50%'
  },
  estado: {
    height: '38%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  estadotxt: {
    color: '#0098FF',
    fontSize: windowWidth * 0.08,
    textShadowColor: 'rgba(0, 155, 255, 0.75)',
    textShadowRadius: 5,
    fontFamily: 'Digital',
    marginBottom: 5,
  },
  indicador: {
    height: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderColor: '#323232',
  },
  indicadortxt: {
    color: '#0098FF',
    fontSize: windowWidth * 0.1,
    textShadowColor: 'rgba(0, 155, 255, 0.75)',
    textShadowRadius: 5,
    fontFamily: 'Digital',
    marginBottom: 5,
  },
  h1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  h2: {
    color: 'white',
    fontSize: windowWidth * 0.032,
    marginTop: 10,
    textAlign: 'justify'
  },
  info: {
    width: windowWidth * 0.045,
    height: windowWidth * 0.045,
    position: 'absolute',
    right: 14,
    top: 14
  },
  cajaG: {
    marginLeft: 15,
    marginRight: 15
  },
});

export default HumedadScreen;
