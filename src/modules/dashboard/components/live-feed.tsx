import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';

import type { FeedItem } from '../types';

export const LiveFeed = ({ items }: { items: FeedItem[] }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.title}>Живая лента</Text>
      <View style={styles.liveTag}>
        <View style={styles.dot} />
        <Text style={styles.liveText}>В РЕАЛЬНОМ ВРЕМЕНИ</Text>
      </View>
    </View>

    <View style={styles.list}>
      {items.map(item => (
        <View key={item.id} style={styles.row}>
          <View style={styles.bullet} />
          <View style={styles.info}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.time}>{item.timeAgo}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
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
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.successBright,
  },
  liveText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.textMuted,
  },
  list: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
  rowSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
});
