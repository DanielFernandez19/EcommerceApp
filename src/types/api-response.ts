// src/types/api-response.ts
export interface UserApiResponse {
  id: string;
  name: string;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  billingAddress: string;
  billingAddress2: string;
  postalCode: string | null;
  role: {
    id: number;
    name: string;
  };
  cityDto: {
    id: number;
    name: string;
  } | null;
  provinceDto: {
    id: number;
    name: string;
  } | null;
  countryDto: {
    id: number;
    name: string;
  } | null;
}