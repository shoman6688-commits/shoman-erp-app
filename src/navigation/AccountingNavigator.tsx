import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import PendingApprovalScreen from '../screens/PendingApprovalScreen';
import ApprovalHistoryScreen from '../screens/ApprovalHistoryScreen';
import FinanceOverviewScreen from '../screens/FinanceOverviewScreen';
import AdvancePaymentScreen from '../screens/AdvancePaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ACCOUNTING_COLOR = '#2E7D32';

function PendingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: ACCOUNTING_COLOR, headerBackTitle: '返回' }}>
      <Stack.Screen name="PendingList" component={PendingApprovalScreen} options={{ title: '待審核訂單' }} />
      <Stack.Screen name="AdvancePayment" component={AdvancePaymentScreen} options={{ title: '代墊/退款單' }} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: ACCOUNTING_COLOR, headerBackTitle: '返回' }}>
      <Stack.Screen name="HistoryList" component={ApprovalHistoryScreen} options={{ title: '審核紀錄' }} />
      <Stack.Screen name="AdvancePayment" component={AdvancePaymentScreen} options={{ title: '代墊/退款單' }} />
    </Stack.Navigator>
  );
}

export default function AccountingNavigator({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, [string, string]> = {
            '待審核': ['hourglass', 'hourglass-outline'],
            '已處理': ['checkmark-circle', 'checkmark-circle-outline'],
            '財務總覽': ['bar-chart', 'bar-chart-outline'],
            '我的': ['person', 'person-outline'],
          };
          const [active, inactive] = icons[route.name] || ['circle', 'circle-outline'];
          return <Ionicons name={(focused ? active : inactive) as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: ACCOUNTING_COLOR,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { borderTopColor: '#E5E5EA', height: 85, paddingBottom: 24, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { color: '#1C1C1E', fontWeight: '700' },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen name="待審核" component={PendingStack} options={{ headerShown: false }} />
      <Tab.Screen name="已處理" component={HistoryStack} options={{ headerShown: false }} />
      <Tab.Screen name="財務總覽" component={FinanceOverviewScreen} options={{ title: '財務總覽' }} />
      <Tab.Screen name="我的" options={{ title: '個人設定' }}>
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
