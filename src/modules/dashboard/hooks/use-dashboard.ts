import { useQuery } from '@tanstack/react-query';

import { fetchDashboard } from '../data';

export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });
