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
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../theme";

interface FormFieldProps<T extends FieldValues> extends Omit<
  TextInputProps,
  "defaultValue"
> {
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
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              multiline && styles.inputMultiline,
              error && styles.inputError,
            ]}
            placeholderTextColor={COLORS.textMuted}
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: SPACING.xs, marginBottom: SPACING.sm },
  label: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.size.xs,
    marginTop: 2,
  },
});
