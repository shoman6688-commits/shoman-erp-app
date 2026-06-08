import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/context/LanguageContext';
import { Lang } from './src/i18n/translations';
import LoginScreen from './src/screens/LoginScreen';
import SupplierLoginScreen from './src/screens/supplier/SupplierLoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
import AccountingNavigator from './src/navigation/AccountingNavigator';
import SupplierNavigator from './src/navigation/SupplierNavigator';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type Role = 'sales' | 'accounting' | 'supplier';

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [supplierUsername, setSupplierUsername] = useState('');
  const [loginMode, setLoginMode] = useState<'internal' | 'supplier'>('internal');

  const handleInternalLogin = (userRole: 'sales' | 'accounting', name: string) => setRole(userRole);
  const handleSupplierLogin = (username: string, name: string, lang: Lang) => {
    setSupplierUsername(username);
    setRole('supplier');
  };
  const handleLogout = () => { setRole(null); setSupplierUsername(''); };

  if (!role) {
    return (
      <LanguageProvider>
        <StatusBar style="light" />
        {loginMode === 'internal' ? (
          <View style={{ flex: 1 }}>
            <LoginScreen onLogin={handleInternalLogin} />
            <TouchableOpacity style={styles.switchBtn} onPress={() => setLoginMode('supplier')}>
              <Text style={styles.switchText}>外站供應商登入 →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <SupplierLoginScreen onLogin={handleSupplierLogin} />
            <TouchableOpacity style={[styles.switchBtn, { backgroundColor: '#1A6B3C' }]} onPress={() => setLoginMode('internal')}>
              <Text style={styles.switchText}>← 內部人員登入</Text>
            </TouchableOpacity>
          </View>
        )}
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        {role === 'accounting' && <AccountingNavigator onLogout={handleLogout} />}
        {role === 'sales' && <AppNavigator onLogout={handleLogout} />}
        {role === 'supplier' && <SupplierNavigator supplierUsername={supplierUsername} onLogout={handleLogout} />}
      </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  switchBtn: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#1A73E8', padding: 14, alignItems: 'center',
  },
  switchText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
