import type { CableCarRoute, JsonPlaceholderPost } from '../types';

const BOGOTA_ROUTES_TEMPLATES = [
  {
    name: 'Línea Ciudad Bolívar',
    route: 'Línea H - Tunal',
    origin: 'Portal Tunal',
    dest: 'Mirador del Paraíso',
    subtitle: 'Conecta Portal Tunal con la parte alta de Ciudad Bolívar · Estaciones Juan Pablo II y Manitas',
    duration: 13,
    price: 3100,
  },
  {
    name: 'Línea San Cristóbal',
    route: 'Línea L - 20J',
    origin: 'Portal 20 de Julio',
    dest: 'Estación Altamira',
    subtitle: 'Sube a los Cerros Surorientales conectando con La Victoria y la Troncal Carrera 10',
    duration: 10,
    price: 3100,
  },
  {
    name: 'Línea Potosí - Soacha',
    route: 'Línea H-P',
    origin: 'Portal Sur',
    dest: 'Potosí Alta',
    subtitle: 'Servicio aéreo de alta montaña que conecta la Autopista Sur con los límites de Soacha',
    duration: 15,
    price: 3100,
  },
  {
    name: 'Cable Cerros de Usaquén',
    route: 'Línea B-U',
    origin: 'Estación Calle 161',
    dest: 'Mirador El Codito',
    subtitle: 'Ascenso directo desde la Autopista Norte hacia los barrios altos de Usaquén',
    duration: 18,
    price: 3100,
  },
  {
    name: 'Cable Cerro Monserrate',
    route: 'Línea M-1',
    origin: 'Estación Quinta de Bolívar',
    dest: 'Santuario Monserrate',
    subtitle: 'Trayecto de alta pendiente hacia el Santuario y mirador central de Bogotá',
    duration: 7,
    price: 3500,
  },
  {
    name: 'Cable Chapinero - La Calera',
    route: 'Línea K-C',
    origin: 'Estación Calle 72',
    dest: 'Mirador La Calera',
    subtitle: 'Travesía aérea sobre la reserva forestal de los Cerros Orientales',
    duration: 22,
    price: 3500,
  },
  {
    name: 'Línea Suba Mirador',
    route: 'Línea C-S',
    origin: 'Portal Suba',
    dest: 'Mirador La Conejera',
    subtitle: 'Supera la pendiente del Cerro de Suba conectando las cuencas del noroccidente',
    duration: 14,
    price: 3100,
  },
  {
    name: 'Línea Usme - El Uval',
    route: 'Línea U-1',
    origin: 'Portal Usme',
    dest: 'Yomasa Alta',
    subtitle: 'Conexión aérea sobre la cuenca del Río Tunjuelo hacia la parte alta de Usme',
    duration: 16,
    price: 3100,
  },
  {
    name: 'Línea Rafael Uribe Uribe',
    route: 'Línea R-U',
    origin: 'Estación Molinos',
    dest: 'Barrio Diana Turbay',
    subtitle: 'Línea alimentadora de cable sobre las lomas y sectores de alta densidad del sur',
    duration: 12,
    price: 3100,
  },
  {
    name: 'Cable Centro Histórico',
    route: 'Línea C-H',
    origin: 'Estación Las Aguas',
    dest: 'Cerro de Guadalupe',
    subtitle: 'Enlace desde la zona universitaria y de museos hacia el Cerro de Guadalupe',
    duration: 11,
    price: 3500,
  },

  {
    name: 'Cable Expreso Norte',
    route: 'Línea B-C 72',
    origin: 'Portal Norte',
    dest: 'Hub Financiero Calle 72',
    subtitle: 'Conexión aérea directa sobre la Autopista Norte hacia el distrito financiero',
    duration: 28,
    price: 5200,
  },
  {
    name: 'Línea Transversal Occidente',
    route: 'Línea F-I 13',
    origin: 'Portal Américas',
    dest: 'Estación Zona Industrial',
    subtitle: 'Sobrevuelo directo sobre la Av. Américas conectando la cuenca suroccidental',
    duration: 22,
    price: 4200,
  },
  {
    name: 'Cable Corredor Eldorado',
    route: 'Línea K-A 26',
    origin: 'Portal El Dorado',
    dest: 'Estación Centro Internacional',
    subtitle: 'Trayecto aéreo ejecutivo sobre la Avenida Eldorado directo al centro de negocios',
    duration: 35,
    price: 6800,
  },
  {
    name: 'Cable Metropolitano Sur-Centro',
    route: 'Línea G-M 68',
    origin: 'Portal Sur',
    dest: 'Estación Parque Simón Bolívar',
    subtitle: 'Travesía transversal aérea que enlaza el extremo sur con el parque Simón Bolívar',
    duration: 40,
    price: 4800,
  },
  {
    name: 'Cable Interconector Noroccidente',
    route: 'Línea D-N 80',
    origin: 'Portal 80',
    dest: 'Estación Movistar Arena',
    subtitle: 'Conexión directa desde el límite occidental hacia la zona de eventos de Barrios Unidos',
    duration: 19,
    price: 3700,
  },];

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