import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { getColors } from "../theme";
import type { HomeStackParamList, RootTabParamList } from "./types";
import { useSavedStore } from "../stores/savedStore";
import { EditScreen } from "../screens/EditScreen";
import { usePreferences } from "../hooks/usePreferences";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): React.JSX.Element {
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.accent,
        headerTitleStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: "🚡 Cable Bogotá" }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({
          route,
        }: {
          route: { params: HomeStackParamList["HomeDetail"] };
        }) => ({
          title: route.params.name,
        })}
      />
      <HomeStack.Screen
        name="CreateRoute"
        component={CreateScreen}
        options={{ title: "Nueva Ruta" }}
      />
      <HomeStack.Screen
        name="EditRoute"
        component={EditScreen}
        options={{ title: "Editar Ruta" }}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  const savedCount = useSavedStore((s) => s.savedRoutes.length);
  const { preferences } = usePreferences();
  const colors = getColors(preferences.darkMode);

  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Rutas" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favoritos",
          headerShown: true,
          title: "Rutas Favoritas",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.accent,
          headerTitleStyle: { fontWeight: "700" },
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.error,
            fontSize: 11,
            fontWeight: "700",
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Ajustes",
          headerShown: true,
          title: "Ajustes y Filtros",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.accent,
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
    </Tab.Navigator>
  );
}
