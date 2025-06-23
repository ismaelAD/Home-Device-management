import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ManageDevicesScreen = ({ devices, darkMode, onAdd, onUpdate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('light');

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>  
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Gérer les appareils</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Nom de l'appareil"
          placeholderTextColor={darkMode ? '#888' : '#666'}
          style={[styles.input, { color: darkMode ? '#fff' : '#000', borderColor: darkMode ? '#333' : '#ccc' }]}
          value={name}
          onChangeText={setName}
        />
        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={[styles.picker, { color: darkMode ? '#fff' : '#000' }]}
        >
          <Picker.Item label="Lampe" value="light" />
          <Picker.Item label="Thermostat" value="thermostat" />
        </Picker>
        <Button title="Ajouter" onPress={() => { onAdd({ name, type, state: type==='light'?false:undefined, brightness:type==='light'?0:undefined, temperature:type==='thermostat'?20:undefined }); setName(''); }} />
      </View>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.deviceRow, { borderColor: darkMode ? '#333' : '#ccc' }]}>  
            <Text style={{ color: darkMode ? '#fff' : '#000', flex: 1 }}>{item.name} ({item.type})</Text>
            <Button title="Modif" onPress={() => onUpdate(item.id, {} /* open edit UI if desired */)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  form: { marginBottom: 24 },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 },
  picker: { height: 50, marginBottom: 12 },
  deviceRow: { flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1 },
});

export default ManageDevicesScreen;
