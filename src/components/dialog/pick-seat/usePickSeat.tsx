import Decimal from 'decimal.js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  type TCinemaRoom,
  type TCinemaRoomLayout,
} from '@/core/cinema-room/cinema-room.type';

export type PickSeatState = {
  picked: number;
  seats: Record<string, boolean>;
  setSeat(seat: string, value?: boolean): void;
  reset(): void;
  getTotalMoney(performPrice: number, layout: TCinemaRoomLayout): number;
  getSeats(): string[];
  getSeatCodes(layout: TCinemaRoomLayout): string[];
};

export const usePickSeat = create<PickSeatState>()(
  devtools(
    immer((set, get) => ({
      picked: 0,
      seats: {},
      setSeat(seat, value) {
        set((state: PickSeatState) => {
          if (value === undefined) {
            value = !state.seats[seat];
          }

          if (value) {
            state.picked += 1;
            state.seats[seat] = true;
          } else {
            state.picked -= 1;
            state.seats[seat] = false;
          }
        });
      },
      reset() {
        set({ picked: 0, seats: {} });
      },
      getTotalMoney(performPrice, layout) {
        const { seats = [], groups = [] } = layout;

        const layoutSeatMap = new Map(seats.map((seat) => [seat.id, seat]));
        const layoutGroupMap = new Map(
          groups.map((group) => [group.id, group])
        );

        const { seats: pickedSeats } = get();
        return Object.keys(pickedSeats)
          .filter((seatId) => pickedSeats[seatId])
          .reduce((total, seatId) => {
            const seat = layoutSeatMap.get(seatId);
            const group = seat ? layoutGroupMap.get(seat.group_id) : undefined;
            return group
              ? total + performPrice + new Decimal(group.price).toNumber()
              : total;
          }, 0);
      },
      getSeats() {
        return Object.keys(get().seats).filter((seatId) => get().seats[seatId]);
      },
      getSeatCodes(layout) {
        const { seats = [] } = layout;
        const layoutSeatMap = new Map(seats.map((seat) => [seat.id, seat]));

        return get()
          .getSeats()
          .map((seatId) => layoutSeatMap.get(seatId)?.code ?? '');
      },
    }))
  )
);
