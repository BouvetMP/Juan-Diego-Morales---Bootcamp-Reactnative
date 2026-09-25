import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSavedStore } from "../stores/savedStore";
import ItemCard from "../components/ItemCard";
import { getColors, TYPOGRAPHY, SPACING } from "../theme";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../navigation/types";
import { CableCarRoute } from "../types/index";
import { usePreferences } from "../hooks/usePreferences";

export const FavoritesScreen = () => {
  const savedRoutes = useSavedStore((state) => state.savedRoutes);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={savedRoutes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Aún no tienes rutas guardadas.
            </Text>
          </View>
        }
        renderItem={({ item }: { item: CableCarRoute }) => (
          <ItemCard
            route={item}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "HomeDetail",
                params: item,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.md,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    textAlign: "center",
  },
});