import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Dimensions } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import PickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dimensiones = (windowHeight*windowWidth)/2;

const fontSize = Math.min(windowWidth, windowHeight) * .2; 

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usuario, setUsuario] = useState(''); 
  const [tipo, setTipo] = useState('');
  const [name, setName] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [cultivo, setCultivo] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sound] = useState();

  const { onLogin, onRegister } = useAuth();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../../assets/sonidos/succes.mp3')
    );
    await sound.playAsync();
  }

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
     
      showMessage({
        message: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
        type: "success",
        icon: "success",
      });
      playSound()
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };
  const register = async () => {
    
    if (!usuario  || !email || !password || !tipo || !name ||!cantidad || !cultivo ||!capacidad){
     
      Alert.alert("Todos los campos son obligatorios");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return; 
    }

    if (password !== confirmPassword) { // Verificar si las contraseñas coinciden
      Alert.alert("Las contraseñas no coinciden");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

     // Verificar si el correo electrónico tiene un formato válido
     const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (!emailPattern.test(email)) {
       Alert.alert("Por favor, ingresa un correo electrónico válido");
       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
       return;
     }

    try {
      const result = await onRegister!(email, password, usuario, tipo, name, cantidad, cultivo, capacidad ); 
      if (result && result.error) {
        alert(result.msg);
      } else {
        login();
        closeModal(); 
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Error durante el registro. Por favor, intenta nuevamente.");
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ImageBackground source={require('../../assets/fondo2.jpeg')} blurRadius={0} style={styles.backgroundImage}>
    
    <View style={styles.container}>

    <Text style={styles.nombre}>Agro Smart Tech</Text>
      <View style={styles.form}>
        <Text style={styles.text2}>Email</Text>
        <TextInput
          style={styles.emailInput}
          placeholder='Email'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          onChangeText={(text: string) => setEmail(text.toLowerCase())}
          value={email}
        />
        <Text style={styles.text1}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder='Password'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
<TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Modal 
        transparent={true}
        animationType="slide" 
        visible={isModalVisible} 
        onRequestClose={closeModal}>
          
          <View style={styles.modalContainer}>
          <Text style={styles.txtModal2}>Sign In</Text>
          <TouchableOpacity onPress={closeModal}>
          <View style={styles.botonModal2}>
            <Text style={styles.txtBotonModal}>✕</Text>
          </View>
          </TouchableOpacity>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.campos}>

          <Text style={styles.txt2}>Nombre(s)</Text>
          <TextInput
              style={styles.input}
              placeholder='Luis Rodríguez'
              onChangeText={(text: string) => setUsuario(text)}
              value={usuario}
            />
            <Text style={styles.txt2}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='lius@gmail.com'
              onChangeText={(text: string) => setEmail(text.toLowerCase())}
              value={email}

            />
            <Text style={styles.txt2}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder='********'
              secureTextEntry={true}
              onChangeText={(text: string) => setPassword(text)}
              value={password}
            />
            <Text style={styles.txt2}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='********'
          secureTextEntry={true}
          onChangeText={(text: string) => setConfirmPassword(text)}
          value={confirmPassword}
        />
            <Text style={styles.txt2}>Seleccione tipo de pez</Text>
            <PickerSelect
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                  height: 50
                },
              }}
              placeholder={{
                label: 'Seleccione un pez',
                value: null,
              }}
              onValueChange={(value) => setTipo(value)}
              items={[
                { label: 'Trucha', value: 'Trucha' },
                { label: 'Tilapia', value: 'Tilapia' },
              ]}
            />
            <Text style={styles.txt2}>Cantidad de peces</Text>
            <PickerSelect
  style={{
    inputIOS: {
      fontSize: 16,
      color: 'black',
      height: 50
    },
  }}
  placeholder={{
    label: 'Cantidad',
    value: null,
  }}
  onValueChange={(value) => setCantidad(value)}
  items={[
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 },
    { label: '24', value: 24 },
    { label: '25', value: 25 },
  ]}
/>

<Text style={styles.txt2}>Nombre de tu Invernadero</Text>
<TextInput
  style={styles.input}
  placeholder='Mi invernadero'
  onChangeText={(text: string) => setName(text)}
  value={name}
/>
<Text style={styles.txt2}>Seleccione tipo de cultivo</Text>
<PickerSelect
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                  height: 50
                },
              }}
              placeholder={{
                label: 'Seleccionar cultivo',
                value: null,
              }}
              onValueChange={(value) => setCultivo(value)}
              items={[
                { label: 'Lechuga', value: 'Lechuga' },
                { label: 'Chile', value: 'Chile' },
              ]}
            />
            <Text style={styles.txt2}>Capacidad de cultivo</Text>
            <PickerSelect
  style={{
    inputIOS: {
      fontSize: 16,
      color: 'black',
      height: 50
    },
  }}
  placeholder={{
    label: 'Capacidad',
    value: null,
  }}
  onValueChange={(value) => setCapacidad(value)}
  items={[
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 },
    { label: '24', value: 24 },
    { label: '25', value: 25 },
  ]}
/>
            <TouchableOpacity onPress={register}>
          <View style={styles.registrar}>
            <Text style={styles.entrar2}>✓</Text>
          </View>
          </TouchableOpacity>
            </View> 
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
    color: 'rgba(255, 255, 255, .5)',
    fontWeight: 'bold',
    fontSize: fontSize,
    textAlign: 'center',
  },
  campos: {
    marginTop: 20,
  },
  logo: {
    width: 30,
    height: 40,
    marginTop: 25,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  form: {
    gap: 10,
    width: '60%',
  },
  txtModal2: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 10,
    marginBottom: -40,
    color: 'black',
    },
  input: {
    height: windowWidth*.12,
    padding: 10,
    width: 280,
  },
  select: {
    height: 30
  },
  txt2: {
    fontWeight: 'bold',
    fontSize: windowWidth*.04,
    marginBottom: 5
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    alignSelf: 'center',
    width: '87%',
    height: windowHeight*.65,
    borderRadius: 10,
    marginTop: windowHeight*.17,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  botonModal2: {
    position: 'absolute',
    flex: 1,
    right: '-52%',
    width: 25,
    height: 25,
    backgroundColor: '#B4B4B4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBotonModal: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  scroll: {
    marginTop: 50,
  },
  text1: {
    fontSize: 13,
    marginTop: -7,
    fontWeight: 'bold',
    color: 'white'
  },
  text2: {
    fontSize: 14,
    marginTop: -7,
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  registrar: {
    width: '90%',
    height: 30,
    backgroundColor: '#B4B4B4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '2%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  entrar2: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
  },
  emailInput: {
    height: 44,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    marginBottom: 10,
  },
  passwordInput: {
    height: 44,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    marginBottom: 10,
  },
});

export default Login;
