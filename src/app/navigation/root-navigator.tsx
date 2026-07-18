import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '@/modules/auth';
import { BookingScreen } from '@/screens/booking';
import { CarwashesScreen } from '@/screens/carwashes';
import { LoginScreen } from '@/screens/login';
import { WashDetailsScreen } from '@/screens/wash-details';
import { colors } from '@/shared/config';
import type { RootStackParamList } from '@/shared/types';

import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Carwashes"
              component={CarwashesScreen}
              options={{ title: 'Автомойки' }}
            />
            <Stack.Screen
              name="WashDetails"
              component={WashDetailsScreen}
              options={{ title: '' }}
            />
            <Stack.Screen
              name="Booking"
              component={BookingScreen}
              options={{ title: 'Запись на мойку' }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
