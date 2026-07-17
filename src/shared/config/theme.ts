/**
 * Дизайн-токены сняты с business.easypit.kz (Mantine-тема панели).
 * Палитра: тёплый near-black графит + лаймовый акцент на молочном фоне.
 * Шрифты: Manrope (текст) + Bricolage Grotesque (заголовки).
 */
export const colors = {
  // Основное действие — тёмный графит (как кнопка «Войти» на сайте)
  primary: '#23292e',
  primaryPressed: '#14181b',
  primarySoft: '#f4f6f7',

  // Лаймовый акцент — как CTA «Новая бронь»
  accent: '#b9df33',
  accentPressed: '#a3c61d',
  accentStrong: '#4d5d14', // читаемый оливковый для текста/иконок по светлому
  accentSoft: '#f5fbe6',

  background: '#ffffff',
  surface: '#fafaf7', // тёплый молочный
  surfaceAlt: '#f2f2ea',
  border: '#e7e7de',
  borderStrong: '#aab1b8',

  text: '#14181b',
  textMuted: '#525a66',
  textInverse: '#ffffff',
  placeholder: '#868e96',

  success: '#0b5836',
  successBright: '#16a063',
  danger: '#c22020',
  warning: '#F08C00',
} as const;

export const fonts = {
  // Ссылаемся на PostScript-имена статических начертаний (см. assets/fonts).
  regular: 'Manrope-Regular',
  medium: 'Manrope-Medium',
  semibold: 'Manrope-SemiBold',
  bold: 'Manrope-Bold',
  extrabold: 'Manrope-ExtraBold',
  // Дисплейный шрифт для заголовков
  displaySemibold: 'BricolageGrotesque-SemiBold',
  displayBold: 'BricolageGrotesque-Bold',
  displayExtrabold: 'BricolageGrotesque-ExtraBold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14, // базовый радиус кнопок и инпутов на сайте
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontFamily: fonts.displayExtrabold, fontSize: 30 },
  title: { fontFamily: fonts.displayBold, fontSize: 24 },
  subtitle: { fontFamily: fonts.displaySemibold, fontSize: 18 },
  body: { fontFamily: fonts.regular, fontSize: 15 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 15 },
  label: { fontFamily: fonts.medium, fontSize: 13 },
  caption: { fontFamily: fonts.regular, fontSize: 13 },
} as const;

export const theme = { colors, fonts, spacing, radius, typography } as const;

export type Theme = typeof theme;
