
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';


//pantallas
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import TempAgua from './app/screens/tempAgua';
import Ambiente from './app/screens/tempAmbiente';
import Perfil from './app/screens/perfil';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return(
    <NavigationContainer>
      <Stack.Navigator>
      { authState?.authenticated ? (
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff', // Color del texto del header
          headerRight: () => <Button onPress={onLogout} title="Sign out" />
        }}></Stack.Screen>
      ) : (
        <Stack.Screen name="Login" component={Login}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff', // Color del texto del header
          
        }}
        ></Stack.Screen>
        
        
      )}
       <Stack.Screen name="TempAmbiente" component={Ambiente}
       options={{
        headerTitle: 'Temperatura Ambiental',
        headerTintColor: 'black', 

      }} />
       <Stack.Screen name="TempAgua" component={TempAgua}
       options={{
        headerTitle: 'Temperatura del Agua',
        headerTintColor: 'black', 
      }} />

      <Stack.Screen name="Perfil" component={Perfil}
       /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
