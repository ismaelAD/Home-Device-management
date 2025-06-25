import Slider from '@react-native-community/slider';
import React from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const BlindsCard = ({ blinds, onPositionChange }) => {
  const [position, setPosition] = React.useState(blinds.position || 0);
  const blindsAnim = React.useRef(new Animated.Value(blinds.position || 0)).current;

  const handlePositionChange = (value) => {
    setPosition(value);
    onPositionChange(Math.round(value));
    
    Animated.timing(blindsAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    setPosition(blinds.position || 0);
    Animated.timing(blindsAnim, {
      toValue: blinds.position || 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [blinds.position]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🪟</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Smart Blinds #1</Text>
          <Text style={styles.status}>{Math.round(blinds.position || 0)}% open</Text>
        </View>
      </View>

      <View style={styles.visualContainer}>
        <View style={styles.blindsFrame}>
          <Animated.View
            style={[
              styles.blindsSlats,
              {
                transform: [{
                  translateY: blindsAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [100, 0],
                  })
                }]
              }
            ]}
          />
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Position: {Math.round(position)}% open</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={position}
            onValueChange={handlePositionChange}
            minimumTrackTintColor="#8e44ad"
            maximumTrackTintColor="#ddd"
            thumbStyle={{ backgroundColor: '#8e44ad' }}
          />
        </View>
      </View>
    </View>
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
    backgroundColor: '#8e44ad',
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
  blindsFrame: {
    width: 200,
    height: 100,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#90caf9',
    overflow: 'hidden',
    position: 'relative',
  },
  blindsSlats: {
    position: 'absolute',
    width: '100%',
    height: 100,
    backgroundColor: '#424242',
    backgroundImage: 'repeating-linear-gradient(0deg, #424242 0px, #424242 8px, transparent 8px, transparent 12px)',
  },
  controls: {
    gap: 15,
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

export default BlindsCard;