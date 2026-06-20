import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';

const TEAL = '#0369A1';

interface Props {
  customerEmail: string;
  onLogout: () => void;
}

export default function CustomerProfileScreen({ customerEmail, onLogout }: Props) {
  const myOrders = mockSupplierOrders.filter(
    o => o.customerEmail?.toLowerCase() === customerEmail.toLowerCase()
  );
  const upcoming = myOrders.filter(o => !['completed', 'cancelled'].includes(o.status)).length;
  const history = myOrders.filter(o => o.status === 'completed').length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#fff" />
          </View>
          <Text style={styles.emailText}>{customerEmail}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{upcoming}</Text>
              <Text style={styles.statLabel}>即將出發</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{history}</Text>
              <Text style={styles.statLabel}>歷史行程</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{myOrders.length}</Text>
              <Text style={styles.statLabel}>總計</Text>
            </View>
          </View>
        </View>

        {/* Emergency contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>緊急聯絡</Text>
          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('tel:+886227050001')}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="call" size={20} color={TEAL} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>小滿旅行客服專線</Text>
              <Text style={styles.contactValue}>+886-2-2705-0001</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('https://line.me/ti/p/shoman_travel')}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#16A34A" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>LINE 官方帳號</Text>
              <Text style={styles.contactValue}>@shoman_travel</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => Linking.openURL('mailto:service@shoman.com.tw')}
            activeOpacity={0.8}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="mail" size={20} color="#D97706" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>客服 Email</Text>
              <Text style={styles.contactValue}>service@shoman.com.tw</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>登出</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>© 2023 – 2026 小滿科技有限公司</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1C1C1E' },
  content: { padding: 16, gap: 16 },

  profileCard: {
    backgroundColor: TEAL, borderRadius: 20, padding: 24,
    alignItems: 'center', gap: 10,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  emailText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 14,
    marginTop: 4, width: '100%',
  },
  statItem: { flex: 1, alignItems: 'center', gap: 3 },
  statNum: { fontSize: 22, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)' },
  statDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.25)' },

  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 12 },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  contactIcon: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 13, color: '#8E8E93' },
  contactValue: { fontSize: 14, color: '#1C1C1E', fontWeight: '600' },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#FEF2F2', borderRadius: 12, padding: 14,
  },
  logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '700' },
  footer: { textAlign: 'center', color: '#C7C7CC', fontSize: 11, marginTop: 4 },
});
