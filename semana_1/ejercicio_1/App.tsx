// ============================================================
// EJERCICIO 01 — Core Components: Tarjeta de Perfil
// ============================================================
// Instrucciones: descomenta CADA SECCIÓN de arriba hacia abajo.
// Verifica en Expo Go que funciona antes de pasar al siguiente paso.
// ============================================================

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function App(): React.JSX.Element {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/120" }}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.name}>Ada Lovelace</Text>
        <Text style={styles.role}>Ingeniera de Software</Text>
        <Text style={styles.bio} numberOfLines={3}>
          Primera programadora de la historia. Escribió el primer algoritmo
          diseñado para ser procesado por una máquina.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>1.2k</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>318</Text>
          <Text style={styles.statLabel}>Siguiendo</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnFollow}
        activeOpacity={0.7}
        onPress={() => console.log("¡Siguiendo!")}
      >
        <Text style={styles.btnText}>Seguir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "#161b22",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#30363d",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#61DAFB",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#61DAFB",
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: "#8b949e",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#30363d",
    paddingTop: 20,
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 12,
    color: "#8b949e",
    marginTop: 2,
  },

  btnFollow: {
    backgroundColor: "#61DAFB",
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
  },
  btnFollowPressed: {
    opacity: 0.7,
  },
  btnText: {
    color: "#0d1117",
    fontSize: 16,
    fontWeight: "bold",
  },
});
