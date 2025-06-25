import Slider from '@react-native-community/slider';
import React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const HeaterCard = ({ heater, onToggle, onTemperatureChange }) => {
  const [temperature, setTemperature] = React.useState(heater.temperature || 20);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onToggle();
  };

  const handleTemperatureChange = (value) => {
    setTemperature(value);
    onTemperatureChange(Math.round(value));
  };

  React.useEffect(() => {
    setTemperature(heater.temperature || 20);
  }, [heater.temperature]);

  React.useEffect(() => {
    if (heater.on) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [heater.on]);

  const getHeaterColor = () => {
    if (!heater.on) return '#95a5a6';
    const intensity = (heater.temperature - 10) / 20;
    const red = Math.round(231 + (24 * intensity));
    const green = Math.round(76 + (100 * (1 - intensity)));
    return `rgb(${red}, ${green}, 60)`;
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔥</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Smart Heater #1</Text>
          <Text style={styles.status}>
            {heater.on ? 'On' : 'Off'} • {Math.round(heater.temperature || 20)}°C
          </Text>
        </View>
      </View>

      <View style={styles.visualContainer}>
        <Animated.View style={[
          styles.heaterVisual,
          {
            backgroundColor: getHeaterColor(),
            shadowOpacity: heater.on ? glowAnim : 0,
            shadowColor: getHeaterColor(),
          }
        ]}>
          <Text style={styles.tempText}>{Math.round(heater.temperature || 20)}°C</Text>
        </Animated.View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.toggleButton, heater.on ? styles.toggleOn : styles.toggleOff]}
          onPress={handleToggle}
        >
          <Text style={[styles.toggleText, { color: heater.on ? 'white' : '#666' }]}>
            {heater.on ? 'Turn Off' : 'Turn On'}
          </Text>
        </TouchableOpacity>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Temperature: {Math.round(temperature)}°C</Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={30}
            value={temperature}
            onValueChange={handleTemperatureChange}
            minimumTrackTintColor="#e74c3c"
            maximumTrackTintColor="#ddd"
            thumbStyle={{ backgroundColor: '#e74c3c' }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  visualContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heaterVisual: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  controls: {
    gap: 15,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#e74c3c',
  },
  toggleOff: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    marginTop: 10,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  slider: {
    height: 40,
  },
});

export default HeaterCard;