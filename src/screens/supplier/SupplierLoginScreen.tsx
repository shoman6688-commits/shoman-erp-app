import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { mockAccounts } from '../../data/mockData';
import { Lang } from '../../i18n/translations';
import { useLang } from '../../context/LanguageContext';

interface Props {
  onLogin: (username: string, name: string, lang: Lang) => void;
}

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'zh', label: '中文', flag: '🇹🇼' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭' },
];

const PRIMARY = '#1A6B3C';

export default function SupplierLoginScreen({ onLogin }: Props) {
  const { lang, setLang, tr } = useLang();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!account.trim()) { Alert.alert(tr('account')); return; }
    const user = mockAccounts.find(u => u.username === account.trim().toLowerCase() && u.role === 'supplier');
    if (user) {
      const supplierLang = (user as any).lang as Lang || lang;
      setLang(supplierLang);
      onLogin(user.username, user.name, supplierLang);
    } else {
      Alert.alert('帳號不存在 / アカウントが見つかりません / ไม่พบบัญชีผู้ใช้');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.logoBox}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>滿</Text>
          </View>
          <Text style={styles.appName}>{tr('appName')}</Text>
          <Text style={styles.appSub}>SUPPLIER PORTAL</Text>
        </View>

        {/* Language Selector */}
        <View style={styles.langRow}>
          {LANGS.map(l => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langBtn, lang === l.code && styles.langBtnActive]}
              onPress={() => setLang(l.code)}
            >
              <Text style={styles.langFlag}>{l.flag}</Text>
              <Text style={[styles.langLabel, lang === l.code && styles.langLabelActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>{tr('account')}</Text>
          <TextInput
            style={styles.input}
            value={account}
            onChangeText={setAccount}
            placeholder={tr('accountPlaceholder')}
            placeholderTextColor="#B0B0B0"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.label}>{tr('password')}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder={tr('passwordPlaceholder')}
            placeholderTextColor="#B0B0B0"
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>{tr('login')}</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>{tr('hintTitle')}: {tr('hintAccounts')}</Text>
        </View>

        <Text style={styles.footer}>{tr('footer')}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY },
  inner: { flex: 1, justifyContent: 'space-between', padding: 32 },
  logoBox: { alignItems: 'center', marginTop: 48 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: PRIMARY },
  appName: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4, textAlign: 'center' },
  appSub: { fontSize: 12, color: 'rgba(255,255,255,0.65)', letterSpacing: 1.5 },
  langRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 8 },
  langBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1.5, borderColor: 'transparent',
  },
  langBtnActive: { backgroundColor: '#fff', borderColor: '#fff' },
  langFlag: { fontSize: 16 },
  langLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  langLabelActive: { color: PRIMARY },
  form: {
    backgroundColor: '#fff', borderRadius: 18, padding: 24,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, elevation: 6,
  },
  label: { fontSize: 13, color: '#555', marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10,
    padding: 14, fontSize: 15, color: '#1C1C1E',
    marginBottom: 16, backgroundColor: '#FAFAFA',
  },
  btn: { backgroundColor: PRIMARY, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 14, fontSize: 11, color: '#B0B0B0', textAlign: 'center' },
  footer: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11 },
});
