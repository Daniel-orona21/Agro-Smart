import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Reemplaza con tu biblioteca
import { useNavigation } from '@react-navigation/native';

const IconoPerfil = () => {
    const navigation = useNavigation();
  
    const navegarPerfil = () => {
      navigation.navigate('Perfil');
    };
  
    return (
      <View style={{ paddingRight: 10 }}>
        <TouchableOpacity onPress={navegarPerfil}>
          <MaterialCommunityIcons name="account" size={35} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  

export default IconoPerfil;
