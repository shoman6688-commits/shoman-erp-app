import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';

const TEAL = '#0369A1';

interface Props {
  onLogin: (email: string) => void;
  onBack?: () => void;
}

export default function CustomerLoginScreen({ onLogin, onBack }: Props) {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { Alert.alert('請輸入 Email'); return; }
    const found = mockSupplierOrders.some(
      o => o.customerEmail?.toLowerCase() === trimmed
    );
    if (found) {
      onLogin(trimmed);
    } else {
      Alert.alert('找不到行程', '請確認 Email 是否正確，或聯絡小滿客服');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {onBack && (
        <TouchableOpacity style={styles.backRow} onPress={onBack}>
          <Ionicons name="chevron-back" size={18} color="rgba(255,255,255,0.8)" />
          <Text style={styles.backRowText}>返回</Text>
        </TouchableOpacity>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.logoBox}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>滿</Text>
          </View>
          <Text style={styles.appName}>會員專區</Text>
          <Text style={styles.appSub}>SHOMAN TRAVEL · MEMBER ZONE</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.desc}>
            輸入預訂時留下的 Email，即可查看所有行程記錄
          </Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@gmail.com"
            placeholderTextColor="#B0B0B0"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnText}>查看我的行程</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Demo：demo@shoman.com</Text>
        </View>

        <Text style={styles.footer}>© 2023 – 2026 小滿科技有限公司</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: TEAL },
  inner: { flex: 1, justifyContent: 'space-between', padding: 32 },
  logoBox: { alignItems: 'center', marginTop: 48 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: TEAL },
  appName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  appSub: { fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: 1.5 },
  form: {
    backgroundColor: '#fff', borderRadius: 18, padding: 24,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, elevation: 6,
  },
  desc: {
    fontSize: 13, color: '#555', marginBottom: 20, lineHeight: 20, textAlign: 'center',
  },
  label: { fontSize: 13, color: '#555', marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10,
    padding: 14, fontSize: 15, color: '#1C1C1E',
    marginBottom: 18, backgroundColor: '#FAFAFA',
  },
  btn: {
    backgroundColor: TEAL, borderRadius: 10, padding: 16,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 14, fontSize: 11, color: '#B0B0B0', textAlign: 'center' },
  footer: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  backRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4,
  },
  backRowText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
});
