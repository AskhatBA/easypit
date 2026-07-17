import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatDate, formatPrice, formatTime } from '@/shared/lib';

import type { Booking, BookingStatus } from '../types';

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждено',
  done: 'Завершено',
  cancelled: 'Отменено',
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  pending: colors.warning,
  confirmed: colors.success,
  done: colors.textMuted,
  cancelled: colors.danger,
};

export const BookingCard = ({ booking }: { booking: Booking }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.wash}>{booking.washName}</Text>
      <Text style={[styles.status, { color: STATUS_COLOR[booking.status] }]}>
        {STATUS_LABEL[booking.status]}
      </Text>
    </View>

    <Text style={styles.services}>{booking.serviceTitles.join(', ')}</Text>

    <View style={styles.footer}>
      <Text style={styles.when}>
        {formatDate(booking.startsAt)}, {formatTime(booking.startsAt)}
      </Text>
      <Text style={styles.price}>{formatPrice(booking.totalPrice)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  wash: {
    flex: 1,
    fontFamily: fonts.displaySemibold,
    fontSize: 16,
    color: colors.text,
  },
  status: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  services: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  when: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.text,
  },
});
