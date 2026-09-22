import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  ListRenderItem,
} from 'react-native';

import { CableCarRoute } from '../types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { useSavedStore } from '../stores/savedStore';

export function FavoritesScreen(): React.JSX.Element {
  const savedRoutes = useSavedStore((s) => s.savedRoutes);
  const removeRoute = useSavedStore((s) => s.removeRoute);
  const clearAll = useSavedStore((s) => s.clearAll);

  const renderFavorite: ListRenderItem<CableCarRoute> = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.heartIcon}>♥</Text>
        <View style={styles.cardContent}>
          <Text style={styles.line}>{item.route}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.stations}>
            {item.originStation} → {item.destinationStation}
          </Text>
          <Text style={styles.meta}>
            {item.duration} min · ${item.ticketPrice.toLocaleString('es-CO')}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.6 }]}
          onPress={() => removeRoute(item.id)}
        >
          <Text style={styles.removeText}>Quitar</Text>
        </Pressable>
      </View>
    ),
    [removeRoute]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>
          {savedRoutes.length === 0
            ? 'Aún no has guardado rutas'
            : `${savedRoutes.length} ruta${savedRoutes.length === 1 ? '' : 's'} guardada${savedRoutes.length === 1 ? '' : 's'}`}
        </Text>
        {savedRoutes.length > 0 && (
          <Pressable onPress={clearAll}>
            <Text style={styles.clearText}>Limpiar todo</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={savedRoutes}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyText}>No tienes rutas favoritas</Text>
            <Text style={styles.emptySubText}>
              Ve al detalle de una ruta y pulsa “Guardar en favoritos”
            </Text>
          </View>
        }
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  clearText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.error,
  },
  cardContent: {
    flex: 1,
  },
  line: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  stations: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  meta: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
  },
  removeBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  removeText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 48,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weight.semibold,
    marginBottom: SPACING.xs,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});