import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { authState, onLogout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {

    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Aceptar',
          onPress: () => {
            onLogout();
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (

        <View style={styles.container}>

          <View style={styles.circulo}>
            <Text style={styles.logo}>{authState.user.name.substring(0, 1)}{authState.user.apellido.substring(0, 1)}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{authState.user.name} {authState.user.apellido}</Text>
            <Text style={styles.mail}>{authState.user.email}</Text>
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.botonCerrar}>
            <Text style={styles.textoBoton}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -135
  },
  
  circulo: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: '#84898F',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 41,
    color: '#ABADAE',
    marginTop: 10,
  },
  mail: {
    marginTop: 5,
    color: '#ABADAE',
    fontSize: 20
  },
  logo: {
    fontSize: 70,
    color: 'white'
  },
  botonCerrar: {
    width: 125,
    height: 35,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 25,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  }
})

export default ProfileScreen;
