export interface Country {
  id: number;
  name: string;
}

export interface Province {
  id: number;
  name: string;
  countryId?: number;
}

export interface City {
  id: number;
  name: string;
  provinceId?: number;
}
