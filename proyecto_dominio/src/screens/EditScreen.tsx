import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouteById, useUpdateRoute } from "../hooks/useRoutes";
import { routeSchema, RouteFormData } from "../schemas/routeSchema";
import { FormField } from "../components/FormField";
import { TYPOGRAPHY, SPACING, RADIUS, getColors } from "../theme";
import type { HomeStackParamList } from "../navigation/types";
import { usePreferences } from "../hooks/usePreferences";
import type { CableCarRoute } from "../types";

type EditNavProp = NativeStackNavigationProp<HomeStackParamList, "EditRoute">;
type EditRouteProp = RouteProp<HomeStackParamList, "EditRoute">;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const { params } = useRoute<EditRouteProp>();

  const routeRaw = useRouteById(params.id);
  const cableRoute: CableCarRoute | undefined =
    (routeRaw as { data?: CableCarRoute })?.data ??
    (routeRaw as CableCarRoute | undefined);
  const isLoading = !cableRoute;

  const { mutateAsync } = useUpdateRoute();

  const { preferences } = usePreferences();
  const isDark = preferences?.darkMode ?? preferences?.isDarkMode ?? true;
  const colors = getColors(isDark);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      name: "",
      route: "",
      originStation: "",
      destinationStation: "",
      duration: 0,
      ticketPrice: 0,
      subtitle: "",
    },
  });

  useEffect(() => {
    if (cableRoute) {
      reset({
        name: cableRoute.name ?? "",
        route: cableRoute.route ?? "",
        originStation: cableRoute.originStation ?? "",
        destinationStation: cableRoute.destinationStation ?? "",
        duration: cableRoute.duration ?? 0,
        ticketPrice: cableRoute.ticketPrice ?? 0,
        subtitle: cableRoute.subtitle ?? "",
      });
    }
  }, [cableRoute, reset]);

  const onSubmit = async (data: RouteFormData) => {
    try {
      await mutateAsync({
        id: params.id,
        ...data,
      });
      Alert.alert(
        "¡Éxito!",
        "La ruta de TransMiCable fue actualizada correctamente.",
        [{ text: "OK", onPress: () => navigation.goBack() }],
      );
    } catch {
      Alert.alert(
        "Error",
        "No se pudo actualizar la ruta. Intente nuevamente.",
      );
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>
          Cargando datos de la ruta...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Editar Ruta TransMiCable
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Actualice los parámetros de operación de la ruta
        </Text>

        <FormField
          control={control}
          name="name"
          label="Nombre de la ruta"
          placeholder="Ej. Línea H (Tunal - Paraíso)"
          error={errors.name?.message}
        />

        <FormField
          control={control}
          name="route"
          label="Código / Identificador"
          placeholder="Ej. L1 - Ciudad Bolívar"
          error={errors.route?.message}
        />

        <FormField
          control={control}
          name="originStation"
          label="Estación Origen"
          placeholder="Ej. Portal Tunal"
          error={errors.originStation?.message}
        />

        <FormField
          control={control}
          name="destinationStation"
          label="Estación Destino"
          placeholder="Ej. Mirador del Paraíso"
          error={errors.destinationStation?.message}
        />

        <FormField
          control={control}
          name="duration"
          label="Duración del recorrido (minutos)"
          placeholder="Ej. 15"
          keyboardType="numeric"
          error={errors.duration?.message}
        />

        <FormField
          control={control}
          name="ticketPrice"
          label="Tarifa del pasaje (COP $)"
          placeholder="Ej. 2950"
          keyboardType="numeric"
          error={errors.ticketPrice?.message}
        />

        <FormField
          control={control}
          name="subtitle"
          label="Descripción adicional"
          placeholder="Ej. Conexión rápida Ciudad Bolívar"
          error={errors.subtitle?.message}
        />

        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            { backgroundColor: colors.primary },
            isSubmitting && styles.disabledButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Guardar Cambios</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.md,
  },
  loadingText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.size.base,
  },
  contentContainer: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: 80,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    marginBottom: SPACING.xs,
  },
  submitButton: {
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});