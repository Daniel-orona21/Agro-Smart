import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { marginBottomTabla, marginTopTabla } from './tempAgua';
import * as Animatable from 'react-native-animatable';

const humedadConstante = 30; // valor de humedad en base de datos

const NivelAguaScreen = ({ humedad = humedadConstante }) => {
  const [rotationDegree, setRotationDegree] = useState(0);

  useEffect(() => {
    // Restablecer la rotación al valor inicial cuando el componente se monta
    setRotationDegree(0);
  }, []);

  useEffect(() => {
    // Actualiza el estado de la rotación con el valor de la humedad
    setRotationDegree((humedad / 100) * 180);
  }, [humedad]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/humedad.jpeg')} style={styles.imagen}></Image>
      <Image source={require('../../assets/logoph5.png')} style={styles.imagenSuperpuesta}></Image>

      <View style={styles.tableContainer}>
        <View style={styles.table1}>
          <View style={[styles.tableRow]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla1}>Nivel</Text>
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
              <Text style={styles.textoTabla}>{humedadConstante}%</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>Hace 1h</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contenedorMedidor}>
        <Image source={require('../../assets/medidor.jpeg')} style={styles.nivelPh}></Image>

        <Animatable.Image
          animation={{
            from: { rotate: '0deg' },
            to: { rotate: `${rotationDegree}deg` }
          }}
          easing="linear"
          duration={1000}
          iterationCount={1}
          source={require('../../assets/flecha1.png')}
          style={styles.flecha}
        />
      </View>

      <View>
        <TouchableOpacity>
          <Text style={styles.textoMedidor}>
            Datos del mes
          </Text>
        </TouchableOpacity>
      </View>
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
  textoMedidor: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#265327',
    marginTop: -20,
  },

  nivelPh: {
    width: 250,
    height: 190,
    marginTop: 40,
  },
  contenedorMedidor: {
    width: 350,
    height: 250,
    marginTop: 30,
    alignItems: 'center',
    position: 'relative',
  },
  flecha: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginTop: -60,
    marginLeft: -96,
  },

});

export { humedadConstante };
export default NivelAguaScreen;
