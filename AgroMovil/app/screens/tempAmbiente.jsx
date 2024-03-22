import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const temperaturaAmbiente = 40; //valor de humedad en base de datos

const Ambiente = ({ temperatura = temperaturaAmbiente }) => {
  const anguloRotacion = (temperatura / 49) * 180;

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/inver.avif')} style={styles.imagen}></Image>
      <Image source={require('../../assets/hot.jpeg')} style={styles.imagenSuperpuesta}></Image>

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
              <Text style={styles.textoTabla}>{temperaturaAmbiente}°</Text>
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
        <Image source={require('../../assets/calentura.jpg')} style={styles.nivelPh}></Image>

        <Image
          source={require('../../assets/flecha1.png')}
          style={[styles.flecha, { transform: [{ rotate: `${anguloRotacion}deg` }] }]}
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
    height: 200,
    resizeMode: 'cover',
  },
  imagenSuperpuesta: {
    position: 'absolute',
    marginTop: 95,
    width: 220,
    height: 220,
    borderRadius: 120,
    resizeMode: 'cover',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  tableContainer: {
    marginTop: 130,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%',
    marginLeft: -45,
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
    marginTop: -20,
  },
 
  nivelPh: {
    width: 280,
    height: 180,
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
    marginTop: -40,
    marginLeft: -96,
  },

});

export {temperaturaAmbiente};
export default Ambiente;