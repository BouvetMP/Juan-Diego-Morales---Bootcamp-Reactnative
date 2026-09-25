import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { usePreferences } from "../hooks/usePreferences";
import {
  saveOperatorCode,
  getOperatorCode,
  deleteOperatorCode,
} from "../storage/secure";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";

export const SettingsScreen = () => {
  const { preferences, updatePreference, loadInit } = usePreferences();
  const [operatorCodeInput, setOperatorCodeInput] = useState("");
  const [isCodeSaved, setIsCodeSaved] = useState(false);
  const colors = getColors(preferences.darkMode);

  useEffect(() => {
    loadInit();
    checkOperatorCode();
  }, [loadInit]);

  const checkOperatorCode = async () => {
    const saved = await getOperatorCode();
    setIsCodeSaved(!!saved);
  };

  const handleSaveCode = async () => {
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(operatorCodeInput)) {
      const msg = "El PIN debe ser exactamente 6 dígitos numéricos.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Error", msg);
      return;
    }
    await saveOperatorCode(operatorCodeInput);
    setOperatorCodeInput("");
    setIsCodeSaved(true);
    if (Platform.OS === "web")
      window.alert("✅ Código guardado de forma segura");
    else Alert.alert("Éxito", "✅ Código guardado de forma segura");
  };

  const handleDeleteCode = async () => {
    await deleteOperatorCode();
    setIsCodeSaved(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.sectionTitle, { color: colors.accent }]}>
        TEMA Y VISUALIZACIÓN
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.textGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Modo Oscuro
            </Text>
            <Text style={[styles.subLabel, { color: colors.textSecondary }]}>
              Cambiar aspecto visual de toda la app
            </Text>
          </View>
          <Switch
            value={preferences.darkMode}
            onValueChange={(val) => updatePreference("darkMode", val)}
            thumbColor={preferences.darkMode ? colors.accent : colors.textMuted}
            trackColor={{ false: colors.border, true: colors.accentDim }}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.accent }]}>
        FILTROS DEL LISTADO
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          Ordenar rutas por
        </Text>
        <View style={styles.buttonGroup}>
          {(["name", "duration", "price"] as const).map((option) => {
            const active = preferences.sortOrder === option;
            return (
              <Pressable
                key={option}
                style={[
                  styles.chip,
                  {
                    borderColor: active ? colors.accent : colors.border,
                    backgroundColor: active ? colors.accent : colors.background,
                  },
                ]}
                onPress={() => updatePreference("sortOrder", option)}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: active ? colors.background : colors.textSecondary,
                      fontWeight: active
                        ? TYPOGRAPHY.weight.bold
                        : TYPOGRAPHY.weight.medium,
                    },
                  ]}
                >
                  {option === "name"
                    ? "Nombre"
                    : option === "duration"
                      ? "Duración"
                      : "Precio"}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.textGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Rutas Populares
            </Text>
            <Text style={[styles.subLabel, { color: colors.textSecondary }]}>
              Resalta rutas exprés (≤ 15 min)
            </Text>
          </View>
          <Switch
            value={preferences.showPopular}
            onValueChange={(val) => updatePreference("showPopular", val)}
            thumbColor={
              preferences.showPopular ? colors.accent : colors.textMuted
            }
            trackColor={{ false: colors.border, true: colors.accentDim }}
          />
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.textGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Solo Guardadas
            </Text>
            <Text style={[styles.subLabel, { color: colors.textSecondary }]}>
              Oculta las rutas que no estén en Favoritos
            </Text>
          </View>
          <Switch
            value={preferences.showOnlySaved}
            onValueChange={(val) => updatePreference("showOnlySaved", val)}
            thumbColor={
              preferences.showOnlySaved ? colors.accent : colors.textMuted
            }
            trackColor={{ false: colors.border, true: colors.accentDim }}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.accent }]}>
        SEGURIDAD OPERADOR
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          Código PIN (6 dígitos)
        </Text>
        <Text style={[styles.subLabel, { color: colors.textSecondary }]}>
          Se almacena cifrado en el dispositivo.
        </Text>

        {isCodeSaved ? (
          <View
            style={[
              styles.statusBox,
              {
                borderColor: colors.success,
                backgroundColor: colors.accentDim,
              },
            ]}
          >
            <Text style={[styles.statusText, { color: colors.success }]}>
              ✅ PIN guardado
            </Text>
            <Pressable
              style={[styles.deleteButton, { backgroundColor: colors.error }]}
              onPress={handleDeleteCode}
            >
              <Text style={styles.deleteButtonText}>Eliminar código</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              placeholder="123456"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
              value={operatorCodeInput}
              onChangeText={setOperatorCodeInput}
            />
            <Pressable
              style={[styles.saveButton, { backgroundColor: colors.accent }]}
              onPress={handleSaveCode}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  { color: preferences.darkMode ? "#0d1117" : "#ffffff" },
                ]}
              >
                Guardar
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.md },
  sectionTitle: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
    letterSpacing: 1,
  },
  card: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textGroup: { flex: 1, paddingRight: SPACING.sm },
  label: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  subLabel: { fontSize: TYPOGRAPHY.size.sm, marginTop: 2 },
  buttonGroup: { flexDirection: "row", gap: SPACING.xs, marginTop: SPACING.sm },
  chip: {
    flex: 1,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    alignItems: "center",
  },
  chipText: { fontSize: TYPOGRAPHY.size.xs },
  inputContainer: { marginTop: SPACING.sm, gap: SPACING.xs },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    fontSize: TYPOGRAPHY.size.md,
  },
  saveButton: {
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  saveButtonText: {
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.md,
  },
  statusBox: {
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    alignItems: "center",
    gap: SPACING.xs,
  },
  statusText: {
    fontWeight: TYPOGRAPHY.weight.semibold,
    fontSize: TYPOGRAPHY.size.md,
  },
  deleteButton: {
    marginTop: SPACING.xs,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});
