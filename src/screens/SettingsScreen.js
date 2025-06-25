import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ darkMode, onToggleDarkMode, navigation }) => {
  
  const handleLogin = () => {
    // Vous pouvez naviguer vers AuthScreen ou afficher une modal
    Alert.alert(
      "Connexion",
      "Voulez-vous vous connecter ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "connect",
          onPress: () => {
            // Navigation vers AuthScreen si vous l'avez ajouté à la navigation
            // navigation.navigate('Auth');
            
            // Ou pour l'instant, juste un message
            Alert.alert("Info", "Fonctionnalité de connexion à venir");
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>Settings</Text>
      
      {/* Option Mode sombre */}
      <View style={styles.option}>
        <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>Dark mode</Text>
        <Switch 
          value={darkMode} 
          onValueChange={onToggleDarkMode}
          trackColor={{ false: '#767577', true: '#007AFF' }}
          thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      {/* Séparateur */}
      <View style={[styles.separator, { backgroundColor: darkMode ? '#333' : '#e0e0e0' }]} />

      {/* Bouton de connexion */}
      <TouchableOpacity 
        style={[styles.loginButton, { backgroundColor: darkMode ? '#007AFF' : '#007AFF' }]}
        onPress={handleLogin}
      >
        <Ionicons 
          name="log-in-outline" 
          size={20} 
          color="white" 
          style={styles.loginIcon}
        />
        <Text style={styles.loginButtonText}>Connect</Text>
      </TouchableOpacity>

      {/* Autres options que vous pouvez ajouter */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkMode ? '#ccc' : '#666' }]}>
          Account
        </Text>
        
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.label, { color: darkMode ? '#fff' : '#000' }]}>
            User profile
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={darkMode ? '#ccc' : '#666'} 
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.separator, { backgroundColor: darkMode ? '#333' : '#e0e0e0' }]} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkMode ? '#ccc' : '#666' }]}>
          Application
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24 
  },
  option: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12
  },
  label: { 
    fontSize: 18 
  },
  separator: {
    height: 1,
    marginVertical: 16
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 16
  },
  loginIcon: {
    marginRight: 8
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  section: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
});

export default SettingsScreen;