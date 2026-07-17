import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { toApiError } from '@/api';
import { useWash } from '@/modules/wash';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatDistance, formatDuration, formatPrice } from '@/shared/lib';
import type { RootScreenProps } from '@/shared/types';
import { Button, ScreenContainer } from '@/shared/ui';

export const WashDetailsScreen = ({
  route,
  navigation,
}: RootScreenProps<'WashDetails'>) => {
  const { washId } = route.params;
  const { data: wash, isPending, isError, error, refetch } = useWash(washId);

  return (
    <ScreenContainer
      edges={['bottom']}
      loading={isPending}
      error={isError ? toApiError(error).message : null}
      onRetry={refetch}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{wash?.name}</Text>
          <Text style={styles.address}>{wash?.address}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>★ {wash?.rating.toFixed(1)}</Text>
            <Text style={styles.meta}>
              {wash ? formatDistance(wash.distanceKm) : ''}
            </Text>
            <Text
              style={[styles.meta, wash?.isOpen ? styles.open : styles.closed]}
            >
              {wash?.isOpen ? 'Открыто' : 'Закрыто'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Услуги</Text>

          {wash?.services.map(service => (
            <View key={service.id} style={styles.serviceRow}>
              <View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDuration}>
                  {formatDuration(service.durationMin)}
                </Text>
              </View>
              <Text style={styles.servicePrice}>
                {formatPrice(service.price)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Записаться"
          variant="accent"
          disabled={!wash?.isOpen}
          onPress={() => navigation.navigate('Booking', { washId })}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    padding: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
  },
  address: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  meta: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textMuted,
  },
  open: {
    color: colors.success,
  },
  closed: {
    color: colors.danger,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemibold,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  serviceTitle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
  },
  serviceDuration: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  servicePrice: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.text,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
