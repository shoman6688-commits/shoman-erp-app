import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { mockAnnouncements } from '../data/mockData';

const FILTER_TABS = ['全部', '重要', '一般'];

const TYPE_CONFIG = {
  important: { label: '重要', color: colors.status.important, bg: '#FEF2F2' },
  urgent: { label: '緊急', color: colors.status.urgent, bg: '#FFF5F5' },
  normal: { label: '一般', color: colors.status.normal, bg: colors.background },
};

export default function AnnouncementScreen() {
  const [filter, setFilter] = useState('全部');
  const [selected, setSelected] = useState<typeof mockAnnouncements[0] | null>(null);

  const filtered = filter === '全部' ? mockAnnouncements :
    filter === '重要' ? mockAnnouncements.filter(a => a.type === 'important') :
    mockAnnouncements.filter(a => a.type === 'normal');

  const pinned = filtered.filter(a => a.pinned);
  const rest = filtered.filter(a => !a.pinned);

  const renderCard = (item: typeof mockAnnouncements[0]) => {
    const cfg = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG];
    return (
      <TouchableOpacity key={item.id} style={[styles.card, item.pinned && { borderLeftWidth: 3, borderLeftColor: cfg.color }]} onPress={() => setSelected(item)}>
        <View style={styles.cardHeader}>
          <View style={[styles.typeBadge, { backgroundColor: cfg.color }]}>
            <Text style={styles.typeBadgeText}>{cfg.label}</Text>
          </View>
          {item.pinned && <Ionicons name="pin" size={14} color={cfg.color} style={{ marginLeft: 4 }} />}
          <Text style={styles.expiry}>{item.expiry}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardContent} numberOfLines={2}>{item.content}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.date}>{item.publishedAt}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.tabs}>
        {FILTER_TABS.map(t => (
          <TouchableOpacity key={t} style={[styles.tab, filter === t && styles.tabActive]} onPress={() => setFilter(t)}>
            <Text style={[styles.tabText, filter === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {pinned.length > 0 && (
          <>
            <Text style={styles.groupLabel}>📌 置頂公告</Text>
            {pinned.map(renderCard)}
          </>
        )}
        {rest.length > 0 && (
          <>
            <Text style={styles.groupLabel}>公告列表</Text>
            {rest.map(renderCard)}
          </>
        )}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        {selected && (
          <SafeAreaView style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>公告詳情</Text>
              <View style={{ width: 24 }} />
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={[styles.typeBadge, { backgroundColor: TYPE_CONFIG[selected.type as keyof typeof TYPE_CONFIG].color, alignSelf: 'flex-start', marginBottom: 12 }]}>
                <Text style={styles.typeBadgeText}>{TYPE_CONFIG[selected.type as keyof typeof TYPE_CONFIG].label}</Text>
              </View>
              <Text style={styles.modalTitleText}>{selected.title}</Text>
              <Text style={styles.modalContent}>{selected.content}</Text>
              <View style={styles.modalMeta}>
                <Text style={styles.modalMetaText}>發布者：{selected.author}</Text>
                <Text style={styles.modalMetaText}>發布時間：{selected.publishedAt}</Text>
                <Text style={styles.modalMetaText}>有效期：{selected.expiry}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabs: { flexDirection: 'row', backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { marginRight: 20, paddingBottom: 6, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { fontSize: 14, color: colors.text.secondary, fontWeight: '500' },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  list: { flex: 1, padding: 12 },
  groupLabel: { fontSize: 12, color: colors.text.light, fontWeight: '600', marginBottom: 8, marginTop: 4 },
  card: {
    backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeBadgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  expiry: { flex: 1, textAlign: 'right', fontSize: 11, color: colors.text.light },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.text.primary, marginBottom: 6 },
  cardContent: { fontSize: 13, color: colors.text.secondary, lineHeight: 19, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border },
  author: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  date: { fontSize: 12, color: colors.text.light },
  modal: { flex: 1, backgroundColor: colors.white },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTitle: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
  modalBody: { flex: 1, padding: 20 },
  modalTitleText: { fontSize: 18, fontWeight: '700', color: colors.text.primary, marginBottom: 16, lineHeight: 26 },
  modalContent: { fontSize: 15, color: colors.text.secondary, lineHeight: 24, marginBottom: 24 },
  modalMeta: { backgroundColor: colors.background, borderRadius: 10, padding: 14, gap: 6 },
  modalMetaText: { fontSize: 13, color: colors.text.secondary },
});
