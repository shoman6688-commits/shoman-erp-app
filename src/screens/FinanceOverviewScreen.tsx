import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockFinance, mockDashboard } from '../data/mockData';

type TabType = 'monthly' | 'agent' | 'collection';

function fmtTWD(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export default function FinanceOverviewScreen() {
  const [tab, setTab] = useState<TabType>('monthly');

  const totalRevenue = mockFinance.monthly.reduce((s, m) => s + m.revenue, 0);
  const totalCollected = mockFinance.monthly.reduce((s, m) => s + m.collected, 0);
  const collectionRate = Math.round((totalCollected / totalRevenue) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* KPI Cards */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>年度目標達成</Text>
          <Text style={styles.kpiValue}>{mockDashboard.achieveRate}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${mockDashboard.achieveRate}%` }]} />
          </View>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>已收款率</Text>
          <Text style={[styles.kpiValue, { color: '#34C759' }]}>{collectionRate}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${collectionRate}%`, backgroundColor: '#34C759' }]} />
          </View>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>今年累計</Text>
          <Text style={styles.summaryValue}>{fmtTWD(mockDashboard.yearActual)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>年度目標</Text>
          <Text style={styles.summaryValue}>{fmtTWD(mockDashboard.yearTarget)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>待收款</Text>
          <Text style={[styles.summaryValue, { color: '#FF9500' }]}>{fmtTWD(totalRevenue - totalCollected)}</Text>
        </View>
      </View>

      {/* Country Breakdown */}
      <Text style={styles.sectionTitle}>各國佔比</Text>
      <View style={styles.sectionCard}>
        {mockFinance.byCountry.map(c => (
          <View key={c.country} style={styles.countryRow}>
            <Text style={styles.countryName}>{c.country}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${c.rate}%` }]} />
            </View>
            <Text style={styles.countryRate}>{c.rate}%</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['monthly', 'agent', 'collection'] as TabType[]).map(t => (
          <TouchableOpacity key={t} style={[styles.tabBtn, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'monthly' ? '月報' : t === 'agent' ? '業務員' : '應收'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'monthly' && (
        <View style={styles.sectionCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 1 }]}>月份</Text>
            <Text style={[styles.th, { flex: 2, textAlign: 'right' }]}>營收</Text>
            <Text style={[styles.th, { flex: 2, textAlign: 'right' }]}>已收</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>筆數</Text>
          </View>
          {mockFinance.monthly.map(m => (
            <View key={m.month} style={styles.tableRow}>
              <Text style={[styles.td, { flex: 1, fontWeight: '600' }]}>{m.month}</Text>
              <Text style={[styles.td, { flex: 2, textAlign: 'right' }]}>{fmtTWD(m.revenue)}</Text>
              <Text style={[styles.td, { flex: 2, textAlign: 'right', color: '#34C759' }]}>{fmtTWD(m.collected)}</Text>
              <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{m.orders}</Text>
            </View>
          ))}
        </View>
      )}

      {tab === 'agent' && (
        <View style={styles.sectionCard}>
          {mockFinance.byAgent.map((a, i) => (
            <View key={a.name} style={[styles.agentRow, i < mockFinance.byAgent.length - 1 && styles.agentBorder]}>
              <View style={styles.agentRank}><Text style={styles.agentRankText}>{i + 1}</Text></View>
              <Text style={styles.agentName}>{a.name}</Text>
              <View style={styles.agentRight}>
                <Text style={styles.agentRevenue}>{fmtTWD(a.revenue)}</Text>
                <Text style={styles.agentOrders}>{a.orders} 筆</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {tab === 'collection' && (
        <View style={styles.sectionCard}>
          <Text style={styles.collectionTitle}>應收款清單（{mockFinance.pendingCollection.length} 筆）</Text>
          {mockFinance.pendingCollection.map(c => (
            <View key={c.orderNo} style={styles.collectionRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.collectionOrderNo}>{c.orderNo}</Text>
                <Text style={styles.collectionCustomer}>{c.customer} · {c.agent}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.collectionAmount}>{c.currency} {c.amount.toLocaleString()}</Text>
                <View style={styles.dueBadge}>
                  <Ionicons name="time-outline" size={11} color="#FF9500" />
                  <Text style={styles.dueText}>{c.dueDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  kpiCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14 },
  kpiLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 4 },
  kpiValue: { fontSize: 22, fontWeight: '800', color: '#1A73E8', marginBottom: 8 },
  progressBar: { height: 6, backgroundColor: '#E5E5EA', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#1A73E8', borderRadius: 3 },
  summaryCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: 11, color: '#8E8E93', marginBottom: 4 },
  summaryValue: { fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
  divider: { width: 1, backgroundColor: '#E5E5EA', marginHorizontal: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1C1C1E', marginBottom: 10 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16 },
  countryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  countryName: { fontSize: 13, width: 80 },
  barTrack: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, marginHorizontal: 8 },
  barFill: { height: 8, backgroundColor: '#1A73E8', borderRadius: 4 },
  countryRate: { fontSize: 12, color: '#8E8E93', width: 36, textAlign: 'right' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tabBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E5EA' },
  tabActive: { backgroundColor: '#1A73E8', borderColor: '#1A73E8' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#8E8E93' },
  tabTextActive: { color: '#fff' },
  tableHeader: { flexDirection: 'row', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  th: { fontSize: 11, color: '#8E8E93', fontWeight: '600' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  td: { fontSize: 13, color: '#1C1C1E' },
  agentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  agentBorder: { borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  agentRank: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#EEF3FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  agentRankText: { fontSize: 12, fontWeight: '700', color: '#1A73E8' },
  agentName: { flex: 1, fontSize: 14, color: '#1C1C1E' },
  agentRight: { alignItems: 'flex-end' },
  agentRevenue: { fontSize: 14, fontWeight: '700', color: '#1C1C1E' },
  agentOrders: { fontSize: 11, color: '#8E8E93' },
  collectionTitle: { fontSize: 13, color: '#8E8E93', marginBottom: 12 },
  collectionRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  collectionOrderNo: { fontSize: 12, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 },
  collectionCustomer: { fontSize: 12, color: '#8E8E93' },
  collectionAmount: { fontSize: 14, fontWeight: '700', color: '#1C1C1E', marginBottom: 4 },
  dueBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  dueText: { fontSize: 11, color: '#FF9500' },
});
