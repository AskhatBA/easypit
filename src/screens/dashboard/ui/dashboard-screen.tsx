import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuthStore } from '@/modules/auth';
import { colors, fonts, radius, spacing } from '@/shared/config';
import type { TabParamList } from '@/shared/types';
import { ScreenContainer } from '@/shared/ui';

import { MENU_ITEMS, type MenuItem } from './menu-items';

const COLUMNS = 3;
const GAP = spacing.md;
const H_PADDING = spacing.lg;

const tileSize =
  (Dimensions.get('window').width - H_PADDING * 2 - GAP * (COLUMNS - 1)) /
  COLUMNS;

type Navigation = BottomTabNavigationProp<TabParamList>;

const MenuTile = ({
  item,
  onPress,
}: {
  item: MenuItem;
  onPress: (item: MenuItem) => void;
}) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => onPress(item)}
    style={({ pressed }) => [
      styles.tile,
      { width: tileSize, height: tileSize },
      pressed && styles.tilePressed,
    ]}
  >
    <View style={styles.iconWrap}>
      <item.Icon width={26} height={26} color={colors.accentStrong} />
    </View>
    <Text style={styles.tileLabel} numberOfLines={2}>
      {item.label}
    </Text>
  </Pressable>
);

export const DashboardScreen = () => {
  const navigation = useNavigation<Navigation>();
  const userName = useAuthStore(state => state.user?.name);

  const handlePress = (item: MenuItem) => {
    if (item.target) {
      navigation.navigate(item.target);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>МЕНЮ</Text>
          <Text style={styles.title}>
            {userName ? `Привет, ${userName.split(' ')[0]}` : 'Панель'}
          </Text>
          <Text style={styles.subtitle}>Командный центр вашей сети</Text>
        </View>

        <View style={styles.grid}>
          {MENU_ITEMS.map(item => (
            <MenuTile key={item.key} item={item} onPress={handlePress} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: H_PADDING,
    gap: spacing.xl,
  },
  header: {
    gap: 2,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tilePressed: {
    backgroundColor: colors.surfaceAlt,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  tileLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    color: colors.text,
  },
});
