import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { Image } from 'react-native';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './screens/HomeScreen';
import ManageDevicesScreen from './screens/ManageDevicesScreen';
import SettingsScreen from './screens/SettingsScreen';

enableScreens();
const Tab = createBottomTabNavigator();
const icons = {
  Home: require('./assets/icons/home.png'),
  Manage: require('./assets/icons/manage.png'),
  Settings: require('./assets/icons/settings.png'),
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [devices, setDevices] = useState([
    { id: '1', name: 'Lampe Salon', type: 'light', state: true, brightness: 75 },
    { id: '2', name: 'Chauffage', type: 'thermostat', temperature: 22 },
    { id: '3', name: 'Lampe Chambre', type: 'light', state: false, brightness: 0 },
  ]);

  const addDevice = device => {
    setDevices(prev => [...prev, { ...device, id: Date.now().toString() }]);
  };

  const updateDevice = (id, newProps) => {
    setDevices(prev => prev.map(d => (d.id === id ? { ...d, ...newProps } : d)));
  };

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={({ route, focused }) => ({
        headerShown: false,
        tabBarIcon: () => (
          <Image
            source={icons[route.name]}
            style={{ width: 24, height: 24, tintColor: focused ? (darkMode ? '#fff' : '#000') : '#888' }}
            resizeMode="contain"
          />
        ),
      })}>
        <Tab.Screen name="Home">
          {() => (
            <HomeScreen
              devices={devices}
              darkMode={darkMode}
              onChange={updateDevice}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Manage">
          {() => (
            <ManageDevicesScreen
              devices={devices}
              darkMode={darkMode}
              onAdd={addDevice}
              onUpdate={updateDevice}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => (
            <SettingsScreen
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(prev => !prev)}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;