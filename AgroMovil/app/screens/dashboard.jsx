import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';



// valores
import { nPH } from './pg';
import { temperaturaAmbiente } from './tempAmbiente';
import { temperatura } from './tempAgua';
import { nivel } from './nivel';
import { humedadConstante } from './humedad';


export default function Dashboard() {
const navigation = useNavigation();

//Semaforo para ph
const semaforoPH = () => {
  if (nPH >= 6 && nPH <= 8) {
    return require('../../assets/semaforo1.png');
  } else if ((nPH >= 3 && nPH <= 6) || (nPH >= 8 && nPH <= 9)) {
    return require('../../assets/semaforo2.png');
  } else {
    return require('../../assets/semaforo3.png');
  }
};

//Semaforo para Ambiente
const ambiente = () => {
  if (temperaturaAmbiente >= 18 && temperaturaAmbiente <= 24) {
    return require('../../assets/semaforo1.png');
  } else if ((temperaturaAmbiente >= 15 && temperaturaAmbiente <= 17) || (temperaturaAmbiente > 24 && temperaturaAmbiente <= 27)) {
    return require('../../assets/semaforo2.png');
  } else {
    return require('../../assets/semaforo3.png');
  }
};

//semaforo para agua
const aguaTemperatura = () => {
  if (temperatura >= 18 && temperatura <= 28) {
    return require('../../assets/semaforo1.png');
  } else if ((temperatura >= 2 && temperatura < 18) || (temperatura > 28 && temperatura <= 32)) {
    return require('../../assets/semaforo2.png');
  } else {
    return require('../../assets/semaforo3.png');
  }
};

//semaforo para Nivel
const tanque = () => {
  if (nivel === 'Lleno') {
    return require('../../assets/semaforo1.png');
  } else if (nivel === 'Medio') {
    return require('../../assets/semaforo2.png');
  } else {
    return require('../../assets/semaforo3.png');
  }
};

//semaforo para humedad
const humedadS = () => {
  if (humedadConstante >= 60 && humedadConstante <= 70) {
    return require('../../assets/semaforo1.png');
  } else if ((humedadConstante >= 50 && humedadConstante < 60) || (humedadConstante > 70 && humedadConstante <= 80)) {
    return require('../../assets/semaforo2.png');
  } else {
    return require('../../assets/semaforo3.png');
  }
};



  return (
    
    <View style={styles.contenedor}>

      {/* PH */}
      <View style={styles.caja}>
        <Image source={require('../../assets/phlogo2.png')} style={styles.img} />
          <View style={styles.caja2}>
            <Text style={styles.h1}>PH</Text>
            <Text style={styles.h2}>Escala en: {nPH}</Text>
          </View>
          <Image source={semaforoPH()} style={styles.semaforo} />  
      </View>

       {/* Temperatura del ambiente */}
      <View style={styles.caja}>
      <Image source={require('../../assets/casita.png')} style={styles.img} />
          <View style={styles.caja2}>
            <Text style={styles.h1}>Ambiente</Text>
            <Text style={styles.h2}>{temperaturaAmbiente}°C</Text>
          </View>
          <Image source={ambiente()} style={styles.semaforo} />
      </View>

       {/* Temperatura del agua */}
      <View style={styles.caja}>
      <Image source={require('../../assets/gotas1.png')} style={styles.img} />
          <View style={styles.caja2}>
            <Text style={styles.h1}>Agua</Text>
            <Text style={styles.h2}>{temperatura}°C</Text>
          </View>
          <Image source={aguaTemperatura()} style={styles.semaforo} />
      </View>

       {/* Nivel del agua */}
      <View style={styles.caja}>
      <Image source={require('../../assets/nivelAguas2.png')} style={styles.img} />
          <View style={styles.caja2}>
            <Text style={styles.h1}>Nivel</Text>
            <Text style={styles.h2}>{nivel}</Text>
          </View>
          <Image source={tanque()} style={styles.semaforo} />
      </View>

       {/* Humedad */}
      <View style={styles.caja}>
      <Image source={require('../../assets/humedad5.png')} style={styles.imgU} />
          <View style={styles.caja2}>
            <Text style={styles.h1}>Humedad</Text>
            <Text style={styles.h2}>{humedadConstante}%</Text>
          </View>
          <Image source={humedadS()} style={styles.semaforo} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({

  contenedor: {
    alignItems: 'center',
    maxHeight: '100%',
  },
  img: {
    width: 80,
    height: 80,
    marginLeft: -5,
  },
  imgU: {
    width: 80,
    height: 80,
    marginLeft: -5,
    borderRadius: 50,
  },
  semaforo: {
    width: 20,
    height: 50,
    marginLeft: 25
  },
  caja: {
    width: '85%',
    height: '18.5%',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  caja2: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -10,
    width: 220,
    marginLeft: -30,
    justifyContent: 'center',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    fontStyle: 'italic'
  },
  h2: {
    fontSize: 15,
  }

});

