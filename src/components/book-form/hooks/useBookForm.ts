import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type BookFormState = {
  selectedArea: string;
  selectedDate: number;
  selectedCinema: string;

  setSelectedArea: (area: string) => void;
  setSelectedDate: (date: number) => void;
  setSelectedCinema: (cinema: string) => void;
};

export const useBookForm = create<BookFormState>()(
  devtools(
    immer((set) => ({
      selectedArea: '',
      selectedDate: 0,
      selectedCinema: '',

      setSelectedArea(area) {
        set((state) => {
          state.selectedArea = area;
        });
      },
      setSelectedDate(date) {
        set((state) => {
          state.selectedDate = date;
        });
      },
      setSelectedCinema(cinema) {
        set((state) => {
          state.selectedCinema = cinema;
        });
      },
    }))
  )
);
