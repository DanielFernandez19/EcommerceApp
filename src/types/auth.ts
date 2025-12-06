// src/types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  token: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  emailconfirmed: string;
  password: string;
  phoneNumber: string;
  billingAddress: string;
  billingAddress2: string;
  postalCode: string;
  idCountry: number;
  idProvince: number;
  idCity: number;
  idRole: number;
}

export interface RegisterResponse {
  id: string;
  fullName: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}
