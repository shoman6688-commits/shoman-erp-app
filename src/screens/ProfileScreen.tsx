import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { mockUser } from '../data/mockData';

function MenuItem({ icon, label, onPress, danger }: { icon: string; label: string; onPress?: () => void; danger?: boolean }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon as any} size={20} color={danger ? colors.status.important : colors.primary} style={{ marginRight: 12 }} />
      <Text style={[styles.menuLabel, danger && { color: colors.status.important }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.text.light} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{mockUser.name[0]}</Text>
        </View>
        <Text style={styles.name}>{mockUser.name}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{mockUser.role}</Text>
        </View>
      </View>

      {/* System Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>系統資訊</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>系統版本</Text>
            <Text style={styles.infoValue}>v1.0.0 (Shell)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>建置日期</Text>
            <Text style={styles.infoValue}>2026/06/02</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>公司</Text>
            <Text style={styles.infoValue}>小滿科技有限公司</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>設定</Text>
        <View style={styles.menuCard}>
          <MenuItem icon="notifications-outline" label="推播通知設定" />
          <MenuItem icon="lock-closed-outline" label="修改密碼" />
          <MenuItem icon="language-outline" label="語言設定" />
          <MenuItem icon="help-circle-outline" label="使用說明" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.menuCard}>
          <MenuItem icon="log-out-outline" label="登出" onPress={onLogout} danger />
        </View>
      </View>

      <Text style={styles.footer}>© 2023 - 2026 小滿科技有限公司 版權所有</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  profileCard: {
    backgroundColor: colors.primary, alignItems: 'center', padding: 32,
    paddingTop: 40,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.white },
  name: { fontSize: 20, fontWeight: '700', color: colors.white, marginBottom: 8 },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  roleText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  section: { margin: 16, marginBottom: 0 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.text.light, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoCard: { backgroundColor: colors.white, borderRadius: 12, padding: 4, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: 13, color: colors.text.secondary },
  infoValue: { fontSize: 13, color: colors.text.primary, fontWeight: '500' },
  menuCard: { backgroundColor: colors.white, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuLabel: { flex: 1, fontSize: 15, color: colors.text.primary },
  footer: { textAlign: 'center', color: colors.text.light, fontSize: 12, marginTop: 24 },
});
