import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSupplierOrders } from '../../data/mockData';

const TEAL = '#0369A1';

interface Props {
  orderId: string;
  onBack: () => void;
  onSubmit: () => void;
}

export default function CustomerRatingScreen({ orderId, onBack, onSubmit }: Props) {
  const order = mockSupplierOrders.find(o => o.id === orderId);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (order) {
      order.customerRating = {
        stars,
        comment: comment.trim(),
        ratedAt: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
      };
    }
    Alert.alert('感謝您的評價！', '您的回饋將幫助我們持續改善服務', [
      { text: '確定', onPress: onSubmit },
    ]);
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={TEAL} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color={TEAL} />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>行程評價</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripRegion}>{order.region}</Text>
          <Text style={styles.tripDates}>{order.departure} – {order.return}</Text>
          <Text style={styles.tripMeta}>{order.pax} 人 · {order.vehicle}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>整體滿意度</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} onPress={() => setStars(i)} activeOpacity={0.7}>
                <Ionicons
                  name={i <= stars ? 'star' : 'star-outline'}
                  size={40}
                  color={i <= stars ? '#F59E0B' : '#D1D5DB'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.starsLabel}>
            {['', '很不滿意', '不滿意', '普通', '滿意', '非常滿意'][stars]}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>旅遊感想（選填）</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="分享您的旅遊體驗..."
            placeholderTextColor="#B0B0B0"
            multiline
            numberOfLines={4}
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{comment.length} / 300</Text>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.submitText}>送出評價</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
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
  tripInfo: {
    backgroundColor: TEAL, borderRadius: 16, padding: 20, gap: 4,
  },
  tripRegion: { fontSize: 20, fontWeight: '800', color: '#fff' },
  tripDates: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  tripMeta: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, gap: 12,
  },
  cardLabel: { fontSize: 15, fontWeight: '700', color: '#1C1C1E' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  starsLabel: { textAlign: 'center', fontSize: 14, color: '#555', fontWeight: '600' },
  commentInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10,
    padding: 12, fontSize: 14, color: '#1C1C1E', minHeight: 100, backgroundColor: '#FAFAFA',
  },
  charCount: { fontSize: 11, color: '#B0B0B0', textAlign: 'right' },
  submitBtn: {
    backgroundColor: TEAL, borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
