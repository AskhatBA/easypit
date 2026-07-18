import { useQuery } from '@tanstack/react-query';

import { fetchFleet } from '../data';

export const useFleet = () =>
  useQuery({
    queryKey: ['fleet'],
    queryFn: fetchFleet,
  });
