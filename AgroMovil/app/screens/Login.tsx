import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fontSize = Math.min(windowWidth, windowHeight) * .2; 

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [apellido, setApellido] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password, name, apellido); 
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
      closeModal(); 
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
          <View style={styles.campos}>
          <Text style={styles.txt2}>Nombre</Text>
          <TextInput
              style={styles.input}
              placeholder='Nombre'
              onChangeText={(text: string) => setName(text)}
              value={name}
            />
          <Text style={styles.txt2}>Apellido</Text>
          <TextInput
              style={styles.input}
              placeholder='Apellido'
              onChangeText={(text: string) => setApellido(text)}
              value={apellido}
            />
            <Text style={styles.txt2}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={(text: string) => setEmail(text.toLowerCase())}
              value={email}
            />
            <Text style={styles.txt2}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(text: string) => setPassword(text)}
              value={password}
            />
            
            <TouchableOpacity onPress={register}>
          <View style={styles.registrar}>
            <Text style={styles.entrar2}>✓</Text>
          </View>
          </TouchableOpacity>
            </View>    
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
    marginTop: 70,
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
    height: 44,
    padding: 10,
    backgroundColor: '#fff',
    width: 280,
  
  },
  txt2: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -173, 
    marginTop: -184,
    width: '87%',
    height: 'auto',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  botonModal2: {
    position: 'absolute',
    left: 135,
    bottom: 10,
    marginBottom: -26,
    width: 20,
    height: 20,
    backgroundColor: '#B4B4B4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBotonModal: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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
    marginTop: 23,
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
