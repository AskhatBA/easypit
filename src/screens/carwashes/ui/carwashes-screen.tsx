import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { toApiError } from '@/api';
import {
  CarwashCard,
  FleetStats,
  buildSummary,
  plural,
  useFleet,
} from '@/modules/fleet';
import { colors, fonts, spacing } from '@/shared/config';
import { EmptyState, ScreenContainer, TextField } from '@/shared/ui';

export const CarwashesScreen = () => {
  const [search, setSearch] = useState('');
  const { data, isPending, isError, error, refetch, isRefetching } = useFleet();

  const summary = useMemo(
    () => (data ? buildSummary(data) : null),
    [data],
  );

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }
    const query = search.trim().toLowerCase();
    if (!query) {
      return data;
    }
    return data.filter(
      carwash =>
        carwash.name.toLowerCase().includes(query) ||
        carwash.address.toLowerCase().includes(query),
    );
  }, [data, search]);

  return (
    <ScreenContainer
      edges={['bottom']}
      loading={isPending}
      error={isError ? toApiError(error).message : null}
      onRetry={refetch}
    >
      <FlatList
        data={filtered}
        keyExtractor={carwash => carwash.id}
        contentContainerStyle={styles.list}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              СЕТЬ · {summary?.locations ?? 0}{' '}
              {plural(summary?.locations ?? 0, [
                'ЛОКАЦИЯ',
                'ЛОКАЦИИ',
                'ЛОКАЦИЙ',
              ])}
            </Text>
            <Text style={styles.title}>Автомойки</Text>
            <Text style={styles.description}>
              Все ваши локации в одном пульте управления. Статус, загрузка боксов,
              рейтинг и расписание — в реальном времени.
            </Text>

            {summary ? (
              <View style={styles.stats}>
                <FleetStats summary={summary} />
              </View>
            ) : null}

            <TextField
              placeholder="Найти по названию или адресу…"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              style={styles.search}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Ничего не нашли"
            description="Попробуйте изменить запрос"
          />
        }
        renderItem={({ item }) => <CarwashCard carwash={item} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fonts.displayExtrabold,
    fontSize: 30,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  stats: {
    marginTop: spacing.md,
  },
  search: {
    marginTop: spacing.md,
  },
});
