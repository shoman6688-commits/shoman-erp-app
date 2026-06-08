import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, SupplierOrder, SupplierOrderStatus } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const PRIMARY = '#1A6B3C';
const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };

const STATUS_COLOR: Record<string, string> = {
  pending: '#FF9500',
  confirmed: '#1A73E8',
  departed: '#007AFF',
  in_service: PRIMARY,
  completed: '#34C759',
  cancelled: '#FF3B30',
};

interface Props {
  supplierUsername: string;
  onSelectOrder?: (id: string) => void;
}

interface OrderState {
  transferConfirmed: boolean;
  groupConfirmed: boolean;
}

export default function SupplierActiveScreen({ supplierUsername, onSelectOrder }: Props) {
  const { tr } = useLang();

  // Derive from props each render — avoids stale useState snapshot on mount
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
  const [receiptUploaded, setReceiptUploaded] = useState<Record<string, boolean>>({});
  const [confirmStates, setConfirmStates] = useState<Record<string, OrderState>>({});

  const orders = mockSupplierOrders.filter(o => {
    if (o.supplierUsername !== supplierUsername) return false;
    if (hiddenIds.includes(o.id)) return false;
    const status = statusOverrides[o.id] ?? o.status;
    return status !== 'completed' && status !== 'cancelled';
  });

  const statusLabel = (s: SupplierOrderStatus) => {
    const map: Record<string, string> = {
      pending: tr('statusPending'),
      confirmed: tr('statusConfirmed'),
      departed: tr('statusDeparted'),
      in_service: tr('statusInService'),
      completed: tr('statusCompleted'),
      cancelled: tr('statusCancelled'),
    };
    return map[s] ?? s;
  };

  const handleConfirmOrder = (id: string) => {
    Alert.alert(tr('confirmTitle'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setStatusOverrides(prev => ({ ...prev, [id]: 'confirmed' })) },
    ]);
  };

  const handleRejectOrder = (id: string) => {
    Alert.alert(tr('rejectTitle'), tr('rejectMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('reject'), style: 'destructive', onPress: () => setHiddenIds(prev => [...prev, id]) },
    ]);
  };

  const handleToggleTransfer = (id: string) => {
    if (confirmStates[id]?.transferConfirmed) return;
    Alert.alert(tr('labelTransferConfirm'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setConfirmStates(prev => ({ ...prev, [id]: { ...prev[id], transferConfirmed: true, groupConfirmed: prev[id]?.groupConfirmed ?? false } })) },
    ]);
  };

  const handleToggleGroup = (id: string) => {
    if (confirmStates[id]?.groupConfirmed) return;
    Alert.alert(tr('labelGroupConfirm'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setConfirmStates(prev => ({ ...prev, [id]: { transferConfirmed: prev[id]?.transferConfirmed ?? false, groupConfirmed: true } })) },
    ]);
  };

  const handleUpload = (id: string) => {
    Alert.alert(tr('uploadTitle'), '', [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('btnUpload'), onPress: () => setReceiptUploaded(prev => ({ ...prev, [id]: true })) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>{tr('headerActive')}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{orders.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        {orders.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={60} color="#C7C7CC" />
            <Text style={styles.emptyText}>{tr('emptyActive')}</Text>
          </View>
        )}

        {orders.map(order => {
          const effectiveStatus = statusOverrides[order.id] ?? order.status;
          const cs = confirmStates[order.id] ?? { transferConfirmed: order.transferConfirmed, groupConfirmed: order.groupConfirmed };
          const isReceiptUploaded = receiptUploaded[order.id] ?? order.receiptUploaded;
          const isPending = effectiveStatus === 'pending';

          return (
            <View key={order.id} style={styles.card}>
              {/* Header — tappable to view detail */}
              <TouchableOpacity style={styles.cardHeader} onPress={() => onSelectOrder?.(order.id)}>
                <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderNo}>{order.orderNo}</Text>
                  <Text style={styles.customer}>{order.customer} · {order.pax}人 · {order.vehicle}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[effectiveStatus] + '22' }]}>
                  <Text style={[styles.statusText, { color: STATUS_COLOR[effectiveStatus] }]}>{statusLabel(effectiveStatus)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
              </TouchableOpacity>

              {/* Date & region row */}
              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={13} color="#8E8E93" />
                <Text style={styles.metaText}>{order.departure} → {order.return}</Text>
                <Text style={styles.sep}>·</Text>
                <Text style={styles.metaText}>{order.region}</Text>
              </View>

              {/* Note */}
              {order.note ? (
                <View style={styles.noteBox}>
                  <Ionicons name="alert-circle-outline" size={13} color="#FF9500" />
                  <Text style={styles.noteText}>{order.note}</Text>
                </View>
              ) : null}

              {/* Actions */}
              {isPending ? (
                /* Pending: confirm / reject */
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.rejectBtn} onPress={() => handleRejectOrder(order.id)}>
                    <Ionicons name="close" size={16} color="#FF3B30" />
                    <Text style={styles.rejectText}>{tr('btnCannotAccept')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmBtn} onPress={() => handleConfirmOrder(order.id)}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={styles.confirmText}>{tr('btnConfirm')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* Confirmed / active: transfer confirm + group confirm + receipt */
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.checkBtn, cs.transferConfirmed && styles.checkBtnDone]}
                    onPress={() => handleToggleTransfer(order.id)}
                  >
                    <Ionicons
                      name={cs.transferConfirmed ? 'checkmark-circle' : 'radio-button-off'}
                      size={15}
                      color={cs.transferConfirmed ? '#34C759' : '#8E8E93'}
                    />
                    <Text style={[styles.checkBtnText, cs.transferConfirmed && { color: '#34C759' }]}>
                      {tr('labelTransferConfirm')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.checkBtn, cs.groupConfirmed && styles.checkBtnDone]}
                    onPress={() => handleToggleGroup(order.id)}
                  >
                    <Ionicons
                      name={cs.groupConfirmed ? 'checkmark-circle' : 'radio-button-off'}
                      size={15}
                      color={cs.groupConfirmed ? '#34C759' : '#8E8E93'}
                    />
                    <Text style={[styles.checkBtnText, cs.groupConfirmed && { color: '#34C759' }]}>
                      {tr('labelGroupConfirm')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.uploadBtn, isReceiptUploaded && styles.uploadBtnDone]}
                    onPress={() => !isReceiptUploaded && handleUpload(order.id)}
                  >
                    <Ionicons
                      name={isReceiptUploaded ? 'checkmark-circle' : 'cloud-upload-outline'}
                      size={15}
                      color={isReceiptUploaded ? '#34C759' : PRIMARY}
                    />
                    <Text style={[styles.uploadBtnText, isReceiptUploaded && { color: '#34C759' }]}>
                      {isReceiptUploaded ? tr('uploadDone') : tr('btnUpload')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  navHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', paddingTop: 56, paddingBottom: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#F2F2F7',
  },
  navTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  countBadge: { backgroundColor: PRIMARY, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  countText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center' },

  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  flag: { fontSize: 22 },
  orderNo: { fontSize: 14, fontWeight: '800', color: '#1C1C1E' },
  customer: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  statusText: { fontSize: 11, fontWeight: '700' },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  metaText: { fontSize: 12, color: '#3C3C43' },
  sep: { color: '#C7C7CC' },

  noteBox: {
    flexDirection: 'row', gap: 6, backgroundColor: '#FFF8ED',
    borderRadius: 8, padding: 8, marginBottom: 10,
  },
  noteText: { fontSize: 12, color: '#FF9500', flex: 1, lineHeight: 18 },

  actions: { flexDirection: 'row', gap: 8, marginTop: 4 },

  rejectBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, borderWidth: 1.5, borderColor: '#FF3B30', borderRadius: 10, paddingVertical: 10,
  },
  rejectText: { fontSize: 12, fontWeight: '700', color: '#FF3B30' },
  confirmBtn: {
    flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, backgroundColor: PRIMARY, borderRadius: 10, paddingVertical: 10,
  },
  confirmText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  checkBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, borderWidth: 1.5, borderColor: '#E5E5EA', borderRadius: 10, paddingVertical: 10,
  },
  checkBtnDone: { borderColor: '#34C759', backgroundColor: '#E9FAF0' },
  checkBtnText: { fontSize: 11, fontWeight: '600', color: '#8E8E93' },

  uploadBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, borderWidth: 1.5, borderColor: PRIMARY, borderRadius: 10, paddingVertical: 10,
  },
  uploadBtnDone: { borderColor: '#34C759', backgroundColor: '#E9FAF0' },
  uploadBtnText: { fontSize: 11, fontWeight: '600', color: PRIMARY },
});
