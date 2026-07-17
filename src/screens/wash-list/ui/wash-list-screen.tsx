import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { toApiError } from '@/api';
import { WashCard, useWashes } from '@/modules/wash';
import { colors, fonts, spacing } from '@/shared/config';
import type { RootStackParamList } from '@/shared/types';
import { EmptyState, ScreenContainer, TextField } from '@/shared/ui';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const WashListScreen = () => {
  const navigation = useNavigation<Navigation>();
  const [search, setSearch] = useState('');
  const { data, isPending, isError, error, refetch, isRefetching } =
    useWashes(search);

  return (
    <ScreenContainer
      loading={isPending}
      error={isError ? toApiError(error).message : null}
      onRetry={refetch}
    >
      <FlatList
        data={data}
        keyExtractor={wash => wash.id}
        contentContainerStyle={styles.list}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Мойки рядом</Text>
            <TextField
              placeholder="Поиск по названию или адресу"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="Ничего не нашли"
            description="Попробуйте изменить запрос"
          />
        }
        renderItem={({ item }) => (
          <WashCard
            wash={item}
            onPress={washId => navigation.navigate('WashDetails', { washId })}
          />
        )}
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
  header: {
    gap: spacing.lg,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    color: colors.text,
  },
});
