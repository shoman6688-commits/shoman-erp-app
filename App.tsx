import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageProvider } from './src/context/LanguageContext';
import { Lang } from './src/i18n/translations';
import LoginScreen from './src/screens/LoginScreen';
import SupplierLoginScreen from './src/screens/supplier/SupplierLoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
import AccountingNavigator from './src/navigation/AccountingNavigator';
import SupplierNavigator from './src/navigation/SupplierNavigator';

type Role = 'sales' | 'accounting' | 'supplier';
type LoginMode = 'landing' | 'internal' | 'supplier';

const PRIMARY = '#1A6B3C';
const NAVY = '#1A2B4A';

// Read ?portal=supplier from URL on web
function getInitialMode(): LoginMode {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('portal') === 'supplier') return 'supplier';
    if (params.get('portal') === 'internal') return 'internal';
  }
  return 'landing';
}

// Landing screen — two distinct entry cards
function LandingScreen({ onSelect }: { onSelect: (mode: 'internal' | 'supplier') => void }) {
  return (
    <SafeAreaView style={ls.container}>
      <StatusBar style="dark" />
      {/* Logo */}
      <View style={ls.logoRow}>
        <Image source={require('./assets/logo.png')} style={ls.logoImg} resizeMode="contain" />
        <Text style={ls.logoSub}>ORDER MANAGEMENT SYSTEM</Text>
      </View>

      <Text style={ls.chooseLabel}>請選擇登入方式</Text>

      {/* Internal staff card */}
      <TouchableOpacity style={[ls.card, ls.cardInternal]} onPress={() => onSelect('internal')} activeOpacity={0.88}>
        <View style={ls.cardIcon}>
          <Ionicons name="business" size={32} color="#fff" />
        </View>
        <View style={ls.cardBody}>
          <Text style={ls.cardTitle}>小滿員工登入</Text>
          <Text style={ls.cardDesc}>業務 · 會計 · 內部管理</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>

      {/* Supplier card */}
      <TouchableOpacity style={[ls.card, ls.cardSupplier]} onPress={() => onSelect('supplier')} activeOpacity={0.88}>
        <View style={[ls.cardIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <Ionicons name="car-sport" size={32} color="#fff" />
        </View>
        <View style={ls.cardBody}>
          <Text style={ls.cardTitle}>外站供應商登入</Text>
          <Text style={[ls.cardDesc, { color: 'rgba(255,255,255,0.75)' }]}>司機公司 · 派車確認 · 憑證上傳</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>

      {/* URL hint */}
      <View style={ls.hintBox}>
        <Ionicons name="link-outline" size={13} color="#8E8E93" />
        <Text style={ls.hintText}>供應商可直接書籤：</Text>
        <Text style={ls.hintUrl}>?portal=supplier</Text>
      </View>

      <Text style={ls.footer}>© 2023 – 2026 小滿科技有限公司</Text>
    </SafeAreaView>
  );
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [supplierUsername, setSupplierUsername] = useState('');
  const [loginMode, setLoginMode] = useState<LoginMode>(getInitialMode);

  const handleInternalLogin = (userRole: 'sales' | 'accounting') => setRole(userRole);
  const handleSupplierLogin = (username: string, _name: string, _lang: Lang) => {
    setSupplierUsername(username);
    setRole('supplier');
  };
  const handleLogout = () => { setRole(null); setSupplierUsername(''); setLoginMode('landing'); };

  if (!role) {
    if (loginMode === 'landing') {
      return (
        <LanguageProvider>
          <LandingScreen onSelect={mode => setLoginMode(mode)} />
        </LanguageProvider>
      );
    }

    if (loginMode === 'internal') {
      return (
        <LanguageProvider>
          <StatusBar style="light" />
          <View style={{ flex: 1 }}>
            <LoginScreen onLogin={handleInternalLogin} />
            <TouchableOpacity style={[styles.backBtn, { backgroundColor: NAVY }]} onPress={() => setLoginMode('landing')}>
              <Ionicons name="chevron-back" size={16} color="#fff" />
              <Text style={styles.backText}>返回選擇</Text>
            </TouchableOpacity>
          </View>
        </LanguageProvider>
      );
    }

    // supplier
    return (
      <LanguageProvider>
        <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <SupplierLoginScreen onLogin={handleSupplierLogin} />
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: PRIMARY }]} onPress={() => setLoginMode('landing')}>
            <Ionicons name="chevron-back" size={16} color="#fff" />
            <Text style={styles.backText}>返回選擇</Text>
          </TouchableOpacity>
        </View>
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

// Landing styles
const ls = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA', paddingHorizontal: 24, justifyContent: 'center' },
  logoRow: { flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 40 },
  logoImg: { width: 280, height: 112 },
  logoName: { fontSize: 20, fontWeight: '800', color: '#1C1C1E' },
  logoSub: { fontSize: 10, color: '#8E8E93', letterSpacing: 1, marginTop: 2, textAlign: 'center' },

  chooseLabel: { fontSize: 14, color: '#8E8E93', fontWeight: '600', marginBottom: 16, letterSpacing: 0.5 },

  card: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    borderRadius: 20, padding: 20, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, elevation: 4,
  },
  cardInternal: { backgroundColor: NAVY },
  cardSupplier: { backgroundColor: PRIMARY },
  cardIcon: {
    width: 56, height: 56, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '800', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: '500' },

  hintBox: {
    flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 28,
    justifyContent: 'center',
  },
  hintText: { fontSize: 11, color: '#8E8E93' },
  hintUrl: { fontSize: 11, color: PRIMARY, fontWeight: '700' },

  footer: { textAlign: 'center', color: '#C7C7CC', fontSize: 10, marginTop: 12 },
});

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: 14,
  },
  backText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
