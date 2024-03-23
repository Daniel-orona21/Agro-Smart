import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { Dimensions } from 'react-native';

const nPH = 10; // valor de base de datos

export let marginAdapt;
export let marginTopTabla;
export let marginBottomTabla;

const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

console.log('Dimenciones:', DimensionesPantalla);

if (DimensionesPantalla >= 600 && DimensionesPantalla <= 700) {
  marginAdapt = 0;
  marginTopTabla = '-20%';
  marginBottomTabla = 0;
} if (DimensionesPantalla >= 700 && DimensionesPantalla <= 800) {
  marginAdapt = '5%';
  marginTopTabla = '-15%';
  marginBottomTabla = 0;
} if (DimensionesPantalla >= 800 && DimensionesPantalla <= 900) {
  marginAdapt = '10%';
  marginTopTabla = '-13%';
  marginBottomTabla = -5;
} if (DimensionesPantalla >= 900 && DimensionesPantalla <= 1000) {
  marginAdapt = 80;
  marginTopTabla = '-10%';
  marginBottomTabla = -19;
}

const Ph = () => {

  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: (nPH / 14) * 180, // Rotación gradual desde cero hasta el valor de nPH
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/phA.jpeg')} style={styles.imagen}></Image>
      <Image source={require('../../assets/phlogo2.png')} style={styles.imagenSuperpuesta}></Image>

      <View style={styles.tableContainer}>
        <View style={styles.table1}>
          <View style={[styles.tableRow]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla1}>Hoy</Text>
            </View>
          </View>
          <View style={[styles.tableRow]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla1}>Ultima vez</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>{nPH}</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>11.5</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contenedorMedidor}>
        <Image source={require('../../assets/nivelPH.png')} style={styles.nivelPh}></Image>

        <Animated.Image
          source={require('../../assets/flecharoja2.png')}
          style={[
            styles.flecha,
            {
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'], // Cambia el ángulo de rotación gradualmente
                  }),
                },
              ],
            },
          ]}
        />
        <Image source={require('../../assets/phlogo.png')} style={styles.phlogo}></Image>

        <Text style={styles.textoMedidor}>Datos del mes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textoMedidor: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#265327',
    marginTop: 5,
  },
  phlogo: {
    width: 85,
    height: 85,
    marginTop: -71,
  },
  nivelPh: {
    width: 400,
    height: 190,
    marginTop: 10,
  },

  contenedorMedidor: {
    width: 350,
    height: 250,
    borderRadius: 30,
    marginTop: marginAdapt,
    alignItems: 'center',
    position: 'relative',
  },
  flecha: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 230,
    height: 230,
    marginTop: -70,
    marginLeft: -113,
  },
  textoTabla: {
    marginBottom: -12,
    marginTop: 10,
    fontSize: 20,
  },
  textoTabla1: {
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  imagen: {
    width: '100%',
    height: '32%',
    resizeMode: 'stretch',
    position: 'absolute',
  },
  imagenSuperpuesta: {
    marginTop: '8%',
    width: '55%',
    height: '55%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'80%',
    marginLeft: -45,
    marginTop: marginTopTabla,
    marginBottom: marginBottomTabla,
  },
  table: {
    flex: 1,
  },
  table1: {
    flex: 1,
    marginTop: 11,
    marginRight: -20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginTop: -15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export { nPH };
export default Ph;
