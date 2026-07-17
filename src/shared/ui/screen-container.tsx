import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '@/shared/config';
import { Button } from './button';

type ScreenContainerProps = {
  children: ReactNode;
  edges?: readonly Edge[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ScreenContainer = ({
  children,
  edges = ['top'],
  loading = false,
  error = null,
  onRetry,
  style,
}: ScreenContainerProps) => (
  <SafeAreaView edges={edges} style={styles.safeArea}>
    {loading ? (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    ) : error ? (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry ? (
          <Button title="Повторить" variant="secondary" onPress={onRetry} />
        ) : null}
      </View>
    ) : (
      <View style={[styles.content, style]}>{children}</View>
    )}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
