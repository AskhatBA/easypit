import { Pressable, StyleSheet, Text, View } from 'react-native';

import { WashIcon } from '@/assets/icons';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatDistance } from '@/shared/lib';

import type { Wash } from '../types';

type WashCardProps = {
  wash: Wash;
  onPress: (washId: string) => void;
};

export const WashCard = ({ wash, onPress }: WashCardProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => onPress(wash.id)}
    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
  >
    <View style={styles.iconWrap}>
      <WashIcon width={24} height={24} color={colors.primary} />
    </View>

    <View style={styles.info}>
      <Text style={styles.name}>{wash.name}</Text>
      <Text style={styles.address}>{wash.address}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>★ {wash.rating.toFixed(1)}</Text>
        <Text style={styles.meta}>{formatDistance(wash.distanceKm)}</Text>
        <Text style={[styles.meta, wash.isOpen ? styles.open : styles.closed]}>
          {wash.isOpen ? 'Открыто' : 'Закрыто'}
        </Text>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.displaySemibold,
    fontSize: 16,
    color: colors.text,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  meta: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
  open: {
    color: colors.success,
  },
  closed: {
    color: colors.danger,
  },
});
