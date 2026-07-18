import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatPrice } from '@/shared/lib';

import type { DashboardSummary } from '../types';

type StatCardsProps = Pick<
  DashboardSummary,
  | 'collectedToday'
  | 'collectedChangePct'
  | 'toCollect'
  | 'unpaidCount'
  | 'avgRating'
  | 'reviewsCount'
  | 'bookingsToday'
  | 'bookingsChangePct'
>;

type Card = {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
};

const Cell = ({ label, value, hint, accent }: Card) => (
  <View style={[styles.cell, accent && styles.cellAccent]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    <Text style={[styles.hint, accent && styles.hintAccent]}>{hint}</Text>
  </View>
);

export const StatCards = (props: StatCardsProps) => {
  const cards: Card[] = [
    {
      label: 'СОБРАНО СЕГОДНЯ',
      value: formatPrice(props.collectedToday),
      hint: `↗ ${props.collectedChangePct}%`,
    },
    {
      label: 'К ПОЛУЧЕНИЮ',
      value: formatPrice(props.toCollect),
      hint: `${props.unpaidCount} неоплачено`,
      accent: true,
    },
    {
      label: 'СРЕДНИЙ РЕЙТИНГ',
      value: `★ ${props.avgRating.toFixed(1)}`,
      hint: `${props.reviewsCount} отзывов`,
    },
    {
      label: 'БРОНИ СЕГОДНЯ',
      value: String(props.bookingsToday),
      hint: `↗ ${props.bookingsChangePct}%`,
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
  cellAccent: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
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
  hintAccent: {
    color: colors.accentStrong,
  },
});
