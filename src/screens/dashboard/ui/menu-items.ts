import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import {
  CalendarEventIcon,
  CarIcon,
  CoinIcon,
  FloorIcon,
  ReportMoneyIcon,
  SettingsIcon,
  StarIcon,
  UsersIcon,
  WarehouseIcon,
} from '@/assets/icons';
import type { TabParamList } from '@/shared/types';

/** Плитка ведёт либо на таб, либо на push-экран Carwashes (все без параметров). */
export type MenuTarget = keyof TabParamList | 'Carwashes';

export type MenuItem = {
  key: string;
  label: string;
  Icon: FC<SvgProps>;
  /** Куда ведёт плитка. Пусто — раздел пока не реализован в приложении. */
  target?: MenuTarget;
};

// Порядок и иконки — как в левом меню business.easypit.kz.
export const MENU_ITEMS: MenuItem[] = [
  { key: 'floor', label: 'Зал мойки', Icon: FloorIcon },
  { key: 'carwashes', label: 'Автомойки', Icon: CarIcon, target: 'Carwashes' },
  {
    key: 'bookings',
    label: 'Бронирования',
    Icon: CalendarEventIcon,
    target: 'MyBookings',
  },
  { key: 'staff', label: 'Персонал', Icon: UsersIcon },
  { key: 'finance', label: 'Финансы', Icon: CoinIcon },
  { key: 'payroll', label: 'Зарплата', Icon: ReportMoneyIcon },
  { key: 'reviews', label: 'Отзывы', Icon: StarIcon },
  { key: 'warehouse', label: 'Склад', Icon: WarehouseIcon },
  { key: 'settings', label: 'Настройки', Icon: SettingsIcon, target: 'Profile' },
];
