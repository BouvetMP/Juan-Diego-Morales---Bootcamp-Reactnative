import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CableCarRoute } from '../types';
import ItemCard from '../components/ItemCard';
import { cableCarRoutes } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavigationProp>();
  const [query, setQuery] = useState<string>('');

  const filteredRoutes = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return cableCarRoutes;

    return cableCarRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(trimmed) ||
        route.route.toLowerCase().includes(trimmed) ||
        route.originStation.toLowerCase().includes(trimmed) ||
        route.destinationStation.toLowerCase().includes(trimmed) ||
        route.subtitle.toLowerCase().includes(trimmed)
    );
  }, [query]);

  // Navegar al detalle pasando params tipados
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

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🚡</Text>
        <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
        <Text style={styles.emptySubText}>
          Intenta buscando por portal, estación o línea
        </Text>
      </View>
    ),
    [query]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Rutas de portal a portal</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
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
});