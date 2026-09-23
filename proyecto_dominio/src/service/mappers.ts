import type { CableCarRoute, JsonPlaceholderPost } from '../types';

const BOGOTA_ROUTES_TEMPLATES = [
  { name: 'Eje Noroccidente', route: 'Línea C-D 18', origin: 'Portal Suba', dest: 'Portal 80', subtitle: 'Termina en Portal 80 · Conecta la Troncal Calle 80', duration: 45, price: 3500 },
  { name: 'Corredor Occidente', route: 'Línea C-K 26', origin: 'Portal Suba', dest: 'Portal El Dorado', subtitle: 'Termina en Portal El Dorado · Conecta la Troncal Calle 26', duration: 60, price: 3500 },
  { name: 'Norte Exprés', route: 'Línea B-D 9', origin: 'Portal Norte', dest: 'Portal 80', subtitle: 'Termina en Portal 80 · Conecta la Troncal Calle 80', duration: 50, price: 3500 },
  { name: 'Diagonal Norte', route: 'Línea B-K 11', origin: 'Portal Norte', dest: 'Portal El Dorado', subtitle: 'Termina en Portal El Dorado · Conecta la Troncal Calle 26', duration: 65, price: 3500 },
  { name: 'Gran Diagonal', route: 'Línea B-F 21', origin: 'Portal Norte', dest: 'Portal Américas', subtitle: 'Termina en Portal Américas · Conecta la Troncal Américas', duration: 90, price: 3500 },
  { name: 'Conexión Aérea', route: 'Línea D-K 5', origin: 'Portal 80', dest: 'Portal El Dorado', subtitle: 'Termina en Portal El Dorado · Conecta la Troncal Calle 26 hacia el aeropuerto', duration: 35, price: 3500 },
  { name: 'Cruce Oriental', route: 'Línea D-L 14', origin: 'Portal 80', dest: 'Portal 20 de Julio', subtitle: 'Termina en Portal 20 de Julio · Conecta la Troncal Carrera 10', duration: 75, price: 3500 },
  { name: 'Eje Occidente', route: 'Línea F-K 8', origin: 'Portal Américas', dest: 'Portal El Dorado', subtitle: 'Termina en Portal El Dorado · Conecta la Troncal Calle 26', duration: 40, price: 3500 },
  { name: 'Transversal Sur', route: 'Línea F-L 6', origin: 'Portal Américas', dest: 'Portal 20 de Julio', subtitle: 'Termina en Portal 20 de Julio · Conecta la Troncal Carrera 10', duration: 60, price: 3500 },
  { name: 'Eje Suroriental', route: 'Línea G-L 4', origin: 'Portal Sur', dest: 'Portal 20 de Julio', subtitle: 'Termina en Portal 20 de Julio · Conecta la Troncal Carrera 10', duration: 45, price: 3500 },
];

export function mapPostToRoute(post: JsonPlaceholderPost): CableCarRoute {
  const isUserCreated = post.id > 100;

  if (isUserCreated) {
    return {
      id: String(post.id),
      name: post.title,
      route: 'Línea Nueva',
      originStation: 'Estación Origen',
      destinationStation: 'Estación Destino',
      duration: 20,
      ticketPrice: 3500,
      subtitle: post.body,
    };
  }

  const templateIndex = (post.id - 1) % BOGOTA_ROUTES_TEMPLATES.length;
  const template = BOGOTA_ROUTES_TEMPLATES[templateIndex];

  return {
    id: String(post.id),
    name: template.name,
    route: template.route,
    originStation: template.origin,
    destinationStation: template.dest,
    duration: template.duration,
    ticketPrice: template.price,
    subtitle: template.subtitle,
  };
}

export function mapPostsToRoutes(posts: JsonPlaceholderPost[]): CableCarRoute[] {
  return posts.map(mapPostToRoute);
}