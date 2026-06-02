import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import DashboardScreen from '../screens/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OrdersStack({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.primary, headerBackTitle: '返回' }}>
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={({ navigation: nav }) => ({
          title: '訂單管理',
          headerRight: () => (
            <TouchableOpacity onPress={() => nav.navigate('NewOrder')} style={{ marginRight: 4 }}>
              <Ionicons name="add-circle" size={28} color={colors.primary} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: '訂單詳情' }} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} options={{ title: '新增訂單' }} />
    </Stack.Navigator>
  );
}

function DashboardStack({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.primary, headerBackTitle: '返回' }}>
      <Stack.Screen name="DashboardHome" options={{ title: '數據台' }}>
        {(props) => <DashboardScreen {...props} navigation={{ ...props.navigation, navigate: (screen: string, params?: any) => {
          if (screen === 'Orders') navigation.navigate('訂單');
          else props.navigation.navigate(screen, params);
        }}} />}
      </Stack.Screen>
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: '訂單詳情' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator({ onLogout }: { onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, [string, string]> = {
            '數據台': ['pie-chart', 'pie-chart-outline'],
            '訂單': ['albums', 'albums-outline'],
            '消息': ['megaphone', 'megaphone-outline'],
            '我的': ['person', 'person-outline'],
          };
          const [active, inactive] = icons[route.name] || ['circle', 'circle-outline'];
          return <Ionicons name={(focused ? active : inactive) as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.light,
        tabBarStyle: { borderTopColor: colors.border, height: 85, paddingBottom: 24, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.white },
        headerTitleStyle: { color: colors.text.primary, fontWeight: '700' },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen name="數據台" component={DashboardStack} options={{ headerShown: false }} />
      <Tab.Screen name="訂單" component={OrdersStack} options={{ headerShown: false }} />
      <Tab.Screen name="消息" component={AnnouncementScreen} options={{ title: '最新消息' }} />
      <Tab.Screen name="我的" options={{ title: '個人設定' }}>
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
