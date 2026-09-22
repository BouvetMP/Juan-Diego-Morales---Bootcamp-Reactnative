import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, ListRenderItem } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { CableCarRoute } from '../types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

export function FavoritesScreen(): React.JSX.Element {
  const renderFavorite: ListRenderItem<CableCarRoute> = useCallback(({ item }) => {
    return (
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
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Tus rutas de cable guardadas para acceso rápido
      </Text>

      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes rutas favoritas todavía</Text>
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
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.error,
    marginTop: 2,
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
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});