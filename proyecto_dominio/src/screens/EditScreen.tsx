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
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import type { HomeStackParamList } from "../navigation/types";

type EditNavProp = NativeStackNavigationProp<HomeStackParamList, "EditRoute">;
type EditRouteProp = RouteProp<HomeStackParamList, "EditRoute">;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const { params } = useRoute<EditRouteProp>();

  const { data: routeData, isLoading } = useRouteById(params.id);
  const { mutateAsync } = useUpdateRoute();

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
    if (routeData) {
      reset({
        name: routeData.name,
        route: routeData.route,
        originStation: routeData.originStation,
        destinationStation: routeData.destinationStation,
        duration: routeData.duration,
        ticketPrice: routeData.ticketPrice,
        subtitle: routeData.subtitle,
      });
    }
  }, [routeData, reset]);

  async function onSubmit(data: RouteFormData) {
    try {
      await mutateAsync({
        id: params.id,
        name: data.name.trim(),
        route: data.route.trim(),
        originStation: data.originStation.trim(),
        destinationStation: data.destinationStation.trim(),
        duration: data.duration,
        ticketPrice: data.ticketPrice,
        subtitle: data.subtitle.trim(),
      });

      const msg = "¡Ruta actualizada exitosamente!";

      if (Platform.OS === "web") {
        alert(msg);
        navigation.goBack();
      } else {
        Alert.alert("Éxito", msg, [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch {
      const errorMsg = "No se pudo actualizar la ruta.";
      if (Platform.OS === "web") {
        alert(errorMsg);
      } else {
        Alert.alert("Error", errorMsg);
      }
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando datos de la ruta...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.hint}>
          Modifica los datos de la ruta seleccionada.
        </Text>

        <FormField
          control={control}
          name="name"
          label="Nombre de la ruta"
          error={errors.name?.message}
        />
        <FormField
          control={control}
          name="route"
          label="Línea"
          error={errors.route?.message}
        />
        <FormField
          control={control}
          name="originStation"
          label="Estación origen"
          error={errors.originStation?.message}
        />
        <FormField
          control={control}
          name="destinationStation"
          label="Estación destino"
          error={errors.destinationStation?.message}
        />
        <FormField
          control={control}
          name="duration"
          label="Duración (min)"
          keyboardType="numeric"
          error={errors.duration?.message}
        />
        <FormField
          control={control}
          name="ticketPrice"
          label="Tarifa (COP)"
          keyboardType="numeric"
          error={errors.ticketPrice?.message}
        />
        <FormField
          control={control}
          name="subtitle"
          label="Descripción"
          multiline
          error={errors.subtitle?.message}
        />

        <Pressable
          style={({ pressed }) => [
            styles.submit,
            (pressed || isSubmitting) && { opacity: 0.7 },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitText}>Guardar Cambios</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: { marginTop: SPACING.md, color: COLORS.textSecondary },
  content: { padding: SPACING.base, paddingBottom: SPACING.xxl },
  hint: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  submit: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  submitText: {
    color: COLORS.background,
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.base,
  },
});
