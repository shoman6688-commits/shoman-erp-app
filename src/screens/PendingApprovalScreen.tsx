import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockOrders, Order } from '../data/mockData';

const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳' };

function formatAmount(amount: number, currency: string) {
  if (currency === 'JPY' || currency === 'KRW') return `${currency} ${amount.toLocaleString()}`;
  return `${currency} ${amount.toLocaleString()}`;
}

export default function PendingApprovalScreen() {
  const [orders, setOrders] = useState(() => {
    const all: (Order & { country: string })[] = [];
    (Object.keys(mockOrders) as (keyof typeof mockOrders)[]).forEach(k => {
      mockOrders[k].forEach(o => all.push({ ...o, country: k }));
    });
    return all;
  });

  const pending = orders.filter(o => o.reviewStatus === 'pending');

  const handleApprove = (id: string) => {
    Alert.alert('確認核准', '確定要核准此訂單？', [
      { text: '取消', style: 'cancel' },
      {
        text: '核准', onPress: () =>
          setOrders(prev => prev.map(o => o.id === id ? { ...o, reviewStatus: 'approved', reviewedAt: '2026/06/07' } : o))
      },
    ]);
  };

  const handleReject = (id: string) => {
    Alert.alert('退回原因', '確定要退回此訂單？', [
      { text: '取消', style: 'cancel' },
      {
        text: '退回', style: 'destructive', onPress: () =>
          setOrders(prev => prev.map(o => o.id === id ? { ...o, reviewStatus: 'rejected', reviewNote: '請業務確認金額', reviewedAt: '2026/06/07' } : o))
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{pending.length} 筆待審核</Text>
      </View>

      {pending.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="checkmark-circle" size={56} color="#34C759" />
          <Text style={styles.emptyText}>目前沒有待審核訂單</Text>
        </View>
      )}

      {pending.map(order => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country]}</Text>
            <Text style={styles.orderNo}>{order.orderNo}</Text>
            <View style={styles.pendingBadge}><Text style={styles.pendingText}>待審核</Text></View>
          </View>

          <View style={styles.row}>
            <Ionicons name="person-outline" size={14} color="#8E8E93" />
            <Text style={styles.label}>{order.customer}</Text>
            <Text style={styles.sep}>·</Text>
            <Ionicons name="people-outline" size={14} color="#8E8E93" />
            <Text style={styles.label}>{order.pax} 人</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
            <Text style={styles.label}>{order.departure} → {order.return}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="car-outline" size={14} color="#8E8E93" />
            <Text style={styles.label}>{order.vehicle} · {order.region}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="person-circle-outline" size={14} color="#8E8E93" />
            <Text style={styles.label}>業務：{order.agent}</Text>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>訂單金額</Text>
            <Text style={styles.amount}>{formatAmount(order.amount, order.currency)}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => handleReject(order.id)}>
              <Ionicons name="close" size={18} color="#FF3B30" />
              <Text style={styles.rejectText}>退回</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(order.id)}>
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.approveText}>核准</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  badge: { backgroundColor: '#FF9500', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 16 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 16, color: '#8E8E93' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  flag: { fontSize: 20 },
  orderNo: { flex: 1, fontSize: 13, fontWeight: '700', color: '#1C1C1E' },
  pendingBadge: { backgroundColor: '#FFF3CD', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  pendingText: { fontSize: 11, fontWeight: '700', color: '#FF9500' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  label: { fontSize: 13, color: '#3C3C43' },
  sep: { color: '#C7C7CC', fontSize: 13 },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F2F2F7' },
  amountLabel: { fontSize: 13, color: '#8E8E93' },
  amount: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: '#FF3B30', borderRadius: 10, paddingVertical: 12 },
  rejectText: { fontSize: 15, fontWeight: '700', color: '#FF3B30' },
  approveBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#34C759', borderRadius: 10, paddingVertical: 12 },
  approveText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
