import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <StatusBar style={isLoggedIn ? 'dark' : 'light'} />
      {isLoggedIn ? (
        <NavigationContainer>
          <AppNavigator onLogout={() => setIsLoggedIn(false)} />
        </NavigationContainer>
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
