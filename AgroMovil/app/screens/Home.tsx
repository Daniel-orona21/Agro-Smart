import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {  useNavigation } from '@react-navigation/native';

//valores
import Dashboard from "./dashboard";
import Ph from "./pg";
import NivelAguaScreen from "./nivel";
import Temperaturas from "./temperaturas";
import Humedad from "./humedad";

// Importación de iconos
import { Entypo, FontAwesome6, MaterialIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const UserIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={{ marginRight: 15 }}>
      <MaterialIcons name="person" size={24} color="black" />
    </TouchableOpacity>
  );
};

export function Home() {

const Tab = createBottomTabNavigator();


  return (
    
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#737373',
        tabBarStyle: {
          backgroundColor: 'white',
          height: Platform.OS === 'android' ? '7%' : '9.5%', 

        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          marginBottom: 5, 
        },
        
      }}
    >
      <Tab.Screen 
                name="PH" 
                component={Ph} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.tabIconContainer}>
                            <Entypo name="bar-graph" size={size} color={color}  />
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
                            <FontAwesome6 name="temperature-half" size={size} color={color} />
                        </View>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                            height: 100,    
                        },
                          headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: 'bold'
                          },
                    }}
            />
                    <Tab.Screen 
                        name="Dashboard" 
                        component={Dashboard} 
                        options={{
                          headerRight: UserIcon,
                            tabBarIcon: ({ color }) => (
                                <View style={styles.tabIconContainer}>
                                   <MaterialIcons name="space-dashboard" size={34} color={color} />
                                </View>
                            ),
                              headerTitle: 'Invernadero',
                              headerTitleStyle: {
                                fontSize: 20,
                                fontWeight: 'bold'
                              },    
                        }}
                    />
            <Tab.Screen 
                name="Nivel" 
                component={NivelAguaScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.tabIconContainer}>
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
                        <View style={styles.tabIconContainer}>
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
    marginTop: 3,
  },
  
});

export default Home;
