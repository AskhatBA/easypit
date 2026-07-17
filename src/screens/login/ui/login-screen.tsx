import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { LoginForm } from '@/modules/auth';
import { colors, fonts, spacing } from '@/shared/config';
import { ScreenContainer } from '@/shared/ui';

export const LoginScreen = () => (
  <ScreenContainer edges={['top', 'bottom']}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>easypit</Text>
          <Text style={styles.subtitle}>
            Записывайтесь на мойку за пару касаний
          </Text>
        </View>

        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  </ScreenContainer>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.xxl,
    padding: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  logo: {
    fontFamily: fonts.displayExtrabold,
    fontSize: 34,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textMuted,
  },
});
