// src/types/profile.ts
export interface CityDto {
  id: number;
  name: string;
}

export interface ProvinceDto {
  id: number;
  name: string;
}

export interface CountryDto {
  id: number;
  name: string;
}

export interface RoleDto {
  id: number;
  name: string;
}

export interface UserProfile {
  id: string;
  name: string;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  billingAddress: string;
  billingAddress2: string;
  postalCode: string | null;
  role: RoleDto;
  cityDto: CityDto | null;
  provinceDto: ProvinceDto | null;
  countryDto: CountryDto | null;
}

export interface UserDto {
  ID: string; // Guid del backend
  Name: string;
  LastName: string | null;
  Email: string;
  PhoneNumber: string;
  BillingAddress: string;
  BillingAddress2: string;
  PostalCode: string | null;
  Role: RoleDto;
  CityDto: CityDto | null;
  ProvinceDto: ProvinceDto | null;
  CountryDto: CountryDto | null;
}