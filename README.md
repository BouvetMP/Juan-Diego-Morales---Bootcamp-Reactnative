# 🚡 Cable Bogotá — Sistema de Teleféricos

Proyecto de dominio sobre el sistema de **teleféricos y cable aéreo de Bogotá**, desarrollado con **React Native** y **TypeScript**.

La aplicación permite consultar rutas desde una API, buscar estaciones, administrar favoritos, crear y editar rutas mediante formularios validados.

---

## 🎯 Objetivo

La aplicación cuenta con las siguientes funcionalidades:

* 📍 Catálogo de rutas cargado desde una API.
* 🔎 Búsqueda de rutas y estaciones.
* ⭐ Sistema de favoritos.
* 📄 Información detallada de cada ruta.
* ➕ Creación de nuevas rutas mediante un formulario validado.
* ✏️ Edición de rutas existentes con precarga de datos.
* ✅ Validación de formularios con Zod.
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
* **React Hook Form**
* **Zod**
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

### 4. Instalar React Hook Form + Zod

```bash
npx expo install react-hook-form zod @hookform/resolvers
```

### 5. Instalar las dependencias del proyecto

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

* Presionar `a` para Android.
* Presionar `i` para iOS.
* Escanear el código QR con Expo Go.

Para verificar la salud del proyecto:

```bash
npx tsc --noEmit
```

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

Se implementó la navegación utilizando React Navigation 7.

* Bottom Tab Navigator con:
  * 🗺️ Rutas.
  * ⭐ Favoritos.
* Native Stack Navigator para las rutas.
* Navegación entre:
  * `HomeList`
  * `HomeDetail`
  * `CreateRoute`
* Uso de `route.params`.
* Parámetros tipados mediante:
  * `HomeStackParamList`
  * `RootTabParamList`
* Integración de Ionicons.
* Creación de la pantalla de detalle.

### Semana 04 — Estado global con Zustand

Se implementó el sistema de favoritos mediante Zustand.

* Creación del store `useSavedStore`.
* Ubicación en `src/stores/savedStore.ts`.
* Acciones:
  * `addRoute`
  * `removeRoute`
  * `toggleRoute`
  * `clearAll`
  * `isSaved`
* Uso de selectores específicos.
* Botón Guardar / Quitar de favoritos.
* `FavoritesScreen` conectado al estado global.
* Badge con el número de favoritos.
* Opción Limpiar todo.
* Eliminación del prop drilling.
* TypeScript estricto sin `any`.

### Semana 05 — Networking

Se incorporó el consumo de una API utilizando Axios y TanStack Query v5.

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
* Creación de rutas mediante POST.
* Actualización de la caché después de crear una ruta.
* Uso de JSONPlaceholder como API de práctica.
* Integración de los datos de red con el dominio de Cable Bogotá.

### Semana 06 — Formularios con React Hook Form + Zod

Se implementaron formularios robustos con validación estricta y edición de rutas existentes.

* Instalación de `react-hook-form`, `zod` y `@hookform/resolvers`.
* Creación del schema Zod `routeSchema` con validaciones coherentes al dominio:
  * Nombre mínimo 3 caracteres.
  * Línea obligatoria.
  * Estaciones origen y destino requeridas.
  * Duración mayor a 0.
  * Precio no negativo.
  * Descripción mínima de 5 caracteres.
* Componente reutilizable `FormField` con:
  * Controller de React Hook Form.
  * Mensajes de error debajo de cada campo.
  * Manejo automático de valores numéricos.
  * Bordes rojos cuando hay error.
* Refactorización de `CreateScreen`:
  * Migración de `useState` manual a `useForm`.
  * Uso de `zodResolver`.
  * Estado `isSubmitting` para botones con spinner.
* Nueva pantalla `EditScreen`:
  * Carga de datos existentes con `useRouteById`.
  * Precarga automática de valores mediante `reset()` en `useEffect`.
  * Redirección automática tras guardar cambios.
* Nuevo hook `useUpdateRoute`:
  * Realiza PUT a la API.
  * Actualiza la caché de TanStack Query en tiempo real.
* `DetailScreen` conectado a la caché de TanStack Query:
  * Los datos se actualizan en vivo al editar.
  * Título del header cambia dinámicamente.
* Nuevo tipo `UpdateRoutePayload`.
* Botón Editar esta ruta en el detalle.

---

## 🧭 Navegación

La aplicación utiliza un Bottom Tab Navigator como navegación principal y un Native Stack Navigator para las pantallas relacionadas con las rutas.

```
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
│       │   └── Detalle + favoritos + editar
│       │
│       ├── CreateRoute
│       │   └── Formulario RHF + Zod para crear
│       │
│       └── EditRoute
│           └── Formulario RHF + Zod para editar
│
└── ⭐ Favoritos
    │
    └── FavoritesScreen
        └── Lista de favoritos + badge
```

---

## 🌐 Consumo de API

La comunicación con la API está organizada en dos partes principales:

```
src/service/
│
├── api.ts
│   └── Cliente Axios
│
└── mappers.ts
    └── Convierte datos de la API
        al modelo CableCarRoute
```

Los hooks de TanStack Query se encuentran en:

```
src/hooks/
└── useRoutes.ts
    ├── useRoutes()       → lista de rutas
    ├── useRouteById()    → ruta individual
    ├── useCreateRoute()  → crear POST
    └── useUpdateRoute()  → actualizar PUT
```

### Flujo de datos

```
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

---

## 📝 Formularios y Validación

Los formularios utilizan React Hook Form con validación mediante Zod:

```
src/schemas/
└── routeSchema.ts
    └── Reglas de validación

src/components/
└── FormField.tsx
    └── Input genérico + Controller + errores
```

El componente `FormField` es reutilizado en:

* `CreateScreen` — creación de rutas.
* `EditScreen` — edición de rutas existentes.

---

## 🗄️ Estado global con Zustand

Los favoritos se administran mediante:

```
src/stores/savedStore.ts
```

El store contiene:

```
savedRoutes[]
│
├── addRoute()     → agregar favorito
├── removeRoute()  → eliminar favorito
├── toggleRoute()  → guardar o quitar
├── clearAll()     → eliminar todos
└── isSaved()      → comprobar si está guardado
```

El badge de la pestaña Favoritos utiliza `savedRoutes.length` para mostrar la cantidad de rutas guardadas.

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
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    │
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── DetailScreen.tsx
    │   ├── CreateScreen.tsx
    │   ├── EditScreen.tsx
    │   └── FavoritesScreen.tsx
    │
    ├── stores/
    │   └── savedStore.ts
    │
    ├── hooks/
    │   └── useRoutes.ts
    │
    ├── service/
    │   ├── api.ts
    │   └── mappers.ts
    │
    ├── schemas/
    │   └── routeSchema.ts
    │
    ├── components/
    │   ├── ItemCard.tsx
    │   └── FormField.tsx
    │
    ├── theme/
    │   └── index.ts
    │
    └── types/
        └── index.tsx
```

### 📂 Descripción de carpetas

| Carpeta      | Descripción                                                |
|--------------|-------------------------------------------------------------|
| `navigation` | Configuración de Tabs, Stack y tipos de navegación          |
| `screens`    | Pantallas principales de la aplicación                      |
| `stores`     | Estado global de favoritos con Zustand                      |
| `hooks`      | Hooks para consultar y modificar datos con TanStack Query   |
| `service`    | Cliente Axios y transformación de datos                     |
| `schemas`    | Reglas de validación con Zod                                 |
| `components` | Componentes reutilizables                                   |
| `theme`      | Colores, tipografía, espacios y estilos                     |
| `types`      | Interfaces y tipos de TypeScript                             |

---

## 🚡 Modelo de una ruta

Cada objeto `CableCarRoute` contiene información como:

* `id` — identificador de la ruta.
* `name` — nombre de la ruta.
* `route` — línea.
* `originStation` — estación de origen.
* `destinationStation` — estación de destino.
* `duration` — duración en minutos.
* `ticketPrice` — tarifa en COP.
* `subtitle` — descripción breve.
* `Imagen` — imagen utilizada en la interfaz.

---

## ⭐ Funcionalidades principales

| Funcionalidad       | Descripción                                                          |
|---------------------|------------------------------------------------------------------------|
| Rutas               | Consulta las rutas desde la API mediante TanStack Query.               |
| Búsqueda            | Filtra las rutas por nombre, línea o estaciones.                       |
| Pull-to-refresh     | Permite actualizar manualmente los datos.                              |
| Loading             | Muestra un indicador mientras se cargan los datos.                     |
| Error               | Muestra un mensaje y permite reintentar la consulta.                   |
| Empty state         | Informa cuando no existen resultados.                                  |
| Crear ruta          | Formulario validado con RHF + Zod.                                     |
| Editar ruta         | Formulario con precarga y actualización en tiempo real.                |
| Detalle             | Muestra toda la información sincronizada con la caché.                 |
| Favoritos           | Guarda rutas mediante Zustand.                                         |
| Badge               | Muestra la cantidad de favoritos en tiempo real.                       |
| Limpiar favoritos   | Elimina todas las rutas guardadas.                                     |
| Navegación          | Utiliza Tabs y Stack con parámetros tipados.                           |
| Tema                | Mantiene los estilos centralizados.                                    |
