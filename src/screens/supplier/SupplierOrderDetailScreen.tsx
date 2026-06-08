import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders, DayItinerary } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const PRIMARY = '#1A6B3C';
const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };

interface Props {
  orderId: string;
  onBack: () => void;
}

export default function SupplierOrderDetailScreen({ orderId, onBack }: Props) {
  const { tr } = useLang();
  const order = mockSupplierOrders.find(o => o.id === orderId);

  const [driverNames, setDriverNames] = useState<Record<number, string>>(
    () => Object.fromEntries((order?.itinerary ?? []).map(d => [d.day, d.driverName]))
  );
  const [transferConfirmed, setTransferConfirmed] = useState(order?.transferConfirmed ?? false);
  const [groupConfirmed, setGroupConfirmed] = useState(order?.groupConfirmed ?? false);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>找不到訂單</Text>
      </View>
    );
  }

  const handleSaveDriver = (day: number) => {
    Alert.alert('✓', `${tr('labelDay')} ${day} ${tr('labelDaySuffix')} ${tr('labelDriverName')}: ${driverNames[day] || '—'}`);
  };

  const handleTransferConfirm = () => {
    Alert.alert(tr('labelTransferConfirm'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setTransferConfirmed(true) },
    ]);
  };

  const handleGroupConfirm = () => {
    Alert.alert(tr('labelGroupConfirm'), tr('confirmMsg'), [
      { text: tr('cancel'), style: 'cancel' },
      { text: tr('yes'), onPress: () => setGroupConfirmed(true) },
    ]);
  };

  const statusColor: Record<string, string> = {
    pending: '#FF9500', confirmed: '#34C759', departed: '#1A73E8',
    in_service: '#007AFF', completed: '#8E8E93', cancelled: '#FF3B30',
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{order.orderNo}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Order summary card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderNo}>{order.orderNo}</Text>
              <Text style={styles.summaryMeta}>{order.customer} · {order.pax}人 · {order.vehicle}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor[order.status] + '22' }]}>
              <Text style={[styles.statusText, { color: statusColor[order.status] }]}>
                {tr('status' + order.status.charAt(0).toUpperCase() + order.status.slice(1))}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoGrid}>
            <InfoCell label={tr('labelDate')} value={order.departure} />
            <InfoCell label={tr('labelReturn')} value={order.return} />
            <InfoCell label={tr('labelRegion')} value={order.region} />
            <InfoCell label={tr('labelContact')} value={order.salesContact} />
          </View>
          {order.note ? (
            <View style={styles.noteRow}>
              <Ionicons name="alert-circle-outline" size={14} color="#FF9500" />
              <Text style={styles.noteText}>{order.note}</Text>
            </View>
          ) : null}
        </View>

        {/* Confirmation checkboxes */}
        <View style={styles.confirmRow}>
          <TouchableOpacity
            style={[styles.confirmBtn, transferConfirmed && styles.confirmBtnActive]}
            onPress={transferConfirmed ? undefined : handleTransferConfirm}
          >
            <Ionicons
              name={transferConfirmed ? 'checkmark-circle' : 'radio-button-off'}
              size={20}
              color={transferConfirmed ? '#34C759' : '#8E8E93'}
            />
            <Text style={[styles.confirmBtnText, transferConfirmed && { color: '#34C759' }]}>
              {tr('labelTransferConfirm')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.confirmBtn, groupConfirmed && styles.confirmBtnActive]}
            onPress={groupConfirmed ? undefined : handleGroupConfirm}
          >
            <Ionicons
              name={groupConfirmed ? 'checkmark-circle' : 'radio-button-off'}
              size={20}
              color={groupConfirmed ? '#34C759' : '#8E8E93'}
            />
            <Text style={[styles.confirmBtnText, groupConfirmed && { color: '#34C759' }]}>
              {tr('labelGroupConfirm')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Per-day itinerary */}
        <Text style={styles.sectionTitle}>{tr('itineraryTitle')}</Text>
        {order.itinerary.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            driverName={driverNames[day.day] ?? ''}
            onDriverChange={(v) => setDriverNames(prev => ({ ...prev, [day.day]: v }))}
            onSave={() => handleSaveDriver(day.day)}
            tr={tr}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoCellLabel}>{label}</Text>
      <Text style={styles.infoCellValue}>{value}</Text>
    </View>
  );
}

function FieldRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.fieldRow}>
      <Ionicons name={icon as any} size={15} color="#8E8E93" style={{ marginTop: 1 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    </View>
  );
}

function DayCard({
  day, driverName, onDriverChange, onSave, tr,
}: {
  day: DayItinerary;
  driverName: string;
  onDriverChange: (v: string) => void;
  onSave: () => void;
  tr: (k: string) => string;
}) {
  return (
    <View style={styles.dayCard}>
      <View style={styles.dayHeader}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>
            {tr('labelDay')}{day.day}{tr('labelDaySuffix')}
          </Text>
        </View>
        <Text style={styles.dayDate}>{day.date}</Text>
        {day.pickupTime ? (
          <View style={styles.pickupTimeBadge}>
            <Ionicons name="time-outline" size={12} color={PRIMARY} />
            <Text style={styles.pickupTimeText}>{day.pickupTime}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.dayBody}>
        <FieldRow icon="business-outline" label={tr('labelReceivingCompany')} value={day.receivingCompany} />
        <FieldRow icon="construct-outline" label={tr('labelServiceType')} value={day.serviceType} />
        <FieldRow icon="bed-outline" label={tr('labelHotelBooking')} value={day.hotelBooking} />
        <FieldRow icon="map-outline" label={tr('labelRouteDetail')} value={day.route} />
        <FieldRow icon="home-outline" label={tr('labelHotelInfo')} value={day.hotelInfo} />
        {day.note ? (
          <View style={styles.fieldRow}>
            <Ionicons name="chatbubble-outline" size={15} color="#8E8E93" style={{ marginTop: 1 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>{tr('labelNote')}</Text>
              <Text style={[styles.fieldValue, { color: '#FF9500' }]}>{day.note}</Text>
            </View>
          </View>
        ) : null}

        {/* Driver name fillable field */}
        <View style={styles.driverRow}>
          <Ionicons name="person-outline" size={15} color={PRIMARY} style={{ marginTop: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.fieldLabel, { color: PRIMARY }]}>{tr('labelDriverName')}</Text>
            <View style={styles.driverInputRow}>
              <TextInput
                style={styles.driverInput}
                value={driverName}
                onChangeText={onDriverChange}
                placeholder={tr('driverNamePlaceholder')}
                placeholderTextColor="#C7C7CC"
              />
              <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                <Text style={styles.saveBtnText}>{tr('saveDriver')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#8E8E93', fontSize: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', paddingTop: 56, paddingBottom: 14,
    paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#F2F2F7',
  },
  backBtn: { padding: 8 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1C1C1E', textAlign: 'center' },
  headerRight: { width: 40 },
  container: { flex: 1, backgroundColor: '#F2F2F7' },

  summaryCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 },
  flag: { fontSize: 22 },
  orderNo: { fontSize: 14, fontWeight: '700', color: '#1C1C1E' },
  summaryMeta: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F2F2F7', marginBottom: 12 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  infoCell: { width: '47%' },
  infoCellLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 2 },
  infoCellValue: { fontSize: 13, fontWeight: '600', color: '#1C1C1E' },
  noteRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 4 },
  noteText: { flex: 1, fontSize: 12, color: '#FF9500', lineHeight: 18 },

  confirmRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  confirmBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#fff', borderRadius: 12, padding: 12,
    borderWidth: 1.5, borderColor: '#E5E5EA',
  },
  confirmBtnActive: { borderColor: '#34C759', backgroundColor: '#E9FAF0' },
  confirmBtnText: { fontSize: 13, fontWeight: '600', color: '#8E8E93' },

  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#8E8E93', marginBottom: 8 },

  dayCard: {
    backgroundColor: '#fff', borderRadius: 14, marginBottom: 12,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
  },
  dayHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#E8F5EE', padding: 12,
  },
  dayBadge: {
    backgroundColor: PRIMARY, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  dayBadgeText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  dayDate: { flex: 1, fontSize: 13, color: '#3C3C43', fontWeight: '600' },
  pickupTimeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
  },
  pickupTimeText: { fontSize: 12, color: PRIMARY, fontWeight: '700' },

  dayBody: { padding: 14, gap: 10 },
  fieldRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  fieldLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 2 },
  fieldValue: { fontSize: 13, color: '#1C1C1E', lineHeight: 20 },

  driverRow: { flexDirection: 'row', gap: 10, marginTop: 4, alignItems: 'flex-start' },
  driverInputRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  driverInput: {
    flex: 1, borderWidth: 1.5, borderColor: PRIMARY,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8,
    fontSize: 13, color: '#1C1C1E',
  },
  saveBtn: {
    backgroundColor: PRIMARY, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8, justifyContent: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
