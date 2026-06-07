import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { mockAccounts } from '../data/mockData';

interface Props {
  onLogin: (role: 'sales' | 'accounting', name: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!account.trim()) {
      Alert.alert('請輸入帳號');
      return;
    }
    const user = mockAccounts.find(u => u.username === account.trim().toLowerCase());
    if (user) {
      onLogin(user.role as 'sales' | 'accounting', user.name);
    } else {
      Alert.alert('帳號不存在', '請確認帳號是否正確');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.logoBox}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>滿</Text>
          </View>
          <Text style={styles.appName}>小滿訂單管理系統</Text>
          <Text style={styles.appSub}>SHOMAN ORDER MANAGEMENT</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>帳號</Text>
          <TextInput
            style={styles.input}
            value={account}
            onChangeText={setAccount}
            placeholder="請輸入帳號"
            placeholderTextColor={colors.text.light}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>密碼</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="請輸入密碼"
            placeholderTextColor={colors.text.light}
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>登入</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>業務帳號：dyson / ken / jenny / rita{'\n'}會計帳號：accounting</Text>
        </View>

        <Text style={styles.footer}>© 2023 - 2026 小滿科技有限公司</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  inner: { flex: 1, justifyContent: 'space-between', padding: 32 },
  logoBox: { alignItems: 'center', marginTop: 60 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  logoText: { fontSize: 32, fontWeight: '700', color: colors.primary },
  appName: { fontSize: 20, fontWeight: '700', color: colors.white, marginBottom: 4 },
  appSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
  form: {
    backgroundColor: colors.white, borderRadius: 16, padding: 24,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 6,
  },
  label: { fontSize: 13, color: colors.text.secondary, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10,
    padding: 14, fontSize: 15, color: colors.text.primary,
    marginBottom: 16, backgroundColor: colors.background,
  },
  btn: {
    backgroundColor: colors.primary, borderRadius: 10, padding: 16,
    alignItems: 'center', marginTop: 4,
  },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 14, fontSize: 11, color: colors.text.light, textAlign: 'center', lineHeight: 18 },
  footer: { textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 12 },
});
