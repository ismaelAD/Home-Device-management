import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import DeviceItem from '../components/DeviceItem';

const initialDevices = [
  { id: '1', name: 'Lampe Salon', type: 'light', state: true, brightness: 75 },
  { id: '2', name: 'Chauffage', type: 'thermostat', temperature: 22 },
  { id: '3', name: 'Lampe Chambre', type: 'light', state: false, brightness: 0 },
];

const HomeScreen = ({ darkMode }) => {
  const [devices, setDevices] = useState(initialDevices);
  const updateDevice = (id, newProps) => {
    setDevices(devs => devs.map(d => (d.id === id ? { ...d, ...newProps } : d)));
  };
  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>  
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Simulateur de Maison Connectée</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DeviceItem device={item} darkMode={darkMode} onChange={props => updateDevice(item.id, props)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default HomeScreen;