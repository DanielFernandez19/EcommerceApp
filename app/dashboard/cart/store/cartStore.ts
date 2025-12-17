import { create } from "zustand";
import { getCart, addItemToCart, removeCartItem } from "../services/cart.service";

const USER_ID = "11111111-1111-1111-1111-111111111111";

interface CartState {
  cart: any | null;
  loading: boolean;
  loadCart: () => Promise<void>;
  addProduct: (productId: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,

  loadCart: async () => {
    set({ loading: true });
    const cart = await getCart(USER_ID);
    set({ cart, loading: false });
  },

  addProduct: async (productId) => {
    await addItemToCart(USER_ID, productId, 1);
    const cart = await getCart(USER_ID);
    set({ cart });
  },

  removeItem: async (id) => {
    await removeCartItem(id);
    const cart = await getCart(USER_ID);
    set({ cart });
  },
}));
