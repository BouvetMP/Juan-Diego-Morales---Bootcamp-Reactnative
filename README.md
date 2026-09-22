# 🚡 Cable Bogotá — Sistema de Teleféricos

Proyecto de Dominio Terminal de Telefericos

## 🎯 Objetivo

La aplicación cuenta con:

* 📍 Catálogo de rutas de teleférico.
* 🔎 Búsqueda de rutas y estaciones.
* ⭐ Sección de favoritos.
* 📄 Vista detallada de cada ruta.
* 🔄 Navegación mediante pestañas y pantallas.
* 🔐 Parámetros tipados con TypeScript.

---

## 🛠️ Tecnologías utilizadas

* **React Native**
* **Expo**
* **TypeScript**
* **React Navigation 7**
* **Ionicons**
* **FlatList**

---

## 📦 Instalación

Primero instala las dependencias necesarias:

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons
```

Después instala las dependencias del proyecto:

```bash
pnpm install
```

También puedes utilizar npm:

```bash
npm install
```

---

## ▶️ Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
npx expo start -c
```

Después puedes:

* Presionar **`a`** para Android.
* Presionar **`i`** para iOS.
* Escanear el código QR utilizando **Expo Go**.

---

## 📚 Evolución del proyecto

### Semana 01 — Maquetación

* Creación de la estructura inicial del proyecto.
* Definición del dominio de teleféricos.
* Creación del componente `ItemCard`.
* Creación de la interfaz `CableCarRoute`.

### Semana 02 — Listas y búsqueda

* Implementación de `FlatList`.
* Buscador mediante `TextInput`.
* Búsqueda por nombre, línea y estaciones.
* Uso de `useMemo` para optimizar la búsqueda.
* Manejo del teclado con `KeyboardAvoidingView`.
* Uso de `Pressable` para las interacciones.
* Creación de un sistema de temas.
* Implementación de un estado vacío cuando no existen resultados.

### Semana 03 — Navegación

* Implementación de **Bottom Tab Navigator**.
* Creación de las pestañas:

  * 🗺️ Rutas
  * ⭐ Favoritos
* Implementación de **Native Stack Navigator**.
* Navegación de `HomeScreen` hacia `DetailScreen`.
* Paso de información mediante `route.params`.
* Tipado de la navegación con TypeScript.
* Uso de `Ionicons`.
* Creación de la pantalla de detalle de cada ruta.

---

## 🧭 Navegación

La aplicación utiliza dos niveles principales de navegación:

```text
Bottom Tab Navigator
│
├── 🗺️ Rutas
│   │
│   ├── HomeScreen
│   │
│   └── DetailScreen
│
└── ⭐ Favoritos
    │
    └── FavoritesScreen
```

La pantalla de detalle recibe la información de la ruta seleccionada mediante parámetros tipados.

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

### 📂 Descripción de carpetas

| Carpeta      | Descripción                            |
| ------------ | -------------------------------------- |
| `navigation` | Configuración de la navegación y tipos |
| `screens`    | Pantallas principales de la aplicación |
| `components` | Componentes reutilizables              |
| `data`       | Información de prueba de las rutas     |
| `theme`      | Colores, estilos y constantes visuales |
| `types`      | Interfaces y tipos de TypeScript       |

---

## 🚡 Información de las rutas

Cada ruta contiene información como:

* Nombre de la ruta.
* Línea.
* Estación de origen.
* Estación de destino.
* Tarifa en COP.
* Duración aproximada.
* Imagen.
* Identificador único.

---

## ⭐ Funcionalidades principales

**Rutas:** permite consultar todas las rutas disponibles.

**Búsqueda:** permite encontrar rutas utilizando su nombre, línea o estaciones.

**Favoritos:** permite consultar las rutas destacadas.

**Detalle:** muestra información completa de una ruta seleccionada.

**Navegación:** permite desplazarse entre las diferentes secciones de la aplicación de forma sencilla.

---

## 👨‍💻 Proyecto académico

Proyecto desarrollado como parte del aprendizaje de **React Native + TypeScript + React Navigation 7**.
