// Funciones API temporales para reemplazar Server Actions en static export

export interface Category {
  id: number;
  name: string;
}

// Tipos de UserActions
export type CreateUserData = {
  name: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  idCountry?: number;
  idProvince?: number;
  idCity?: number;
  idRole?: number;
};

export type UpdateUserData = {
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  billingAddress?: string;
  billingAddress2?: string;
  postalCode?: string;
  idCountry?: number;
  idProvince?: number;
  idCity?: number;
  idRole?: number;
};

export async function getProducts(): Promise<any[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getOrders(): Promise<any[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Order`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getAllOrders(): Promise<any[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Order/GetAll`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getOrdersByUser(userId: string): Promise<any[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Order/GetOrdersByUser/${userId}`,
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getUsersCount(): Promise<number> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/GetUsersCount`,
    );
    return res.ok ? await res.json() : 0;
  } catch {
    return 0;
  }
}

export async function createProduct(data: any): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function createUser(data: any): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/User/CreateUser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function getUserByEmail(email: string): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/GetAll`);
    if (!res.ok) return null;

    const users = await res.json();
    return users.find((user: any) => user.email === email);
  } catch {
    return null;
  }
}

export async function resetPassword(
  userId: string,
  newPassword: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/User/UpdatePass`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: userId, newPassword }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Products/GetCategories`,
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function updateUser(
  userId: string,
  userData: UpdateUserData,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/UpdateUser`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "DELETE",
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function uploadProductImage(
  productId: number,
  imageFile: File,
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/images`,
      {
        method: "POST",
        body: formData,
      },
    );
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function deleteProductImage(imageId: number): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/images/${imageId}`,
      {
        method: "DELETE",
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function updateOrderStatus(
  orderId: number,
  status: number,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Order/UpdateOrderStatus/${orderId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function getDashboardData() {
  try {
    // Obtener datos en paralelo
    const [usersCount, products, orders] = await Promise.all([
      getUsersCount(),
      getProducts(),
      getOrders(),
    ]);

    // Calcular total de stock
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

    // Calcular ventas del mes actual
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear &&
        order.status !== 5 // Excluir cancelados
      );
    });

    const monthlySales = monthlyOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0,
    );

    // Formatear ventas mensuales
    const formattedSales =
      monthlySales >= 1000
        ? `$${(monthlySales / 1000).toFixed(1)}K`
        : `$${monthlySales.toLocaleString("es-AR")}`;

    return {
      stats: {
        users: {
          total: usersCount,
          trend: "neutral" as const,
        },
        products: {
          total: products.length,
          trend: "neutral" as const,
        },
        stock: {
          inStock: totalStock,
          trend: "neutral" as const,
        },
        sales: {
          monthly: formattedSales,
          trend: "neutral" as const,
        },
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error obteniendo datos del dashboard:", error);

    // Datos de fallback
    return {
      stats: {
        users: { total: 0, trend: "neutral" as const },
        products: { total: 0, trend: "neutral" as const },
        stock: { inStock: 0, trend: "neutral" as const },
        sales: { monthly: "$0", trend: "neutral" as const },
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}
