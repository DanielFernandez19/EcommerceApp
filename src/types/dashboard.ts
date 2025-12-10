// Interfaces para los datos del dashboard
export interface DashboardStats {
  users: {
    total: number;
    trend: "up" | "down" | "neutral";
  };
  products: {
    total: number;
    trend: "up" | "down" | "neutral";
  };
  stock: {
    inStock: number;
    trend: "up" | "down" | "neutral";
  };
  sales: {
    monthly: string;
    trend: "up" | "down" | "neutral";
  };
}

export interface DashboardData {
  stats: DashboardStats;
  lastUpdated: string;
}