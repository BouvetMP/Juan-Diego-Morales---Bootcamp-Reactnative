import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CableCarRoute } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  route: CableCarRoute;
  onPress?: () => void;
}

export default function ItemCard({
  route,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://picsum.photos/300/150' }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name}>{route.name}</Text>
      <Text style={styles.stations}>
        {route.originStation} → {route.destinationStation}
      </Text>
      <Text style={styles.subtitle}>{route.subtitle}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>⏱️ {route.duration} min</Text>
        <Text style={styles.infoText}>
          ${route.ticketPrice.toLocaleString('es-CO')}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Ver detalles</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  stations: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
    backgroundColor: COLORS.info,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});