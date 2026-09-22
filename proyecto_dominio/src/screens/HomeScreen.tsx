import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Pressable,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ItemCard from '../components/ItemCard';
import { useRoutes } from '../hooks/useRoutes';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { CableCarRoute } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavigationProp>();
  const [query, setQuery] = useState('');

  const { data, isLoading, isError, error, refetch, isFetching } = useRoutes();

  const routes = data ?? [];

  const filteredRoutes = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return routes;
    return routes.filter(
      (route) =>
        route.name.toLowerCase().includes(trimmed) ||
        route.route.toLowerCase().includes(trimmed) ||
        route.originStation.toLowerCase().includes(trimmed) ||
        route.destinationStation.toLowerCase().includes(trimmed) ||
        route.subtitle.toLowerCase().includes(trimmed)
    );
  }, [query, routes]);

  const handleItemPress = useCallback(
    (route: CableCarRoute) => {
      navigation.navigate('HomeDetail', {
        id: route.id,
        name: route.name,
        route: route.route,
        originStation: route.originStation,
        destinationStation: route.destinationStation,
        duration: route.duration,
        ticketPrice: route.ticketPrice,
        subtitle: route.subtitle,
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<CableCarRoute> = useCallback(
    ({ item }) => (
      <ItemCard route={item} onPress={() => handleItemPress(item)} />
    ),
    [handleItemPress]
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🚡</Text>
        <Text style={styles.emptyText}>
          {query.trim()
            ? `Sin resultados para "${query}"`
            : 'No hay rutas disponibles'}
        </Text>
        <Text style={styles.emptySubText}>
          {query.trim()
            ? 'Prueba con otro portal o línea'
            : 'Desliza hacia abajo para actualizar'}
        </Text>
      </View>
    );
  }, [query, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando rutas de cable...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyIcon}>⚠️</Text>
        <Text style={styles.emptyText}>No se pudieron cargar las rutas</Text>
        <Text style={styles.emptySubText}>
          {error?.message ?? 'Error de red'}
        </Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerSubtitle}>Rutas desde la API</Text>
          <Pressable
            style={styles.createChip}
            onPress={() => navigation.navigate('CreateRoute')}
          >
            <Text style={styles.createChipText}>+ Nueva</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ruta, portal o estación..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        // Pull-to-refresh
        refreshing={isFetching && !isLoading}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.size.sm,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
  },
  createChip: {
    backgroundColor: COLORS.accentDim,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  createChipText: {
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.sm,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: {
    padding: SPACING.base,
    flexGrow: 1,
  },
  separator: {
    height: SPACING.base,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
  },
  retryText: {
    color: COLORS.background,
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.base,
  },
});