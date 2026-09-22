import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCreateRoute } from '../hooks/useRoutes';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'CreateRoute'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { mutateAsync, isPending } = useCreateRoute();

  const [name, setName] = useState('');
  const [line, setLine] = useState('Línea 1');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('20');
  const [price, setPrice] = useState('3500');
  const [subtitle, setSubtitle] = useState('');

  async function handleSubmit() {
    if (!name.trim() || !origin.trim() || !destination.trim()) {
      Alert.alert('Campos incompletos', 'Nombre, origen y destino son obligatorios.');
      return;
    }

    try {
      await mutateAsync({
        name: name.trim(),
        route: line.trim() || 'Línea 1',
        originStation: origin.trim(),
        destinationStation: destination.trim(),
        duration: Number(duration) || 20,
        ticketPrice: Number(price) || 3500,
        subtitle: subtitle.trim() || 'Nueva ruta de cable',
      });
      Alert.alert('Éxito', 'Ruta creada correctamente (API).', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Error', 'No se pudo crear la ruta. Intenta de nuevo.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.hint}>
          Los datos se envían por POST a la API. JSONPlaceholder simula la creación.
        </Text>

        <Field label="Nombre de la ruta" value={name} onChangeText={setName} placeholder="Cable Portal ..." />
        <Field label="Línea" value={line} onChangeText={setLine} placeholder="Línea H" />
        <Field label="Estación origen" value={origin} onChangeText={setOrigin} placeholder="Portal Tunal" />
        <Field label="Estación destino" value={destination} onChangeText={setDestination} placeholder="Mirador" />
        <Field label="Duración (min)" value={duration} onChangeText={setDuration} placeholder="25" keyboardType="numeric" />
        <Field label="Tarifa (COP)" value={price} onChangeText={setPrice} placeholder="3150" keyboardType="numeric" />
        <Field label="Descripción" value={subtitle} onChangeText={setSubtitle} placeholder="Se cruza con..." multiline />

        <Pressable
          style={({ pressed }) => [
            styles.submit,
            (pressed || isPending) && { opacity: 0.7 },
          ]}
          onPress={handleSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitText}>Crear ruta</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  multiline,
  ...inputProps
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholderTextColor={COLORS.textMuted}
        multiline={multiline}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.base, paddingBottom: SPACING.xxl, gap: SPACING.md },
  hint: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  field: { gap: SPACING.xs },
  label: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    fontWeight: TYPOGRAPHY.weight.medium,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submit: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  submitText: {
    color: COLORS.background,
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.base,
  },
});