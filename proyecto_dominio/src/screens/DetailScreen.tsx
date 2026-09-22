import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const {
    id,
    name,
    route: line,
    originStation,
    destinationStation,
    duration,
    ticketPrice,
    subtitle,
  } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: 'https://picsum.photos/600/280' }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name}>{name}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{line}</Text>
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Origen</Text>
        <Text style={styles.fieldValue}>{originStation}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Destino</Text>
        <Text style={styles.fieldValue}>{destinationStation}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Duración del trayecto</Text>
        <Text style={styles.fieldValue}>{duration} minutos</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tarifa</Text>
        <Text style={[styles.fieldValue, styles.price]}>
          ${ticketPrice.toLocaleString('es-CO')} COP
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>ID de ruta</Text>
        <Text style={styles.fieldValue}>{id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  price: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.size.md,
  },
});