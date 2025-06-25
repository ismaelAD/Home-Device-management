import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import CrossPlatformSlider from '../../components/CrossPlatformSlider';
import { db } from '../../firebaseConfig';


const bulbIcon = require('../../assets/icons/lamp.png'); // Assurez-vous que l'icône est dans le bon dossier

export default function HomeScreen({ darkMode }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'devices'), snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDevices(list);
    });
    return () => unsubscribe();
  }, []);

  const updateDevice = async (id, newProps) => {
    try {
      const ref = doc(db, 'devices', id);
      await updateDoc(ref, newProps);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#1A1A1A' : '#F3F4F6' }]}>
      <Text style={[styles.title, { color: darkMode ? '#FFF' : '#111827' }]}>
        Smart Devices Control
      </Text>

      {devices.length === 0 ? (
        <Text style={{ color: darkMode ? '#888' : '#666', textAlign: 'center', marginTop: 20 }}>
          No devices found.
        </Text>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={[styles.deviceBox, { backgroundColor: darkMode ? '#2A2A2E' : '#FFF', borderColor: darkMode ? '#3E3E42' : '#D1D5DB' }]}>
              <Text style={{ color: darkMode ? '#FFF' : '#111827', fontWeight: '600', fontSize: 16, marginBottom: 8 }}>
                {item.name} ({item.type})
              </Text>

              {/* Light */}
              {item.type === 'light' && (
                <>
                  <View style={styles.row}>
                    <Text style={[styles.label, { color: darkMode ? '#FFF' : '#000' }]}>On/Off</Text>
                    <Switch
                      value={item.isOn}
                      onValueChange={val => updateDevice(item.id, {
                        isOn: val,
                        brightness: val ? (item.brightness || 50) : 0
                      })}
                      trackColor={{ false: '#767577', true: '#2563EB' }}  // Track du switch en bleu
                      thumbColor={item.isOn ? '#2563EB' : '#f4f3f4'}  // Couleur du curseur du switch (bleu si on, gris clair si off)
                    />
                  </View>
                  {item.isOn && (
                    <>
                      <Text style={[styles.valueText, { color: darkMode ? '#AAA' : '#555' }]}>
                        Brightness: {item.brightness}%
                      </Text>
                      <CrossPlatformSlider
                        value={item.brightness}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        onValueChange={val => updateDevice(item.id, { brightness: val })}
                        minimumTrackTintColor='#2563EB' // Couleur de la barre du curseur (bleu)
                        maximumTrackTintColor={darkMode ? '#555' : '#ccc'}
                        thumbTintColor='#2563EB' // Couleur de la "boule" du curseur (bleu)
                      />
                    </>
                  )}
                </>
              )}

              {/* Thermostat */}
              {item.type === 'thermostat' && (
                <>
                  <Text style={[styles.valueText, { color: darkMode ? '#AAA' : '#555' }]}>
                    Temperature: {item.temperature}°C
                  </Text>
                  <CrossPlatformSlider
                    value={item.temperature}
                    minimumValue={10}
                    maximumValue={30}
                    step={1}
                    onValueChange={val => updateDevice(item.id, { temperature: val })}
                    minimumTrackTintColor='#2563EB' // Couleur de la barre du curseur (bleu)
                    maximumTrackTintColor={darkMode ? '#555' : '#ccc'}
                    thumbTintColor='#2563EB' // Couleur de la "boule" du curseur (bleu)
                  />
                </>
              )}

              {/* Plug / Camera */}
              {(item.type === 'plug' || item.type === 'camera') && (
                <View style={styles.row}>
                  <Text style={[styles.label, { color: darkMode ? '#FFF' : '#000' }]}>On/Off</Text>
                  <Switch
                    value={item.isOn}
                    onValueChange={val => updateDevice(item.id, { isOn: val })}
                    trackColor={{ false: '#767577', true: '#2563EB' }}  // Track du switch en bleu
                    thumbColor={item.isOn ? '#2563EB' : '#f4f3f4'}  // Couleur du curseur du switch (bleu si on, gris clair si off)
                  />
                </View>
              )}

              {/* Blinds */}
              {item.type === 'blinds' && (
                <>
                  <Text style={[styles.valueText, { color: darkMode ? '#AAA' : '#555' }]}>
                    Position: {item.position}%
                  </Text>
                  <CrossPlatformSlider
                    value={item.position}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    onValueChange={val => updateDevice(item.id, { position: val })}
                    minimumTrackTintColor='#2563EB' // Couleur de la barre du curseur (bleu)
                    maximumTrackTintColor={darkMode ? '#555' : '#ccc'}
                    thumbTintColor='#2563EB' // Couleur de la "boule" du curseur (bleu)
                  />
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  deviceBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  valueText: {
    fontSize: 14,
    marginBottom: 8,
  },
});
