// src/data/products.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica Blanca",
    description: "Camiseta de algodón 100% orgánico, perfecta para el día a día.",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "camisetas",
    stock: 50,
  },
  {
    id: "2", 
    name: "Jeans Slim Fit",
    description: "Jeans de corte slim con elastano para mayor comodidad.",
    price: 5999,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    category: "pantalones",
    stock: 30,
  },
  {
    id: "3",
    name: "Buzo con Capucha Negro",
    description: "Buzo polar con capucha, ideal para climas fríos.",
    price: 4499,
    imageUrl: "https://images.unsplash.com/photo-1556821840-1a9b949cbb64?w=400&h=500&fit=crop",
    category: "buzos",
    stock: 25,
  },
  {
    id: "4",
    name: "Vestido Floral Verano",
    description: "Vestido ligero con estampado floral, perfecto para el verano.",
    price: 3999,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "vestidos",
    stock: 20,
  },
  {
    id: "5",
    name: "Camisa Cuadros Clásica",
    description: "Camisa de franela con cuadros clásicos, estilo atemporal.",
    price: 3299,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    category: "camisas",
    stock: 35,
  },
  {
    id: "6",
    name: "Short Deportivo Negro",
    description: "Short deportivo transpirable, ideal para ejercicio.",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    category: "shorts",
    stock: 40,
  },
  {
    id: "7",
    name: "Sweater Alpaca Beige",
    description: "Sweater de lana de alpaca, suave y abrigador.",
    price: 6999,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    category: "sweaters",
    stock: 15,
  },
  {
    id: "8",
    name: "Chaqueta Denim Clásica",
    description: "Chaqueta de mezclilla clásica, un must-have del guardarropa.",
    price: 7999,
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop",
    category: "chaquetas",
    stock: 18,
  },
];