import Decimal from 'decimal.js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type TItem } from '@/core/item/item.type';

type CartItem = {
  item: TItem;
  quantity: number;
};

export type PickItemState = {
  cart: Record<string, CartItem>;

  addToCart(item: TItem): void;
  removeFromCart(item: TItem): void;
  getItems(): CartItem[];
  getTotalMoney(): number;
};

export const usePickItem = create<PickItemState>()(
  devtools(
    immer((set, get) => ({
      cart: {},

      addToCart(item) {
        set((state) => {
          state.cart[item.id] = {
            item,
            quantity: state.cart[item.id]
              ? state.cart[item.id].quantity + 1
              : 1,
          };
        });
      },

      removeFromCart(item) {
        set((state) => {
          if (state.cart[item.id].quantity > 0) {
            state.cart[item.id].quantity -= 1;
          }
        });
      },

      getItems() {
        return Object.values(get().cart).filter((item) => item.quantity > 0);
      },

      getTotalMoney() {
        return get()
          .getItems()
          .reduce(
            (acc, item) =>
              acc + new Decimal(item.item.price).toNumber() * item.quantity,
            0
          );
      },
    }))
  )
);
