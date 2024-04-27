import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import aguasOscuro from '../../assets/aguas.gif';
import aguasClaro from '../../assets/pecesClaro.gif';
import flamasOscuro from '../../assets/flames.gif';
import { useTheme } from '../context/themeContext';
import flamesClaro from '../../assets/flamasClaro.gif';

const fondoClaro = require('../../assets/fondoph5.jpg');
const fondoOscuro = require('../../assets/fondoph3.jpg');

export default function Temperaturas() {
    const { theme } = useTheme(); 
    const navigation = useNavigation();
    const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;
    const flamas = theme === 'dark' ? flamasOscuro : flamesClaro;
    const peces = theme === 'dark' ? aguasOscuro : aguasClaro;

    return (
        <ImageBackground source={imagenFondo} style={styles.container}>
            <TouchableOpacity style={styles.contenedor} onPress={() => navigation.navigate('TempAmbiente')}>
                <Image source={flamas} style={styles.gif}/>
                <View style={styles.caja}></View>
                <Text style={styles.titulo}>Ambiental</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.contenedor} onPress={() => navigation.navigate('TempAgua')}>
                <Image source={peces} style={styles.gif}/>
                <View style={styles.caja}></View>
                <Text style={styles.titulo}>Temperatura en Agua</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        maxHeight: '100%'
    },
    contenedor: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '35%',
        padding: 10
    },
    gif: {
        width: '100%',  
        height: '100%',
        borderRadius: 20,
    },
    titulo: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        position: 'absolute', 
    },
    caja: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        position: 'absolute',
        borderRadius: Platform.OS === 'android' ? 0 : 20,
    }
});
