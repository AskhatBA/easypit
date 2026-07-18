import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';

import type { AttentionItem } from '../types';

const BADGE_LABEL: Record<AttentionItem['level'], string> = {
  important: 'важно',
  medium: 'средне',
};

export const AttentionList = ({ items }: { items: AttentionItem[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>ТРЕБУЕТ ВНИМАНИЯ</Text>

    <View style={styles.list}>
      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={styles.top}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={[
                styles.badge,
                item.level === 'important' && styles.badgeImportant,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  item.level === 'important' && styles.badgeTextImportant,
                ]}
              >
                {BADGE_LABEL[item.level]}
              </Text>
            </View>
          </View>

          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.text,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  badgeImportant: {
    backgroundColor: 'rgba(194,32,32,0.1)',
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.textMuted,
  },
  badgeTextImportant: {
    color: colors.danger,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
});
