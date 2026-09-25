import React, {
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
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
  TextInput,
} from "react-native";
import { useRoutes } from "../hooks/useRoutes";
import { usePreferences } from "../hooks/usePreferences";
import { useSavedStore } from "../stores/savedStore";
import ItemCard from "../components/ItemCard";
import { getColors, TYPOGRAPHY, SPACING, RADIUS } from "../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/types";
import { CableCarRoute } from "../types/index";
import { Ionicons } from "@expo/vector-icons";

// Habilitamos LayoutAnimation para Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = NativeStackScreenProps<HomeStackParamList, "HomeList">;

// Cascada de entrada por ítem
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

  // 🔎 Estado del buscador
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInit();
  }, [loadInit]);

  const filteredAndSortedRoutes = useMemo(() => {
    if (!routes) return [];
    let list = [...routes];

    // 1) Filtro de solo favoritos
    if (preferences.showOnlySaved) {
      list = list.filter((route) =>
        savedRoutes.some((saved) => saved.id === route.id),
      );
    }

    // 2) 🔎 Búsqueda por texto
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 0) {
      list = list.filter((route) => {
        const haystack = [
          route.name,
          route.route,
          route.originStation,
          route.destinationStation,
          route.subtitle,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    // 3) Ordenamiento
    if (preferences.sortOrder === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (preferences.sortOrder === "duration") {
      list.sort((a, b) => a.duration - b.duration);
    } else if (preferences.sortOrder === "price") {
      list.sort((a, b) => a.ticketPrice - b.ticketPrice);
    }

    return list;
  }, [
    routes,
    preferences.sortOrder,
    preferences.showOnlySaved,
    savedRoutes,
    searchQuery,
  ]);

  // LayoutAnimation al cambiar filtros / búsqueda / favoritos
  useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [
    preferences.showOnlySaved,
    preferences.sortOrder,
    savedRoutes,
    searchQuery,
    filteredAndSortedRoutes.length,
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

      {/* 🔎 Buscador de rutas */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Buscar ruta, línea o estación..."
          placeholderTextColor={colors.textMuted || colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable
            onPress={() => setSearchQuery("")}
            hitSlop={8}
            style={styles.clearButton}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredAndSortedRoutes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            {searchQuery.trim().length > 0
              ? `No se encontraron rutas para “${searchQuery.trim()}”.`
              : "No hay rutas que coincidan con los filtros de Ajustes."}
          </Text>
        }
        renderItem={({
          item,
          index,
        }: {
          item: CableCarRoute;
          index: number;
        }) => {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.size.md,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: 80,
  },
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
