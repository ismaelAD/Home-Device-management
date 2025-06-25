import Slider from '@react-native-community/slider';
import React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const LightCard = ({ light, onToggle, onBrightnessChange }) => {
  const [brightness, setBrightness] = React.useState(light.brightness || 0);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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

  const handleBrightnessChange = (value) => {
    setBrightness(value);
    onBrightnessChange(Math.round(value));
  };

  React.useEffect(() => {
    setBrightness(light.brightness || 0);
  }, [light.brightness]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💡</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Smart Light #1</Text>
          <Text style={styles.status}>
            {light.on ? 'On' : 'Off'} • {Math.round(light.brightness || 0)}% brightness
          </Text>
        </View>
      </View>

      <View style={styles.visualContainer}>
        <View style={[
          styles.lightBulb,
          {
            backgroundColor: light.on && light.brightness > 0 
              ? `rgba(255, 235, 59, ${(light.brightness || 0) / 100})` 
              : '#f0f0f0',
            shadowOpacity: light.on && light.brightness > 0 ? 0.8 : 0,
          }
        ]}>
          <Text style={[styles.bulbIcon, { 
            color: light.on && light.brightness > 0 ? '#f57f17' : '#ccc' 
          }]}>
            💡
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.toggleButton, light.on ? styles.toggleOn : styles.toggleOff]}
          onPress={handleToggle}
        >
          <Text style={[styles.toggleText, { color: light.on ? 'white' : '#666' }]}>
            {light.on ? 'Turn Off' : 'Turn On'}
          </Text>
        </TouchableOpacity>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Brightness: {Math.round(brightness)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={brightness}
            onValueChange={handleBrightnessChange}
            minimumTrackTintColor="#2196F3"
            maximumTrackTintColor="#ddd"
            thumbStyle={{ backgroundColor: '#2196F3' }}
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
    backgroundColor: '#FFD700',
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
  lightBulb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  bulbIcon: {
    fontSize: 40,
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
    backgroundColor: '#2196F3',
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

export default LightCard;
