import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type BookFormState = {
  selectedArea: string;
  searchCinema: string;
  selectedCinemaProviderId: string;
  selectedDate: number;
  selectedCinemaId: string;

  setArea: (area: string) => void;
  setSearchCinema: (search: string) => void;
  setCinemaProvider: (cinema_provider_id: string) => void;
  setDate: (date: number) => void;
  setCinema: (cinema_id: string) => void;
};

export const useBookForm = create<BookFormState>()(
  devtools(
    immer((set) => ({
      selectedArea: '',
      selectedDate: 0,
      selectedCinemaProviderId: '',
      selectedCinemaId: '',
      searchCinema: '',

      setArea(area) {
        set((state) => {
          state.selectedArea = area;
        });
      },
      setDate(date) {
        set((state) => {
          state.selectedDate = date;
        });
      },
      setCinemaProvider(cinema_provider_id) {
        set((state) => {
          state.selectedCinemaProviderId = cinema_provider_id;
        });
      },
      setCinema(cinema_id) {
        set((state) => {
          state.selectedCinemaId = cinema_id;
        });
      },
      setSearchCinema(search) {
        set((state) => {
          state.searchCinema = search;
        });
      },
    }))
  )
);
