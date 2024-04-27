import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTheme } from '../context/themeContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GraficaHumedad = () => {

    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#fff' : 'black';

    const { humedadValueAll } = useAuth();
    const humedad = humedadValueAll || [];

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const getCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        setCurrentTime(getCurrentTime());

        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 182, 255, ${opacity})`,
        labelColor: (opacity = 1) => textColor,
        decimalPlaces: 0,
        useShadowColorFromDataset: true,
        propsForDots: {
            r: '0',
            strokeWidth: '2',
            stroke: 'red',
        },
        fillShadowGradientOpacity: 0.5
    };

    // Generar etiquetas con la hora actual y las horas anteriores
    const generateLabels = () => {
        const labels = [];
        let currentHour = parseInt(currentTime.split(':')[0]);
        for (let i = 0; i < 24; i++) {
            labels.unshift(`${currentHour.toString().padStart(2, '0')}:00`);
            currentHour = (currentHour - 1 + 24) % 24; // Ajustar la hora hacia atrás y considerar el ciclo de 24 horas
        }
        return labels;
    };

    const labels = generateLabels();

    return (
        <LineChart
            data={{
                labels: labels,
                datasets: [
                    {
                        data: humedad.slice(0, 24)
                    }
                ]
            }}
            width={windowWidth * 3}
            height={windowHeight * 0.3}
            chartConfig={chartConfig}
            style={{
                marginLeft: -32
            }}
        />
    );
}

export { GraficaHumedad };
