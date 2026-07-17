import { FlatList, StyleSheet, Text } from 'react-native';

import { toApiError } from '@/api';
import { BookingCard, useBookings } from '@/modules/booking';
import { colors, fonts, spacing } from '@/shared/config';
import { EmptyState, ScreenContainer } from '@/shared/ui';

export const MyBookingsScreen = () => {
  const { data, isPending, isError, error, refetch, isRefetching } =
    useBookings();

  return (
    <ScreenContainer
      loading={isPending}
      error={isError ? toApiError(error).message : null}
      onRetry={refetch}
    >
      <FlatList
        data={data}
        keyExtractor={booking => booking.id}
        contentContainerStyle={styles.list}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={<Text style={styles.title}>Мои записи</Text>}
        ListEmptyComponent={
          <EmptyState
            title="Записей пока нет"
            description="Выберите мойку и запишитесь на удобное время"
          />
        }
        renderItem={({ item }) => <BookingCard booking={item} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.xs,
  },
});
