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

// Productos mock para desarrollo
function getMockProducts() {
  return [
    {
      id: 1,
      name: "Remera Urban Classic",
      description:
        "Remera básica de algodón premium con corte moderno. Ideal para el día a día.",
      price: 12990,
      stock: 45,
      categoryId: 1,
      storeId: 1,
      discountPercentage: null,
      images: [
        {
          id: 1,
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
        },
      ],
    },
    {
      id: 2,
      name: "Jogger Street Style",
      description:
        "Pantalón jogger con bolsillos laterales y elastizado en cintura. Comodidad garantizada.",
      price: 18990,
      stock: 32,
      categoryId: 2,
      storeId: 1,
      discountPercentage: 10,
      images: [
        {
          id: 2,
          imageUrl:
            "https://images.unsplash.com/photo-1594634313759-48e5e6dec363?w=300&h=400&fit=crop",
        },
      ],
    },
    {
      id: 3,
      name: "Buzo Urban Pro",
      description:
        "Buzo con capucha y bolsillo canguro. Perfecto para climas frescos.",
      price: 24990,
      stock: 18,
      categoryId: 3,
      storeId: 1,
      discountPercentage: null,
      images: [
        {
          id: 3,
          imageUrl:
            "https://images.unsplash.com/photo-1556821840-3a1f8796a2ec?w=300&h=400&fit=crop",
        },
      ],
    },
    {
      id: 4,
      name: "Gorra City Snapback",
      description:
        "Gorra ajustable con logo bordado. Protección UV y estilo urbano.",
      price: 8990,
      stock: 67,
      categoryId: 4,
      storeId: 1,
      discountPercentage: 15,
      images: [
        {
          id: 4,
          imageUrl:
            "https://images.unsplash.com/photo-1576871335435-b9c28a219098?w=300&h=400&fit=crop",
        },
      ],
    },
    {
      id: 5,
      name: "Camisa Business Casual",
      description:
        "Camisa de lino mezcla con diseño slim fit. Perfecta para oficina y salidas.",
      price: 15990,
      stock: 8,
      categoryId: 1,
      storeId: 1,
      discountPercentage: null,
      images: [
        {
          id: 5,
          imageUrl:
            "https://images.unsplash.com/photo-1596755094514-f87e340cc389?w=300&h=400&fit=crop",
        },
      ],
    },
    {
      id: 6,
      name: "Jeans Slim Fit",
      description:
        "Jean clásico con corte slim y elastizado. Comodidad y estilo en uno.",
      price: 21990,
      stock: 25,
      categoryId: 2,
      storeId: 1,
      discountPercentage: 20,
      images: [
        {
          id: 6,
          imageUrl:
            "https://images.unsplash.com/photo-1542273915886-8504af30a253?w=300&h=400&fit=crop",
        },
      ],
    },
  ];
}

export async function getProducts(): Promise<any[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (res.ok) {
      const data = await res.json();
      return data.length > 0 ? data : getMockProducts();
    }
    return getMockProducts();
  } catch {
    return getMockProducts();
  }
}

export async function getOrders(): Promise<any[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Order/GetOrders`,
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getAllOrders(): Promise<any[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Order/GetOrders`,
    );
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
