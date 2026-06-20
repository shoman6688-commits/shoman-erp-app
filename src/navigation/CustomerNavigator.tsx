import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import CustomerUpcomingScreen from '../screens/customer/CustomerUpcomingScreen';
import CustomerHistoryScreen from '../screens/customer/CustomerHistoryScreen';
import CustomerOrderDetailScreen from '../screens/customer/CustomerOrderDetailScreen';
import CustomerRatingScreen from '../screens/customer/CustomerRatingScreen';
import CustomerProfileScreen from '../screens/customer/CustomerProfileScreen';

const Tab = createBottomTabNavigator();
const UpcomingStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();

const TEAL = '#0369A1';

interface Props {
  customerEmail: string;
  onLogout: () => void;
}

function UpcomingStackNav({ customerEmail }: { customerEmail: string }) {
  return (
    <UpcomingStack.Navigator screenOptions={{ headerShown: false }}>
      <UpcomingStack.Screen name="UpcomingList">
        {(props) => (
          <CustomerUpcomingScreen
            customerEmail={customerEmail}
            onSelectOrder={(id) => props.navigation.navigate('UpcomingDetail', { orderId: id })}
          />
        )}
      </UpcomingStack.Screen>
      <UpcomingStack.Screen name="UpcomingDetail">
        {(props) => (
          <CustomerOrderDetailScreen
            orderId={(props.route.params as any).orderId}
            onBack={() => props.navigation.goBack()}
          />
        )}
      </UpcomingStack.Screen>
    </UpcomingStack.Navigator>
  );
}

function HistoryStackNav({ customerEmail }: { customerEmail: string }) {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryList">
        {(props) => (
          <CustomerHistoryScreen
            customerEmail={customerEmail}
            onSelectOrder={(id) => props.navigation.navigate('HistoryDetail', { orderId: id })}
          />
        )}
      </HistoryStack.Screen>
      <HistoryStack.Screen name="HistoryDetail">
        {(props) => (
          <CustomerOrderDetailScreen
            orderId={(props.route.params as any).orderId}
            onBack={() => props.navigation.goBack()}
            onRate={(id) => props.navigation.navigate('HistoryRate', { orderId: id })}
          />
        )}
      </HistoryStack.Screen>
      <HistoryStack.Screen name="HistoryRate">
        {(props) => (
          <CustomerRatingScreen
            orderId={(props.route.params as any).orderId}
            onBack={() => props.navigation.goBack()}
            onSubmit={() => props.navigation.popTo('HistoryList')}
          />
        )}
      </HistoryStack.Screen>
    </HistoryStack.Navigator>
  );
}

export default function CustomerNavigator({ customerEmail, onLogout }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, [string, string]> = {
            upcoming: ['airplane', 'airplane-outline'],
            history:  ['time', 'time-outline'],
            profile:  ['person', 'person-outline'],
          };
          const [a, b] = icons[route.name] || ['circle', 'circle-outline'];
          return <Ionicons name={(focused ? a : b) as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: TEAL,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { borderTopColor: '#E5E5EA', height: 85, paddingBottom: 24, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="upcoming"
        options={{ tabBarLabel: '即將出發' }}
      >
        {() => <UpcomingStackNav customerEmail={customerEmail} />}
      </Tab.Screen>
      <Tab.Screen
        name="history"
        options={{ tabBarLabel: '歷史行程' }}
      >
        {() => <HistoryStackNav customerEmail={customerEmail} />}
      </Tab.Screen>
      <Tab.Screen
        name="profile"
        options={{ tabBarLabel: '我的' }}
      >
        {() => <CustomerProfileScreen customerEmail={customerEmail} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
