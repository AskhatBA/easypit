import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, radius, spacing } from '@/shared/config';

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const SPINNER_COLOR: Record<ButtonVariant, string> = {
  primary: colors.textInverse,
  accent: colors.text,
  secondary: colors.text,
  ghost: colors.text,
};

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !isDisabled && styles[`${variant}Pressed`],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={SPINNER_COLOR[variant]} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`]]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  // primary — тёмный графит
  primary: {
    backgroundColor: colors.primary,
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed,
  },
  // accent — лаймовый CTA
  accent: {
    backgroundColor: colors.accent,
  },
  accentPressed: {
    backgroundColor: colors.accentPressed,
  },
  // secondary — мягкая заливка
  secondary: {
    backgroundColor: colors.surfaceAlt,
  },
  secondaryPressed: {
    backgroundColor: colors.border,
  },
  // ghost — контурная
  ghost: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  ghostPressed: {
    backgroundColor: colors.surface,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  primaryLabel: {
    color: colors.textInverse,
  },
  accentLabel: {
    color: colors.text,
  },
  secondaryLabel: {
    color: colors.text,
  },
  ghostLabel: {
    color: colors.text,
  },
  disabled: {
    opacity: 0.45,
  },
});
