import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  lastName: z.string().min(1, "El apellido es requerido").trim(),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido")
    .trim(),
  emailconfirmed: z.string().min(1, "Debes confirmar tu email").trim(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  phoneNumber: z.string().default(""),
  billingAddress: z.string().default(""),
  billingAddress2: z.string().default(""),
  postalCode: z.string().default(""),
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
  idRole: z.number().int().default(3),
});

export const registerSchema = baseSchema.refine(
  (data) => data.email === data.emailconfirmed,
  {
    message: "Los emails no coinciden",
    path: ["emailconfirmed"],
  },
);

export type RegisterFormData = z.infer<typeof registerSchema>;

