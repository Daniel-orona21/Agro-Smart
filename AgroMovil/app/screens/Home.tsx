import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import {  useNavigation } from '@react-navigation/native';


//valores
import Ph from "./pg";
import NivelAguaScreen from "./nivel";
import Temperaturas from "./temperaturas";
import Humedad from "./humedad";

// Importación de iconos
import { MaterialIcons, Feather} from '@expo/vector-icons';
import { BlurTint, BlurView } from "expo-blur";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dashboard from "./dashboard";
import { useTheme } from "../context/themeContext";

const Tab = createBottomTabNavigator();

const IconoAjustes = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const engrane = theme === 'dark' ? '#fff' : '#717171';

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Ajustes')} style={{ marginRight: 15 }}>
      <MaterialIcons name="settings" size={24} color={engrane} />
    </TouchableOpacity>
  );
};

export function Home() {
  const { theme } = useTheme(); 
const Tab = createBottomTabNavigator();
  const tintValue: BlurTint = theme as BlurTint;

  const textColor = theme === 'dark' ? '#fff' : '#343434';
  

  return (
    
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#8D8D8D',
      tabBarStyle: {
        position: 'absolute', 
        height: Platform.OS === 'android' ? '7%' : '9.5%', 
        borderTopWidth: 0.17
      },
      tabBarIconStyle: {
        marginBottom: 0,
      },
      tabBarLabelStyle: {
        marginBottom: 5,
         
      },
      tabBarBackground: () => ( 
      <BlurView intensity={50} tint={tintValue} style={{ flex: 1 }}>

      </BlurView>
    ),
      }}
    >
      <Tab.Screen 
                name="PH" 
                component={Ph} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.tabIconContainer}>
                            <Feather name="bar-chart" size={size} color={color} />
                        </View>
                        ),
                        headerTransparent: true,
                        headerShown: false
                    }}
            />
            <Tab.Screen
        
                name="Temperaturas" 
                component={Temperaturas} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.tabIconContainer}>
                            <MaterialCommunityIcons name="temperature-celsius" size={size} color={color} />
                        </View>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                            height: 100,    
                        },
                          headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: textColor
                          },
                          headerTransparent: true, 
                          headerShown: true,
                          headerBackground: () => ( 
                             <BlurView intensity={70} tint={tintValue} style={[{ flex:1, borderBottomWidth: 1, borderColor: '#929292' }]}></BlurView>
                          ),
                    }}
            />
            
                    <Tab.Screen 
                        name="Dashboard" 
                        component={Dashboard} 
                        options={{
                          headerRight: IconoAjustes,
                            tabBarIcon: ({focused}) => (
                                <View style={styles.tabIconContainer}>
                                   <Image
                                   source={focused ? require('../../assets/hoja.png') : require('../../assets/hoja2.png')} 
                                    style={styles.hoja} />
                                </View>
                            ),
                              headerTitle: 'Invernadero',
                              headerTitleStyle: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: textColor
                              },   
                              headerTransparent: true, 
                              headerShown: true,
                              headerBackground: () => ( 
                                 <BlurView intensity={70} tint={tintValue} style={[{ flex:1, borderBottomWidth: .5, borderColor: '#929292' }]}></BlurView>
                              ),
                        }}
                    />
            <Tab.Screen 
                name="Nivel" 
                component={NivelAguaScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.tabIconContainer}>
                            <MaterialCommunityIcons name="water-check-outline" size={34} color={color} />
                        </View>
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Humedad" 
                component={Humedad} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.tabIconContainer}>
                            <MaterialCommunityIcons name="water-percent" size={34} color={color} />
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
    marginTop: 3,
  },
  hoja: {
    width: 25,
    height: 30
  }
});

export default Home;
