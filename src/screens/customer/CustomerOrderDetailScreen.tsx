import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';

const TEAL = '#0369A1';

const COUNTRY_FLAG: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳' };
const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:    { label: '確認中', color: '#F59E0B' },
  confirmed:  { label: '已確認', color: '#10B981' },
  departed:   { label: '已出發', color: TEAL },
  in_service: { label: '服務中', color: '#6366F1' },
  completed:  { label: '已完成', color: '#6B7280' },
  cancelled:  { label: '已取消', color: '#EF4444' },
};

interface Props {
  orderId: string;
  onBack: () => void;
  onRate?: (orderId: string) => void;
}

export default function CustomerOrderDetailScreen({ orderId, onBack, onRate }: Props) {
  const order = mockSupplierOrders.find(o => o.id === orderId);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={TEAL} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>找不到行程資料</Text>
        </View>
      </SafeAreaView>
    );
  }

  const status = STATUS_LABEL[order.status] ?? { label: order.status, color: '#8E8E93' };
  const flag = COUNTRY_FLAG[order.country] ?? '🌏';
  const nights = calcNights(order.departure, order.return);
  const isCompleted = order.status === 'completed';
  const hasRating = !!order.customerRating;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={TEAL} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>行程詳情</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Trip summary card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryFlag}>{flag}</Text>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryRegion}>{order.region}</Text>
              <Text style={styles.summaryDates}>
                {order.departure}{nights > 0 ? ` – ${order.return} · ${nights}夜` : ' · 當日'}
              </Text>
              <Text style={styles.summaryMeta}>
                {order.pax} 人 · {order.vehicle}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.color + '18' }]}>
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
          </View>
          <Text style={styles.orderNo}>{order.orderNo}</Text>
        </View>

        {/* Driver info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>司機資訊</Text>
          {order.driverInfo ? (
            <View style={styles.driverCard}>
              <View style={styles.driverRow}>
                <Ionicons name="person-circle-outline" size={18} color={TEAL} />
                <Text style={styles.driverLabel}>司機姓名</Text>
                <Text style={styles.driverValue}>{order.driverInfo.name}</Text>
              </View>
              <View style={styles.driverRow}>
                <Ionicons name="car-outline" size={18} color={TEAL} />
                <Text style={styles.driverLabel}>車牌號碼</Text>
                <Text style={styles.driverValue}>{order.driverInfo.vehiclePlate}</Text>
              </View>
              <View style={styles.driverRow}>
                <Ionicons name="call-outline" size={18} color={TEAL} />
                <Text style={styles.driverLabel}>聯絡電話</Text>
                <Text style={[styles.driverValue, { color: TEAL }]}>{order.driverInfo.phone}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.driverPending}>
              <Ionicons name="time-outline" size={18} color="#F59E0B" />
              <Text style={styles.driverPendingText}>
                司機資訊確認中，將於出發前 24 小時通知您
              </Text>
            </View>
          )}
        </View>

        {/* Itinerary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>逐日行程</Text>
          {order.itinerary.map((day, idx) => (
            <View key={day.day}>
              <TouchableOpacity
                style={[styles.dayHeader, expandedDay === idx && styles.dayHeaderActive]}
                onPress={() => setExpandedDay(expandedDay === idx ? null : idx)}
                activeOpacity={0.8}
              >
                <View style={styles.dayBadge}>
                  <Text style={styles.dayBadgeText}>D{day.day}</Text>
                </View>
                <View style={styles.dayHeaderInfo}>
                  <Text style={styles.dayDate}>{day.date}</Text>
                  <Text style={styles.dayService}>{day.serviceType}</Text>
                </View>
                <Ionicons
                  name={expandedDay === idx ? 'chevron-up' : 'chevron-down'}
                  size={16} color="#8E8E93"
                />
              </TouchableOpacity>
              {expandedDay === idx && (
                <View style={styles.dayContent}>
                  <DetailRow icon="time-outline" label="集合時間" value={day.pickupTime} />
                  <DetailRow icon="navigate-outline" label="行程路線" value={day.route} />
                  {day.hotelInfo ? (
                    <DetailRow icon="bed-outline" label="住宿" value={day.hotelInfo} />
                  ) : null}
                  {day.hotelBooking ? (
                    <DetailRow icon="bookmark-outline" label="訂房方式" value={day.hotelBooking} />
                  ) : null}
                  {day.note ? (
                    <DetailRow icon="information-circle-outline" label="備註" value={day.note} />
                  ) : null}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Rating section for completed orders */}
        {isCompleted && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>行程評價</Text>
            {hasRating ? (
              <View style={styles.ratingCard}>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Ionicons
                      key={i}
                      name={i <= order.customerRating!.stars ? 'star' : 'star-outline'}
                      size={22}
                      color={i <= order.customerRating!.stars ? '#F59E0B' : '#D1D5DB'}
                    />
                  ))}
                  <Text style={styles.ratingDate}>  {order.customerRating!.ratedAt}</Text>
                </View>
                {order.customerRating!.comment ? (
                  <Text style={styles.ratingComment}>{order.customerRating!.comment}</Text>
                ) : null}
              </View>
            ) : onRate ? (
              <TouchableOpacity
                style={styles.rateBtn}
                onPress={() => onRate(orderId)}
                activeOpacity={0.85}
              >
                <Ionicons name="star-outline" size={18} color={TEAL} />
                <Text style={styles.rateBtnText}>為這次行程評分</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon as any} size={15} color={TEAL} style={{ marginTop: 1 }} />
      <View style={styles.detailTexts}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  backText: { color: TEAL, fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1C1C1E' },
  content: { padding: 16, gap: 16 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#8E8E93', fontSize: 15 },

  summaryCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  summaryFlag: { fontSize: 32 },
  summaryInfo: { flex: 1, gap: 3 },
  summaryRegion: { fontSize: 18, fontWeight: '800', color: '#1C1C1E' },
  summaryDates: { fontSize: 13, color: '#555' },
  summaryMeta: { fontSize: 12, color: '#8E8E93' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderNo: { fontSize: 11, color: '#C7C7CC', fontFamily: 'monospace' },

  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 12 },

  driverCard: { gap: 10 },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  driverLabel: { fontSize: 13, color: '#8E8E93', width: 72 },
  driverValue: { fontSize: 14, color: '#1C1C1E', fontWeight: '600', flex: 1 },
  driverPending: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FFFBEB', borderRadius: 10, padding: 12,
  },
  driverPendingText: { fontSize: 13, color: '#92400E', flex: 1, lineHeight: 18 },

  dayHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  dayHeaderActive: { borderBottomColor: TEAL + '30' },
  dayBadge: {
    width: 34, height: 34, borderRadius: 8, backgroundColor: TEAL + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  dayBadgeText: { fontSize: 12, fontWeight: '800', color: TEAL },
  dayHeaderInfo: { flex: 1 },
  dayDate: { fontSize: 14, fontWeight: '600', color: '#1C1C1E' },
  dayService: { fontSize: 12, color: '#8E8E93' },
  dayContent: {
    paddingLeft: 44, paddingVertical: 12, gap: 10,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  detailRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  detailTexts: { flex: 1 },
  detailLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 2 },
  detailValue: { fontSize: 13, color: '#1C1C1E', lineHeight: 18 },

  ratingCard: { gap: 8 },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingDate: { fontSize: 12, color: '#8E8E93' },
  ratingComment: { fontSize: 14, color: '#333', lineHeight: 20 },
  rateBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: TEAL, borderRadius: 10, padding: 14,
  },
  rateBtnText: { fontSize: 15, color: TEAL, fontWeight: '700' },
});
