import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, SupplierOrder, SupplierOrderStatus } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const PRIMARY = '#1A6B3C';
const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };

interface Props {
  supplierUsername: string;
  onSelectOrder?: (id: string) => void;
}

export default function SupplierPendingScreen({ supplierUsername, onSelectOrder }: Props) {
  const { tr } = useLang();
  // Derive from props each render — avoids stale useState snapshot on mount
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const orders = mockSupplierOrders.filter(
    o => o.supplierUsername === supplierUsername && o.status === 'pending' && !hiddenIds.includes(o.id)
  );

  const handleConfirm = (id: string) => {
    Alert.alert(tr('confirmTitle'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setHiddenIds(prev => [...prev, id]) },
    ]);
  };

  const handleReject = (id: string) => {
    Alert.alert(tr('rejectTitle'), tr('rejectMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('reject'), style: 'destructive', onPress: () => setHiddenIds(prev => [...prev, id]) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.navHeader}>
      <Text style={styles.navTitle}>{tr('headerPending')}</Text>
    </View>
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {orders.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{orders.length} {tr('pendingCount')}</Text>
        </View>
      )}

      {orders.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="checkmark-circle" size={60} color="#34C759" />
          <Text style={styles.emptyText}>{tr('emptyPending')}</Text>
        </View>
      )}

      {orders.map(order => (
        <View key={order.id} style={styles.card}>
          <TouchableOpacity style={styles.cardHeader} onPress={() => onSelectOrder?.(order.id)}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNo}>{order.orderNo}</Text>
              <Text style={styles.customer}>{order.customer} · {order.pax}名</Text>
            </View>
            <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
              <Text style={styles.infoLabel}>{tr('labelDate')}</Text>
              <Text style={styles.infoValue}>{order.departure}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="car-outline" size={14} color="#8E8E93" />
              <Text style={styles.infoLabel}>{tr('labelVehicle')}</Text>
              <Text style={styles.infoValue}>{order.vehicle}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={14} color="#8E8E93" />
              <Text style={styles.infoLabel}>{tr('labelRegion')}</Text>
              <Text style={styles.infoValue}>{order.region}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person-circle-outline" size={14} color="#8E8E93" />
              <Text style={styles.infoLabel}>{tr('labelContact')}</Text>
              <Text style={styles.infoValue}>{order.salesContact}</Text>
            </View>
          </View>

          <View style={styles.routeBox}>
            <Text style={styles.routeLabel}>{tr('labelRoute')}</Text>
            <Text style={styles.routeText}>{order.route}</Text>
          </View>

          {order.note ? (
            <View style={styles.noteBox}>
              <Ionicons name="alert-circle-outline" size={14} color="#FF9500" />
              <Text style={styles.noteText}>{order.note}</Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => handleReject(order.id)}>
              <Ionicons name="close" size={18} color="#FF3B30" />
              <Text style={styles.rejectText}>{tr('btnCannotAccept')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => handleConfirm(order.id)}>
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.confirmText}>{tr('btnConfirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  navHeader: {
    backgroundColor: '#fff', paddingTop: 56, paddingBottom: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#F2F2F7',
  },
  navTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  badge: { backgroundColor: '#FF9500', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 14 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14 },
  flag: { fontSize: 24 },
  orderNo: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
  customer: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  newBadge: { backgroundColor: PRIMARY, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  newBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4, width: '47%' },
  infoLabel: { fontSize: 11, color: '#8E8E93' },
  infoValue: { fontSize: 12, color: '#1C1C1E', fontWeight: '600', flex: 1 },
  routeBox: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 12, marginBottom: 10 },
  routeLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 4, fontWeight: '600' },
  routeText: { fontSize: 13, color: '#1C1C1E', lineHeight: 20 },
  noteBox: { flexDirection: 'row', gap: 6, backgroundColor: '#FFF8ED', borderRadius: 8, padding: 10, marginBottom: 12 },
  noteText: { fontSize: 12, color: '#FF9500', flex: 1, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: 10 },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: '#FF3B30', borderRadius: 12, paddingVertical: 13 },
  rejectText: { fontSize: 14, fontWeight: '700', color: '#FF3B30' },
  confirmBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: PRIMARY, borderRadius: 12, paddingVertical: 13 },
  confirmText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
