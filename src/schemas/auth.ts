// schemas/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email no es válido")
    .trim(),
  password: z.string().min(1, "La contraseña es requerida").trim(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido").trim(),
    lastName: z.string().min(1, "El apellido es requerido").trim(),
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("El email no es válido")
      .trim(),
    emailConfirmed: z.string().min(1, "Debes confirmar tu email").trim(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    phoneNumber: z.string(),
    billingAddress: z.string(),
    billingAddress2: z.string(),
    postalCode: z.string(),
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
    idRole: z.number().int(),
  })
  .refine((data) => data.email === data.emailConfirmed, {
    message: "Los emails no coinciden",
    path: ["emailConfirmed"],
  });

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("El email no es válido")
      .trim(),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
