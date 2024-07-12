import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type BookFormState = {
  selectedArea: string;
  selectedDate: number;
  selectedCinemaFilter: string;
  selectedCinema: string;

  setSelectedArea: (area: string) => void;
  setSelectedDate: (date: number) => void;
  setSelectedCinemaFilter: (cinema: string) => void;
  setSelectedCinema: (cinema: string) => void;
};

export const useBookForm = create<BookFormState>()(
  devtools(
    immer((set) => ({
      selectedArea: '',
      selectedDate: 0,
      selectedCinemaFilter: '',
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
      setSelectedCinemaFilter(cinema) {
        set((state) => {
          state.selectedCinemaFilter = cinema;
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
