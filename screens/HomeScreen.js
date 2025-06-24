// screens/HomeScreen.js
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import DeviceItem from '../components/DeviceItem';

const initialDevices = [
  { id: '1', name: 'Living Room Lamp', type: 'light', state: true, brightness: 75 },
  { id: '2', name: 'Heater', type: 'thermostat', temperature: 22 },
  { id: '3', name: 'Bedroom Lamp', type: 'light', state: false, brightness: 0 },
];

export default function HomeScreen({ darkMode }) {
  const [devices, setDevices] = useState(initialDevices);

  const updateDevice = (id, newProps) => {
    setDevices(devs =>
      devs.map(d => (d.id === id ? { ...d, ...newProps } : d))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#121212' : '#fff' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>
          Smart Devices Control
        </Text>

        {devices.map(device => (
          <DeviceItem
            key={device.id}
            device={device}                // ← on passe bien la prop `device`
            darkMode={darkMode}
            onChange={props => updateDevice(device.id, props)}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
