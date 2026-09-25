import { z } from "zod";

export const routeSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  route: z.string().min(1, "La línea es obligatoria (ej. Línea A)"),
  originStation: z.string().min(1, "La estación de origen es obligatoria"),
  destinationStation: z
    .string()
    .min(1, "La estación de destino es obligatoria"),
  duration: z.number().min(1, "La duración debe ser mayor a 0 min"),
  ticketPrice: z.number().min(0, "El precio no puede ser negativo"),
  subtitle: z
    .string()
    .min(5, "Agrega una breve descripción (min 5 caracteres)"),
});

export type RouteFormData = z.infer<typeof routeSchema>;
