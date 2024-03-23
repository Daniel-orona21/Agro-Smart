import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: any | null; // Puedes ajustar el tipo según la estructura de tu usuario
  };
  onRegister?: (email: string, password: string, name: string, lastName: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://172.20.96.199:3000'; //red escuela 172.20.98.143
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthProps["authState"]>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
        console.log("token: ", token);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const userResult = await axios.get(`${API_URL}/user`);

        setAuthState({
          token: token,
          authenticated: true,
          user: userResult.data,
        });
      }
    };

    loadToken();
  }, []);

  const register = async (email: string, password: string, name: string, apellido: string) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password, name, apellido});
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, { email, password });

      console.log("🚀 ~ file: AuthContext.tsx:41 ~ login ~ result:", result);

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      const userResult = await axios.get(`${API_URL}/user`);

      // Actualiza el estado solo con el token y autenticación
      setAuthState({
        token: result.data.token,
        authenticated: true,
        user: userResult.data,
      });

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
      user: null,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
