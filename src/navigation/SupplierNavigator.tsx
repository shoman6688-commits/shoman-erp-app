import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '../context/LanguageContext';
import SupplierPendingScreen from '../screens/supplier/SupplierPendingScreen';
import SupplierActiveScreen from '../screens/supplier/SupplierActiveScreen';
import SupplierHistoryScreen from '../screens/supplier/SupplierHistoryScreen';
import SupplierProfileScreen from '../screens/supplier/SupplierProfileScreen';
import SupplierOrderDetailScreen from '../screens/supplier/SupplierOrderDetailScreen';

const Tab = createBottomTabNavigator();
const PendingStack = createNativeStackNavigator();
const ActiveStack = createNativeStackNavigator();
const PRIMARY = '#1A6B3C';

interface Props {
  supplierUsername: string;
  onLogout: () => void;
}

function PendingStackNav({ supplierUsername }: { supplierUsername: string }) {
  return (
    <PendingStack.Navigator screenOptions={{ headerShown: false }}>
      <PendingStack.Screen name="PendingList">
        {(props) => (
          <SupplierPendingScreen
            supplierUsername={supplierUsername}
            onSelectOrder={(id) => props.navigation.navigate('OrderDetail', { orderId: id })}
          />
        )}
      </PendingStack.Screen>
      <PendingStack.Screen name="OrderDetail">
        {(props) => (
          <SupplierOrderDetailScreen
            orderId={(props.route.params as any).orderId}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </PendingStack.Screen>
    </PendingStack.Navigator>
  );
}

function ActiveStackNav({ supplierUsername }: { supplierUsername: string }) {
  return (
    <ActiveStack.Navigator screenOptions={{ headerShown: false }}>
      <ActiveStack.Screen name="ActiveList">
        {(props) => (
          <SupplierActiveScreen
            supplierUsername={supplierUsername}
            onSelectOrder={(id) => props.navigation.navigate('OrderDetail', { orderId: id })}
          />
        )}
      </ActiveStack.Screen>
      <ActiveStack.Screen name="OrderDetail">
        {(props) => (
          <SupplierOrderDetailScreen
            orderId={(props.route.params as any).orderId}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </ActiveStack.Screen>
    </ActiveStack.Navigator>
  );
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
        options={{ title: tr('headerPending'), tabBarLabel: tr('tabPending'), headerShown: false }}
      >
        {() => <PendingStackNav supplierUsername={supplierUsername} />}
      </Tab.Screen>
      <Tab.Screen
        name="active"
        options={{ title: tr('headerActive'), tabBarLabel: tr('tabActive'), headerShown: false }}
      >
        {() => <ActiveStackNav supplierUsername={supplierUsername} />}
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
