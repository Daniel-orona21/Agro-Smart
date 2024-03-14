import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importación de pantallas
import Dashboard from "./dashboard";
import Ph from "./pg";
import NivelAguaScreen from "./nivel";
import Temperaturas from "./temperaturas";
import Humedad from "./humedad";

// Importación de iconos
import { Entypo, FontAwesome6, MaterialIcons} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export function Home() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); 

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#737373',
        tabBarStyle: {
          backgroundColor: '#E3E1E1',
          borderRadius: 10,
          alignItems: 'center',
          position: 'absolute',
          left: 10,
          right: 10,
          height: 60,
          bottom: 30,
          
        },
        tabBarIconStyle: {
          marginBottom: 15,
        },
        tabBarLabelStyle: {
          marginBottom: -25,
        },
        
      }}
    >
      <Tab.Screen 
                name="PH" 
                component={Ph} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={[styles.tabIconContainer, color === 'white' && styles.activeIconContainer]}>
                            <Entypo name="bar-graph" size={size} color={color}  />
                        </View>
                        ),
                        headerTransparent: true,
                    }}
            />
            <Tab.Screen
                name="Temperaturas" 
                component={Temperaturas} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={[styles.tabIconContainer, color === 'white' && styles.activeIconContainer]}>
                            <FontAwesome6 name="temperature-half" size={size} color={color} />
                        </View>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                            height: 110,    
                        },
                        headerTitleContainerStyle: {
                            marginTop: 45,
                          },
                          headerTitleStyle: {
                            fontSize: 24, // Ajusta el valor según tus necesidades para cambiar el tamaño de la letra
                          },
                    }}
            />
                    <Tab.Screen 
                        name="Dashboard" 
                        component={Dashboard} 
                        options={{
                            tabBarIcon: ({ color }) => (
                                <View style={[styles.tabIconContainer, color === 'white' && styles.activeIconContainer]}>
                                   <MaterialIcons name="space-dashboard" size={34} color={color} />
                                </View>
                            ),
                            headerStyle: {
                              backgroundColor: 'white',
                              height: 100,    
                          },
                          headerTitleContainerStyle: {
                              marginTop: 45,
                            },
                            headerTitleStyle: {
                              fontSize: 24, // Ajusta el valor según tus necesidades para cambiar el tamaño de la letra
                            },
                            title: 'Invernadero',
                     
                        }}
                    />
            <Tab.Screen 
                name="Nivel" 
                component={NivelAguaScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={[styles.tabIconContainer, color === 'white' && styles.activeIconContainer]}>
                            <FontAwesome6 name="house-flood-water" size={size} color={color} />
                        </View>
                    ),
                    
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Humedad" 
                component={Humedad} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={[styles.tabIconContainer, color === 'white' && styles.activeIconContainer]}>
                            <FontAwesome6 name="droplet" size={size} color={color} />
                        </View>
                    ),
                    
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 70,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  activeIconContainer: {
    backgroundColor: '#860000',
    borderRadius: 10,
    height: 65,
  },
});

export default Home;
