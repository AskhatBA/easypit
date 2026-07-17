import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, typography } from '@/shared/config';

type Variant = keyof typeof typography;

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
};

/**
 * Единая точка для текста: подставляет нужное начертание (Manrope / Bricolage)
 * и цвет из темы. Заголовки — вариант display/title/subtitle (Bricolage Grotesque).
 */
export const AppText = ({
  variant = 'body',
  color = colors.text,
  style,
  ...rest
}: AppTextProps) => (
  <Text style={[typography[variant], { color }, style]} {...rest} />
);

export const Heading = ({ style, ...rest }: AppTextProps) => (
  <AppText variant="title" style={style} {...rest} />
);

// Утилита для инлайновых стилей, где нужен только fontFamily варианта.
export const fontOf = (variant: Variant) =>
  StyleSheet.flatten(typography[variant]).fontFamily;
