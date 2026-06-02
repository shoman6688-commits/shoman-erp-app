import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { mockDashboard, mockOrders } from '../data/mockData';

function KpiCard({ label, value, trend, currency = '¥' }: { label: string; value: number; trend: number; currency?: string }) {
  const up = trend >= 0;
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{currency}{value.toLocaleString()}</Text>
      <View style={styles.kpiTrend}>
        <Ionicons name={up ? 'arrow-up' : 'arrow-down'} size={12} color={up ? colors.status.success : colors.status.important} />
        <Text style={[styles.kpiTrendText, { color: up ? colors.status.success : colors.status.important }]}>
          {Math.abs(trend)}%
        </Text>
      </View>
    </View>
  );
}

export default function DashboardScreen({ navigation }: any) {
  const d = mockDashboard;
  const allOrders = [...mockOrders.JP, ...mockOrders.KR, ...mockOrders.TH, ...mockOrders.CN];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Year Target Card */}
      <View style={styles.targetCard}>
        <Text style={styles.targetTitle}>公司 2026 年度目標</Text>
        <View style={styles.targetRow}>
          <Text style={styles.targetRate}>{d.achieveRate}%</Text>
          <View style={styles.targetDetail}>
            <Text style={styles.targetActual}>¥{d.yearActual.toLocaleString()}</Text>
            <Text style={styles.targetSub}>/ ¥{d.yearTarget.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${d.achieveRate}%` }]} />
        </View>
        <View style={styles.targetStats}>
          <View style={styles.targetStat}>
            <Text style={styles.targetStatLabel}>最佳月份</Text>
            <Text style={styles.targetStatValue}>{d.bestMonth.name} {d.bestMonth.rate}%</Text>
          </View>
          <View style={styles.targetStat}>
            <Text style={styles.targetStatLabel}>最差月份</Text>
            <Text style={styles.targetStatValue}>{d.worstMonth.name} {d.worstMonth.rate}%</Text>
          </View>
        </View>
      </View>

      {/* KPI Cards */}
      <Text style={styles.sectionTitle}>6月 營運數據</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiRow}>
        <KpiCard label="外幣售價" value={d.kpis.foreignRevenue} trend={d.kpis.foreignRevenueTrend} />
        <KpiCard label="獲利" value={d.kpis.profit} trend={d.kpis.profitTrend} />
        <KpiCard label="外站代收" value={d.kpis.externalCollection} trend={d.kpis.externalCollectionTrend} />
      </ScrollView>

      {/* Recent Orders */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>本月訂單</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.seeAll}>查看全部</Text>
        </TouchableOpacity>
      </View>
      {allOrders.slice(0, 5).map(order => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderRow}
          onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
        >
          <View style={[styles.countryBadge, { backgroundColor: colors.country[order.orderNo.slice(0,2) as keyof typeof colors.country] || colors.primary }]}>
            <Text style={styles.countryText}>{order.orderNo.slice(0, 2)}</Text>
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNo}>{order.orderNo}</Text>
            <Text style={styles.orderSub}>{order.customer} · {order.pax}人 · {order.departure}</Text>
          </View>
          <Text style={styles.orderAmount}>{order.currency === 'JPY' ? '¥' : order.currency === 'KRW' ? '₩' : order.currency === 'THB' ? '฿' : '¥'}{order.amount.toLocaleString()}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  targetCard: {
    margin: 16, backgroundColor: colors.primary, borderRadius: 16, padding: 20,
    shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  targetTitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 12 },
  targetRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  targetRate: { fontSize: 42, fontWeight: '800', color: colors.white, marginRight: 12 },
  targetDetail: {},
  targetActual: { fontSize: 15, fontWeight: '700', color: colors.white },
  targetSub: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  progressBg: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, height: 8, marginBottom: 16 },
  progressFill: { backgroundColor: colors.accent, borderRadius: 8, height: 8 },
  targetStats: { flexDirection: 'row', justifyContent: 'space-between' },
  targetStat: {},
  targetStatLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  targetStatValue: { color: colors.white, fontSize: 13, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text.primary, marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  seeAll: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  kpiRow: { paddingLeft: 16, marginBottom: 4 },
  kpiCard: {
    backgroundColor: colors.white, borderRadius: 12, padding: 16, marginRight: 12,
    width: 150, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  kpiLabel: { fontSize: 12, color: colors.text.secondary, marginBottom: 6 },
  kpiValue: { fontSize: 16, fontWeight: '700', color: colors.text.primary, marginBottom: 4 },
  kpiTrend: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  kpiTrendText: { fontSize: 12, fontWeight: '600' },
  orderRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    marginHorizontal: 16, marginBottom: 8, padding: 14, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  countryBadge: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  countryText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  orderInfo: { flex: 1 },
  orderNo: { fontSize: 13, fontWeight: '700', color: colors.text.primary },
  orderSub: { fontSize: 12, color: colors.text.secondary, marginTop: 2 },
  orderAmount: { fontSize: 13, fontWeight: '700', color: colors.primary },
});
