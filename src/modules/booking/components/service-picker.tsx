import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { WashService } from '@/modules/wash';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatDuration, formatPrice } from '@/shared/lib';

type ServicePickerProps = {
  services: WashService[];
  selectedIds: string[];
  onToggle: (serviceId: string) => void;
};

export const ServicePicker = ({
  services,
  selectedIds,
  onToggle,
}: ServicePickerProps) => (
  <View style={styles.list}>
    {services.map(service => {
      const isSelected = selectedIds.includes(service.id);

      return (
        <Pressable
          key={service.id}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isSelected }}
          onPress={() => onToggle(service.id)}
          style={[styles.row, isSelected && styles.rowSelected]}
        >
          <View style={styles.info}>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.duration}>
              {formatDuration(service.durationMin)}
            </Text>
          </View>

          <Text style={[styles.price, isSelected && styles.priceSelected]}>
            {formatPrice(service.price)}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  rowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  info: {
    gap: 2,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
  },
  duration: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  price: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.text,
  },
  priceSelected: {
    color: colors.accentStrong,
  },
});
