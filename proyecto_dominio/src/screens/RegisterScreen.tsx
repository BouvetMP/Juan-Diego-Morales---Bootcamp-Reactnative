import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { registerSchema, RegisterSchemaType } from "../schemas/authSchema";
import { useAuthStore } from "../stores/authStore";
import { usePreferencesStore } from "../stores/usePreferences";
import { getColors } from "../theme";
import { AuthStackParamList } from "../types";

type RegisterNavProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

export function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();
  const { register, isLoading, error, clearError } = useAuthStore();
  const { isDarkMode } = usePreferencesStore();
  const colors = getColors(isDarkMode);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      tuLlaveCard: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    clearError();
    const success = await register(data);
    if (success) {
      Alert.alert(
        "¡Registro Exitoso! 🚠",
        "Tu cuenta de Pasajero ha sido creada con éxito. Ya puedes iniciar sesión.",
        [{ text: "Ir al Login", onPress: () => navigation.navigate("Login") }],
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.TEXT }]}>
          Registro de Pasajero
        </Text>
        <Text style={[styles.subtitle, { color: colors.SUBTEXT }]}>
          Crea tu cuenta para comprar tus pasajes rápidos y viajar sin filas.
        </Text>
      </View>

      {error ? (
        <View
          style={[
            styles.errorBox,
            { backgroundColor: "#3d1e24", borderColor: colors.DANGER },
          ]}
        >
          <Text style={{ color: colors.DANGER, fontSize: 13 }}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.TEXT }]}>Nombre</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.firstName ? colors.DANGER : colors.BORDER,
                },
              ]}
              placeholder="Ej: Carlos"
              placeholderTextColor={colors.SUBTEXT}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>• {errors.firstName.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>Apellido</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.lastName ? colors.DANGER : colors.BORDER,
                },
              ]}
              placeholder="Ej: Mendoza"
              placeholderTextColor={colors.SUBTEXT}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>• {errors.lastName.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>
          Nombre de Usuario
        </Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.username ? colors.DANGER : colors.BORDER,
                },
              ]}
              placeholder="Ej: carlosm"
              placeholderTextColor={colors.SUBTEXT}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>• {errors.username.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>
          Correo Electrónico
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.email ? colors.DANGER : colors.BORDER,
                },
              ]}
              placeholder="carlos@correo.com"
              placeholderTextColor={colors.SUBTEXT}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>• {errors.email.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>
          Tarjeta TuLlave
        </Text>
        <Controller
          control={control}
          name="tuLlaveCard"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.tuLlaveCard
                    ? colors.DANGER
                    : colors.BORDER,
                },
              ]}
              placeholder="16 dígitos de tu tarjeta"
              placeholderTextColor={colors.SUBTEXT}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.tuLlaveCard && (
          <Text style={styles.errorText}>• {errors.tuLlaveCard.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.password ? colors.DANGER : colors.BORDER,
                },
              ]}
              placeholder="Mínimo 12 caracteres (Aa1!)"
              placeholderTextColor={colors.SUBTEXT}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>• {errors.password.message}</Text>
        )}

        <Text style={[styles.label, { color: colors.TEXT }]}>
          Confirmar Contraseña
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.CARD_BG,
                  color: colors.TEXT,
                  borderColor: errors.confirmPassword
                    ? colors.DANGER
                    : colors.BORDER,
                },
              ]}
              placeholder="Repite tu contraseña"
              placeholderTextColor={colors.SUBTEXT}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>
            • {errors.confirmPassword.message}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.PRIMARY }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Crear Cuenta de Pasajero</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: colors.SUBTEXT, textAlign: "center" }}>
            ¿Ya tienes cuenta?{" "}
            <Text style={{ color: colors.PRIMARY, fontWeight: "bold" }}>
              Inicia Sesión
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginTop: 30, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginTop: 6 },
  errorBox: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  form: { marginBottom: 40 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, marginTop: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  errorText: {
    color: "#f85149",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  }, // ROJO Y CON PUNTO
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  loginLink: { marginTop: 20, paddingVertical: 10 },
});

export default RegisterScreen;
