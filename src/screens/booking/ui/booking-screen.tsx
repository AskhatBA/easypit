import { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { toApiError } from '@/api';
import {
  BookingDraftProvider,
  BookingForm,
  ServicePicker,
  SlotPicker,
  useBookingDraft,
} from '@/modules/booking';
import { useSlots, useWash } from '@/modules/wash';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { toDateKey } from '@/shared/lib';
import type { RootScreenProps } from '@/shared/types';
import { ScreenContainer } from '@/shared/ui';

const DAYS_AHEAD = 5;

const upcomingDays = () =>
  Array.from({ length: DAYS_AHEAD }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return date;
  });

const BookingScreenContent = ({
  route,
  navigation,
}: RootScreenProps<'Booking'>) => {
  const { washId } = route.params;
  const { draft, toggleService, selectSlot, selectDate, reset } =
    useBookingDraft();

  const washQuery = useWash(washId);
  const slotsQuery = useSlots(washId, draft.dateKey);

  useEffect(() => {
    reset(washId);
  }, [reset, washId]);

  const days = useMemo(upcomingDays, []);

  const totalPrice = useMemo(() => {
    const services = washQuery.data?.services ?? [];

    return services
      .filter(service => draft.serviceIds.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
  }, [washQuery.data, draft.serviceIds]);

  return (
    <ScreenContainer
      edges={['bottom']}
      loading={washQuery.isPending}
      error={washQuery.isError ? toApiError(washQuery.error).message : null}
      onRetry={washQuery.refetch}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Услуги</Text>
          <ServicePicker
            services={washQuery.data?.services ?? []}
            selectedIds={draft.serviceIds}
            onToggle={toggleService}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата</Text>
          <View style={styles.days}>
            {days.map(day => {
              const dateKey = toDateKey(day);
              const isSelected = dateKey === draft.dateKey;

              return (
                <Pressable
                  key={dateKey}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => selectDate(dateKey)}
                  style={[styles.day, isSelected && styles.daySelected]}
                >
                  <Text
                    style={[
                      styles.dayWeekday,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day.toLocaleDateString('ru-RU', { weekday: 'short' })}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Время</Text>
          {slotsQuery.isPending ? (
            <Text style={styles.hint}>Загружаем свободные слоты…</Text>
          ) : (
            <SlotPicker
              slots={slotsQuery.data ?? []}
              selectedId={draft.slotId}
              onSelect={selectSlot}
            />
          )}
        </View>

        <BookingForm
          totalPrice={totalPrice}
          onSuccess={() => navigation.navigate('Tabs', { screen: 'MyBookings' })}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export const BookingScreen = (props: RootScreenProps<'Booking'>) => (
  <BookingDraftProvider>
    <BookingScreenContent {...props} />
  </BookingDraftProvider>
);

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemibold,
    fontSize: 18,
    color: colors.text,
  },
  days: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  daySelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dayWeekday: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  dayNumber: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.text,
  },
  dayTextSelected: {
    color: colors.textInverse,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
});
