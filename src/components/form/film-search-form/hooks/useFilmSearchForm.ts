import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type FilmSearchFormState = {
  tag: Record<string, boolean>;
  country: Record<string, boolean>;
  year: Record<string, boolean>;
  search: string;

  setTag: (tag: string, value: boolean) => void;
  setCountry: (country: string, value: boolean) => void;
  setYear: (year: string, value: boolean) => void;
  setSearch: (search: string) => void;

  resetTag: () => void;
  resetCountry: () => void;
  resetYear: () => void;

  getTags: () => string[];
  getCountries: () => string[];
  getYears: () => string[];
};

export const useFilmSearchForm = create<FilmSearchFormState>()(
  devtools(
    immer((set, get) => ({
      tag: {},
      country: {},
      year: {},
      search: '',

      setTag(tag, value) {
        set((state) => {
          state.tag[tag] = value;
        });
      },
      setCountry(country, value) {
        set((state) => {
          state.country[country] = value;
        });
      },
      setYear(year, value) {
        set((state) => {
          state.year[year] = value;
        });
      },
      setSearch(search) {
        set((state) => {
          state.search = search;
        });
      },

      resetTag() {
        set((state) => {
          state.tag = {};
        });
      },
      resetCountry() {
        set((state) => {
          state.country = {};
        });
      },
      resetYear() {
        set((state) => {
          state.year = {};
        });
      },

      getTags() {
        return Object.entries(get().tag)
          .filter(([, value]) => value)
          .map(([key]) => key);
      },
      getCountries() {
        return Object.entries(get().country)
          .filter(([, value]) => value)
          .map(([key]) => key);
      },
      getYears() {
        return Object.entries(get().year)
          .filter(([, value]) => value)
          .map(([key]) => key);
      },
    }))
  )
);
