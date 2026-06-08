import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, SupplierOrder, SupplierOrderStatus } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const PRIMARY = '#1A6B3C';
const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };

const STATUS_FLOW: SupplierOrderStatus[] = ['confirmed', 'departed', 'in_service', 'completed'];

interface Props { supplierUsername: string; }

export default function SupplierActiveScreen({ supplierUsername }: Props) {
  const { tr } = useLang();
  const [orders, setOrders] = useState<SupplierOrder[]>(
    mockSupplierOrders.filter(o => o.supplierUsername === supplierUsername && ['confirmed', 'departed', 'in_service'].includes(o.status))
  );

  const nextStatusLabel = (status: SupplierOrderStatus): string => {
    if (status === 'confirmed') return tr('btnDepart');
    if (status === 'departed') return tr('btnInService');
    if (status === 'in_service') return tr('btnComplete');
    return '';
  };

  const nextStatus = (status: SupplierOrderStatus): SupplierOrderStatus => {
    const idx = STATUS_FLOW.indexOf(status);
    return STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
  };

  const statusColor = (s: SupplierOrderStatus) => {
    if (s === 'confirmed') return '#FF9500';
    if (s === 'departed') return '#1A73E8';
    if (s === 'in_service') return PRIMARY;
    return '#34C759';
  };

  const statusLabel = (s: SupplierOrderStatus) => {
    const map: Record<string, string> = {
      confirmed: tr('statusConfirmed'),
      departed: tr('statusDeparted'),
      in_service: tr('statusInService'),
      completed: tr('statusCompleted'),
    };
    return map[s] ?? s;
  };

  const handleAdvance = (id: string, current: SupplierOrderStatus) => {
    const next = nextStatus(current);
    const label = nextStatusLabel(current);
    Alert.alert(label, `${statusLabel(current)} → ${statusLabel(next)}`, [
      { text: tr('cancel'), style: 'cancel' },
      {
        text: tr('yes'), onPress: () => {
          setOrders(prev => next === 'completed'
            ? prev.filter(o => o.id !== id)
            : prev.map(o => o.id === id ? { ...o, status: next } : o)
          );
        }
      },
    ]);
  };

  const handleUpload = (id: string) => {
    Alert.alert(tr('uploadTitle'), '', [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('btnUpload'), onPress: () => setOrders(prev => prev.map(o => o.id === id ? { ...o, receiptUploaded: true } : o)) },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {orders.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="car-outline" size={60} color="#C7C7CC" />
          <Text style={styles.emptyText}>{tr('emptyActive')}</Text>
        </View>
      )}

      {orders.map(order => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNo}>{order.orderNo}</Text>
              <Text style={styles.customer}>{order.customer} · {order.pax}名</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor(order.status) + '22' }]}>
              <Text style={[styles.statusText, { color: statusColor(order.status) }]}>{statusLabel(order.status)}</Text>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
            <Text style={styles.dateText}>{order.departure} → {order.return}</Text>
            <Text style={styles.sep}>·</Text>
            <Text style={styles.vehicleText}>{order.vehicle}</Text>
          </View>

          <View style={styles.routeBox}>
            <Text style={styles.routeLabel}>{tr('labelRoute')}</Text>
            <Text style={styles.routeText}>{order.route}</Text>
          </View>

          {order.note ? (
            <View style={styles.noteBox}>
              <Ionicons name="alert-circle-outline" size={13} color="#FF9500" />
              <Text style={styles.noteText}>{order.note}</Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.uploadBtn, order.receiptUploaded && styles.uploadedBtn]}
              onPress={() => !order.receiptUploaded && handleUpload(order.id)}
            >
              <Ionicons name={order.receiptUploaded ? 'checkmark-circle' : 'cloud-upload-outline'} size={16} color={order.receiptUploaded ? '#34C759' : PRIMARY} />
              <Text style={[styles.uploadText, order.receiptUploaded && styles.uploadedText]}>
                {order.receiptUploaded ? tr('uploadDone') : tr('btnUpload')}
              </Text>
            </TouchableOpacity>

            {order.status !== 'completed' && (
              <TouchableOpacity style={styles.advanceBtn} onPress={() => handleAdvance(order.id, order.status)}>
                <Text style={styles.advanceText}>{nextStatusLabel(order.status)}</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  flag: { fontSize: 22 },
  orderNo: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
  customer: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  dateText: { fontSize: 13, color: '#3C3C43' },
  sep: { color: '#C7C7CC' },
  vehicleText: { fontSize: 13, color: '#3C3C43', fontWeight: '600' },
  routeBox: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 10, marginBottom: 10 },
  routeLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 3, fontWeight: '600' },
  routeText: { fontSize: 12, color: '#1C1C1E', lineHeight: 18 },
  noteBox: { flexDirection: 'row', gap: 6, backgroundColor: '#FFF8ED', borderRadius: 8, padding: 8, marginBottom: 10 },
  noteText: { fontSize: 12, color: '#FF9500', flex: 1 },
  actions: { flexDirection: 'row', gap: 10 },
  uploadBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: PRIMARY, borderRadius: 10, paddingVertical: 11 },
  uploadedBtn: { borderColor: '#34C759', backgroundColor: '#E9FAF0' },
  uploadText: { fontSize: 13, fontWeight: '600', color: PRIMARY },
  uploadedText: { color: '#34C759' },
  advanceBtn: { flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: PRIMARY, borderRadius: 10, paddingVertical: 11 },
  advanceText: { fontSize: 13, fontWeight: '700', color: '#fff' },
});
