import { z } from "zod";

// Schema base para crear/editar usuario (sin password)
const baseUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  lastName: z.string().min(1, "El apellido es requerido").trim(),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido")
    .trim(),
  phoneNumber: z.string().optional(),
  billingAddress: z.string().optional(),
  billingAddress2: z.string().optional(),
  postalCode: z.string().optional(),
  idCountry: z
    .number()
    .min(1, "Debes seleccionar un país")
    .int("El país debe ser un número entero"),
  idProvince: z
    .number()
    .min(1, "Debes seleccionar una provincia")
    .int("La provincia debe ser un número entero"),
  idCity: z
    .number()
    .min(1, "Debes seleccionar una ciudad")
    .int("La ciudad debe ser un número entero"),
  idRole: z
    .number()
    .min(1, "Debes seleccionar un rol")
    .int("El rol debe ser un número entero"),
});

// Schema base para crear/editar usuario (con password opcional)
export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .optional(),
});

// Schema para crear usuario (password requerido)
export const newUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Schema para editar usuario (password opcional, no requerido)
export const editUserSchema = createUserSchema.omit({ password: true });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type NewUserFormData = z.infer<typeof newUserSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;
