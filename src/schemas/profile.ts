// src/schemas/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  Name: z.string()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede exceder 50 caracteres"),
    
  LastName: z.string()
    .max(50, "El apellido no puede exceder 50 caracteres")
    .nullable()
    .optional(),
    
  Email: z.string()
    .email("El email no es válido")
    .min(1, "El email es obligatorio"),
    
  PhoneNumber: z.string()
    .min(1, "El teléfono es obligatorio")
    .max(20, "El teléfono no puede exceder 20 caracteres"),
    
  BillingAddress: z.string()
    .min(1, "La dirección es obligatoria")
    .max(200, "La dirección no puede exceder 200 caracteres"),
    
  BillingAddress2: z.string()
    .max(200, "La dirección secundaria no puede exceder 200 caracteres")
    .optional(),
    
  PostalCode: z.string()
    .max(20, "El código postal no puede exceder 20 caracteres")
    .nullable()
    .optional(),
    
  Role: z.object({
    id: z.number(),
    name: z.string()
  }),
  
  CityDto: z.object({
    id: z.number(),
    name: z.string()
  }).nullable().optional(),
  
  ProvinceDto: z.object({
    id: z.number(),
    name: z.string()
  }).nullable().optional(),
  
  CountryDto: z.object({
    id: z.number(),
    name: z.string()
  }).nullable().optional()
});

export type ProfileFormData = z.infer<typeof profileSchema>;