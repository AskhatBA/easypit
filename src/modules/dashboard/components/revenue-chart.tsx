import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatPrice } from '@/shared/lib';

import type { RevenuePoint } from '../types';
import { Sparkline } from './sparkline';

type RevenueChartProps = {
  series: RevenuePoint[];
  width: number;
};

export const RevenueChart = ({ series, width }: RevenueChartProps) => {
  const chartWidth = width - spacing.lg * 2 - 2;
  const total = series.reduce((sum, point) => sum + point.value, 0);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Поток выручки</Text>
        <Text style={styles.period}>14 дней</Text>
      </View>

      <Text style={styles.total}>{formatPrice(total)}</Text>

      <Sparkline
        data={series.map(point => point.value)}
        width={chartWidth > 0 ? chartWidth : 260}
        height={72}
        color={colors.accentStrong}
        fill
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.displaySemibold,
    fontSize: 16,
    color: colors.text,
  },
  period: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
  total: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: colors.text,
  },
});
