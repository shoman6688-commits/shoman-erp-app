import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { mockOrderDetail } from '../data/mockData';

const TABS = ['訂單資料', '行程資訊', '旅客名單'];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function OrderDetailScreen({ route }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const order = mockOrderDetail;

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.orderNo}>{order.orderNo}</Text>
        <Text style={styles.customerName}>{order.customer.name} · {order.order.pax}人</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === i && styles.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && (
          <>
            <Section title="客戶資訊">
              <InfoRow label="姓名" value={order.customer.name} />
              <InfoRow label="電話" value={order.customer.phone} />
              <InfoRow label="LINE" value={order.customer.line} />
              <InfoRow label="Email" value={order.customer.email} />
            </Section>
            <Section title="訂單資訊">
              <InfoRow label="承辦業務" value={order.order.agent} />
              <InfoRow label="出發日期" value={order.order.departure} />
              <InfoRow label="返回日期" value={order.order.return} />
              <InfoRow label="包車內容" value={order.order.charterType} />
              <InfoRow label="包車公司" value={order.order.company} />
              <InfoRow label="使用車型" value={order.order.vehicle} />
              <InfoRow label="車輛數量" value={`${order.order.vehicleCount} 輛`} />
              <InfoRow label="地區" value={order.order.region} />
            </Section>
            <Section title="費用資訊">
              <InfoRow label="幣別" value={order.order.totalCurrency} />
              <InfoRow label="金額" value={`¥${order.order.totalAmount.toLocaleString()}`} />
              <InfoRow label="付款截止" value={order.order.fullPayDue} />
            </Section>
            <Section title="航班資訊">
              <InfoRow label="抵達航班" value={order.order.arrivalFlight} />
              <InfoRow label="離開航班" value={order.order.departureFlight} />
            </Section>
          </>
        )}

        {activeTab === 1 && order.itinerary.map((day) => (
          <View key={day.day} style={styles.itineraryCard}>
            <View style={styles.itineraryHeader}>
              <View style={styles.dayBadge}><Text style={styles.dayBadgeText}>Day {day.day}</Text></View>
              <Text style={styles.itineraryDate}>{day.date}</Text>
              <View style={styles.serviceTag}><Text style={styles.serviceTagText}>{day.serviceType}</Text></View>
            </View>
            <View style={styles.itineraryBody}>
              <View style={styles.itineraryRow}>
                <Ionicons name="time" size={14} color={colors.primary} />
                <Text style={styles.itineraryLabel}>接待時間</Text>
                <Text style={styles.itineraryValue}>{day.pickupTime}</Text>
              </View>
              <View style={styles.itineraryRow}>
                <Ionicons name="map" size={14} color={colors.primary} />
                <Text style={styles.itineraryLabel}>行程內容</Text>
              </View>
              <Text style={styles.routeText}>{day.route}</Text>
              <View style={styles.itineraryRow}>
                <Ionicons name="bed" size={14} color={colors.primary} />
                <Text style={styles.itineraryLabel}>飯店</Text>
                <Text style={styles.itineraryValue}>{day.hotel}</Text>
              </View>
              <View style={styles.itineraryRow}>
                <Ionicons name="call" size={14} color={colors.primary} />
                <Text style={styles.itineraryLabel}>電話</Text>
                <Text style={styles.itineraryValue}>{day.hotelPhone}</Text>
              </View>
              {day.note && (
                <View style={styles.noteBox}>
                  <Ionicons name="information-circle" size={14} color={colors.status.warning} />
                  <Text style={styles.noteText}>{day.note}</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {activeTab === 2 && (
          <Section title={`旅客名單（${order.passengers.length} 人）`}>
            {order.passengers.map((p, i) => (
              <View key={i} style={styles.passengerCard}>
                <View style={styles.passengerHeader}>
                  <View style={[styles.typeTag, { backgroundColor: p.type === '兒童' ? colors.status.warning : colors.primary }]}>
                    <Text style={styles.typeTagText}>{p.type}</Text>
                  </View>
                  <Text style={styles.passengerName}>{p.name}</Text>
                </View>
                <InfoRow label="護照" value={p.passport} />
                <InfoRow label="生日" value={p.birthday} />
              </View>
            ))}
          </Section>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.white, padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  orderNo: { fontSize: 18, fontWeight: '800', color: colors.text.primary },
  customerName: { fontSize: 13, color: colors.text.secondary, marginTop: 4 },
  tabs: { flexDirection: 'row', backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { fontSize: 13, color: colors.text.secondary, fontWeight: '500' },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  body: { flex: 1 },
  section: { backgroundColor: colors.white, margin: 12, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.primary, marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: colors.background },
  infoLabel: { width: 80, fontSize: 13, color: colors.text.secondary },
  infoValue: { flex: 1, fontSize: 13, color: colors.text.primary, fontWeight: '500' },
  itineraryCard: { backgroundColor: colors.white, margin: 12, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1, overflow: 'hidden' },
  itineraryHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 12, gap: 8 },
  dayBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  dayBadgeText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  itineraryDate: { flex: 1, color: colors.white, fontSize: 14, fontWeight: '600' },
  serviceTag: { backgroundColor: colors.accent, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  serviceTagText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  itineraryBody: { padding: 14 },
  itineraryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  itineraryLabel: { fontSize: 13, color: colors.text.secondary, width: 64 },
  itineraryValue: { flex: 1, fontSize: 13, color: colors.text.primary, fontWeight: '500' },
  routeText: { fontSize: 13, color: colors.text.primary, backgroundColor: colors.background, borderRadius: 8, padding: 10, marginBottom: 10, lineHeight: 20 },
  noteBox: { flexDirection: 'row', backgroundColor: '#FFFBEB', borderRadius: 8, padding: 10, marginTop: 6, gap: 6 },
  noteText: { flex: 1, fontSize: 12, color: colors.status.warning, lineHeight: 18 },
  passengerCard: { backgroundColor: colors.background, borderRadius: 10, padding: 12, marginBottom: 10 },
  passengerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  typeTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeTagText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  passengerName: { fontSize: 15, fontWeight: '700', color: colors.text.primary },
});
