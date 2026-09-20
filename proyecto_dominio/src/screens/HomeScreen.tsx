import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { CableCarRoute } from "../types";
import ItemCard from "../components/ItemCard";
import { cableCarRoutes } from "../data/mockData";

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = "🚡 Cable Bogotá";
  const DOMAIN_SUBTITLE = "Rutas de portal a portal";

  function handleItemPress(route: CableCarRoute): void {
    console.log("Ruta seleccionada:", route.name);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {cableCarRoutes.map((route) => (
          <ItemCard
            key={route.id}
            route={route}
            onPress={() => handleItemPress(route)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d1117",
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8b949e",
    marginTop: 4,
  },

  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});
