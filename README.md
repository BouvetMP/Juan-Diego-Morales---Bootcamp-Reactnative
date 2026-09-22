# 🚡 Cable Bogotá — Sistema de Teleféricos

Proyecto de dominio sobre el sistema de **teleféricos y cable aéreo de Bogotá**, desarrollado con **React Native** y **TypeScript**.

La aplicación permite consultar rutas desde una API, buscar estaciones, administrar favoritos y crear nuevas rutas.

---

## 🎯 Objetivo

La aplicación cuenta con las siguientes funcionalidades:

* 📍 Catálogo de rutas cargado desde una API.
* 🔎 Búsqueda de rutas y estaciones.
* ⭐ Sistema de favoritos.
* 📄 Información detallada de cada ruta.
* ➕ Creación de nuevas rutas mediante un formulario.
* 🔄 Navegación mediante pestañas y pantallas.
* 🗄️ Estado global con Zustand.
* 🔴 Contador de favoritos en tiempo real.
* 🌐 Consumo de API mediante Axios.
* ⚡ Gestión de datos con TanStack Query v5.
* ⏳ Estados de carga, error y lista vacía.
* 🔄 Actualización mediante pull-to-refresh.
* 🔐 Navegación y parámetros tipados con TypeScript.

---

## 🛠️ Tecnologías utilizadas

* **React Native**
* **Expo**
* **TypeScript**
* **React Navigation 7**
* **Zustand**
* **Axios**
* **TanStack Query v5**
* **Ionicons**
* **FlatList**

---

## 📦 Instalación

### 1. Instalar React Navigation e iconos

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons
```

### 2. Instalar Zustand

```bash
npx expo install zustand
```

### 3. Instalar Axios y TanStack Query

```bash
npx expo install axios @tanstack/react-query
```

### 4. Instalar las dependencias del proyecto

Con pnpm:

```bash
pnpm install
```

Y con pnpm:

```bash
npx expo install react-dom react-native-web
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
* Escanear el código QR con **Expo Go**.

---

## 📚 Evolución del proyecto

### Semana 01 — Maquetación

Se creó la estructura inicial del proyecto.

* Definición del dominio de teleféricos.
* Creación del componente reutilizable `ItemCard`.
* Creación de la interfaz TypeScript `CableCarRoute`.

### Semana 02 — Listas, búsqueda y tema

Se implementaron las funciones básicas para mostrar y buscar rutas.

* Implementación de `FlatList`.
* Buscador mediante `TextInput`.
* Búsqueda por nombre, línea y estaciones.
* Uso de `useMemo`.
* Manejo del teclado con `KeyboardAvoidingView`.
* Uso de `Pressable`.
* Creación de un sistema de temas.
* Estado vacío cuando no existen resultados.

### Semana 03 — Navegación

Se implementó la navegación utilizando **React Navigation 7**.

* **Bottom Tab Navigator** con:

  * 🗺️ Rutas.
  * ⭐ Favoritos.
* **Native Stack Navigator** para las rutas.
* Navegación entre:

  * `HomeList`
  * `HomeDetail`
  * `CreateRoute`
* Uso de `route.params`.
* Parámetros tipados mediante:

  * `HomeStackParamList`
  * `RootTabParamList`
* Integración de `Ionicons`.
* Creación de la pantalla de detalle.

### Semana 04 — Estado global con Zustand

Se implementó el sistema de favoritos mediante **Zustand**.

* Creación del store `useSavedStore`.
* Ubicación en `src/stores/savedStore.ts`.
* Acciones:

  * `addRoute`
  * `removeRoute`
  * `toggleRoute`
  * `clearAll`
  * `isSaved`
* Uso de selectores específicos.
* Botón **Guardar / Quitar de favoritos**.
* `FavoritesScreen` conectado al estado global.
* Badge con el número de favoritos.
* Opción **Limpiar todo**.
* Eliminación del *prop drilling*.
* TypeScript estricto sin `any`.

### Semana 05 — Networking

Se incorporó el consumo de una API utilizando **Axios** y **TanStack Query v5**.

* Creación de un cliente Axios centralizado.
* Creación de mappers para convertir los datos de la API al modelo `CableCarRoute`.
* Creación de hooks para:

  * Consultar todas las rutas.
  * Consultar una ruta por ID.
  * Crear nuevas rutas.
* Configuración de `QueryClientProvider`.
* Manejo de estados:

  * ⏳ Loading.
  * ❌ Error.
  * 📭 Empty state.
  * 🔄 Pull-to-refresh.
* Creación de rutas mediante `POST`.
* Actualización de la caché después de crear una ruta.
* Uso de **JSONPlaceholder** como API de práctica.
* Integración de los datos de red con el dominio de Cable Bogotá.

---

## 🧭 Navegación

La aplicación utiliza un **Bottom Tab Navigator** como navegación principal y un **Native Stack Navigator** para las pantallas relacionadas con las rutas.

```text
Bottom Tab Navigator
│
├── 🗺️ Rutas
│   │
│   └── Stack Navigator
│       │
│       ├── HomeList
│       │   └── Lista + búsqueda + pull-to-refresh
│       │
│       ├── HomeDetail
│       │   └── Detalle + favoritos
│       │
│       └── CreateRoute
│           └── Formulario para crear una ruta
│
└── ⭐ Favoritos
    │
    └── FavoritesScreen
        └── Lista de favoritos + badge
```

La información de las rutas se envía a `DetailScreen` mediante **parámetros tipados**.

---

## 🌐 Consumo de API

La comunicación con la API está organizada en dos partes principales:

```text
src/services/
│
├── api.ts
│   └── Cliente Axios
│
└── mappers.ts
    └── Convierte datos de la API
        al modelo CableCarRoute
```

Los hooks de TanStack Query se encuentran en:

```text
src/hooks/
└── useRoutes.ts
```

### Flujo de datos

```text
API
 ↓
Axios
 ↓
Mappers
 ↓
CableCarRoute
 ↓
TanStack Query
 ↓
Pantallas
```

La aplicación utiliza **JSONPlaceholder** como API de práctica y adapta sus respuestas al dominio de Cable Bogotá.

---

## 🗄️ Estado global con Zustand

Los favoritos se administran mediante:

```text
src/stores/savedStore.ts
```

El store contiene:

```text
savedRoutes[]
│
├── addRoute()     → agregar favorito
├── removeRoute()  → eliminar favorito
├── toggleRoute()  → guardar o quitar
├── clearAll()     → eliminar todos
└── isSaved()      → comprobar si está guardado
```

El badge de la pestaña **Favoritos** utiliza `savedRoutes.length` para mostrar la cantidad de rutas guardadas.

---

## 📁 Estructura del proyecto

```text
proyecto_dominio/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── README.md
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
    │   ├── CreateScreen.tsx
    │   └── FavoritesScreen.tsx
    │
    ├── stores/
    │   └── savedStore.ts
    │
    ├── hooks/
    │   └── useRoutes.ts
    │
    ├── services/
    │   ├── api.ts
    │   └── mappers.ts
    │
    ├── components/
    │   └── ItemCard.tsx
    │
    ├── theme/
    │   └── index.ts
    │
    └── types/
        └── index.ts
```

### 📂 Descripción de carpetas

| Carpeta      | Descripción                                               |
| ------------ | --------------------------------------------------------- |
| `navigation` | Configuración de Tabs, Stack y tipos de navegación        |
| `screens`    | Pantallas principales de la aplicación                    |
| `stores`     | Estado global de favoritos con Zustand                    |
| `hooks`      | Hooks para consultar y modificar datos con TanStack Query |
| `services`   | Cliente Axios y transformación de datos                   |
| `components` | Componentes reutilizables                                 |
| `theme`      | Colores, tipografía, espacios y estilos                   |
| `types`      | Interfaces y tipos de TypeScript                          |

> **Nota:** El archivo `mockData.ts` utilizado en semanas anteriores fue reemplazado por la capa de red. Actualmente las rutas principales se obtienen desde la API.

---

## 🚡 Modelo de una ruta

Cada objeto `CableCarRoute` contiene información como:

* **id** — identificador de la ruta.
* **name** — nombre de la ruta.
* **route** — línea.
* **originStation** — estación de origen.
* **destinationStation** — estación de destino.
* **duration** — duración en minutos.
* **ticketPrice** — tarifa en COP.
* **subtitle** — descripción breve.
* **Imagen** — imagen utilizada en la interfaz.

---

## ⭐ Funcionalidades principales

| Funcionalidad         | Descripción                                              |
| --------------------- | -------------------------------------------------------- |
| **Rutas**             | Consulta las rutas desde la API mediante TanStack Query. |
| **Búsqueda**          | Filtra las rutas por nombre, línea o estaciones.         |
| **Pull-to-refresh**   | Permite actualizar manualmente los datos.                |
| **Loading**           | Muestra un indicador mientras se cargan los datos.       |
| **Error**             | Muestra un mensaje y permite reintentar la consulta.     |
| **Empty state**       | Informa cuando no existen resultados.                    |
| **Crear ruta**        | Permite crear una nueva ruta mediante `POST`.            |
| **Detalle**           | Muestra toda la información de una ruta.                 |
| **Favoritos**         | Guarda rutas mediante Zustand.                           |
| **Badge**             | Muestra la cantidad de favoritos en tiempo real.         |
| **Limpiar favoritos** | Elimina todas las rutas guardadas.                       |
| **Navegación**        | Utiliza Tabs y Stack con parámetros tipados.             |
| **Tema**              | Mantiene los estilos centralizados.                      |

---

## 🧪 Cómo probar

1. Abrir la aplicación y esperar a que carguen las rutas.
2. Utilizar el buscador para encontrar una ruta o estación.
3. Deslizar hacia abajo para probar el **pull-to-refresh**.
4. Entrar al detalle de una ruta.
5. Presionar **Guardar en favoritos**.
6. Revisar el contador de la pestaña **Favoritos**.
7. Entrar a Favoritos y eliminar una ruta.
8. Utilizar **Limpiar todo** para eliminar todos los favoritos.
9. Presionar **+ Nueva** para abrir el formulario de creación.
10. Crear una nueva ruta y comprobar que aparece en la lista.
11. Opcionalmente, probar la aplicación sin conexión para comprobar el estado de error.

---

## 👨‍💻 Proyecto académico

Proyecto desarrollado como parte del aprendizaje de:

**React Native + TypeScript + React Navigation 7 + Zustand + Axios + TanStack Query v5**

### 🚡 Dominio

**Terminal / Sistema de Teleféricos — Cable Bogotá**
