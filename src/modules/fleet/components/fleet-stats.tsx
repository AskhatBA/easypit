import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';

import type { FleetSummary } from '../types';

type Card = {
  label: string;
  value: string;
  hint: string;
};

const Cell = ({ label, value, hint }: Card) => (
  <View style={styles.cell}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.hint}>{hint}</Text>
  </View>
);

export const FleetStats = ({ summary }: { summary: FleetSummary }) => {
  const cards: Card[] = [
    {
      label: 'ЛОКАЦИЙ',
      value: String(summary.locations),
      hint: 'в сети',
    },
    {
      label: 'БОКСОВ ВСЕГО',
      value: `${summary.operationalBoxes}/${summary.totalBoxes}`,
      hint: `${summary.operationalPct}% в работе`,
    },
    {
      label: 'СРЕДНИЙ РЕЙТИНГ',
      value: `★ ${summary.avgRating.toFixed(1)}`,
      hint: `${summary.totalReviews} отзывов`,
    },
    {
      label: 'БРОНИ СЕГОДНЯ',
      value: String(summary.bookingsToday),
      hint: `${summary.bookingsChangePct}% к неделе`,
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map(card => (
        <Cell key={card.label} {...card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cell: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.textMuted,
  },
  value: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: colors.text,
  },
  hint: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
});
