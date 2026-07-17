import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/shared/config';
import { queryClient } from '@/shared/lib';

import { bootstrap } from './bootstrap';
import { RootNavigator } from './navigation';

bootstrap();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <RootNavigator />
    </SafeAreaProvider>
  </QueryClientProvider>
);

export default App;
