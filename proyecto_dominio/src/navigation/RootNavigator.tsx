import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';
import { useSavedStore } from '../stores/savedStore';


const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: '🚡 Cable Bogotá' }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
  const savedCount = useSavedStore((s) => s.savedRoutes.length);

  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Rutas' }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoritos',
          headerShown: true,
          title: 'Rutas Favoritas',
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.accent,
          headerTitleStyle: { fontWeight: '700' },
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.error,
            fontSize: 11,
            fontWeight: '700',
          },
        }}
      />
    </Tab.Navigator>
  );
}