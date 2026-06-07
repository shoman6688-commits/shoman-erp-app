import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockOrders, Order } from '../data/mockData';

const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳' };
type FilterType = 'all' | 'approved' | 'rejected';

export default function ApprovalHistoryScreen({ navigation }: { navigation?: any }) {
  const [filter, setFilter] = useState<FilterType>('all');

  const all: (Order & { country: string })[] = [];
  (Object.keys(mockOrders) as (keyof typeof mockOrders)[]).forEach(k => {
    mockOrders[k].forEach(o => all.push({ ...o, country: k }));
  });

  const history = all.filter(o => o.reviewStatus !== 'pending').filter(o => filter === 'all' || o.reviewStatus === filter);

  const counts = {
    approved: all.filter(o => o.reviewStatus === 'approved').length,
    rejected: all.filter(o => o.reviewStatus === 'rejected').length,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.stats}>
        <View style={[styles.statCard, { backgroundColor: '#E9FAF0' }]}>
          <Text style={[styles.statNum, { color: '#34C759' }]}>{counts.approved}</Text>
          <Text style={styles.statLabel}>已核准</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF0EE' }]}>
          <Text style={[styles.statNum, { color: '#FF3B30' }]}>{counts.rejected}</Text>
          <Text style={styles.statLabel}>已退回</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'approved', 'rejected'] as FilterType[]).map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? '全部' : f === 'approved' ? '核准' : '退回'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {history.map(order => (
        <View key={order.id} style={styles.card}>
          <TouchableOpacity
            style={styles.advanceLink}
            onPress={() => navigation?.navigate('AdvancePayment', { orderId: order.id, orderNo: order.orderNo })}
          >
            <Ionicons name="document-text-outline" size={13} color="#1A73E8" />
            <Text style={styles.advanceLinkText}>代墊單</Text>
            <Ionicons name="chevron-forward" size={13} color="#1A73E8" />
          </TouchableOpacity>
          <View style={styles.cardHeader}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country]}</Text>
            <Text style={styles.orderNo}>{order.orderNo}</Text>
            <View style={[styles.statusBadge, order.reviewStatus === 'approved' ? styles.approvedBg : styles.rejectedBg]}>
              <Ionicons
                name={order.reviewStatus === 'approved' ? 'checkmark' : 'close'}
                size={12}
                color={order.reviewStatus === 'approved' ? '#34C759' : '#FF3B30'}
              />
              <Text style={[styles.statusText, { color: order.reviewStatus === 'approved' ? '#34C759' : '#FF3B30' }]}>
                {order.reviewStatus === 'approved' ? '已核准' : '已退回'}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.infoText}>{order.customer} · {order.pax} 人 · {order.agent}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoText}>{order.departure} → {order.return} · {order.vehicle}</Text>
          </View>
          {order.reviewNote && (
            <View style={styles.noteBox}>
              <Ionicons name="alert-circle-outline" size={13} color="#FF9500" />
              <Text style={styles.noteText}>{order.reviewNote}</Text>
            </View>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>審核時間：{order.reviewedAt}</Text>
            <Text style={styles.footerAmount}>{order.currency} {order.amount.toLocaleString()}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  stats: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E5EA' },
  filterActive: { backgroundColor: '#1A73E8', borderColor: '#1A73E8' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#8E8E93' },
  filterTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  advanceLink: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end', marginBottom: 6 },
  advanceLinkText: { fontSize: 12, color: '#1A73E8', fontWeight: '600' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  flag: { fontSize: 18 },
  orderNo: { flex: 1, fontSize: 12, fontWeight: '700', color: '#1C1C1E' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  approvedBg: { backgroundColor: '#E9FAF0' },
  rejectedBg: { backgroundColor: '#FFF0EE' },
  statusText: { fontSize: 11, fontWeight: '700' },
  row: { marginBottom: 4 },
  infoText: { fontSize: 13, color: '#3C3C43' },
  noteBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF8ED', borderRadius: 8, padding: 8, marginTop: 8 },
  noteText: { fontSize: 12, color: '#FF9500', flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F2F2F7' },
  footerText: { fontSize: 12, color: '#8E8E93' },
  footerAmount: { fontSize: 13, fontWeight: '700', color: '#1C1C1E' },
});
