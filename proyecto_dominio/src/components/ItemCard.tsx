import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CableCarRoute } from "../types";

interface ItemCardProps {
  route: CableCarRoute;
  onPress?: () => void;
}

export default function ItemCard({
  route,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://picsum.photos/300/150" }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name}>{route.name}</Text>
      <Text style={styles.stations}>
        {route.originStation} → {route.destinationStation}
      </Text>
      <Text style={styles.subtitle}>{route.subtitle}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{route.duration} min</Text>
        <Text style={styles.infoText}>
          ${route.ticketPrice.toLocaleString("es-CO")}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161b22",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  stations: {
    fontSize: 14,
    color: "#61DAFB",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#8b949e",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#61DAFB",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#0d1117",
    fontSize: 14,
    fontWeight: "bold",
  },
});
