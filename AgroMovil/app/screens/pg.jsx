import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const nPH = 8;

const Ph = () => {

  const [phLevel, setPhLevel] = useState(0);
  const [celda2Value, setCelda2Value] = useState(nPH); // <-- aqui va el valor del fakin ph

  useEffect(() => {
    
    setPhLevel(celda2Value);
  }, [celda2Value]);

 
  const calculateRotation = () => {
    if (nPH === 0) return '0deg';
    if (nPH === 1) return '10deg';
    if (nPH === 2) return '23deg';
    if (nPH === 3) return '35deg';
    if (nPH === 4) return '49deg';
    if (nPH === 5) return '62deg';
    if (nPH === 6) return '75deg';
    if (nPH === 7) return '90deg';
    if (nPH === 8) return '103deg';
    if (nPH === 9) return '116deg';
    if (nPH === 10) return '130deg';
    if (nPH === 11) return '144deg';
    if (nPH === 12) return '156deg';
    if (nPH === 13) return '168deg';
    if (nPH === 14) return '180deg';

   
    const minRotation = 0;
    const maxRotation = 180;

  
    const rotation = minRotation + ((phLevel - 0) / (14 - 0)) * (maxRotation - minRotation);
    return `${rotation}deg;`
  };

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

        <Image
          source={require('../../assets/flecharoja2.png')}
          style={[styles.flecha, { transform: [{ rotate: calculateRotation() }] }]}
        />
        <Image source={require('../../assets/phlogo.png')} style={styles.phlogo}></Image>
 
      
      <Text style={styles.textoMedidor}>
        Datos del mes
      </Text>
    

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
  textoMedidor:{
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#265327',
    marginTop: 5,
  },
  phlogo:{
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
    backgroundColor: '#CACACA',
    borderRadius: 30,
    marginTop: 30,
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
    marginTop: 140,
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
    marginTop: -15
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export { nPH };
export default Ph;
