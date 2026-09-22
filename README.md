# 🚡 Cable Bogotá — Sistema de Teleféricos

Proyecto de dominio sobre el sistema de **teleféricos y cable aéreo de Bogotá**, desarrollado con React Native y TypeScript.

## 🎯 Objetivo

La aplicación permite consultar y gestionar información sobre las rutas de teleférico.

Entre sus principales funciones se encuentran:

* 📍 Catálogo de rutas.
* 🔎 Búsqueda de rutas y estaciones.
* ⭐ Sistema de favoritos.
* 📄 Información detallada de cada ruta.
* 🔄 Navegación entre diferentes pantallas.
* 🗄️ Estado global mediante Zustand.
* 🔴 Contador de favoritos en tiempo real.
* 🔐 Navegación y parámetros tipados con TypeScript.

---

## 🛠️ Tecnologías utilizadas

* **React Native**
* **Expo**
* **TypeScript**
* **React Navigation 7**
* **Zustand**
* **Ionicons**
* **FlatList**

---

## 📦 Instalación

### 1. Instalar React Navigation

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons
```

### 2. Instalar Zustand

```bash
npx expo install zustand
```

### 3. Instalar las dependencias del proyecto

Con pnpm:

```bash
pnpm install
```

O con npm:

```bash
npm install
```

---

## ▶️ Ejecutar el proyecto

Inicia el servidor de desarrollo limpiando la caché:

```bash
npx expo start -c
```

Después puedes ejecutar la aplicación de las siguientes formas:

* Presionar **`a`** para Android.
* Presionar **`i`** para iOS.
* Escanear el código QR con **Expo Go**.

---

## 📚 Evolución del proyecto

### Semana 01 — Maquetación

Se creó la estructura inicial de la aplicación y se definió el dominio de teleféricos.

* Creación de la estructura inicial del proyecto.
* Definición del dominio de teleféricos.
* Creación del componente `ItemCard`.
* Creación de la interfaz `CableCarRoute`.

### Semana 02 — Listas y búsqueda

Se implementaron las funciones para consultar y buscar rutas.

* Implementación de `FlatList`.
* Buscador mediante `TextInput`.
* Búsqueda por nombre, línea y estaciones.
* Uso de `useMemo` para optimizar la búsqueda.
* Manejo del teclado con `KeyboardAvoidingView`.
* Uso de `Pressable` para las interacciones.
* Creación del sistema de temas:

  * `COLORS`
  * `TYPOGRAPHY`
  * `SPACING`
  * `RADIUS`
* Implementación de un estado vacío cuando no existen resultados.

### Semana 03 — Navegación

Se implementó la navegación completa utilizando React Navigation 7.

* Implementación de **Bottom Tab Navigator**.
* Creación de las pestañas:

  * 🗺️ Rutas
  * ⭐ Favoritos
* Implementación de **Native Stack Navigator**.
* Navegación de `HomeScreen` hacia `DetailScreen`.
* Paso de información mediante `route.params`.
* Tipado de la navegación con TypeScript.
* Creación de `HomeStackParamList`.
* Creación de `RootTabParamList`.
* Integración de `Ionicons`.
* Creación de la pantalla de detalle.

### Semana 04 — Estado global con Zustand

Se implementó un sistema de favoritos utilizando **Zustand**.

* Creación del store `useSavedStore`.
* Ubicación del store en `src/stores/savedStore.ts`.
* Creación de las acciones:

  * `addRoute`
  * `removeRoute`
  * `toggleRoute`
  * `clearAll`
  * `isSaved`
* Uso de selectores específicos para evitar suscripciones innecesarias.
* Botón **Guardar / Quitar de favoritos** en `DetailScreen`.
* `FavoritesScreen` obtiene los favoritos directamente desde Zustand.
* Implementación de un **badge** con el número de favoritos.
* Actualización del badge en tiempo real.
* Acción **Limpiar todo**.
* Eliminación del *prop drilling* entre pantallas.
* Uso de TypeScript estricto sin `any`.

---

## 🧭 Navegación

La aplicación utiliza un **Bottom Tab Navigator** como navegación principal y un **Native Stack Navigator** para las pantallas relacionadas con las rutas.

```text
Bottom Tab Navigator
│
├── 🗺️ Rutas
│   │
│   ├── HomeScreen
│   │   └── Lista + búsqueda
│   │
│   └── DetailScreen
│       └── Detalle + favoritos
│
└── ⭐ Favoritos
    │
    └── FavoritesScreen
        └── Lista de favoritos + badge
```

La información de la ruta seleccionada se envía a `DetailScreen` mediante **parámetros tipados**.

---

## 🗄️ Estado global con Zustand

El estado de los favoritos se encuentra centralizado en:

```text
src/stores/savedStore.ts
```

Su estructura principal es:

```text
savedStore
│
├── savedRoutes[]  → rutas guardadas
│
├── addRoute()     → agregar una ruta
│
├── removeRoute()  → eliminar una ruta
│
├── toggleRoute()  → guardar o quitar una ruta
│
├── clearAll()     → eliminar todos los favoritos
│
└── isSaved()      → comprobar si una ruta está guardada
```

Gracias a Zustand, las diferentes pantallas pueden acceder al mismo estado de favoritos sin necesidad de pasar información mediante props.

El número de favoritos también se utiliza para mostrar el **badge de la pestaña Favoritos**.

---

## 📁 Estructura del proyecto

```text
proyecto_dominio/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
│
└── src/
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    │
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── DetailScreen.tsx
    │   └── FavoritesScreen.tsx
    │
    ├── stores/
    │   └── savedStore.ts
    │
    ├── components/
    │   └── ItemCard.tsx
    │
    ├── data/
    │   └── mockData.ts
    │
    ├── theme/
    │   └── index.ts
    │
    └── types/
        └── index.ts
```

### 📂 Descripción de las carpetas

| Carpeta      | Descripción                                |
| ------------ | ------------------------------------------ |
| `navigation` | Configuración de la navegación y sus tipos |
| `screens`    | Pantallas principales de la aplicación     |
| `stores`     | Estado global mediante Zustand             |
| `components` | Componentes reutilizables                  |
| `data`       | Datos de prueba de las rutas               |
| `theme`      | Colores, estilos y constantes visuales     |
| `types`      | Interfaces y tipos de TypeScript           |

---

## 🚡 Información de las rutas

Cada ruta contiene información como:

* **ID** de la ruta.
* **Nombre**.
* **Línea**.
* **Estación de origen**.
* **Estación de destino**.
* **Tarifa** en COP.
* **Duración aproximada**.
* **Imagen**.

---

## ⭐ Funcionalidades principales

| Funcionalidad         | Descripción                                               |
| --------------------- | --------------------------------------------------------- |
| **Rutas**             | Consulta todas las rutas disponibles mediante `FlatList`. |
| **Búsqueda**          | Filtra las rutas por nombre, línea o estaciones.          |
| **Detalle**           | Muestra la información completa de una ruta.              |
| **Favoritos**         | Permite guardar y eliminar rutas mediante Zustand.        |
| **Limpiar favoritos** | Elimina todas las rutas guardadas.                        |
| **Badge**             | Muestra el número de favoritos en tiempo real.            |
| **Navegación**        | Utiliza Tabs y Stack con parámetros tipados.              |
| **Estado global**     | Comparte los favoritos entre las diferentes pantallas.    |

---

## 👨‍💻 Proyecto académico

Proyecto desarrollado como parte del aprendizaje de:

**React Native + TypeScript + React Navigation 7 + Zustand**
