import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";
import { BlurTint, BlurView } from 'expo-blur';

//pantallas
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import TempAgua from './app/screens/tempAgua';
import Ambiente from './app/screens/tempAmbiente';
import AjustesScreen from './app/screens/ajustes';

import MovimientoProvider from './app/context/movimientoPovider';
import { ThemeProvider, useTheme} from './app/context/themeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Layout></Layout>
      <FlashMessage position="top" />
    </AuthProvider>
    </ThemeProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#343434';
  const color = theme === 'dark' ? '#1A1A1A' : 'white';
  const tintValue: BlurTint = theme as BlurTint;
  return(
    <MovimientoProvider>
    <NavigationContainer>
      <Stack.Navigator>
      { authState?.authenticated ? (
        <>
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerTitle: '',
          headerShown: false,
          headerTransparent: false,
        }}
      />
       <Stack.Screen name="Ajustes" component={AjustesScreen}
      options={{
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: color,
        },
      }}
       /> 
      </>
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
        headerTintColor: textColor,
        headerTransparent: true, 
        headerBackground: () => ( 
          <BlurView intensity={70} tint={tintValue} style={[{ flex:1, borderBottomWidth: 1, borderColor: '#929292' }]}></BlurView>
       ),
      }} />
       <Stack.Screen name="TempAgua" component={TempAgua}
       options={{
        headerTitle: 'Temperatura del Agua',
        headerTintColor: textColor,
        headerTransparent: true, 
        headerBackground: () => ( 
          <BlurView intensity={70} tint={tintValue} style={[{ flex:1, borderBottomWidth: 1, borderColor: '#929292' }]}></BlurView>
       ),
      }} />
      </Stack.Navigator>
    </NavigationContainer>
    </MovimientoProvider>
  );
};