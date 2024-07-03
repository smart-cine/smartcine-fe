import { create } from 'zustand';

export type ListDateState = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

export const useListDate = create<ListDateState>((set) => ({
  selectedIndex: 0,
  setSelectedIndex(index) {
    set({ selectedIndex: index });
  },
}));
