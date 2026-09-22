import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ListRenderItem,
} from 'react-native';
import { CableCarRoute } from '../types';
import ItemCard from '../components/ItemCard';
import { cableCarRoutes } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = '🚡 Cable Bogotá';
  const DOMAIN_SUBTITLE = 'Rutas de portal a portal';

  const [query, setQuery] = useState<string>('');

  // 🔍 Filtrado en tiempo real con useMemo
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

  const handleItemPress = useCallback((route: CableCarRoute) => {
    console.log('Ruta seleccionada:', route.name);
  }, []);

  // Renderizado optimizado de los items de la lista
  const renderItem: ListRenderItem<CableCarRoute> = useCallback(
    ({ item }) => (
      <ItemCard route={item} onPress={() => handleItemPress(item)} />
    ),
    [handleItemPress]
  );

  // Estado vacío cuando la búsqueda no da resultados
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Encabezado y buscador fijos en la parte superior para mantener el foco */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
          <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>

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

        {/* Lista fluida con FlatList */}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
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