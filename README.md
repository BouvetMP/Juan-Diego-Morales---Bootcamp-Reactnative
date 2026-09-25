# 🚡 Cable Bogotá — Sistema de Teleféricos

Proyecto de dominio sobre el sistema de **teleféricos y cable aéreo de Bogotá (TransMiCable)**, desarrollado con **React Native** y **TypeScript**.

La aplicación permite consultar rutas desde una API, buscar estaciones, administrar favoritos, crear y editar rutas, gestionar sesión de pasajero (tarjeta TuLlave), preferencias de usuario y animaciones de interfaz.

**Dominio:** Pasajero / Cliente del sistema TransMiCable.

---

## 🎯 Objetivo

La aplicación cuenta con las siguientes funcionalidades:

* 📍 Catálogo de rutas cargado desde una API.
* 🔎 Búsqueda y filtrado de rutas y estaciones.
* ⭐ Sistema de favoritos con badge en tiempo real.
* 📄 Información detallada de cada ruta.
* ➕ Creación de nuevas rutas mediante formularios validados.
* ✏️ Edición de rutas existentes con precarga de datos.
* ✅ Validación de formularios con Zod + React Hook Form.
* 🔄 Navegación mediante pestañas, stacks y pantallas tipadas.
* 🗄️ Estado global con Zustand (favoritos, auth, preferencias).
* 🌐 Consumo de API mediante Axios + interceptores.
* ⚡ Gestión de datos con TanStack Query v5.
* ⏳ Estados de carga, error, offline y lista vacía.
* 🔄 Actualización mediante pull-to-refresh.
* 🔐 Autenticación de pasajero (login / registro / tokens).
* 💳 Credencial digital con tarjeta TuLlave.
* 🌙 Modo oscuro / claro con preferencias persistidas.
* 🎬 Animaciones de UI (entrada, spring, stagger, progress bar, LayoutAnimation).
* 🔐 Navegación y parámetros tipados con TypeScript estricto.

---

## 🛠️ Tecnologías utilizadas

* **React Native** + **Expo**
* **TypeScript** (strict)
* **React Navigation 7** (Bottom Tabs + Native Stack)
* **Zustand** + persistencia (`AsyncStorage`)
* **Axios** (cliente + interceptores 401 / refresh)
* **TanStack Query v5**
* **React Hook Form** + **Zod** + `@hookform/resolvers`
* **Expo SecureStore** (tokens en dispositivo nativo)
* **Ionicons** (`@expo/vector-icons`)
* **Animated API** de React Native (`useNativeDriver`, spring, stagger, interpolate, LayoutAnimation)
* **FlatList**

---

## 📦 Instalación

### 1. Dependencias de navegación e iconos

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @expo/vector-icons
```

### 2. Estado global y almacenamiento

```bash
npx expo install zustand @react-native-async-storage/async-storage expo-secure-store
```

### 3. Networking y caché

```bash
npx expo install axios @tanstack/react-query
```

### 4. Formularios y validación

```bash
npx expo install react-hook-form zod @hookform/resolvers
```

### 5. Dependencias del proyecto

```bash
pnpm install
# o
npm install
```

Soporte web (opcional):

```bash
npx expo install react-dom react-native-web
```

---

## ▶️ Ejecutar el proyecto

```bash
npx expo start -c
```

* `a` → Android  
* `i` → iOS  
* Escanear QR con Expo Go  

Verificación de tipos:

```bash
npx tsc --noEmit
```

---

## 📚 Evolución del proyecto

### Semana 01 — Maquetación

* Definición del dominio de teleféricos / TransMiCable.
* Componente reutilizable `ItemCard`.
* Interfaz TypeScript `CableCarRoute`.

### Semana 02 — Listas, búsqueda y tema

* `FlatList`, buscador con `TextInput` y `useMemo`.
* Búsqueda por nombre, línea y estaciones.
* `KeyboardAvoidingView`, `Pressable`.
* Sistema de temas centralizado.
* Empty state.

### Semana 03 — Navegación

* Bottom Tab Navigator (Rutas / Favoritos).
* Native Stack (`HomeList`, `HomeDetail`, `CreateRoute`).
* Parámetros tipados: `HomeStackParamList`, `RootTabParamList`.
* Ionicons + pantalla de detalle.

### Semana 04 — Estado global con Zustand

* Store `useSavedStore` (`addRoute`, `removeRoute`, `toggleRoute`, `clearAll`, `isSaved`).
* `FavoritesScreen` + badge de favoritos.
* Eliminación de prop drilling.

### Semana 05 — Networking

* Cliente Axios + mappers → `CableCarRoute`.
* Hooks: `useRoutes`, `useRouteById`, `useCreateRoute`.
* `QueryClientProvider`, loading / error / empty / pull-to-refresh.
* POST de rutas y actualización de caché (JSONPlaceholder).

### Semana 06 — Formularios con React Hook Form + Zod

* Schema `routeSchema` con reglas del dominio.
* Componente reutilizable `FormField`.
* `CreateScreen` migrado a `useForm` + `zodResolver`.
* Nueva `EditScreen` con precarga (`reset`) y `useUpdateRoute` (PUT + caché).
* Botón “Editar esta ruta” en el detalle.

### Semana 07 — Preferencias globales y tema dinámico

* Store `usePreferences` (modo oscuro, ordenamiento, filtros de rutas populares / solo favoritos).
* Persistencia con `zustand/persist` + `AsyncStorage`.
* Tema inyectado en pantallas con `getColors(preferences.darkMode)`.
* `HomeScreen` reacciona en tiempo real a filtros y favoritos guardados.
* `loadInit` hidrata el store de preferencias al montar pantallas clave.

### Semana 08 — Autenticación, seguridad y perfil de pasajero

* Schemas Zod de auth (`authSchema`): login y registro.
  * Tarjeta **TuLlave**: 16 dígitos numéricos.
  * Contraseña segura: mínimo 12 caracteres, mayúscula, minúscula y carácter especial.
* Store `authStore` (sesión híbrida local + DummyJSON).
* `tokenService` con **SecureStore** (nativo) y fallback a `AsyncStorage` (web).
* Interceptor Axios: ante `401` renueva token en `/auth/refresh` y reintenta la petición.
* Flujo de navegación condicional: `AuthNavigator` (Login / Register) vs app autenticada.
* `ProfileScreen`: credencial digital del pasajero (nombre, username, badge, TuLlave completa, saldo).
* Tabs de **Perfil** y **Ajustes**.

### Semana 09 — Animaciones, tipado estricto y pulido de UX

* **Animaciones de presentación (UI):**
  1. Fade-in + slide-up en `DetailScreen` (`Animated.parallel`, 500 ms, `useNativeDriver: true`).
  2. Feedback táctil spring scale en cards (`AnimatedCard`, 1 → 0.95 → 1).
  3. `ProgressBar` con `interpolate` de ancho (`0%→100%`) y color (rojo → amarillo → verde); `useNativeDriver: false` justificado para `width`/`backgroundColor`.
  4. Entrada en cascada en `HomeScreen` (`StaggerItem`, delay `index * 80`).
  5. `LayoutAnimation` al filtrar / agregar / quitar ítems visibles.
* Componentes nuevos: `AnimatedCard.tsx`, `ProgressBar.tsx` (sin romper `ItemCard`).
* Tipado estricto: `npx tsc --noEmit` en verde; interfaces centralizadas en `src/types`.
* Safe unwrap de datos de React Query en detalle/edición.
* Navegación anidada corregida desde Favoritos hacia `HomeDetail`.
* `FormField` 100 % dinámico al tema (modo claro / oscuro).
* `paddingBottom` en scrolls para no tapar contenido con el Tab Bar.
* Exportaciones nombradas + default en pantallas para evitar crashes del navigator.

---

## 🧭 Navegación

```
RootNavigator
│
├── [No autenticado] AuthStack
│   ├── Login
│   └── Register
│
└── [Autenticado] Bottom Tab Navigator
    │
    ├── 🗺️ Rutas (Home)
    │   └── HomeStack
    │       ├── HomeList          → lista + filtros + stagger + pull-to-refresh
    │       ├── HomeDetail        → detalle animado + favoritos + ProgressBar + editar
    │       ├── CreateRoute       → formulario RHF + Zod
    │       └── EditRoute         → formulario con precarga + tema dinámico
    │
    ├── ⭐ Favoritos
    │   └── FavoritesScreen       → lista de guardados + navegación anidada a detalle
    │
    ├── 👤 Perfil
    │   └── ProfileScreen         → credencial TuLlave + datos del pasajero + logout
    │
    └── ⚙️ Ajustes
        └── SettingsScreen        → dark mode, orden, filtros (preferencias Zustand)
```

### Tipos de navegación

```
AuthStackParamList
HomeStackParamList   (HomeList | HomeDetail | CreateRoute | EditRoute)
RootTabParamList     (Home | Favorites | Profile | Settings)
```

La tab `Home` tipa su stack anidado con `NavigatorScreenParams<HomeStackParamList>` para permitir:

```ts
navigation.navigate("Home", { screen: "HomeDetail", params: item });
```

---

## 🌐 Consumo de API

```
src/service/
├── api.ts           → cliente Axios + interceptores (Bearer + refresh 401)
├── authService.ts   → login / refresh (DummyJSON)
├── tokenService.ts  → SecureStore / AsyncStorage
└── mappers.ts       → posts API → CableCarRoute
```

Hooks TanStack Query:

```
src/hooks/useRoutes.ts
├── useRoutes()        → lista
├── useRouteById()     → detalle
├── useCreateRoute()   → POST
└── useUpdateRoute()   → PUT (ids ≤ 100 al mock; ids locales solo en caché)
```

### Flujo de datos

```
API (JSONPlaceholder / DummyJSON)
        ↓
     Axios (+ token + refresh)
        ↓
     Mappers
        ↓
  CableCarRoute / User
        ↓
  TanStack Query + Zustand
        ↓
     Pantallas
```

> **Nota de dominio:** las rutas creadas en sesión usan `id = Date.now()` (> 100). El `PUT` real solo se envía para ids del seed (1–100); el resto se actualiza en caché local de React Query.

---

## 📝 Formularios y validación

```
src/schemas/
├── routeSchema.ts   → creación / edición de rutas
└── authSchema.ts    → login / registro (TuLlave, password fuerte)

src/components/
└── FormField.tsx    → Controller + errores + tema dinámico (getColors)
```

Usado en: `CreateScreen`, `EditScreen`, `LoginScreen`, `RegisterScreen`.

---

## 🗄️ Estado global con Zustand

| Store | Archivo | Responsabilidad |
|-------|---------|-----------------|
| Favoritos | `src/stores/savedStore.ts` | `savedRoutes`, `toggleRoute`, `isSaved`, badge |
| Auth | `src/stores/authStore.ts` | sesión, `login` / `register` / `logout`, `checkAuthStatus`, usuarios locales |
| Preferencias | `src/hooks/usePreferences.ts` | dark mode, sort, showOnlySaved, showPopular, `loadInit` |

Persistencia:

* Auth y preferencias → `zustand/persist` + `AsyncStorage`.
* Tokens → `expo-secure-store` (nativo) / `AsyncStorage` (web).

---

## 🎬 Animaciones (Semana 09)

| Animación | Dónde | Técnica |
|-----------|--------|---------|
| Fade + slide up | `DetailScreen` | `Animated.parallel` + `useNativeDriver: true` |
| Spring scale al tocar | `AnimatedCard` → `ItemCard` | `Animated.spring` (1 ↔ 0.95) |
| Barra de ocupación | `ProgressBar` en detalle | `interpolate` width + color (`useNativeDriver: false` justificado) |
| Cascada de lista | `HomeScreen` (`StaggerItem`) | timing + delay `index * 80` |
| Entrada/salida de ítems | filtros / favoritos en Home | `LayoutAnimation.Presets.easeInEaseOut` |

---

## 📁 Estructura del proyecto

```
proyecto_dominio/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── README.md
│
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx      → Auth vs Tabs + hidratación
    │   └── types.ts               → Auth / Home / RootTab param lists
    │
    ├── screens/
    │   ├── HomeScreen.tsx         → lista + stagger + LayoutAnimation
    │   ├── DetailScreen.tsx       → fade/slide + ProgressBar + favoritos
    │   ├── CreateScreen.tsx
    │   ├── EditScreen.tsx
    │   ├── FavoritesScreen.tsx    → navegación anidada a HomeDetail
    │   ├── SettingsScreen.tsx
    │   ├── ProfileScreen.tsx
    │   ├── LoginScreen.tsx
    │   └── RegisterScreen.tsx
    │
    ├── stores/
    │   ├── savedStore.ts
    │   └── authStore.ts
    │
    ├── hooks/
    │   ├── useRoutes.ts
    │   └── usePreferences.ts
    │
    ├── service/
    │   ├── api.ts
    │   ├── authService.ts
    │   ├── tokenService.ts
    │   └── mappers.ts
    │
    ├── schemas/
    │   ├── routeSchema.ts
    │   └── authSchema.ts
    │
    ├── components/
    │   ├── ItemCard.tsx           → usa AnimatedCard internamente
    │   ├── AnimatedCard.tsx       → spring scale
    │   ├── ProgressBar.tsx        → interpolate width + color
    │   └── FormField.tsx          → tema dinámico
    │
    ├── theme/
    │   └── index.ts               → getColors(isDark), TYPOGRAPHY, SPACING, RADIUS
    │
    ├── storage/                   → helpers de preferencias (si aplica)
    │
    └── types/
        └── index.tsx              → CableCarRoute, User, AuthTokens, payloads
```

### Descripción de carpetas

| Carpeta | Descripción |
|---------|-------------|
| `navigation` | Tabs, stacks, auth gate y tipos de rutas |
| `screens` | Pantallas de la app (rutas, auth, perfil, ajustes) |
| `stores` | Zustand: favoritos y autenticación |
| `hooks` | React Query + preferencias |
| `service` | Axios, auth, tokens y mappers |
| `schemas` | Validaciones Zod (rutas y auth) |
| `components` | UI reutilizable + animaciones |
| `theme` | Colores dinámicos, tipografía y espaciado |
| `types` | Contratos TypeScript del dominio |

---

## 🚡 Modelo de una ruta

```ts
interface CableCarRoute {
  id: string;
  name: string;
  route: string;                 // código / línea
  originStation: string;
  destinationStation: string;
  duration: number;              // minutos
  ticketPrice: number;           // COP
  subtitle: string;
  imageUrl?: string;
}
```

Datos seed alineados al dominio de **cables aéreos urbanos de Bogotá** (cerros, portales TransMilenio e interior de ciudad), con duraciones y tarifas coherentes al modo teleférico.

---

## ⭐ Funcionalidades principales

| Funcionalidad | Descripción |
|---------------|-------------|
| Rutas | Consulta vía TanStack Query + mappers al dominio Cable Bogotá |
| Búsqueda / filtros | Nombre, línea, estaciones; solo favoritos; populares; ordenamiento |
| Pull-to-refresh | Refresco manual de la lista |
| Loading / Error / Empty | Estados de red y de lista vacía |
| Offline banner | Aviso cuando se sirven datos de caché |
| Crear / Editar ruta | Formularios RHF + Zod; PUT condicionado por id |
| Detalle | Info completa, favoritos, edición, animación de entrada, ProgressBar de ocupación estimada |
| Favoritos | Zustand + badge en tab |
| Auth | Login / registro, TuLlave, tokens seguros, refresh 401 |
| Perfil | Credencial digital del pasajero |
| Preferencias | Dark mode, orden, filtros persistidos |
| Animaciones | Spring en cards, stagger en lista, fade/slide en detalle, progress interpolado, LayoutAnimation |
| Tema | `getColors` en toda la UI (sin hardcode de contraste) |
| Tipado | TypeScript estricto, param lists y stores tipados |

---

## 📊 Estado del proyecto

Al cerrar la **Semana 09** la app se encuentra en un estado robusto:

* ✅ `npx tsc --noEmit` sin errores.
* ✅ Formularios a prueba de fallos (Zod) en rutas y auth.
* ✅ Navegación tipada y resiliente (incl. Favoritos → detalle).
* ✅ Sesión de pasajero con tokens y refresh.
* ✅ Tema claro / oscuro consistente (incl. `FormField`).
* ✅ Animaciones de UI con `useNativeDriver: true` salvo el caso justificado de `width` en `ProgressBar`.
* ✅ Experiencia centrada en el **Pasajero / Cliente** de TransMiCable y tarjeta TuLlave.

---

## ▶️ Scripts útiles

```bash
npx expo start -c      # desarrollo
npx tsc --noEmit       # chequeo de tipos
```