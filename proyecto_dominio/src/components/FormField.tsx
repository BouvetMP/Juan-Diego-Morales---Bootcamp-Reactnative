import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
} from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { usePreferences } from "../hooks/usePreferences";

interface FormFieldProps<T extends FieldValues>
  extends Omit<TextInputProps, "defaultValue"> {
  control: Control<T, any, any>;
  name: Path<T>;
  label: string;
  error?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  multiline,
  keyboardType,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  const { preferences } = usePreferences();
  const isDark = preferences?.darkMode ?? preferences?.isDarkMode ?? true;
  const colors = getColors(isDark);

  const errorColor = colors.error || colors.danger || "#ef4444";
  const labelColor = colors.textSecondary || colors.subtext || "#8b949e";
  const textColor = colors.textPrimary || colors.text || "#ffffff";
  const inputBg = colors.surface || colors.surfaceAlt || "#161b22";
  const borderColor = colors.border || "#30363d";

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: error ? errorColor : borderColor,
                color: textColor,
              },
              multiline && styles.inputMultiline,
            ]}
            placeholderTextColor={labelColor}
            onBlur={onBlur}
            onChangeText={(text) => {
              if (keyboardType === "numeric") {
                const parsed = Number(text);
                onChange(Number.isNaN(parsed) ? 0 : parsed);
              } else {
                onChange(text);
              }
            }}
            value={value !== undefined && value !== null ? String(value) : ""}
            multiline={multiline}
            keyboardType={keyboardType}
            {...textInputProps}
          />
        )}
      />
      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: SPACING.xs, marginBottom: SPACING.sm },
  label: {
    fontSize: TYPOGRAPHY.size.xs,
    textTransform: "uppercase",
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    fontSize: TYPOGRAPHY.size.base,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: TYPOGRAPHY.size.xs,
    marginTop: 2,
  },
});