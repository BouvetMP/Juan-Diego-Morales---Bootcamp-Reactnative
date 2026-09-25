import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useRouteById } from "../hooks/useRoutes";
import { useSavedStore } from "../stores/savedStore";
import { usePreferences } from "../stores/usePreferences";
import { TYPOGRAPHY, SPACING, RADIUS, getColors } from "../theme";
import type { HomeStackParamList } from "../navigation/types";
import type { CableCarRoute } from "../types";
import { ProgressBar } from "../components/ProgressBar"; // Importamos ProgressBar

type DetailNavProp = NativeStackNavigationProp<
  HomeStackParamList,
  "HomeDetail"
>;
type DetailRouteProp = RouteProp<HomeStackParamList, "HomeDetail">;

export function DetailScreen(): React.JSX.Element {
  const navigation = useNavigation<DetailNavProp>();
  const route = useRoute<DetailRouteProp>();

  const routeParam = route.params as any;
  const routeId = typeof routeParam === "string" ? routeParam : routeParam?.id;

  const routeRaw = useRouteById(routeId);
  const cableRoute: CableCarRoute | undefined =
    (routeRaw as { data?: CableCarRoute })?.data ??
    (routeRaw as CableCarRoute | undefined) ??
    (typeof routeParam === "object" && routeParam?.name
      ? routeParam
      : undefined);

  const { preferences } = usePreferences();
  const isDark = preferences?.darkMode ?? preferences?.isDarkMode ?? true;
  const colors = getColors(isDark);

  const isSaved = useSavedStore((s) =>
    cableRoute?.id ? s.isSaved(cableRoute.id) : false,
  );
  const toggleRoute = useSavedStore((s) => s.toggleRoute);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (cableRoute?.name) {
      navigation.setOptions({ title: cableRoute.name });
    }

    if (cableRoute) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [navigation, cableRoute]);

  if (!cableRoute) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>
          Cargando detalles de la ruta...
        </Text>
      </View>
    );
  }

  const estimatedOcupation = Math.min(cableRoute.duration / 90, 1);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          gap: SPACING.md,
        }}
      >
        <Image
          source={{ uri: cableRoute.imageUrl || "https://picsum.photos/600/280" }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={[styles.name, { color: colors.text }]}>
          {cableRoute.name}
        </Text>

        <View style={[styles.badge, { backgroundColor: colors.accentDim }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {cableRoute.route}
          </Text>
        </View>

        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {cableRoute.subtitle}
        </Text>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Nivel de Ocupación Estimado (Tiempo Real)
          </Text>
          <ProgressBar
            progress={estimatedOcupation}
            style={styles.progressBarSpacing}
          />
          <Text style={[styles.occupancyText, { color: colors.text }]}>
            {Math.round(estimatedOcupation * 100)}% de capacidad ocupada
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => navigation.navigate("EditRoute", { id: cableRoute.id })}
        >
          <Text style={[styles.editButtonText, { color: colors.text }]}>
            ✏️ Editar esta ruta
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.card, borderColor: colors.primary },
            isSaved && {
              backgroundColor: colors.accentDim,
              borderColor: colors.danger,
            },
            pressed && styles.saveButtonPressed,
          ]}
          onPress={() => toggleRoute(cableRoute)}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: colors.primary },
              isSaved && { color: colors.danger },
            ]}
          >
            {isSaved ? "♥ Quitar de favoritos" : "♡ Guardar en favoritos"}
          </Text>
        </Pressable>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Estación Origen
          </Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>
            {cableRoute.originStation}
          </Text>
        </View>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Estación Destino
          </Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>
            {cableRoute.destinationStation}
          </Text>
        </View>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Duración del trayecto
          </Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>
            {cableRoute.duration} minutos
          </Text>
        </View>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Tarifa de pasaje
          </Text>
          <Text style={[styles.fieldValue, { color: colors.primary }]}>
            ${(cableRoute.ticketPrice || 0).toLocaleString("es-CO")} COP
          </Text>
        </View>

        <View
          style={[
            styles.field,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>
            Identificador de Sistema
          </Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>
            {cableRoute.id}
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.md,
  },
  loadingText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.size.base,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  saveButton: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  saveButtonPressed: {
    opacity: 0.75,
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  field: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  progressBarSpacing: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  occupancyText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});