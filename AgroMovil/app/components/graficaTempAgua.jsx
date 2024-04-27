import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GraficaTemperaturaAgua = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : 'black';
  const { aguaValueAll } = useAuth();
  const agua = aguaValueAll || [];

  // Función para generar las etiquetas de hora dinámicas
  const generateLabels = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const labels = [];
    for (let i = 0; i < 24; i++) {
        const hour = (currentHour - i + 24) % 24; // Ajustar la hora hacia atrás y considerar el ciclo de 24 horas
        labels.unshift(`${hour.toString().padStart(2, '0')}:00`);
    }
    return labels;
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 182, 255, ${opacity})`,
    labelColor: (opacity = 1) => textColor,
    decimalPlaces: 0,
    strokeWidth: 3,
    barPercentage: 1,
    useShadowColorFromDataset: true,
    propsForDots: {
      r: '0',
      strokeWidth: '2',
      stroke: 'red',
    },
    fillShadowGradientOpacity: 0.5
  };

  // Filtramos los valores nulos y luego aplicamos toFixed() a los valores restantes
  const data = agua.filter(value => value !== null).map(value => value.toFixed(2));

  return (
    <LineChart
      data={{
        labels: generateLabels(), // Utilizamos la función generateLabels para obtener las etiquetas dinámicas
        datasets: [
          {
            data: data.slice(0, 24) // Utilizamos slice para asegurarnos de que solo tomamos los primeros 24 elementos de data
          }
        ]
      }}
      width={windowWidth * 3}
      height={windowHeight * 0.3}
      yAxisInterval={1}
      chartConfig={chartConfig}
      style={{
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: -38
      }}
    />
  );
}

export { GraficaTemperaturaAgua };
