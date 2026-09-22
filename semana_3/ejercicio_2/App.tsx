import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackRouteProp,
} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};

type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: string; name: string; emoji: string };
};

interface Movie {
  id: string;
  name: string;
  genre: string;
  year: number;
  emoji: string;
}

const MOVIES: Movie[] = [
  {
    id: '1',
    name: 'Oppenheimer',
    genre: 'Drama · Historia',
    year: 2023,
    emoji: '💣',
  },
  {
    id: '2',
    name: 'Dune: Part Two',
    genre: 'Ciencia Ficción',
    year: 2024,
    emoji: '🏜️',
  },
  {
    id: '3',
    name: 'Poor Things',
    genre: 'Drama · Fantasía',
    year: 2023,
    emoji: '🧪',
  },
  {
    id: '4',
    name: 'Killers of the Flower Moon',
    genre: 'Drama · Crimen',
    year: 2023,
    emoji: '🌸',
  },
  {
    id: '5',
    name: 'The Zone of Interest',
    genre: 'Drama',
    year: 2023,
    emoji: '🏡',
  },
  {
    id: '6',
    name: 'Past Lives',
    genre: 'Romance · Drama',
    year: 2023,
    emoji: '💙',
  },
];

const FAVORITES: Movie[] = [MOVIES[0], MOVIES[2], MOVIES[5]];

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'HomeList'>>();

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={() =>
          navigation.navigate('HomeDetail', {
            id: item.id,
            name: item.name,
            emoji: item.emoji,
          })
        }
      >
        <Text style={styles.itemEmoji}>{item.emoji}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>
            {item.genre} · {item.year}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    ),
    [navigation]
  );

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function DetailScreen(): React.JSX.Element {
  const navigation = useNavigation();

  type DetailRP = NativeStackRouteProp<HomeStackParamList, 'HomeDetail'>;
  const route = useRoute<DetailRP>();
  const { id, name, emoji } = route.params;
  const movie = MOVIES.find((m) => m.id === id);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.detailCard}>
        <Text style={styles.detailEmoji}>{emoji}</Text>
        <Text style={styles.detailTitle}>{name}</Text>
        {movie && (
          <>
            <Text style={styles.detailGenre}>{movie.genre}</Text>
            <Text style={styles.detailYear}>{movie.year}</Text>
          </>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            pressed && styles.backBtnPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>← Volver</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.genre} · {item.year}
              </Text>
            </View>
            <Text style={{ color: '#f0883e', fontSize: 18 }}>♥</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function HomeStackNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeList" component={HomeScreen} />
      <HomeStack.Screen name="HomeDetail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === 'Home') {
              iconName = focused ? 'film' : 'film-outline';
            } else {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#61DAFB',
          tabBarInactiveTintColor: '#8b949e',
          tabBarStyle: {
            backgroundColor: '#161b22',
            borderTopColor: '#30363d',
            borderTopWidth: 1,
          },
          headerStyle: { backgroundColor: '#161b22' },
          headerTintColor: '#e6edf3',
          headerTitleStyle: { fontWeight: '600' },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{ title: 'Películas', headerShown: false }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favoritos' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemPressed: {
    backgroundColor: '#161b22',
  },
  itemEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6edf3',
    marginBottom: 3,
  },
  itemMeta: {
    fontSize: 12,
    color: '#8b949e',
  },
  chevron: {
    fontSize: 20,
    color: '#8b949e',
  },
  separator: {
    height: 1,
    backgroundColor: '#21262d',
    marginLeft: 16,
  },
  detailCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#161b22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30363d',
    alignItems: 'center',
  },
  detailEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e6edf3',
    textAlign: 'center',
    marginBottom: 8,
  },
  detailGenre: {
    fontSize: 14,
    color: '#8b949e',
    marginBottom: 4,
  },
  detailYear: {
    fontSize: 14,
    color: '#8b949e',
    marginBottom: 24,
  },
  backBtn: {
    backgroundColor: '#0d1117',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtnPressed: {
    backgroundColor: '#21262d',
  },
  backBtnText: {
    fontSize: 15,
    color: '#61DAFB',
    fontWeight: '600',
  },
});
