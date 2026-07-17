import { StyleSheet, Text, View } from 'react-native';

import { useAuthStore, useLogout } from '@/modules/auth';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { Button, ScreenContainer } from '@/shared/ui';

export const ProfileScreen = () => {
  const user = useAuthStore(state => state.user);
  const logout = useLogout();

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Профиль</Text>

      <View style={styles.card}>
        <Row label="Имя" value={user?.name ?? '—'} />
        <Row label="Телефон" value={user?.phone ?? '—'} />
        <Row label="Госномер" value={user?.carNumber ?? 'Не указан'} />
      </View>

      <Button title="Выйти" variant="ghost" onPress={logout} />
    </ScreenContainer>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
  },
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
});
