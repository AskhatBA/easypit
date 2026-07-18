import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';
import { Button } from '@/shared/ui';

import { boxLoadLabel } from '../lib';
import type { FleetCarwash } from '../types';

type CarwashCardProps = {
  carwash: FleetCarwash;
  onOpen?: (id: string) => void;
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export const CarwashCard = ({ carwash, onOpen }: CarwashCardProps) => {
  const inRepair = carwash.boxCount - carwash.operationalBoxCount;
  const segments = Array.from({ length: carwash.boxCount });

  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        <View style={styles.statusTag}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {carwash.is24_7 ? '24/7' : 'Открыто'}
          </Text>
        </View>
        <Text style={styles.city}>{carwash.city}</Text>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.name}>{carwash.name}</Text>
        <Text style={styles.rating}>★ {carwash.rating.toFixed(1)}</Text>
      </View>
      <Text style={styles.reviews}>{carwash.reviewCount} отзывов</Text>
      <Text style={styles.address} numberOfLines={2}>
        {carwash.address}
      </Text>

      <View style={styles.stats}>
        <Stat
          label="БОКСЫ"
          value={`${carwash.operationalBoxCount}/${carwash.boxCount}`}
        />
        <Stat label="БРОНИ СЕГ." value={String(carwash.bookingsToday)} />
        <Stat label="УДОБСТВА" value={String(carwash.amenities.length)} />
      </View>

      <View style={styles.load}>
        <View style={styles.loadHeader}>
          <Text style={styles.loadLabel}>Загрузка боксов</Text>
          <Text
            style={[styles.loadStatus, inRepair > 0 && styles.loadStatusWarn]}
          >
            {boxLoadLabel(carwash)}
          </Text>
        </View>
        <View style={styles.loadBar}>
          {segments.map((_, index) => (
            <View
              key={index}
              style={[
                styles.segment,
                index < carwash.operationalBoxCount
                  ? styles.segmentOn
                  : styles.segmentRepair,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.amenities}>
        {carwash.amenities.map(amenity => (
          <View key={amenity} style={styles.chip}>
            <Text style={styles.chipText}>{amenity}</Text>
          </View>
        ))}
      </View>

      <Button title="Открыть" onPress={() => onOpen?.(carwash.id)} />
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.successBright,
  },
  statusText: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.success,
  },
  city: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontFamily: fonts.displaySemibold,
    fontSize: 18,
    color: colors.text,
  },
  rating: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
  },
  reviews: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  stat: {
    flex: 1,
    gap: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  statLabel: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    letterSpacing: 0.5,
    color: colors.textMuted,
  },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: colors.text,
  },
  load: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  loadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textMuted,
  },
  loadStatus: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.successBright,
  },
  loadStatusWarn: {
    color: colors.warning,
  },
  loadBar: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  segmentOn: {
    backgroundColor: colors.accent,
  },
  segmentRepair: {
    backgroundColor: colors.surfaceAlt,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.text,
  },
});
