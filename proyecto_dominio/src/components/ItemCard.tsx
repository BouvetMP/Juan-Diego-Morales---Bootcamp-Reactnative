import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { CableCarRoute } from "../types/index";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { useSavedStore } from "../stores/savedStore";
import { Ionicons } from "@expo/vector-icons";
import { usePreferences } from "../hooks/usePreferences";
import AnimatedCard from "./AnimatedCard"; 

interface ItemCardProps {
  route: CableCarRoute;
  onPress: () => void;
}

const ItemCard = ({ route, onPress }: ItemCardProps) => {
  const { isSaved, toggleRoute } = useSavedStore();
  const saved = isSaved(route.id);
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  return (
    <AnimatedCard
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      {/* Imagen Placeholder */}
      <Image
        source={{ uri: `https://picsum.photos/seed/${route.id}/400/200` }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {route.name}
          </Text>
          <Pressable
            onPress={() => toggleRoute(route)}
            style={styles.favoriteButton}
            hitSlop={8}
          >
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={24}
              color={saved ? colors.error : colors.textSecondary}
            />
          </Pressable>
        </View>

        <Text
          style={[styles.routeText, { color: colors.accent }]}
          numberOfLines={1}
        >
          {route.originStation} → {route.destinationStation}
        </Text>

        <Text
          style={[styles.subtitle, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {route.subtitle}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoBadge}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textPrimary}
            />
            <Text style={[styles.infoText, { color: colors.textPrimary }]}>
              {route.duration} min
            </Text>
          </View>
          <Text style={[styles.price, { color: colors.textPrimary }]}>
            ${route.ticketPrice.toLocaleString("es-CO")}
          </Text>
        </View>

        <View style={[styles.button, { backgroundColor: colors.accent }]}>
          <Text
            style={[
              styles.buttonText,
              { color: preferences.darkMode ? "#0d1117" : "#ffffff" },
            ]}
          >
            Ver detalles
          </Text>
        </View>
      </View>
    </AnimatedCard>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#30363d",
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  routeText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  infoText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  price: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  button: {
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    alignItems: "center",
  },
  buttonText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});