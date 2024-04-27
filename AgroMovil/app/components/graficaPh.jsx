import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowDimensions = Dimensions.get('window');
const DimensionesPantalla = windowDimensions.height;

let alto;

if (DimensionesPantalla >= 600 && DimensionesPantalla <= 700) {
    alto = 159;
} else if (DimensionesPantalla >= 700 && DimensionesPantalla <= 800) {
    alto = 160;
} else if (DimensionesPantalla >= 800 && DimensionesPantalla <= 900) {
    alto = 159;
} else if (DimensionesPantalla >= 900 && DimensionesPantalla <= 1000) {
    alto = 170;
}

const GraficaPh = () => {
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#fff' : 'black';
    const color = theme === 'dark' ? (opacity = .5) => `rgba(255, 0, 0, ${opacity})` : (opacity = .5) => `rgba(0, 24, 143, ${opacity})`;
    
    const { phValueAll } = useAuth();
    const ph = phValueAll || []; // Agregamos un operador de coalescencia para manejar el caso en que phValueAll sea null o undefined

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
        color: color,
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

    return (
        <LineChart
            data={{
                labels: generateLabels(), // Utilizamos la función generateLabels para obtener las etiquetas dinámicas
                datasets: [
                    {
                        data: ph.slice(0, 24) // Utilizamos slice para asegurarnos de que solo tomamos los primeros 24 elementos de ph
                    }
                ]
            }}
            width={windowWidth * 3}
            height={windowHeight * 0.3}
            yAxisInterval={1}
            chartConfig={chartConfig}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                marginLeft: -40
            }}
        />
    );
}

export { GraficaPh };
