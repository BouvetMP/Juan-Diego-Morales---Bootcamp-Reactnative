import React, { useMemo, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useRoutes } from "../hooks/useRoutes";
import { usePreferences } from "../hooks/usePreferences";
import { useSavedStore } from "../stores/savedStore";
import ItemCard from "../components/ItemCard";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/types";
import { CableCarRoute } from "../types/index";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = NativeStackScreenProps<HomeStackParamList, "HomeList">;

const StaggerItem = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 80, 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export const HomeScreen = ({ navigation }: Props) => {
  const {
    data: routes,
    isLoading,
    isError,
    refetch,
    isOfflineData,
  } = useRoutes();
  const { preferences, loadInit } = usePreferences();
  const savedRoutes = useSavedStore((state) => state.savedRoutes);
  const colors = getColors(preferences.darkMode);

  useEffect(() => {
    loadInit();
  }, [loadInit]);

  const filteredAndSortedRoutes = useMemo(() => {
    if (!routes) return [];
    let list = [...routes];

    if (preferences.showOnlySaved) {
      list = list.filter((route) =>
        savedRoutes.some((saved) => saved.id === route.id),
      );
    }

    if (preferences.sortOrder === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (preferences.sortOrder === "duration") {
      list.sort((a, b) => a.duration - b.duration);
    } else if (preferences.sortOrder === "price") {
      list.sort((a, b) => a.ticketPrice - b.ticketPrice);
    }

    return list;
  }, [routes, preferences.sortOrder, preferences.showOnlySaved, savedRoutes]);

  // Ejecución de LayoutAnimation automática en base a filtros y mutaciones
  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [
    preferences.showOnlySaved,
    preferences.sortOrder,
    savedRoutes,
    filteredAndSortedRoutes,
  ]);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Error al cargar las rutas.
        </Text>
        <Pressable
          style={[
            styles.retryButton,
            { borderColor: colors.accent, backgroundColor: colors.surface },
          ]}
          onPress={() => refetch()}
        >
          <Text
            style={{
              color: colors.accent,
              fontWeight: TYPOGRAPHY.weight.semibold,
            }}
          >
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isOfflineData && (
        <View
          style={[styles.offlineBanner, { backgroundColor: colors.warning }]}
        >
          <Text style={styles.offlineText}>
            ⚠️ Mostrando datos sin red (Caché local)
          </Text>
        </View>
      )}

      <FlatList
        data={filteredAndSortedRoutes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No hay rutas que coincidan con los filtros de Ajustes.
          </Text>
        }
        renderItem={({ item, index }: { item: CableCarRoute; index: number }) => {
          const isPopular = preferences.showPopular && item.duration <= 15;
          return (
            <StaggerItem index={index}>
              {isPopular && (
                <View
                  style={[
                    styles.popularBadge,
                    {
                      borderColor: colors.accent,
                      backgroundColor: colors.accentDim,
                    },
                  ]}
                >
                  <Text
                    style={[styles.popularBadgeText, { color: colors.accent }]}
                  >
                    ⚡ RUTA POPULAR (EXPRÉS)
                  </Text>
                </View>
              )}
              <ItemCard
                route={item}
                onPress={() => navigation.navigate("HomeDetail", item)}
              />
            </StaggerItem>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: TYPOGRAPHY.size.md, marginBottom: SPACING.sm },
  retryButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  offlineBanner: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    alignItems: "center",
  },
  offlineText: {
    color: "#ffffff",
    fontWeight: TYPOGRAPHY.weight.bold,
    fontSize: TYPOGRAPHY.size.xs,
  },
  listContent: { padding: SPACING.md },
  emptyText: {
    textAlign: "center",
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.size.md,
  },
  popularBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs,
    alignSelf: "flex-start",
    marginBottom: 4,
    marginTop: SPACING.xs,
  },
  popularBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.bold,
  },
});