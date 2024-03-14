import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Asegúrate de ajustar la ruta


const ProfileScreen = () => {
  const { authState, onLogout } = useAuth();

  useEffect(() => {
    // Aquí podrías realizar alguna lógica adicional al cargar el perfil
  }, []);

  return (
    <View>
    
      {authState.authenticated && authState.user && (
        <View style={styles.container}>
          
          
          <View style={styles.circulo}>
          <Text style={styles.logo}>{authState.user.name.substring(0, 1)}{authState.user.apellido.substring(0, 1)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{authState.user.name} {authState.user.apellido}</Text>
            <Text style={styles.mail}>{authState.user.email}</Text>
          </View>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circulo: {
    width: 160,
    height: 160,
    borderRadius: 100,
    bottom: 85,
    backgroundColor: '#84898F',
    // Agrega sombra
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: 350,
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 45,
    color: '#ABADAE'
  },
  mail: {
    marginTop: 5,
    color: '#ABADAE',
    fontSize: 20
  },
  logo: {
    fontSize: 70,
    position: 'absolute',
    color: 'white'
  }
})


export default ProfileScreen;

