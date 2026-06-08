import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '../context/LanguageContext';
import SupplierPendingScreen from '../screens/supplier/SupplierPendingScreen';
import SupplierActiveScreen from '../screens/supplier/SupplierActiveScreen';
import SupplierHistoryScreen from '../screens/supplier/SupplierHistoryScreen';
import SupplierProfileScreen from '../screens/supplier/SupplierProfileScreen';

const Tab = createBottomTabNavigator();
const PRIMARY = '#1A6B3C';

interface Props {
  supplierUsername: string;
  onLogout: () => void;
}

export default function SupplierNavigator({ supplierUsername, onLogout }: Props) {
  const { tr } = useLang();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, [string, string]> = {
            pending: ['hourglass', 'hourglass-outline'],
            active: ['car', 'car-outline'],
            history: ['time', 'time-outline'],
            profile: ['person', 'person-outline'],
          };
          const key = route.name;
          const [a, b] = icons[key] || ['circle', 'circle-outline'];
          return <Ionicons name={(focused ? a : b) as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { borderTopColor: '#E5E5EA', height: 85, paddingBottom: 24, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { color: '#1C1C1E', fontWeight: '700' },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="pending"
        options={{ title: tr('headerPending'), tabBarLabel: tr('tabPending') }}
      >
        {() => <SupplierPendingScreen supplierUsername={supplierUsername} />}
      </Tab.Screen>
      <Tab.Screen
        name="active"
        options={{ title: tr('headerActive'), tabBarLabel: tr('tabActive') }}
      >
        {() => <SupplierActiveScreen supplierUsername={supplierUsername} />}
      </Tab.Screen>
      <Tab.Screen
        name="history"
        options={{ title: tr('headerHistory'), tabBarLabel: tr('tabHistory') }}
      >
        {() => <SupplierHistoryScreen supplierUsername={supplierUsername} />}
      </Tab.Screen>
      <Tab.Screen
        name="profile"
        options={{ title: tr('headerProfile'), tabBarLabel: tr('tabProfile') }}
      >
        {() => <SupplierProfileScreen supplierUsername={supplierUsername} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
