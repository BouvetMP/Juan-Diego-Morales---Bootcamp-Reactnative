import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProfile {
  name: string;
  email: string;
  joinedAt: string;
}

interface Item {
  id: number;
  title: string;
}

const MOCK_ITEMS: Item[] = [
  { id: 1, title: "Elemento A" },
  { id: 2, title: "Elemento B" },
  { id: 3, title: "Elemento C" },
];

const MOCK_PROFILE: UserProfile = {
  name: "Ana García",
  email: "ana@example.com",
  joinedAt: new Date().toISOString(),
};

// ─── Storage Keys ──────────────────────────────────────────────────────
const KEYS = {
  THEME: "@rn_ex01_theme",
  PROFILE: "@rn_ex01_profile",
  ITEMS_CACHE: "@rn_ex01_items_cache",
} as const;

export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [log, setLog] = useState<string[]>(["Iniciando app…"]);

  function addLog(msg: string): void {
    setLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 6),
    ]);
  }

  useEffect(() => {
    AsyncStorage.getItem(KEYS.THEME).then((stored) => {
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        addLog(`Tema recuperado del storage: ${stored}`);
      } else {
        addLog("Sin tema guardado — usando default: dark");
      }
    });
  }, []);

  async function handleThemeChange(value: boolean): Promise<void> {
    const newTheme: "dark" | "light" = value ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem(KEYS.THEME, newTheme);
    addLog(`Tema guardado: ${newTheme}`);
  }

  useEffect(() => {
    AsyncStorage.getItem(KEYS.PROFILE).then((raw) => {
      if (raw) {
        setProfile(JSON.parse(raw) as UserProfile);
        addLog("Perfil recuperado del storage");
      }
    });
  }, []);

  async function handleSaveProfile(): Promise<void> {
    await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(MOCK_PROFILE));
    setProfile(MOCK_PROFILE);
    addLog("Perfil guardado con JSON.stringify");
  }

  useEffect(() => {
    async function loadItems(): Promise<void> {
      setIsLoading(true);
      try {
        const data = MOCK_ITEMS;
        setItems(data);
        await AsyncStorage.setItem(KEYS.ITEMS_CACHE, JSON.stringify(data));
        addLog('Ítems obtenidos de la "red" y cacheados');
      } catch {
        const cached = await AsyncStorage.getItem(KEYS.ITEMS_CACHE);
        if (cached) {
          setItems(JSON.parse(cached) as Item[]);
          addLog("⚠️ Sin red — mostrando datos del cache");
        } else {
          addLog("❌ Sin red y sin cache");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadItems();
  }, []);

  async function handleClearPreferences(): Promise<void> {
    await AsyncStorage.multiRemove([KEYS.THEME, KEYS.PROFILE]);
    setTheme("dark");
    setProfile(null);
    addLog("Preferencias eliminadas");
  }

  async function handleClearCache(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.ITEMS_CACHE);
    setItems([]);
    addLog("Caché de ítems eliminada");
  }

  const bg = theme === "dark" ? "#0f172a" : "#f8fafc";
  const fg = theme === "dark" ? "#f8fafc" : "#0f172a";
  const card = theme === "dark" ? "#1e293b" : "#e2e8f0";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: fg }]}>
          AsyncStorage — Ejercicio 01
        </Text>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: fg }]}>
            PASO 1 — Tema persistente
          </Text>
          <Text style={[styles.hint, { color: fg }]}>Modo oscuro:</Text>
          <Switch value={theme === "dark"} onValueChange={handleThemeChange} />
          <Text style={[styles.status, { color: fg }]}>
            Tema actual: {theme}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: fg }]}>
            PASO 2 — Perfil de usuario
          </Text>
          {profile ? (
            <View>
              <Text style={[styles.info, { color: fg }]}>
                Nombre: {profile.name}
              </Text>
              <Text style={[styles.info, { color: fg }]}>
                Email: {profile.email}
              </Text>
            </View>
          ) : (
            <Text style={[styles.hint, { color: fg }]}>
              Sin perfil guardado
            </Text>
          )}
          <Pressable style={styles.btn} onPress={handleSaveProfile}>
            <Text style={styles.btnText}>Guardar Perfil</Text>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: fg }]}>
            PASO 3 — Lista con caché offline
          </Text>
          {isLoading ? (
            <ActivityIndicator color="#3b82f6" />
          ) : items.length > 0 ? (
            <FlatList
              data={items}
              scrollEnabled={false}
              keyExtractor={(i) => String(i.id)}
              renderItem={({ item }) => (
                <Text style={[styles.item, { color: fg }]}>• {item.title}</Text>
              )}
            />
          ) : (
            <Text style={[styles.hint, { color: fg }]}>Sin ítems en caché</Text>
          )}
        </View>

        {/* PASO 4 — Limpiar */}
        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: fg }]}>
            PASO 4 — Eliminar datos
          </Text>
          <Pressable
            style={[styles.btn, styles.btnDanger]}
            onPress={handleClearPreferences}
          >
            <Text style={styles.btnText}>Limpiar preferencias</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnDanger]}
            onPress={handleClearCache}
          >
            <Text style={styles.btnText}>Limpiar caché</Text>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: "#020617" }]}>
          <Text style={[styles.sectionTitle, { color: "#64748b" }]}>
            Log de actividad
          </Text>
          {log.map((entry, i) => (
            <Text key={i} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, gap: 16, paddingBottom: 40 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  card: { borderRadius: 10, padding: 14, gap: 8 },
  sectionTitle: { fontSize: 14, fontWeight: "700" },
  hint: { fontSize: 13, opacity: 0.6 },
  info: { fontSize: 14 },
  item: { fontSize: 14, marginVertical: 2 },
  status: { fontSize: 12, opacity: 0.7 },
  btn: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  btnDanger: { backgroundColor: "#dc2626" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  logEntry: { fontSize: 11, color: "#4ade80", fontFamily: "monospace" },
});
