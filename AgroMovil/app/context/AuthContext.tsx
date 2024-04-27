import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"; 
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: any | null;  
  };
  onRegister?: (email: string, password: string, usuario: string, tipo: string, name: string, cantidad: string, cultivo: string, capacidad: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://backmovil.onrender.com';
// export const API_URL = 'http://192.168.1.8:3001';
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
  const [phValue, setPhValue] = useState<number | null>(null); 
  const [ambienteValue, setAmbienteValue] = useState<number | null>(null); 
  const [aguaValue, setAguaValue] = useState<number | null>(null); 
  const [nivelValue, setNivelValue] = useState<string | null>(null); 
  const [humedadValue, setHumedadValue] = useState<number | null>(null); 
  const [phValueAll, setPhValueAll] = useState<number | null>(null); 
  const [ambienteValueAll, setAmbienteValueAll] = useState<number | null>(null); 
  const [aguaValueAll, setAguaValueAll] = useState<number[] | null>(null); 
  const [nivelValueAll, setNivelValueAll] = useState<string | null>(null); 
  const [humedadValueAll, setHumedadValueAll] = useState<string[] | null>(null);

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

  useEffect(() => {
    const getLatestPhValue = async () => {
      try {
        const response = await axios.get(`${API_URL}/phcharts/latest`);
        const { ph } = response.data;
        setPhValue(ph); // actualizar el estado con el último valor de pH
      } catch (error) {
        console.error('Error al obtener el último valor de pH:', error);
      }
    };

    getLatestPhValue(); // llamar a la función cuando se monta el componente
  }, []);

  useEffect(() => {
    const getLatestNivelValue = async () => {
      try {
        const response = await axios.get(`${API_URL}/nivelcharts/latest`);
        const { nivel } = response.data;
        setNivelValue(nivel); // actualizar el estado con el último valor de nivel
      } catch (error) {
        console.error('Error al obtener el último valor de Nivel:', error);
      }
    };

    getLatestNivelValue();

  }, []);

  useEffect(() => {
    const getLatestHumedadValue = async () => {
      try {
        const response = await axios.get(`${API_URL}/humedadcharts/latest`);
        const { humedad } = response.data;
        console.log("Último valor de humedad:", humedad);
        setHumedadValue(humedad); // actualizar el estado con el último valor de nivel
      } catch (error) {
        console.error('Error al obtener el último valor de humedad:', error);
      }
    };

    getLatestHumedadValue();

  }, []);

  useEffect(() => {
    const getLatestAmbienteValue = async () => {
      try {
        const response = await axios.get(`${API_URL}/ambientecharts/latest`);
        const { datosAmbiente } = response.data;
        console.log("Último valor de ambiente:", datosAmbiente);
        setAmbienteValue(datosAmbiente); // actualizar el estado con el último valor de ambiente
      } catch (error) {
        console.error('Error al obtener el último valor de ambiente:', error);
      }
    };

    getLatestAmbienteValue();

  }, []);

  useEffect(() => {
    const getLatestAguaValue = async () => {
      try {
        const response = await axios.get(`${API_URL}/aguacharts/latest`);
        const { datosAgua } = response.data;
        console.log("Último valor de agua:", datosAgua);
        setAguaValue(datosAgua); // actualizar el estado con el último valor de agua
      } catch (error) {
        console.error('Error al obtener el último valor de agua:', error);
      }
    };

    getLatestAguaValue();

  }, []);

  
  useEffect(() => {
    const getAllPh = async () => {
      try {
        const response = await axios.get(`${API_URL}/phcharts/all`);
        if (response.data && response.data.ph && Array.isArray(response.data.ph)) {
          const last23PhValues = response.data.ph.slice(-23); // Obtener los últimos 23 datos de pH
          setPhValueAll(last23PhValues); // actualizar el estado con los últimos 23 valores de pH
        } else {
          console.error('La respuesta del servidor no contiene los datos de pH esperados.');
        }
      } catch (error) {
        console.error('Error al obtener el valor del ph total:', error);
      }
    };
    
    getAllPh();
  }, []);

  useEffect(()=>{
    console.log("grafica de ph: ",phValueAll)
  },[phValueAll])
  
  useEffect(() => {
    const getAllHumedad = async () => {
      try {
        const response = await axios.get(`${API_URL}/humedadcharts/all`);
        if (response.data && response.data.humedad && Array.isArray(response.data.humedad)) {
          const last23HumedadValues = response.data.humedad.slice(-23); // Obtener los últimos 23 datos de humedad
          setHumedadValueAll(last23HumedadValues); // actualizar el estado con los últimos 23 valores de humedad
        } else {
          console.error('La respuesta del servidor no contiene los datos de humedad esperados.');
        }
      } catch (error) {
        console.error('Error al obtener el valor de humedad total:', error);
      }
    };
  
    getAllHumedad();
  }, []);

  useEffect(()=>{
    console.log("grafica humedad: ",humedadValueAll)
  },[humedadValueAll])
  
  

  useEffect(() => {
  const getAllNivel = async () => {
    try {
      const response = await axios.get(`${API_URL}/nivelcharts/all`);
      if (response.data && response.data.nivel && Array.isArray(response.data.nivel)) {
        const last23NivelValues = response.data.nivel.slice(-23); // Obtener los últimos 23 datos de nivel
        setNivelValueAll(last23NivelValues); // actualizar el estado con los últimos 23 valores de nivel
      } else {
        console.error('La respuesta del servidor no contiene los datos de nivel esperados.');
      }
    } catch (error) {
      console.error('Error al obtener el valor del nivel total:', error);
    }
  };

  getAllNivel();
}, []);

  useEffect(()=>{
    console.log("grafica de nivel: ",nivelValueAll)
  },[nivelValueAll])

  useEffect(() => {
    const getAguaAll = async () => {
      try {
        const response = await axios.get(`${API_URL}/aguacharts/all`);
        if (response.data && response.data.agua && Array.isArray(response.data.agua)) {
          const last23AguaValues = response.data.agua.slice(-23); // Obtener los últimos 23 datos de temperatura del agua
          setAguaValueAll(last23AguaValues); // actualizar el estado con los últimos 23 valores de temperatura del agua
        } else {
          console.error('La respuesta del servidor no contiene los datos de temperatura del agua esperados.');
        }
      } catch (error) {
        console.error('Error al obtener el valor de temperatura del agua total:', error);
      }
    };
  
    getAguaAll();
  }, []);

  useEffect(()=>{
    console.log("grafica de temperatura agua: ",aguaValueAll)
  },[aguaValueAll])

  useEffect(() => {
    const getAmbienteAll = async () => {
      try {
        const response = await axios.get(`${API_URL}/ambientecharts/all`);
        if (response.data && response.data.ambiente && Array.isArray(response.data.ambiente)) {
          const last23AmbienteValues = response.data.ambiente.slice(-23); // Obtener los últimos 23 datos de temperatura ambiente
          setAmbienteValueAll(last23AmbienteValues); // actualizar el estado con los últimos 23 valores de temperatura ambiente
        } else {
          console.error('La respuesta del servidor no contiene los datos de temperatura ambiente esperados.');
        }
      } catch (error) {
        console.error('Error al obtener el valor de temperatura ambiente total:', error);
      }
    };
  
    getAmbienteAll();
  }, []);

  useEffect(()=>{
    console.log("grafica de temperatura ambiente: ",ambienteValueAll)
  },[ambienteValueAll])

  const register = async (email: string, password: string, usuario: string, tipo: string, name: string, cantidad: string, cultivo: string, capacidad: string) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password, usuario, tipo, name, cantidad, cultivo, capacidad });
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
    phValue,
    nivelValue,
    humedadValue,
    ambienteValue,
    aguaValue,
    humedadValueAll,
    phValueAll,
    nivelValueAll,
    aguaValueAll,
    ambienteValueAll,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
