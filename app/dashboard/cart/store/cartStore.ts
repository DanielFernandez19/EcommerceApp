import { create } from "zustand";
import { getCart, addItemToCart, removeCartItem, updateCartItemQuantity } from "../services/cart.service";

interface CartState {
  cart: any | null;
  loading: boolean;
  loadCart: (userId: string) => Promise<void>;
  addProduct: (userId: string, productId: number) => Promise<void>;
  removeItem: (userId: string, id: number) => Promise<void>;
  updateQuantity: (userId: string, id: number, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,

  loadCart: async (userId: string) => {
    set({ loading: true });
    const cart = await getCart(userId);
    set({ cart, loading: false });
  },

  addProduct: async (userId: string, productId: number) => {
    await addItemToCart(userId, productId, 1);
    const cart = await getCart(userId);
    set({ cart });
  },

  removeItem: async (userId: string, id: number) => {
    await removeCartItem(id);
    const cart = await getCart(userId);
    set({ cart });
  },

  updateQuantity: async (userId: string, id: number, quantity: number) => {
    if (quantity < 1) return; // No permitir cantidades menores a 1
    await updateCartItemQuantity(id, quantity);
    const cart = await getCart(userId);
    set({ cart });
  },
}));
