import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';
import { useLang } from '../../context/LanguageContext';

const PRIMARY = '#1A6B3C';
const COUNTRY_FLAGS: Record<string, string> = { JP: '🇯🇵', KR: '🇰🇷', TH: '🇹🇭', CN: '🇨🇳', TW: '🇹🇼' };
const STATUS_COLOR: Record<string, string> = {
  pending: '#FF9500', confirmed: '#1A73E8', departed: '#007AFF',
  in_service: PRIMARY, completed: '#34C759', cancelled: '#FF3B30',
};

const ITEM_H = 46;
const VISIBLE = 5; // items shown in picker window
const PICKER_H = ITEM_H * VISIBLE;

interface Props { supplierUsername: string; }

function parseDate(s: string) {
  const p = s.split('/');
  return p.length >= 3 ? { year: +p[0], month: +p[1], day: +p[2] } : null;
}

function getDaysInMonth(y: number, m: number) { return new Date(y, m, 0).getDate(); }

// ─── Drum Picker Column ───────────────────────────────────────────────────────
interface ColProps {
  items: (number | string)[];
  value: number | string;
  label: string;
  onChange: (v: number | string) => void;
  formatItem?: (v: number | string) => string;
}

function DrumCol({ items, value, label, onChange, formatItem }: ColProps) {
  const ref = useRef<ScrollView>(null);
  const idx = items.indexOf(value);
  const scrolling = useRef(false);

  const scrollTo = useCallback((i: number, animated = true) => {
    ref.current?.scrollTo({ y: Math.max(0, i) * ITEM_H, animated });
  }, []);

  useEffect(() => {
    scrollTo(idx, false);
  }, []); // mount only

  useEffect(() => {
    if (!scrolling.current) scrollTo(idx, true);
  }, [idx]);

  const commit = (y: number) => {
    scrolling.current = false;
    const i = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(i, items.length - 1));
    scrollTo(clamped, true);
    if (items[clamped] !== value) onChange(items[clamped]);
  };

  return (
    <View style={styles.col}>
      <Text style={styles.colLabel}>{label}</Text>
      <View style={styles.colWindow}>
        {/* Selection band */}
        <View style={styles.selBand} pointerEvents="none" />
        {/* Top / bottom fade covers */}
        <View style={[styles.fade, styles.fadeTop]} pointerEvents="none" />
        <View style={[styles.fade, styles.fadeBottom]} pointerEvents="none" />

        <ScrollView
          ref={ref}
          snapToInterval={ITEM_H}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => { scrolling.current = true; }}
          onMomentumScrollEnd={e => commit(e.nativeEvent.contentOffset.y)}
          onScrollEndDrag={e => commit(e.nativeEvent.contentOffset.y)}
          contentContainerStyle={{ paddingVertical: ITEM_H * 2 }}
        >
          {items.map((item) => {
            const isSelected = item === value;
            return (
              <TouchableOpacity
                key={String(item)}
                style={styles.drumItem}
                activeOpacity={0.6}
                onPress={() => {
                  const i = items.indexOf(item);
                  scrollTo(i, true);
                  onChange(item);
                }}
              >
                <Text style={[
                  styles.drumText,
                  isSelected && styles.drumTextSelected,
                ]}>
                  {formatItem ? formatItem(item) : String(item)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function SupplierHistoryScreen({ supplierUsername }: Props) {
  const { tr } = useLang();

  const allOrders = mockSupplierOrders.filter(o => o.supplierUsername === supplierUsername);

  const now = new Date();
  const latestOrder = allOrders.length > 0
    ? allOrders.reduce((a, b) => a.departure > b.departure ? a : b)
    : null;
  const init = latestOrder ? parseDate(latestOrder.departure) : null;

  const [selYear, setSelYear] = useState(init?.year ?? now.getFullYear());
  const [selMonth, setSelMonth] = useState(init?.month ?? now.getMonth() + 1);
  const [selDay, setSelDay] = useState(init?.day ?? now.getDate());

  // Clamp day when month/year changes
  const daysInMonth = getDaysInMonth(selYear, selMonth);
  const clampedDay = Math.min(selDay, daysInMonth);
  useEffect(() => {
    if (selDay > daysInMonth) setSelDay(daysInMonth);
  }, [selYear, selMonth]);

  // Committed query date — only updates when 查詢 is pressed
  const [queryDate, setQueryDate] = useState<{ year: number; month: number; day: number }>(
    { year: init?.year ?? now.getFullYear(), month: init?.month ?? now.getMonth() + 1, day: init?.day ?? now.getDate() }
  );
  const handleQuery = () => setQueryDate({ year: selYear, month: selMonth, day: clampedDay });

  // Generate options
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 1 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Matching orders — use committed queryDate
  const dayOrders = allOrders.filter(o => {
    const d = parseDate(o.departure);
    return d && d.year === queryDate.year && d.month === queryDate.month && d.day === queryDate.day;
  });
  const monthOrders = allOrders.filter(o => {
    const d = parseDate(o.departure);
    return d && d.year === selYear && d.month === selMonth;
  });

  const statusLabel = (s: string) => ({
    pending: tr('statusPending'), confirmed: tr('statusConfirmed'),
    departed: tr('statusDeparted'), in_service: tr('statusInService'),
    completed: tr('statusCompleted'), cancelled: tr('statusCancelled'),
  }[s] ?? s);

  const displayOrders = dayOrders;
  const hasMonthOrders = monthOrders.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
      {/* Nav header */}
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>{tr('headerHistory')}</Text>
        <Text style={styles.navSub}>{allOrders.length} 筆</Text>
      </View>

      {/* Drum picker card */}
      <View style={styles.pickerCard}>
        <View style={styles.pickerRow}>
          <DrumCol
            items={years}
            value={selYear}
            label="年"
            onChange={v => setSelYear(v as number)}
            formatItem={v => String(v)}
          />
          <View style={styles.colDivider} />
          <DrumCol
            items={months}
            value={selMonth}
            label="月"
            onChange={v => setSelMonth(v as number)}
            formatItem={v => `${v} 月`}
          />
          <View style={styles.colDivider} />
          <DrumCol
            items={days}
            value={clampedDay}
            label="日"
            onChange={v => setSelDay(v as number)}
            formatItem={v => `${v} 日`}
          />
        </View>

        {/* Query button + month summary */}
        <View style={styles.pickerFooter}>
          {hasMonthOrders ? (
            <View style={styles.monthSummary}>
              <Ionicons name="layers-outline" size={13} color={PRIMARY} />
              <Text style={styles.monthSummaryText}>{selMonth} 月共 {monthOrders.length} 筆</Text>
            </View>
          ) : <View />}
          <TouchableOpacity style={styles.queryBtn} onPress={handleQuery} activeOpacity={0.8}>
            <Ionicons name="search" size={15} color="#fff" />
            <Text style={styles.queryBtnText}>查詢</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order list */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {queryDate.year}/{String(queryDate.month).padStart(2, '0')}/{String(queryDate.day).padStart(2, '0')}
          </Text>
          <Text style={styles.sectionCount}>{displayOrders.length} 筆</Text>
          <View style={styles.legend}>
            {[{ l: '待確認', c: '#FF9500' }, { l: '已確認', c: '#1A73E8' }, { l: '已完成', c: '#34C759' }].map(x => (
              <View key={x.l} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: x.c }]} />
                <Text style={styles.legendText}>{x.l}</Text>
              </View>
            ))}
          </View>
        </View>

        {displayOrders.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={44} color="#C7C7CC" />
            <Text style={styles.emptyText}>
              {allOrders.length === 0 ? tr('emptyHistory') : '當日沒有訂單'}
            </Text>
            {hasMonthOrders && (
              <Text style={styles.emptyHint}>本月其他日期有 {monthOrders.length} 筆</Text>
            )}
          </View>
        )}

        {displayOrders.map(order => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.flag}>{COUNTRY_FLAGS[order.country] || '🌏'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.orderNo}>{order.orderNo}</Text>
                <Text style={styles.meta}>{order.customer} · {order.pax}人 · {order.vehicle}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[order.status] + '22' }]}>
                <Text style={[styles.statusText, { color: STATUS_COLOR[order.status] }]}>
                  {statusLabel(order.status)}
                </Text>
              </View>
            </View>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={13} color="#8E8E93" />
              <Text style={styles.dateText}>{order.departure} → {order.return}</Text>
              <Text style={styles.sep}>·</Text>
              <Text style={styles.regionText}>{order.region}</Text>
            </View>
            <View style={styles.checkRow}>
              {[
                { key: 'transferConfirmed', label: tr('labelTransferConfirm') },
                { key: 'groupConfirmed', label: tr('labelGroupConfirm') },
              ].map(({ key, label }) => {
                const done = (order as any)[key];
                return (
                  <View key={key} style={[styles.checkTag, done && styles.checkTagDone]}>
                    <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={12} color={done ? '#34C759' : '#C7C7CC'} />
                    <Text style={[styles.checkTagText, done && { color: '#34C759' }]}>{label}</Text>
                  </View>
                );
              })}
              {order.receiptUploaded && (
                <View style={[styles.checkTag, styles.checkTagDone]}>
                  <Ionicons name="checkmark-circle" size={12} color="#34C759" />
                  <Text style={[styles.checkTagText, { color: '#34C759' }]}>{tr('uploadDone')}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', paddingTop: 56, paddingBottom: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#F2F2F7',
  },
  navTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  navSub: { fontSize: 13, color: '#8E8E93' },

  // Picker
  pickerCard: {
    backgroundColor: '#fff',
    paddingTop: 10, paddingBottom: 12, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#E8E8E8',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  col: { flex: 1, alignItems: 'center' },
  colLabel: { fontSize: 11, fontWeight: '700', color: '#8E8E93', marginBottom: 4, letterSpacing: 0.5 },
  colDivider: { width: 1, height: PICKER_H, backgroundColor: '#F0F0F0', marginHorizontal: 4, marginTop: 22 },

  colWindow: { height: PICKER_H, width: '100%', overflow: 'hidden', position: 'relative' },
  selBand: {
    position: 'absolute', top: ITEM_H * 2, height: ITEM_H, left: 6, right: 6,
    backgroundColor: PRIMARY + '15', borderRadius: 10, zIndex: 1,
    borderWidth: 1.5, borderColor: PRIMARY + '30',
  },
  fade: { position: 'absolute', left: 0, right: 0, zIndex: 2 },
  fadeTop: {
    top: 0, height: ITEM_H * 2,
    // Simulated fade using a semi-transparent overlay
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  fadeBottom: {
    bottom: 0, height: ITEM_H * 2,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  drumItem: { height: ITEM_H, justifyContent: 'center', alignItems: 'center', width: '100%' },
  drumText: { fontSize: 16, color: '#C0C0C0', fontWeight: '400' },
  drumTextSelected: { fontSize: 18, color: PRIMARY, fontWeight: '800' },

  pickerFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 12, paddingHorizontal: 4,
  },
  monthSummary: {
    flexDirection: 'row', alignItems: 'center',
    gap: 5, backgroundColor: PRIMARY + '0D', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10,
  },
  monthSummaryText: { fontSize: 12, color: PRIMARY, fontWeight: '600' },
  queryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: PRIMARY, borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 22,
    shadowColor: PRIMARY, shadowOpacity: 0.35, shadowRadius: 8, elevation: 3,
  },
  queryBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // List
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1C1C1E' },
  sectionCount: { fontSize: 13, color: '#8E8E93' },
  legend: { flexDirection: 'row', gap: 8, marginLeft: 'auto' as any },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 10, color: '#8E8E93' },

  empty: { alignItems: 'center', paddingTop: 40, gap: 8, paddingBottom: 20 },
  emptyText: { fontSize: 14, color: '#8E8E93' },
  emptyHint: { fontSize: 12, color: PRIMARY, fontWeight: '600' },

  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  flag: { fontSize: 20 },
  orderNo: { fontSize: 13, fontWeight: '700', color: '#1C1C1E' },
  meta: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '700' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  dateText: { fontSize: 12, color: '#3C3C43' },
  sep: { color: '#C7C7CC' },
  regionText: { fontSize: 12, color: '#3C3C43' },
  checkRow: { flexDirection: 'row', gap: 6 },
  checkTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F2F2F7', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  checkTagDone: { backgroundColor: '#E9FAF0' },
  checkTagText: { fontSize: 11, color: '#8E8E93', fontWeight: '600' },
});
