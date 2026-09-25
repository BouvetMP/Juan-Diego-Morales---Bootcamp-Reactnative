import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useAuthStore } from "../stores/authStore";
import { usePreferences } from "../hooks/usePreferences";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.headerCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Image
          source={{ uri: user?.image || "https://via.placeholder.com/150" }}
          style={[styles.avatar, { borderColor: colors.accent }]}
        />
        <Text style={[styles.name, { color: colors.textPrimary }]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.username, { color: colors.textSecondary }]}>
          @{user?.username}
        </Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: colors.accentDim, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.badgeText, { color: colors.accent }]}>
            🚠 Pasajero / Cliente
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Datos del Pasajero
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={[styles.rowText, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>
        <View style={styles.row}>
          <Ionicons
            name="card-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={[styles.rowText, { color: colors.textSecondary }]}>
            Tarjeta TuLlave: {user?.tuLlaveCard || "No registrada"}
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={logout}
      >
        <Ionicons name="log-out-outline" size={20} color="#ffffff" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.md },
  headerCard: {
    alignItems: "center",
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    marginBottom: SPACING.md,
  },
  name: { fontSize: TYPOGRAPHY.size.lg, fontWeight: TYPOGRAPHY.weight.bold },
  username: { fontSize: TYPOGRAPHY.size.md, marginBottom: SPACING.sm },
  badge: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    marginTop: SPACING.sm,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  infoCard: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  rowText: { fontSize: TYPOGRAPHY.size.md },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});

export default ProfileScreen;
