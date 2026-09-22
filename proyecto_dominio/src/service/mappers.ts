import type { CableCarRoute, JsonPlaceholderPost } from '../types';

const BOGOTA_ROUTES_TEMPLATES = [
  { name: 'TransMiCable Ciudad Bolívar', route: 'Línea H', origin: 'Tunal', dest: 'Mirador del Paraíso', subtitle: 'Conecta la Troncal Tunal con el Mirador del Paraíso', duration: 13, price: 3150 },
  { name: 'Cable San Cristóbal', route: 'Línea L', origin: '20 de Julio', dest: 'Altamira', subtitle: 'Integra con la Troncal 20 de Julio', duration: 10, price: 3150 },
  { name: 'Cable Monserrate', route: 'Línea Turística', origin: 'Pie de Cerro', dest: 'Santuario Monserrate', subtitle: 'Acceso directo al cerro de Monserrate', duration: 7, price: 14000 },
  { name: 'Cable Portal 80 - Suba', route: 'Línea 1', origin: 'Portal 80', dest: 'Portal Suba', subtitle: 'Se cruza con la Troncal Calle 80', duration: 40, price: 5500 },
  { name: 'Cable Portal Américas - Sur', route: 'Línea 2', origin: 'Portal Américas', dest: 'Portal Sur', subtitle: 'Se cruza con la Troncal NQS', duration: 30, price: 6000 },
  { name: 'Cable Potosí - Cazucá', route: 'Línea P', origin: 'Portal Sur', dest: 'Potosí', subtitle: 'Conexión entre Soacha y Bogotá', duration: 18, price: 3150 },
  { name: 'Cable Usme - El Destino', route: 'Línea 8', origin: 'Portal Usme', dest: 'El Destino', subtitle: 'Conexión rural-urbana en el sur', duration: 32, price: 3150 },
  { name: 'Cable Chapinero - La Calera', route: 'Línea 6', origin: 'Calle 72', dest: 'La Calera', subtitle: 'Transporte ecológico hacia los cerros', duration: 20, price: 8500 },
  { name: 'Cable Fontibón - Eldorado', route: 'Línea 7', origin: 'Fontibón Centro', dest: 'Portal Eldorado', subtitle: 'Ruta de apoyo al Aeropuerto El Dorado', duration: 22, price: 3500 },
  { name: 'Cable Portal Norte - Usaquén', route: 'Línea 3', origin: 'Portal Norte', dest: 'Usaquén Alta', subtitle: 'Conexión directa con la Autopista Norte', duration: 25, price: 4500 },
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