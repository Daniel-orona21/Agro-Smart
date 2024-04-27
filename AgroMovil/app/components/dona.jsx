import React from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '../context/themeContext';
import { Svg, Circle } from 'react-native-svg';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dona = () => {
  const { theme } = useTheme();
  const { humedadValue } = useAuth();
  const humedadConstante = humedadValue;
  const circleRadius = windowWidth*.065;
  const circleStrokeWidth = windowWidth*.065;
  const circleCenter = circleRadius + circleStrokeWidth / 2;
  const percentage = humedadConstante;

  const circumference = 2 * Math.PI * circleRadius;

  const dashLength = (percentage / 100) * circumference;

  const gapLength = circumference - dashLength;

  const color = theme === 'dark' ? '#0098FF' : '#0098FF';
  const emptyColor = theme === 'dark' ? 'rgba(0, 152, 255, 0.5)' : 'rgba(0, 152, 255, 0.5)';

  return (
    <View style={{ width:windowWidth*.2, height:windowWidth*.2, marginLeft: 2}}>
      <Svg width={windowWidth*.25} height={windowWidth*.25}>
        <Circle
          cx={circleCenter}
          cy={circleCenter}
          r={circleRadius}
          fill="none"
          stroke={emptyColor}
          strokeWidth={windowWidth*.035}
        />

        <Circle
          cx={circleCenter}
          cy={circleCenter}
          r={circleRadius}
          fill="none"
          stroke={color}
          strokeWidth={windowWidth*.035}
          strokeDasharray={`${dashLength}, ${gapLength}`}
          strokeDashoffset={windowWidth*.103} 
        />
      </Svg>
    </View>
  );
}

export default Dona;
