import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState('light');
  
    useEffect(() => {
      const getDarkModeState = async () => {
        try {
          const storedDarkModeState = await AsyncStorage.getItem('darkMode');
          if (storedDarkModeState !== null) {
            setTheme(JSON.parse(storedDarkModeState));
          }
        } catch (error) {
          console.error('Error al obtener el estado del modo oscuro desde AsyncStorage:', error);
        }
      };
  
      getDarkModeState();
    }, []);
  
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
