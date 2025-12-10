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
}