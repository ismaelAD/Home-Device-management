# home-device-management

A React Native mobile app that allows users to simulate control of smart devices such as adjusting light brightness and thermostat temperature. The app synchronizes device states in real time using Firebase Firestore.

## Tech Stack

- **Backend/Frontend**: React Native / JavaScript  
- **Database**: Firebase Firestore  
- **Native Modules**: @react-native-picker/picker, React Native StyleSheet, React Native CLI  

## Features

- Device Control: turn lights on/off and adjust their brightness with a slider; control a thermostat’s temperature  
- Bottom Navigation Bar: switch between Home, Settings (dark-mode toggle), and Manage Devices screens  
- Visual Feedback: lamp image tints and changes opacity as the brightness slider moves  
- Device Management: add new devices (name + type), edit existing ones, and store configurations in Firebase Firestore for real-time synchronization  

## Installation & Setup

1. **Install Node.js & npm** (LTS) from https://nodejs.org  
2. **Install Java Development Kit (JDK)** from Adoptium (https://adoptium.net) and set the `JAVA_HOME` environment variable  
3. **Install Android Studio & SDK**  
   - In Android Studio → SDK Manager, install Android SDK, Platform-Tools, and Android Emulator  
   - Create an Android Virtual Device (AVD) in AVD Manager  
4. **Clone the repository**  
   ```bash
   git clone https://github.com/ismaelAD/home-device-management.git
   cd home-device-management
   npm install
