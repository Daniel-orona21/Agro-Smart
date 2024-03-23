
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pantallas
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import TempAgua from './app/screens/tempAgua';
import Ambiente from './app/screens/tempAmbiente';
import ProfileScreen from './app/screens/perfil';


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
          headerTitle: '',
          headerShown: false,
          headerTransparent: false,
        }}
      />
      ) : (
        <Stack.Screen name="Login" component={Login}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff',
          
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

      <Stack.Screen name="Perfil" component={ProfileScreen}
    
      
       /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
