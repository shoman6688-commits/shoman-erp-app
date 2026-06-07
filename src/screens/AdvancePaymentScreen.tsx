import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockAdvancePayments, AdvancePayment } from '../data/mockData';

interface Props {
  route: { params: { orderId: string; orderNo: string } };
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && styles.rowValueHighlight]}>{value || '—'}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

export default function AdvancePaymentScreen({ route }: Props) {
  const { orderId, orderNo } = route.params;
  const payments = mockAdvancePayments.filter(p => p.orderId === orderId);

  const [reviewStates, setReviewStates] = useState<Record<string, Partial<AdvancePayment>>>(
    Object.fromEntries(payments.map(p => [p.id, {
      accountingReviewed: p.accountingReviewed,
      managerReviewed: p.managerReviewed,
      accountingReviewDate: p.accountingReviewDate,
      accountingReviewer: p.accountingReviewer,
    }]))
  );

  const handleAccountingReview = (id: string) => {
    Alert.alert('會計審核', '確認完成會計審核？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確認', onPress: () =>
          setReviewStates(prev => ({
            ...prev,
            [id]: { ...prev[id], accountingReviewed: true, accountingReviewDate: '2026/06/07', accountingReviewer: '財務審核' }
          }))
      },
    ]);
  };

  if (payments.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="document-outline" size={52} color="#C7C7CC" />
        <Text style={styles.emptyText}>此訂單尚無代墊單</Text>
        <Text style={styles.emptySubText}>{orderNo}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.pageTitle}>{orderNo}</Text>
      <Text style={styles.pageSubTitle}>{payments.length} 筆代墊/退款記錄</Text>

      {payments.map((payment, idx) => {
        const state = reviewStates[payment.id] || {};
        const isAccountingDone = state.accountingReviewed;
        const isManagerDone = payment.managerReviewed;

        return (
          <View key={payment.id} style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={[styles.typeBadge, payment.type === '退款' && styles.refundBadge]}>
                <Text style={[styles.typeText, payment.type === '退款' && styles.refundText]}>{payment.type}</Text>
              </View>
              <Text style={styles.cardTitle}>{payment.item}</Text>
              <Text style={styles.cardAmount}>{payment.currency} {payment.amount.toLocaleString()}</Text>
            </View>

            {/* 審核狀態列 */}
            <View style={styles.reviewStatus}>
              <View style={styles.reviewItem}>
                <Ionicons
                  name={isAccountingDone ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={isAccountingDone ? '#34C759' : '#C7C7CC'}
                />
                <Text style={[styles.reviewLabel, isAccountingDone && styles.reviewDone]}>會計審核</Text>
              </View>
              <View style={styles.reviewDivider} />
              <View style={styles.reviewItem}>
                <Ionicons
                  name={isManagerDone ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={isManagerDone ? '#34C759' : '#C7C7CC'}
                />
                <Text style={[styles.reviewLabel, isManagerDone && styles.reviewDone]}>主管審核</Text>
              </View>
            </View>

            {/* 基本資訊 */}
            <Section title="申請資訊">
              <Row label="申請日期" value={payment.applyDate} />
              <Row label="申請人" value={payment.applicant} />
              <Row label="代墊款內容" value={payment.content} />
              {payment.note ? <Row label="備註" value={payment.note} highlight /> : null}
            </Section>

            {/* 收款資訊 */}
            <Section title="收款資訊">
              <Row label="受款人" value={payment.recipient} />
              <Row label="受款帳號" value={payment.recipientAccount} />
              <Row label="轉出銀行" value={payment.transferBank} />
              <Row label="支付方式" value={payment.paymentMethod} />
              <Row label="支付日期" value={payment.paymentDate} />
            </Section>

            {/* 審核資訊 */}
            <Section title="審核記錄">
              <Row label="會計審核日期" value={state.accountingReviewDate || ''} />
              <Row label="會計審核人員" value={state.accountingReviewer || ''} />
              <Row label="主管審核日期" value={payment.managerReviewDate} />
              <Row label="主管審核人員" value={payment.managerReviewer} />
            </Section>

            {/* 會計審核按鈕 */}
            {!isAccountingDone && (
              <TouchableOpacity style={styles.reviewBtn} onPress={() => handleAccountingReview(payment.id)}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
                <Text style={styles.reviewBtnText}>完成會計審核</Text>
              </TouchableOpacity>
            )}
            {isAccountingDone && (
              <View style={styles.reviewedBox}>
                <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                <Text style={styles.reviewedText}>已完成會計審核 · {state.accountingReviewDate}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F2F7', gap: 8 },
  emptyText: { fontSize: 16, color: '#8E8E93', marginTop: 8 },
  emptySubText: { fontSize: 13, color: '#C7C7CC' },
  pageTitle: { fontSize: 18, fontWeight: '800', color: '#1C1C1E', marginBottom: 2 },
  pageSubTitle: { fontSize: 13, color: '#8E8E93', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  typeBadge: { backgroundColor: '#EEF3FF', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  refundBadge: { backgroundColor: '#FFF0EE' },
  typeText: { fontSize: 11, fontWeight: '700', color: '#1A73E8' },
  refundText: { color: '#FF3B30' },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
  cardAmount: { fontSize: 15, fontWeight: '800', color: '#1C1C1E' },
  reviewStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 10, marginBottom: 16 },
  reviewItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  reviewDivider: { width: 1, height: 20, backgroundColor: '#E5E5EA' },
  reviewLabel: { fontSize: 13, color: '#C7C7CC', fontWeight: '600' },
  reviewDone: { color: '#34C759' },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' },
  sectionBody: { backgroundColor: '#F9F9F9', borderRadius: 10, paddingHorizontal: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F2F2F7' },
  rowLabel: { fontSize: 13, color: '#8E8E93', flex: 1 },
  rowValue: { fontSize: 13, color: '#1C1C1E', flex: 2, textAlign: 'right' },
  rowValueHighlight: { color: '#FF9500', fontWeight: '600' },
  reviewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#1A73E8', borderRadius: 12, paddingVertical: 14, marginTop: 4 },
  reviewBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  reviewedBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E9FAF0', borderRadius: 10, padding: 12, marginTop: 4 },
  reviewedText: { fontSize: 13, color: '#34C759', fontWeight: '600' },
});
