import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { mockOrders } from '../data/mockData';

const COUNTRIES = [
  { key: 'JP', label: '日本線', color: colors.country.JP },
  { key: 'KR', label: '韓國線', color: colors.country.KR },
  { key: 'TH', label: '泰國線', color: colors.country.TH },
  { key: 'CN', label: '中國線', color: colors.country.CN },
];

const CURRENCY_SYMBOL: Record<string, string> = { JPY: '¥', KRW: '₩', THB: '฿', CNY: '¥' };

export default function OrdersScreen({ navigation }: any) {
  const [activeCountry, setActiveCountry] = useState('JP');
  const [search, setSearch] = useState('');

  const orders = mockOrders[activeCountry as keyof typeof mockOrders] || [];
  const filtered = orders.filter(o =>
    o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const countryColor = COUNTRIES.find(c => c.key === activeCountry)?.color || colors.primary;

  return (
    <View style={styles.container}>
      {/* Country Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {COUNTRIES.map(c => (
          <TouchableOpacity
            key={c.key}
            style={[styles.tab, activeCountry === c.key && { backgroundColor: c.color }]}
            onPress={() => setActiveCountry(c.key)}
          >
            <Text style={[styles.tabText, activeCountry === c.key && styles.tabTextActive]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={colors.text.light} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="搜尋團號或客戶名稱"
          placeholderTextColor={colors.text.light}
        />
      </View>

      {/* Order List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.count}>{filtered.length} 筆訂單</Text>
        {filtered.map(order => (
          <TouchableOpacity
            key={order.id}
            style={styles.card}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id, country: activeCountry })}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.badge, { backgroundColor: countryColor }]}>
                <Text style={styles.badgeText}>{activeCountry}</Text>
              </View>
              <Text style={styles.orderNo}>{order.orderNo}</Text>
              <Text style={styles.amount}>
                {CURRENCY_SYMBOL[order.currency]}{order.amount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={13} color={colors.text.light} />
                <Text style={styles.infoText}>{order.customer} · {order.pax}人</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={13} color={colors.text.light} />
                <Text style={styles.infoText}>{order.departure} → {order.return}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="car" size={13} color={colors.text.light} />
                <Text style={styles.infoText}>{order.vehicle} · {order.company}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.agent}>{order.agent}</Text>
                <Text style={styles.region}>{order.region}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabs: { backgroundColor: colors.white, paddingHorizontal: 12, paddingVertical: 10, flexGrow: 0 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8,
    backgroundColor: colors.background,
  },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.text.secondary },
  tabTextActive: { color: colors.white },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    margin: 12, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text.primary },
  list: { flex: 1, paddingHorizontal: 12 },
  count: { fontSize: 12, color: colors.text.light, marginBottom: 8, marginLeft: 4 },
  card: {
    backgroundColor: colors.white, borderRadius: 12, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginRight: 10 },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  orderNo: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.text.primary },
  amount: { fontSize: 14, fontWeight: '700', color: colors.primary },
  cardBody: { padding: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 6 },
  infoText: { fontSize: 13, color: colors.text.secondary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border },
  agent: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  region: { fontSize: 12, color: colors.text.light },
});
