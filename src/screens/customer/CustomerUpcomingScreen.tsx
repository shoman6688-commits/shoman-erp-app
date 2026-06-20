import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, SupplierOrder } from '../../data/mockData';

const TEAL = '#0369A1';
const UPCOMING_STATUSES = ['pending', 'confirmed', 'departed', 'in_service'];

const COUNTRY_FLAG: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳' };

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:    { label: '確認中', color: '#F59E0B' },
  confirmed:  { label: '已確認', color: '#10B981' },
  departed:   { label: '已出發', color: TEAL },
  in_service: { label: '服務中', color: '#6366F1' },
};

interface Props {
  customerEmail: string;
  onSelectOrder: (id: string) => void;
}

export default function CustomerUpcomingScreen({ customerEmail, onSelectOrder }: Props) {
  const orders = mockSupplierOrders.filter(
    o => o.customerEmail?.toLowerCase() === customerEmail.toLowerCase()
      && UPCOMING_STATUSES.includes(o.status)
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>即將出發</Text>
        <Text style={styles.headerSub}>{orders.length} 筆行程</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="airplane-outline" size={48} color="#C7C7CC" />
            <Text style={styles.emptyText}>目前沒有即將出發的行程</Text>
          </View>
        ) : (
          orders.map(order => <OrderCard key={order.id} order={order} onPress={() => onSelectOrder(order.id)} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderCard({ order, onPress }: { order: SupplierOrder; onPress: () => void }) {
  const status = STATUS_LABEL[order.status] ?? { label: order.status, color: '#8E8E93' };
  const flag = COUNTRY_FLAG[order.country] ?? '🌏';
  const nights = calcNights(order.departure, order.return);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardTop}>
        <View style={styles.flagBox}>
          <Text style={styles.flag}>{flag}</Text>
        </View>
        <View style={styles.cardMain}>
          <Text style={styles.region}>{order.region}</Text>
          <Text style={styles.dates}>{order.departure} {nights > 0 ? `– ${order.return}` : ''}</Text>
          <Text style={styles.pax}>
            <Ionicons name="people-outline" size={13} color="#8E8E93" /> {order.pax} 人 · {order.vehicle}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.color + '18' }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>
      {order.driverInfo && (
        <View style={styles.driverRow}>
          <Ionicons name="car-outline" size={14} color={TEAL} />
          <Text style={styles.driverText}>司機：{order.driverInfo.name} · {order.driverInfo.vehiclePlate}</Text>
        </View>
      )}
      {!order.driverInfo && order.status === 'pending' && (
        <View style={styles.driverRow}>
          <Ionicons name="time-outline" size={14} color="#F59E0B" />
          <Text style={[styles.driverText, { color: '#F59E0B' }]}>司機資訊確認中，出發前通知您</Text>
        </View>
      )}
      <View style={styles.cardFooter}>
        <Text style={styles.orderNo}>{order.orderNo}</Text>
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );
}

function calcNights(dep: string, ret: string) {
  try {
    const d1 = new Date(dep.replace(/\//g, '-'));
    const d2 = new Date(ret.replace(/\//g, '-'));
    return Math.max(0, Math.round((d2.getTime() - d1.getTime()) / 86400000));
  } catch { return 0; }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F6FA' },
  header: {
    backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    flexDirection: 'row', alignItems: 'baseline', gap: 8,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1C1C1E' },
  headerSub: { fontSize: 13, color: '#8E8E93' },
  list: { padding: 16, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { color: '#8E8E93', fontSize: 15 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  flagBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#F5F6FA',
    justifyContent: 'center', alignItems: 'center',
  },
  flag: { fontSize: 24 },
  cardMain: { flex: 1, gap: 2 },
  region: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },
  dates: { fontSize: 13, color: '#555' },
  pax: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  driverRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F5F6FA', borderRadius: 8, padding: 8, marginBottom: 8,
  },
  driverText: { fontSize: 12, color: '#555', flex: 1 },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 8,
  },
  orderNo: { fontSize: 11, color: '#B0B0B0', fontFamily: 'monospace' },
});
