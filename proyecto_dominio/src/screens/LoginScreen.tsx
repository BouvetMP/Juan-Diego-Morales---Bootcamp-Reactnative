import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { loginSchema, LoginSchemaType } from "../schemas/authSchema";
import { useAuthStore } from "../stores/authStore";
import { usePreferencesStore } from "../stores/usePreferences";
import { getColors } from "../theme";
import { AuthStackParamList } from "../types";

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { isDarkMode } = usePreferencesStore();
  const colors = getColors(isDarkMode);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    clearError();
    await login(data);
  };

  const handleDemoCredentials = () => {
    setValue("username", "emilys");
    setValue("password", "emilyspass");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.TEXT }]}>
          BogoCable
          Asociado Con TransMiCable
        </Text>
        <Text style={[styles.subtitle, { color: colors.SUBTEXT }]}>
          Ingresa para comprar pasajes rápidos y viajar sin filas
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
        <Text style={[styles.label, { color: colors.TEXT }]}>
          Usuario / Correo
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
              placeholder="Nombre de usuario o correo"
              placeholderTextColor={colors.SUBTEXT}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username.message}</Text>
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
              placeholder="Contraseña"
              placeholderTextColor={colors.SUBTEXT}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.PRIMARY }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.demoButton, { borderColor: colors.BORDER }]}
          onPress={handleDemoCredentials}
        >
          <Text style={{ color: colors.SUBTEXT, fontSize: 13 }}>
            Usar credenciales de prueba (emilys / emilyspass)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: colors.SUBTEXT, textAlign: "center" }}>
            ¿No tienes cuenta de Pasajero?{" "}
            <Text style={{ color: colors.PRIMARY, fontWeight: "bold" }}>
              Regístrate
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  errorBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  errorText: {
    color: "#f85149",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  demoButton: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  registerLink: {
    marginTop: 24,
    paddingVertical: 10,
  },
});

export default LoginScreen;
