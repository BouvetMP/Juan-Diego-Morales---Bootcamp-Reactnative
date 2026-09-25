import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useAuthStore } from "../stores/authStore";
import { usePreferences } from "../hooks/usePreferences";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { getQuickRechargePin } from "../storage/secure";

export function ProfileScreen() {
  const { user, logout, rechargeSaldo } = useAuthStore();
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  // Estados del modal de recarga rápida
  const [modalVisible, setModalVisible] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const handleOpenRechargeModal = async () => {
    const savedPin = await getQuickRechargePin();
    if (!savedPin) {
      const noPinMsg =
        "Debes configurar un PIN de Recarga Rápida de 6 dígitos en la pestaña Ajustes antes de recargar.";
      if (Platform.OS === "web") window.alert(noPinMsg);
      else Alert.alert("PIN Requerido", noPinMsg);
      return;
    }
    setPinInput("");
    setPinError("");
    setModalVisible(true);
  };

  const handleConfirmRecharge = async () => {
    const savedPin = await getQuickRechargePin();

    if (pinInput !== savedPin) {
      setPinError("PIN incorrecto. Inténtalo de nuevo.");
      return;
    }

    const RECHARGE_AMOUNT = 10000;
    rechargeSaldo(RECHARGE_AMOUNT);
    setModalVisible(false);

    const newSaldoFormatted = (
      (user?.saldo || 0) + RECHARGE_AMOUNT
    ).toLocaleString("es-CO");

    const successMsg = `✅ Recarga rápida hecha exitosamente (+ $10.000 COP).\n\nNuevo saldo disponible: $${newSaldoFormatted} COP`;

    if (Platform.OS === "web") {
      window.alert(successMsg);
    } else {
      Alert.alert("¡Éxito!", successMsg);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
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
          styles.balanceCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.balanceHeader}>
          <Ionicons name="wallet-outline" size={24} color={colors.accent} />
          <Text style={[styles.balanceTitle, { color: colors.textPrimary }]}>
            Tarjeta TuLlave Digital
          </Text>
        </View>

        <Text style={[styles.balanceAmount, { color: colors.accent }]}>
          ${(user?.saldo || 0).toLocaleString("es-CO")} COP
        </Text>
        <Text style={[styles.subLabel, { color: colors.textSecondary }]}>
          Saldo disponible
        </Text>

        <Pressable
          style={[styles.rechargeButton, { backgroundColor: colors.accent }]}
          onPress={handleOpenRechargeModal}
        >
          <Ionicons name="flash-outline" size={18} color="#0d1117" />
          <Text
            style={[
              styles.rechargeButtonText,
              { color: preferences.darkMode ? "#0d1117" : "#ffffff" },
            ]}
          >
            ⚡ Recarga Rápida (+$10.000 COP)
          </Text>
        </Pressable>
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
        <View style={styles.row}>
          <Ionicons
            name="ticket-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={[styles.rowText, { color: colors.textSecondary }]}>
            Pasajes Activos: {user?.pasajesActivos ?? 0}
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Ionicons name="lock-closed" size={28} color={colors.accent} />
              <Text
                style={[styles.modalTitle, { color: colors.textPrimary }]}
              >
                PIN de Recarga Rápida
              </Text>
            </View>

            <Text
              style={[styles.modalSubtitle, { color: colors.textSecondary }]}
            >
              Ingresa tu PIN de 6 dígitos para autorizar la recarga automática de $10.000 COP.
            </Text>

            <TextInput
              style={[
                styles.pinInput,
                {
                  backgroundColor: colors.background,
                  borderColor: pinError ? colors.error : colors.border,
                  color: colors.textPrimary,
                },
              ]}
              placeholder="123456"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
              value={pinInput}
              onChangeText={(text) => {
                setPinInput(text);
                setPinError("");
              }}
            />

            {!!pinError && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {pinError}
              </Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: colors.textSecondary, fontWeight: TYPOGRAPHY.weight.bold }}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.accent },
                ]}
                onPress={handleConfirmRecharge}
              >
                <Text
                  style={{
                    color: preferences.darkMode ? "#0d1117" : "#ffffff",
                    fontWeight: TYPOGRAPHY.weight.bold,
                  }}
                >
                  Confirmar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: SPACING.md, paddingBottom: 80 },
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
  balanceCard: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  balanceTitle: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  balanceAmount: {
    fontSize: TYPOGRAPHY.size.xl * 1.3,
    fontWeight: TYPOGRAPHY.weight.bold,
    marginTop: SPACING.xs,
  },
  subLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    marginBottom: SPACING.md,
  },
  rechargeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  rechargeButtonText: {
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
  // Estilos del Modal / Pop-up
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.md,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 360,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  modalSubtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  pinInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.size.lg,
    textAlign: "center",
    letterSpacing: 8,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  errorText: {
    fontSize: TYPOGRAPHY.size.xs,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
});

export default ProfileScreen;