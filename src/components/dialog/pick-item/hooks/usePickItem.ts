import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type PickItemState = {
  cart: Record<string, number>;

  addToCart(id: string): void;
  removeFromCart(id: string): void;
};

export const usePickItem = create<PickItemState>()(
  devtools(
    immer((set) => ({
      cart: {},

      addToCart(id: string) {
        set((state) => {
          state.cart[id] = (state.cart[id] ?? 0) + 1;
        });
      },

      removeFromCart(id: string) {
        set((state) => {
          if (state.cart[id] > 0) {
            state.cart[id] -= 1;
          }
        });
      },
    }))
  )
);
