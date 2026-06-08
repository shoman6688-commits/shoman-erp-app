import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };

interface Props { supplierUsername: string; }

export default function SupplierHistoryScreen({ supplierUsername }: Props) {
  const { tr } = useLang();
  const history = mockSupplierOrders.filter(o => o.supplierUsername === supplierUsername && o.status === 'completed');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{history.length}</Text>
          <Text style={styles.statLabel}>{tr('statusCompleted')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: '#34C759' }]}>{history.filter(o => o.receiptUploaded).length}</Text>
          <Text style={styles.statLabel}>{tr('uploadDone')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: '#FF9500' }]}>{history.filter(o => !o.receiptUploaded).length}</Text>
          <Text style={styles.statLabel}>{tr('uploadPending')}</Text>
        </View>
      </View>

      {history.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={52} color="#C7C7CC" />
          <Text style={styles.emptyText}>{tr('emptyHistory')}</Text>
        </View>
      )}

      {history.map(order => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNo}>{order.orderNo}</Text>
              <Text style={styles.meta}>{order.customer} · {order.pax}名 · {order.vehicle}</Text>
            </View>
            <View style={[styles.receiptBadge, order.receiptUploaded ? styles.receiptDone : styles.receiptPending]}>
              <Ionicons name={order.receiptUploaded ? 'checkmark-circle' : 'time-outline'} size={13} color={order.receiptUploaded ? '#34C759' : '#FF9500'} />
              <Text style={[styles.receiptText, { color: order.receiptUploaded ? '#34C759' : '#FF9500' }]}>
                {order.receiptUploaded ? tr('uploadDone') : tr('uploadPending')}
              </Text>
            </View>
          </View>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={13} color="#8E8E93" />
            <Text style={styles.dateText}>{order.departure} → {order.return}</Text>
            <Text style={styles.sep}>·</Text>
            <Text style={styles.regionText}>{order.region}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '800', color: '#1C1C1E' },
  statLabel: { fontSize: 11, color: '#8E8E93', marginTop: 2, textAlign: 'center' },
  empty: { alignItems: 'center', paddingTop: 80, gap: 10 },
  emptyText: { fontSize: 15, color: '#8E8E93' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  flag: { fontSize: 20 },
  orderNo: { fontSize: 13, fontWeight: '700', color: '#1C1C1E' },
  meta: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  receiptBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  receiptDone: { backgroundColor: '#E9FAF0' },
  receiptPending: { backgroundColor: '#FFF8ED' },
  receiptText: { fontSize: 11, fontWeight: '600' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 12, color: '#3C3C43' },
  sep: { color: '#C7C7CC' },
  regionText: { fontSize: 12, color: '#3C3C43' },
});
