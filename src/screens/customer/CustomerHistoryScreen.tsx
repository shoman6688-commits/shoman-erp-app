import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, SupplierOrder } from '../../data/mockData';

const TEAL = '#0369A1';
const COUNTRY_FLAG: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳' };

interface Props {
  customerEmail: string;
  onSelectOrder: (id: string) => void;
}

export default function CustomerHistoryScreen({ customerEmail, onSelectOrder }: Props) {
  const orders = mockSupplierOrders.filter(
    o => o.customerEmail?.toLowerCase() === customerEmail.toLowerCase()
      && (o.status === 'completed' || o.status === 'cancelled')
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>歷史行程</Text>
        <Text style={styles.headerSub}>{orders.length} 筆記錄</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={48} color="#C7C7CC" />
            <Text style={styles.emptyText}>尚無歷史行程記錄</Text>
          </View>
        ) : (
          orders.map(order => (
            <HistoryCard key={order.id} order={order} onPress={() => onSelectOrder(order.id)} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StarRow({ stars }: { stars: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= stars ? 'star' : 'star-outline'}
          size={13}
          color={i <= stars ? '#F59E0B' : '#D1D5DB'}
        />
      ))}
    </View>
  );
}

function HistoryCard({ order, onPress }: { order: SupplierOrder; onPress: () => void }) {
  const flag = COUNTRY_FLAG[order.country] ?? '🌏';
  const nights = calcNights(order.departure, order.return);
  const rated = !!order.customerRating;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardTop}>
        <View style={styles.flagBox}>
          <Text style={styles.flag}>{flag}</Text>
        </View>
        <View style={styles.cardMain}>
          <Text style={styles.region}>{order.region}</Text>
          <Text style={styles.dates}>
            {order.departure}{nights > 0 ? ` – ${order.return}` : ''} · {nights > 0 ? `${nights}夜` : '當日'}
          </Text>
          <Text style={styles.pax}>
            <Ionicons name="people-outline" size={13} color="#8E8E93" /> {order.pax} 人 · {order.vehicle}
          </Text>
        </View>
        {rated ? (
          <StarRow stars={order.customerRating!.stars} />
        ) : (
          <View style={styles.rateHint}>
            <Text style={styles.rateHintText}>待評價</Text>
          </View>
        )}
      </View>
      {order.customerRating?.comment ? (
        <View style={styles.commentBox}>
          <Ionicons name="chatbubble-outline" size={12} color="#8E8E93" />
          <Text style={styles.commentText} numberOfLines={1}>{order.customerRating.comment}</Text>
        </View>
      ) : null}
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
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 8 },
  flagBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#F5F6FA',
    justifyContent: 'center', alignItems: 'center',
  },
  flag: { fontSize: 24 },
  cardMain: { flex: 1, gap: 2 },
  region: { fontSize: 16, fontWeight: '700', color: '#1C1C1E' },
  dates: { fontSize: 13, color: '#555' },
  pax: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  rateHint: {
    backgroundColor: '#FEF3C7', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3,
  },
  rateHintText: { fontSize: 11, color: '#D97706', fontWeight: '600' },
  commentBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F5F6FA', borderRadius: 8, padding: 8, marginBottom: 8,
  },
  commentText: { fontSize: 12, color: '#555', flex: 1 },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 8,
  },
  orderNo: { fontSize: 11, color: '#B0B0B0', fontFamily: 'monospace' },
});
