import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const fuenteAdaptable = Math.min(windowWidth, windowHeight); 
export const nPH = 14; 
export const temperaturaAmbiente = 20;
export const temperatura = 9; 
export const nivel = 'Medio';
export const humedadConstante = 70; 

export const obtenerHoraRedondeada = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const roundedHour = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentHour, 0, 0);
    return roundedHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };



