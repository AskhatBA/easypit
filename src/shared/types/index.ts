export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type {
  TabParamList,
  RootStackParamList,
  RootScreenProps,
} from './navigation';
