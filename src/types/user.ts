export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  idCountry: number;
  idProvince: number;
  idCity: number;
  idRole: number;
  role?: {
    id: number;
    name: string;
  };
  country?: {
    id: number;
    name: string;
  };
  province?: {
    id: number;
    name: string;
  };
  city?: {
    id: number;
    name: string;
  };
  // Soporte para formato Dto (viene del backend)
  countryDto?: {
    id: number;
    name: string;
  };
  provinceDto?: {
    id: number;
    name: string;
  };
  cityDto?: {
    id: number;
    name: string;
  };
}