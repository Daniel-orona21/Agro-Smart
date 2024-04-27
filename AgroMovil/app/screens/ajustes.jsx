import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext'; 
import { useNavigation } from '@react-navigation/native';
import { useMovimiento } from '../context/movimiento';
import { useTheme } from '../context/themeContext';

export const tema = 'light';

const AjustesScreen = () => {
  const { authState, onLogout } = useAuth();
  const navigation = useNavigation();
  const { movementEnabled, setMovementEnabled } = useMovimiento();
  const { theme, setTheme } = useTheme(); // Usa el contexto de tema

  const toggleSwitch = async () => {
    const newValue = !movementEnabled;
    setMovementEnabled(newValue); // Actualiza el estado en el contexto
    try {
      await AsyncStorage.setItem('switchState', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error al guardar el estado del switch:', error);
    }
  };

  const toggleSwitchDark = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error al guardar el estado del modo oscuro:', error);
    }
  };

  useEffect(() => {
    const getSwitchState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('switchState');
        if (storedState !== null) {
          setMovementEnabled(JSON.parse(storedState));
        }
      } catch (error) {
        console.error('Error al obtener el estado del switch desde AsyncStorage:', error);
      }
    };

    const getDarkModeState = async () => {
      try {
        const storedDarkModeState = await AsyncStorage.getItem('darkMode');
        if (storedDarkModeState !== null) {
          setTheme(JSON.parse(storedDarkModeState));
        }
      } catch (error) {
        console.error('Error al obtener el estado del modo oscuro desde AsyncStorage:', error);
      }
    };

    getSwitchState();
    getDarkModeState();
  }, []);

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

          }
        }
      ]
    );
  };

  const fondo = theme === 'dark' ? 'black' : '#E8E8E8';
  const textColor = theme === 'dark' ? '#fff' : 'black';
  const temah1 = theme === 'dark' ? '#fff' : 'black';
  const temah2 = theme === 'dark' ? '#fff' : 'black';
  const caja = theme === 'dark' ? '#1A1A1A' : '#fff';
  

  return (
    <View style={[styles.container, { backgroundColor: fondo}]}>
      <SafeAreaView>
        <View style={[styles.info, {backgroundColor: caja}]}>
          <View style={styles.circulo}>
          <Text style={styles.logo}>{authState.user && authState.user.usuario ? authState.user.usuario.substring(0, 1) : ''}</Text>
          </View>
          <View style={styles.nombres}>
            <Text style={[styles.name, {color: temah1}]}>{authState.user.usuario}</Text>
            <Text style={[styles.mail, {color: temah2}]}>{authState.user.email}</Text>
          </View>
        </View>

        <View style={[styles.ajustes, {backgroundColor: caja}]}>
          <View style={styles.opcion}>
            <Text style={[styles.txt, { color: textColor }]}>Movimiento</Text>
            <Switch
              trackColor={{false: '#767577', true: '#27DD63'}}
              thumbColor={movementEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={movementEnabled}
              style={styles.switch}
            />
          </View>


          <View style={styles.opcion2}>
            <Text style={[styles.txt, , { color: textColor }]}>Tema oscuro</Text>
           <Switch
            trackColor={{ false: '#767577', true: '#27DD63' }}
            thumbColor={theme === 'dark' ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchDark}
            value={theme === 'dark'}
            style={styles.switch}
          />
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.botonCerrar}>
          <Text style={styles.textoBoton}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circulo: {
    width: 100,
    height: 100,
    borderRadius: 70,
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
    height: 'auto',
    width: 'auto',
    margin: 20,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  ajustes: {
    height: 'auto',
    width: 'auto',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  opcion: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: .17,
    borderBottomColor: 'gray'
  },
  opcion2: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    flex: 1,
    left: 20,
    fontSize: 17
  },
  switch: {
    right: 20
  },
  name: {
    fontWeight: '400',
    fontSize: 21,
    color: 'white',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  mail: {
    color: 'white',
    fontSize: 15
  },
  logo: {
    fontSize: 55,
    color: 'white',
  },
  nombres: {
    justifyContent: 'center',
    margin: 20
  },
  botonCerrar: {
    backgroundColor: '#DE0000',
    margin: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
  }
});

export default AjustesScreen;
