export enum OrderStatus {
  Pending = 1,      // Pendiente
  Processing = 2,   // En proceso
  Shipped = 3,      // Enviado
  Delivered = 4,    // Entregado
  Cancelled = 5     // Cancelado
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: string;
  userName: string;
  status: number; // OrderStatus enum value
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
