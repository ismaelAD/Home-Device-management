import { Picker } from '@react-native-picker/picker';
import {
  addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CrossPlatformSlider from '../../components/CrossPlatformSlider';
import { db } from '../../firebaseConfig';

const devicesCol = collection(db, 'devices');

const DEVICE_TYPES = [
  { label: 'Light', value: 'light' },
  { label: 'Thermostat', value: 'thermostat' },
  { label: 'Smart Plug', value: 'plug' },
  { label: 'Camera', value: 'camera' },
  { label: 'Blinds', value: 'blinds' },
];

export default function ManageDevicesScreen({ darkMode }) {
  const [devices, setDevices] = useState([]);

  const [name, setName] = useState('');
  const [type, setType] = useState(DEVICE_TYPES[0].value);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState(0);
  const [editSwitch, setEditSwitch] = useState(false);

  // 🔄 Écoute en temps réel
  useEffect(() => {
    const q = query(devicesCol, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDevices(list);
    });
    return unsub;
  }, []);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const data = { name: trimmed, type, createdAt: Date.now() };
    switch (type) {
      case 'light': data.isOn = false; data.brightness = 0; break;
      case 'thermostat': data.temperature = 20; break;
      case 'plug':
      case 'camera': data.isOn = false; break;
      case 'blinds': data.position = 0; break;
    }

    await addDoc(devicesCol, data);
    setName('');
  };

  const openEdit = device => {
    setCurrentDevice(device);
    setEditName(device.name);

    if (device.type === 'light') {
      setEditValue(device.brightness);
      setEditSwitch(device.isOn);
    } else if (device.type === 'thermostat') {
      setEditValue(device.temperature);
      setEditSwitch(false);
    } else if (device.type === 'plug' || device.type === 'camera') {
      setEditSwitch(device.isOn);
    } else if (device.type === 'blinds') {
      setEditValue(device.position);
      setEditSwitch(false);
    }

    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!currentDevice) return;
    const ref = doc(db, 'devices', currentDevice.id);
    const updates = { name: editName.trim() };
    switch (currentDevice.type) {
      case 'light':
        updates.isOn = editSwitch;
        updates.brightness = editValue;
        break;
      case 'thermostat':
        updates.temperature = editValue;
        break;
      case 'plug':
      case 'camera':
        updates.isOn = editSwitch;
        break;
      case 'blinds':
        updates.position = editValue;
        break;
    }

    await updateDoc(ref, updates);
    setModalVisible(false);
    setCurrentDevice(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#1A1A1A' : '#F3F4F6' }]}>
      <Text style={[styles.title, { color: darkMode ? '#FFF' : '#111827' }]}>Manage Devices</Text>

      {/* Formulaire d'ajout */}
      <View style={styles.form}>
        <TextInput
          style={[styles.input, {
            backgroundColor: darkMode ? '#2A2A2E' : '#FFF',
            color: darkMode ? '#FFF' : '#111827',
            borderColor: darkMode ? '#3E3E42' : '#D1D5DB',
          }]}
          placeholder="Device name"
          placeholderTextColor={darkMode ? '#888' : '#666'}
          value={name}
          onChangeText={setName}
        />
        <View style={[styles.pickerWrapper, {
          backgroundColor: darkMode ? '#2A2A2E' : '#FFF',
          borderColor: darkMode ? '#3E3E42' : '#D1D5DB',
        }]}>
          <Picker
            selectedValue={type}
            onValueChange={setType}
            style={{ color: darkMode ? '#FFF' : '#111827' }}
            dropdownIconColor={darkMode ? '#FFF' : '#111827'}
          >
            {DEVICE_TYPES.map(d => (
              <Picker.Item key={d.value} label={d.label} value={d.value} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Device</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des appareils */}
      {devices.length === 0 ? (
        <Text style={{ color: darkMode ? '#888' : '#666', textAlign: 'center', marginTop: 20 }}>
          No devices yet.
        </Text>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={[styles.deviceRow, {
              borderBottomColor: darkMode ? '#3E3E42' : '#D1D5DB'
            }]}>
              <Text style={{ color: darkMode ? '#FFF' : '#111827', flex: 1 }}>
                {item.name} ({item.type})
              </Text>
              <TouchableOpacity style={styles.editButton} onPress={() => openEdit(item)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal édition */}
      <Modal
        visible={modalVisible}
        transparent animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: darkMode ? '#2A2A2E' : '#FFF' }]}>
            <Text style={[styles.modalTitle, { color: darkMode ? '#FFF' : '#111827' }]}>
              Edit Device
            </Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: darkMode ? '#1E1E1E' : '#F3F4F6',
                color: darkMode ? '#FFF' : '#111827',
                borderColor: darkMode ? '#444' : '#D1D5DB',
              }]}
              placeholder="Device name"
              placeholderTextColor={darkMode ? '#888' : '#666'}
              value={editName}
              onChangeText={setEditName}
            />

            {/* Contrôles dynamiques */}
            {currentDevice?.type === 'light' && (
              <>
                <View style={styles.row}>
                  <Text style={{ color: darkMode ? '#FFF' : '#000', marginRight: 8 }}>On/Off</Text>
                  <Switch value={editSwitch} onValueChange={setEditSwitch} />
                </View>
                <Text style={{ color: darkMode ? '#AAA' : '#555' }}>Brightness: {editValue}%</Text>
                <CrossPlatformSlider
                  minimumValue={0} maximumValue={100} step={1}
                  value={editValue} onValueChange={setEditValue}
                />
              </>
            )}
            {currentDevice?.type === 'thermostat' && (
              <>
                <Text style={{ color: darkMode ? '#AAA' : '#555' }}>Temperature: {editValue}°C</Text>
                <CrossPlatformSlider
                  minimumValue={10} maximumValue={30} step={1}
                  value={editValue} onValueChange={setEditValue}
                />
              </>
            )}
            {(currentDevice?.type === 'plug' || currentDevice?.type === 'camera') && (
              <View style={styles.row}>
                <Text style={{ color: darkMode ? '#FFF' : '#000', marginRight: 8 }}>On/Off</Text>
                <Switch value={editSwitch} onValueChange={setEditSwitch} />
              </View>
            )}
            {currentDevice?.type === 'blinds' && (
              <>
                <Text style={{ color: darkMode ? '#AAA' : '#555' }}>Position: {editValue}%</Text>
                <CrossPlatformSlider
                  minimumValue={0} maximumValue={100} step={1}
                  value={editValue} onValueChange={setEditValue}
                />
              </>
            )}

            {/* Boutons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#2563EB' }]}
                onPress={handleSave}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#888' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, padding: 20 },
  title:         { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  form:          { marginBottom: 30 },
  input:         {
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 10, fontSize: 16, marginBottom: 14,
  },
  pickerWrapper: { borderWidth: 1, borderRadius: 10, marginBottom: 14, overflow: 'hidden' },
  addButton:     { backgroundColor: '#2563EB', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  deviceRow:     { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  editButton:    { backgroundColor: '#2563EB', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 },
  editButtonText:{ color: '#FFF', fontSize: 14 },
  modalOverlay:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent:  { width: '85%', borderRadius: 12, padding: 20 },
  modalTitle:    { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  modalButtons:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalBtn:      { flex: 1, borderRadius: 8, paddingVertical: 12, marginHorizontal: 5, alignItems: 'center' },
  modalBtnText:  { color: '#FFF', fontSize: 16 },
  row:           { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
});
