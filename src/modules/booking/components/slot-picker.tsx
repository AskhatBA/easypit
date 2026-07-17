import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Slot } from '@/modules/wash';
import { colors, fonts, radius, spacing } from '@/shared/config';
import { formatTime } from '@/shared/lib';

type SlotPickerProps = {
  slots: Slot[];
  selectedId: string | null;
  onSelect: (slotId: string) => void;
};

export const SlotPicker = ({ slots, selectedId, onSelect }: SlotPickerProps) => (
  <View style={styles.grid}>
    {slots.map(slot => {
      const isSelected = slot.id === selectedId;

      return (
        <Pressable
          key={slot.id}
          accessibilityRole="button"
          accessibilityState={{
            selected: isSelected,
            disabled: !slot.isAvailable,
          }}
          disabled={!slot.isAvailable}
          onPress={() => onSelect(slot.id)}
          style={[
            styles.slot,
            isSelected && styles.slotSelected,
            !slot.isAvailable && styles.slotDisabled,
          ]}
        >
          <Text
            style={[
              styles.time,
              isSelected && styles.timeSelected,
              !slot.isAvailable && styles.timeDisabled,
            ]}
          >
            {formatTime(slot.startsAt)}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  slotSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  slotDisabled: {
    backgroundColor: colors.surface,
    borderColor: colors.surface,
  },
  time: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
  timeSelected: {
    color: colors.textInverse,
  },
  timeDisabled: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
