import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockAccounts } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';
import { Lang } from '../../i18n/translations';

const PRIMARY = '#1A6B3C';

const LANG_NAMES: Record<Lang, string> = { zh: '繁體中文 🇹🇼', ja: '日本語 🇯🇵', th: 'ภาษาไทย 🇹🇭' };

interface Props {
  supplierUsername: string;
  onLogout: () => void;
}

export default function SupplierProfileScreen({ supplierUsername, onLogout }: Props) {
  const { lang, setLang, tr } = useLang();
  const user = mockAccounts.find(u => u.username === supplierUsername);

  const handleLogout = () => {
    Alert.alert(tr('logout'), tr('logoutConfirm'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('logout'), style: 'destructive', onPress: onLogout },
    ]);
  };

  const handleLangSwitch = (l: Lang) => {
    setLang(l);
    Alert.alert('✓', LANG_NAMES[l]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <Ionicons name="business" size={36} color={PRIMARY} />
        </View>
        <Text style={styles.name}>{user?.name ?? supplierUsername}</Text>
        <Text style={styles.username}>@{supplierUsername}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons name="business-outline" size={18} color="#8E8E93" />
          <Text style={styles.rowLabel}>{tr('companyName')}</Text>
          <Text style={styles.rowValue}>{(user as any)?.company ?? '—'}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color="#8E8E93" />
          <Text style={styles.rowLabel}>{tr('region')}</Text>
          <Text style={styles.rowValue}>{(user as any)?.region ?? '—'}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{tr('language')}</Text>
      <View style={styles.langSection}>
        {(['zh', 'ja', 'th'] as Lang[]).map(l => (
          <TouchableOpacity key={l} style={[styles.langRow, lang === l && styles.langRowActive]} onPress={() => handleLangSwitch(l)}>
            <Text style={styles.langName}>{LANG_NAMES[l]}</Text>
            {lang === l && <Ionicons name="checkmark-circle" size={20} color={PRIMARY} />}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>{tr('logout')}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>{tr('footer')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  avatarBox: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E8F5EE', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  username: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
  section: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 20, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  rowLabel: { flex: 1, fontSize: 14, color: '#3C3C43' },
  rowValue: { fontSize: 14, color: '#1C1C1E', fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#8E8E93', marginBottom: 8 },
  langSection: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 24, overflow: 'hidden' },
  langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  langRowActive: { backgroundColor: '#E8F5EE' },
  langName: { fontSize: 15, color: '#1C1C1E' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 20 },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#FF3B30' },
  footer: { textAlign: 'center', fontSize: 11, color: '#C7C7CC', marginBottom: 20 },
});
