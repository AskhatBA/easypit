import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CalendarIcon, DashboardIcon, UserIcon, WashIcon } from '@/assets/icons';
import { DashboardScreen } from '@/screens/dashboard';
import { MyBookingsScreen } from '@/screens/my-bookings';
import { ProfileScreen } from '@/screens/profile';
import { WashListScreen } from '@/screens/wash-list';
import { colors } from '@/shared/config';
import type { TabParamList } from '@/shared/types';

const Tab = createBottomTabNavigator<TabParamList>();

type TabIconProps = { color: string; size: number };

const renderDashboardIcon = ({ color, size }: TabIconProps) => (
  <DashboardIcon width={size} height={size} color={color} />
);

const renderWashIcon = ({ color, size }: TabIconProps) => (
  <WashIcon width={size} height={size} color={color} />
);

const renderCalendarIcon = ({ color, size }: TabIconProps) => (
  <CalendarIcon width={size} height={size} color={color} />
);

const renderUserIcon = ({ color, size }: TabIconProps) => (
  <UserIcon width={size} height={size} color={color} />
);

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        borderTopColor: colors.border,
        backgroundColor: colors.background,
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ title: 'Главная', tabBarIcon: renderDashboardIcon }}
    />

    <Tab.Screen
      name="WashList"
      component={WashListScreen}
      options={{ title: 'Мойки', tabBarIcon: renderWashIcon }}
    />

    <Tab.Screen
      name="MyBookings"
      component={MyBookingsScreen}
      options={{ title: 'Записи', tabBarIcon: renderCalendarIcon }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'Профиль', tabBarIcon: renderUserIcon }}
    />
  </Tab.Navigator>
);
