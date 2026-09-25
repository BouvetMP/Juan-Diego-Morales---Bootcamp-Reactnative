// src/schemas/authSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "El usuario o correo es requerido"),
  password: z.string().min(6, "La contraseña es requerida"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "El nombre es requerido"),
    lastName: z.string().min(2, "El apellido es requerido"),
    username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    // Tarjeta OBLIGATORIA de 16 dígitos
    tuLlaveCard: z
      .string()
      .length(16, "La tarjeta TuLlave debe tener exactamente 16 dígitos"),
    // Contraseña FUERTE
    password: z
      .string()
      .min(12, "Mínimo 12 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
