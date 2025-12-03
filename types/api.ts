// types/api.ts
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  body?: any;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}