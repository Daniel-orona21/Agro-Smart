import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Dimensions } from 'react-native';

export let marginTopTabla;
export let marginBottomTabla;

const temperatura = 25; 
const windowDimensions = Dimensions.get('window');
  const DimensionesPantalla = windowDimensions.height;

  if (DimensionesPantalla >= 600 && DimensionesPantalla <= 700) {

    marginTopTabla = '-18%';
    marginBottomTabla = '-11%'; 
  } if ( DimensionesPantalla >= 700 && DimensionesPantalla <= 800 ) {

    marginTopTabla = '-15%';
    marginBottomTabla = '-5%';
  } if ( DimensionesPantalla >= 800 && DimensionesPantalla <= 900 ) {

    marginTopTabla = '-13%';
    marginBottomTabla = -5;
  } if ( DimensionesPantalla >= 900 && DimensionesPantalla <= 1000 ) {

    marginTopTabla = '-13%';
    marginBottomTabla = 25;
  } 

const TempAgua = () => {

  
    const obtenerImagenSegunTemperatura = () => {
      if (temperatura >= 18 && temperatura <= 28) {
        return require('../../assets/pez1.jpg');
      } else if ((temperatura >= 2 && temperatura < 18) || (temperatura > 28 && temperatura <= 32)) {
        return require('../../assets/pez2.jpg');
      } else {
        return require('../../assets/pez3.jpg');
      }
    };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/phA.jpeg')} style={styles.imagen}></Image>
      <Image source={require('../../assets/hot.jpeg')} style={styles.imagenSuperpuesta}></Image>

      <View style={styles.tableContainer}>
        {/* Tabla 1: Celdas 1 y 3 */}
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

        {/* Tabla 2: Celdas 2 y 4 */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>{temperatura}°C</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>Hace 1h</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contenedor del medidor */}
      <View style={styles.contenedorMedidor}>
        <Image source={obtenerImagenSegunTemperatura()} style={styles.pez}></Image>
      </View>

    <TouchableOpacity>
      <View>
      <Text style={styles.textoMedidor}>
        Datos del mes
      </Text>
    </View>
    </TouchableOpacity>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
    
  },
  pez:{
    width:200,
    height:200,
    resizeMode: 'contain'
  },
  contenedorMedidor: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
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
    position: 'absolute'
  },
  imagenSuperpuesta: {
    marginTop: '16%',
    width: '45%',
    height: '45%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  tableContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%',
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
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  textoMedidor:{
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#265327',
    marginTop: 5,
  },

});

export {temperatura};
export default TempAgua;