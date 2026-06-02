import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput,
  TouchableOpacity, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const STEPS = ['客戶資訊', '訂單資訊', '費用資訊'];

const COUNTRIES = [
  { key: 'JP', label: '日本線' },
  { key: 'KR', label: '韓國線' },
  { key: 'TH', label: '泰國線' },
  { key: 'CN', label: '中國線' },
];

const CHARTER_TYPES = ['旅遊包車', '機場接送', '單程接送', '商務包車'];
const VEHICLES_JP = ['阿爾法', 'Hiace', 'Granace', '中型巴士', '大型巴士'];
const VEHICLES_KR = ['Staria', 'Solati', '中型巴士', '大型巴士'];
const CURRENCIES = ['JPY', 'KRW', 'THB', 'CNY', 'TWD'];
const AGENTS = ['戴耀輝DYSON', '蔡潔萱JENNY', '張琳青RITA', '黃煒楷KEN', '陳宥融'];

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.label}>
      {text}{required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

function Input({ label, value, onChangeText, placeholder, required, keyboardType, multiline }: any) {
  return (
    <View style={styles.fieldGroup}>
      <FieldLabel text={label} required={required} />
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || `請輸入${label}`}
        placeholderTextColor={colors.text.light}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );
}

function SelectButtons({ label, options, value, onSelect, required }: any) {
  return (
    <View style={styles.fieldGroup}>
      <FieldLabel text={label} required={required} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={[styles.optBtn, value === opt && styles.optBtnActive]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.optBtnText, value === opt && styles.optBtnTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function NewOrderScreen({ navigation }: any) {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState('JP');

  // Step 1 - 客戶資訊
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [lineId, setLineId] = useState('');
  const [email, setEmail] = useState('');

  // Step 2 - 訂單資訊
  const [agent, setAgent] = useState('');
  const [pax, setPax] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [charterType, setCharterType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [company, setCompany] = useState('');
  const [region, setRegion] = useState('');
  const [arrFlight, setArrFlight] = useState('');
  const [depFlight, setDepFlight] = useState('');
  const [notes, setNotes] = useState('');

  // Step 3 - 費用資訊
  const [currency, setCurrency] = useState('JPY');
  const [amount, setAmount] = useState('');
  const [payDue, setPayDue] = useState('');

  const vehicleOptions = country === 'KR' ? VEHICLES_KR : VEHICLES_JP;

  const validateStep = () => {
    if (step === 0) {
      if (!customerName || !customerPhone) {
        Alert.alert('必填欄位', '請填寫客戶姓名和電話');
        return false;
      }
    }
    if (step === 1) {
      if (!pax || !departure || !charterType || !vehicle) {
        Alert.alert('必填欄位', '請填寫人數、出發日期、包車內容和車型');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    Alert.alert(
      '訂單建立成功 ✅',
      `${country === 'JP' ? '日本線' : country === 'KR' ? '韓國線' : country === 'TH' ? '泰國線' : '中國線'} - ${customerName}\n${pax}人 · ${departure}\n${vehicle} · ${currency} ${Number(amount).toLocaleString()}`,
      [{ text: '確認', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepBar}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <TouchableOpacity style={styles.stepItem} onPress={() => i < step && setStep(i)}>
              <View style={[styles.stepCircle, i <= step && styles.stepCircleActive, i < step && styles.stepCircleDone]}>
                {i < step
                  ? <Ionicons name="checkmark" size={14} color={colors.white} />
                  : <Text style={[styles.stepNum, i === step && styles.stepNumActive]}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{s}</Text>
            </TouchableOpacity>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Step 0: 客戶資訊 */}
        {step === 0 && (
          <View style={styles.stepContent}>
            <SelectButtons label="線路" options={COUNTRIES.map(c => c.label)} value={COUNTRIES.find(c => c.key === country)?.label} onSelect={(v: string) => setCountry(COUNTRIES.find(c => c.label === v)?.key || 'JP')} required />
            <Input label="客戶姓名" value={customerName} onChangeText={setCustomerName} required />
            <Input label="客戶電話" value={customerPhone} onChangeText={setCustomerPhone} keyboardType="phone-pad" required />
            <Input label="LINE ID" value={lineId} onChangeText={setLineId} placeholder="請輸入 LINE ID" />
            <Input label="電子郵件" value={email} onChangeText={setEmail} keyboardType="email-address" />
          </View>
        )}

        {/* Step 1: 訂單資訊 */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <SelectButtons label="承辦業務" options={AGENTS} value={agent} onSelect={setAgent} required />
            <Input label="旅遊人數" value={pax} onChangeText={setPax} keyboardType="number-pad" required />
            <Input label="出發日期" value={departure} onChangeText={setDeparture} placeholder="2026/06/01" required />
            <Input label="返回日期" value={returnDate} onChangeText={setReturnDate} placeholder="2026/06/05" />
            <SelectButtons label="包車內容" options={CHARTER_TYPES} value={charterType} onSelect={setCharterType} required />
            <SelectButtons label="使用車型" options={vehicleOptions} value={vehicle} onSelect={setVehicle} required />
            <Input label="包車公司" value={company} onChangeText={setCompany} />
            <Input label="地區" value={region} onChangeText={setRegion} />
            <Input label="抵達航班" value={arrFlight} onChangeText={setArrFlight} placeholder="CI105" />
            <Input label="離開航班" value={depFlight} onChangeText={setDepFlight} placeholder="CI106" />
            <Input label="備註" value={notes} onChangeText={setNotes} multiline />
          </View>
        )}

        {/* Step 2: 費用資訊 */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <SelectButtons label="幣別" options={CURRENCIES} value={currency} onSelect={setCurrency} required />
            <Input label="金額" value={amount} onChangeText={setAmount} keyboardType="number-pad" required />
            <Input label="全額付款截止日" value={payDue} onChangeText={setPayDue} placeholder="2026/05/01" />

            {/* Summary */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>訂單摘要</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>客戶</Text>
                <Text style={styles.summaryValue}>{customerName || '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>電話</Text>
                <Text style={styles.summaryValue}>{customerPhone || '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>人數</Text>
                <Text style={styles.summaryValue}>{pax || '-'} 人</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>日期</Text>
                <Text style={styles.summaryValue}>{departure || '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>車型</Text>
                <Text style={styles.summaryValue}>{vehicle || '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>金額</Text>
                <Text style={[styles.summaryValue, { color: colors.primary, fontWeight: '700' }]}>
                  {currency} {amount ? Number(amount).toLocaleString() : '-'}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        {step > 0 && (
          <TouchableOpacity style={styles.btnBack} onPress={() => setStep(step - 1)}>
            <Ionicons name="chevron-back" size={18} color={colors.primary} />
            <Text style={styles.btnBackText}>上一步</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btnNext, step === 0 && { flex: 1 }]} onPress={handleNext}>
          <Text style={styles.btnNextText}>{step === STEPS.length - 1 ? '建立訂單' : '下一步'}</Text>
          {step < STEPS.length - 1 && <Ionicons name="chevron-forward" size={18} color={colors.white} />}
          {step === STEPS.length - 1 && <Ionicons name="checkmark" size={18} color={colors.white} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  stepBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  stepItem: { alignItems: 'center', flex: 1 },
  stepCircle: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 2,
    borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginBottom: 4,
    backgroundColor: colors.white,
  },
  stepCircleActive: { borderColor: colors.primary },
  stepCircleDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepNum: { fontSize: 13, color: colors.text.light, fontWeight: '700' },
  stepNumActive: { color: colors.primary },
  stepLabel: { fontSize: 11, color: colors.text.light },
  stepLabelActive: { color: colors.primary, fontWeight: '700' },
  stepLine: { height: 2, flex: 0.5, backgroundColor: colors.border, marginBottom: 20 },
  stepLineDone: { backgroundColor: colors.primary },
  body: { flex: 1 },
  stepContent: { padding: 16 },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text.secondary, marginBottom: 8 },
  required: { color: colors.status.important },
  input: {
    backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: colors.text.primary,
  },
  inputMulti: { height: 90, textAlignVertical: 'top', paddingTop: 12 },
  optBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5,
    borderColor: colors.border, marginRight: 8, backgroundColor: colors.white,
  },
  optBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  optBtnText: { fontSize: 13, color: colors.text.secondary, fontWeight: '600' },
  optBtnTextActive: { color: colors.white },
  summary: {
    backgroundColor: colors.white, borderRadius: 12, padding: 16, marginTop: 8,
    borderLeftWidth: 4, borderLeftColor: colors.primary,
  },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: colors.background },
  summaryLabel: { width: 60, fontSize: 13, color: colors.text.secondary },
  summaryValue: { flex: 1, fontSize: 13, color: colors.text.primary },
  footer: {
    flexDirection: 'row', padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, gap: 12,
  },
  btnBack: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.primary, borderRadius: 12, paddingVertical: 14,
  },
  btnBackText: { color: colors.primary, fontSize: 15, fontWeight: '700', marginLeft: 4 },
  btnNext: {
    flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, gap: 6,
  },
  btnNextText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
