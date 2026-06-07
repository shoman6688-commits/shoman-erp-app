import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
import AccountingNavigator from './src/navigation/AccountingNavigator';

type Role = 'sales' | 'accounting';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);

  const handleLogin = (userRole: Role, name: string) => {
    setRole(userRole);
  };

  const handleLogout = () => setRole(null);

  if (!role) {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        {role === 'accounting'
          ? <AccountingNavigator onLogout={handleLogout} />
          : <AppNavigator onLogout={handleLogout} />
        }
      </NavigationContainer>
    </>
  );
}
