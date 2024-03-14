import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const nivel = 'Medio'; //variable en base de datos 

  const NivelAguaScreen =  () => {
    let estiloColor;
  
    

    if (nivel === 'Lleno') {
      estiloColor = {
        width: 10,
        height: 90,
        backgroundColor: '#00D80F',
        position: 'absolute',
        left: 64,
        bottom: 45,
      };
    } else if (nivel === 'Medio') {
      estiloColor = {
        width: 10,
        height: 45,
        backgroundColor: 'orange',
        position: 'absolute',
        left: 64,
        bottom: 45,
      };
    } else if (nivel === 'Vacio') {
      estiloColor = {
        width: 10,
        height: 15,
        backgroundColor: 'red',
        position: 'absolute',
        left: 64,
        bottom: 45,
      };
    } 

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/aguas.jpg')} style={styles.imagen}></Image>
      <Image source={require('../../assets/nivelAguas.jpg')} style={styles.imagenSuperpuesta}></Image>

      <View style={styles.tableContainer}>
        {/* Tabla 1: Celdas 1 y 3 */}
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

        {/* Tabla 2: Celdas 2 y 4 */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.borderBottom]}>
            <View style={styles.tableCell}>
              <Text style={styles.textoTabla}>{nivel}</Text>
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
        <View style={estiloColor}></View>
        <Image source={require('../../assets/tank.png')} style={styles.tank}></Image>
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
  tank:{
    width:180,
    height: 180,
  },
  color1:{
    width: 10,
    height: 90,
    backgroundColor: '#00D80F',
    position: 'absolute', 
    left: 64,
    bottom: 45,
  },
  color2:{
    width: 10,
    height: 45,
    backgroundColor: 'orange',
    position: 'absolute', 
    left: 64,
    bottom: 45,
  },
  color3:{
    width: 10,
    height: 15,
    backgroundColor: 'red',
    position: 'absolute', 
    left: 64,
    bottom: 45,
  },
  contenedorMedidor: {
    width: 250,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 30,
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
    height: 235,
    resizeMode: 'cover',
  },
  imagenSuperpuesta: {
    position: 'absolute',
    marginTop: 120,
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
    marginTop: 5,
  },

});

export {nivel};
export default NivelAguaScreen;