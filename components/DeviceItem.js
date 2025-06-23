import React from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';

const bulbIcon = require('../assets/icons/lamp.png');

const DeviceItem = ({ device, darkMode, onChange }) => {
  const baseColor = darkMode ? '#ffd600' : '#FFD700';
  const opacity = device.state ? device.brightness / 100 : 0.2;
  return (
    <View style={[styles.itemContainer, { borderColor: darkMode ? '#333' : '#ccc' }]}>  
      <View style={styles.info}>
        <Text style={[styles.name, { color: darkMode ? '#fff' : '#000' }]}>{device.name}</Text>
        {device.type === 'light' && (
          <View style={styles.lightContainer}>
            <Image
              source={bulbIcon}
              style={{ width: 40, height: 40, tintColor: baseColor, opacity }}
            />
            <View style={styles.controls}>
              <Switch
                trackColor={{ false: '#767577', true: darkMode ? '#81b0ff' : '#4cd137' }}
                thumbColor={device.state ? baseColor : '#f4f3f4'}
                value={device.state}
                onValueChange={val => onChange({ state: val, brightness: val ? device.brightness || 50 : 0 })}
              />
              {device.state && (
                <Slider
                  style={{ width: 150, height: 40 }}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={device.brightness}
                  minimumTrackTintColor={darkMode ? '#81b0ff' : '#4cd137'}
                  maximumTrackTintColor={darkMode ? '#555' : '#ccc'}
                  thumbTintColor={baseColor}
                  onValueChange={val => onChange({ brightness: val })}
                />
              )}
            </View>
          </View>
        )}
        {device.type === 'thermostat' && (
          <View style={styles.thermoContainer}>
            <Text style={{ color: darkMode ? '#fff' : '#000' }}>{device.temperature}°C</Text>
            <Slider
              style={{ width: 150, height: 40 }}
              minimumValue={5}
              maximumValue={30}
              step={1}
              value={device.temperature}
              minimumTrackTintColor={darkMode ? '#ff7675' : '#e17055'}
              maximumTrackTintColor={darkMode ? '#555' : '#ccc'}
              thumbTintColor={darkMode ? '#ff7675' : '#e17055'}
              onValueChange={val => onChange({ temperature: val })}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: { padding: 12, borderBottomWidth: 1 },
  info: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 18 },
  lightContainer: { flexDirection: 'row', alignItems: 'center' },
  controls: { marginLeft: 12, alignItems: 'center' },
  thermoContainer: { alignItems: 'center' },
});

export default DeviceItem;