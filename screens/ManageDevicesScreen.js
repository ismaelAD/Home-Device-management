import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ManageDevicesScreen = ({ devices, darkMode, onAdd, onUpdate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('light');

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      type,
      state: type === 'light' ? false : undefined,
      brightness: type === 'light' ? 0 : undefined,
      temperature: type === 'thermostat' ? 20 : undefined,
    });
    setName('');
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#f9f9f9' }]}>
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Manage Devices</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Device name"
          placeholderTextColor={darkMode ? '#888' : '#999'}
          style={[
            styles.input,
            {
              backgroundColor: darkMode ? '#1e1e1e' : '#fff',
              color: darkMode ? '#fff' : '#000',
              borderColor: darkMode ? '#444' : '#ccc',
            },
          ]}
          value={name}
          onChangeText={setName}
        />

        <View
          style={[
            styles.pickerWrapper,
            {
              backgroundColor: darkMode ? '#1e1e1e' : '#fff',
              borderColor: darkMode ? '#444' : '#ccc',
            },
          ]}
        >
          <Picker
            selectedValue={type}
            onValueChange={setType}
            dropdownIconColor={darkMode ? '#fff' : '#000'}
            style={{ color: darkMode ? '#fff' : '#000' }}
          >
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Thermostat" value="thermostat" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Device</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: darkMode ? '#aaa' : '#666', textAlign: 'center' }}>
            No devices added yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.deviceRow,
              {
                borderBottomColor: darkMode ? '#333' : '#ccc',
              },
            ]}
          >
            <Text style={{ color: darkMode ? '#fff' : '#000', flex: 1 }}>
              {item.name} ({item.type})
            </Text>
            <Button title="Edit" onPress={() => onUpdate(item.id, {})} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  form: { marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
});

export default ManageDevicesScreen;
