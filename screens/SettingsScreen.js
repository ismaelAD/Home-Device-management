import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = ({ darkMode, onToggleDarkMode }) => (
  <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>  
    <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Paramètres</Text>
    <View style={styles.option}>
      <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Mode sombre</Text>
      <Switch value={darkMode} onValueChange={onToggleDarkMode} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 18 },
});

export default SettingsScreen;