import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatPrice } from '@/shared/lib';

import { Sparkline } from './sparkline';

type PulseCardProps = {
  bookingsToday: number;
  changePct: number;
  projectedRevenue: number;
  trend: number[];
  width: number;
};

const PULSE_LIME = '#b9df33';

export const PulseCard = ({
  bookingsToday,
  changePct,
  projectedRevenue,
  trend,
  width,
}: PulseCardProps) => {
  const chartWidth = width - spacing.xl * 2;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dot} />
        <Text style={styles.eyebrow}>ПУЛЬС · БРОНИ СЕГОДНЯ</Text>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.big}>{bookingsToday}</Text>
          <Text style={styles.change}>
            ↗ {changePct}% по сравнению со вчера
          </Text>
        </View>

        <View style={styles.projected}>
          <Text style={styles.projectedLabel}>К КОНЦУ ДНЯ</Text>
          <Text style={styles.projectedValue}>
            {formatPrice(projectedRevenue)}
          </Text>
        </View>
      </View>

      <View style={styles.chart}>
        <Sparkline
          data={trend}
          width={chartWidth > 0 ? chartWidth : 240}
          height={56}
          color={PULSE_LIME}
          fill
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.text, // near-black графит
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PULSE_LIME,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.7)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  big: {
    fontFamily: fonts.displayExtrabold,
    fontSize: 56,
    lineHeight: 60,
    color: colors.textInverse,
  },
  change: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: PULSE_LIME,
  },
  projected: {
    alignItems: 'flex-end',
    gap: 2,
  },
  projectedLabel: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.5)',
  },
  projectedValue: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textInverse,
  },
  chart: {
    marginTop: spacing.xs,
  },
});
