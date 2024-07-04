import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type PickSeatState = {
  picked: number;
  seats: Record<string, boolean>;
  setSeat: (seat: string, value?: boolean) => void;
  reset(): void;
};

export const usePickSeat = create<PickSeatState>()(
  devtools(
    immer((set) => ({
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
    }))
  )
);
