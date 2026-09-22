import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackRouteProp,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: { id: string; name: string; category: string };
};

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro 14"',
    category: 'Electrónica',
    description:
      'Procesador M3, 16GB RAM, 512GB SSD. Ideal para desarrollo y diseño.',
  },
  {
    id: '2',
    name: 'Auriculares BT',
    category: 'Electrónica',
    description: 'Cancelación de ruido activa, 30h batería, sonido premium.',
  },
  {
    id: '3',
    name: 'Mesa de trabajo',
    category: 'Muebles',
    description: 'Madera maciza, 140x70cm, altura ajustable manivela.',
  },
  {
    id: '4',
    name: 'Silla ergonómica',
    category: 'Muebles',
    description: 'Soporte lumbar, reposabrazos 4D, malla transpirable.',
  },
  {
    id: '5',
    name: 'Monitor 4K 27"',
    category: 'Electrónica',
    description: 'Panel IPS, 144Hz, 1ms, HDR400, calibración de fábrica.',
  },
];

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={() =>
          navigation.navigate('Detail', {
            id: item.id,
            name: item.name,
            category: item.category,
          })
        }
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    ),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

function DetailScreen(): React.JSX.Element {
  const navigation = useNavigation();

  type DetailRouteProp = NativeStackRouteProp<RootStackParamList, 'Detail'>;
  const route = useRoute<DetailRouteProp>();
  const { id, name, category } = route.params;

  const product = PRODUCTS.find((p) => p.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.detailName}>{name}</Text>
        <Text style={styles.detailId}>ID: {id}</Text>
        {product && (
          <Text style={styles.detailDescription}>{product.description}</Text>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver al listado</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#161b22' },
          headerTintColor: '#e6edf3',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#0d1117' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#0d1117',
  },
  itemPressed: {
    backgroundColor: '#161b22',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6edf3',
    marginBottom: 3,
  },
  itemCategory: {
    fontSize: 13,
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
  detailContainer: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#61DAFB33',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#61DAFB',
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e6edf3',
    marginBottom: 6,
  },
  detailId: {
    fontSize: 13,
    color: '#8b949e',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 15,
    color: '#c9d1d9',
    lineHeight: 22,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  backButtonPressed: {
    backgroundColor: '#21262d',
  },
  backButtonText: {
    fontSize: 15,
    color: '#61DAFB',
    fontWeight: '600',
  },
});
