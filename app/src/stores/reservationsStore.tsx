import { FilterReservation } from "@api/accommodations/reservations";
import { create } from "zustand";

export interface ReservationFilterState {
  filter: FilterReservation;
  updateFilterAccommodationId: (idAccommodation?: string) => void;
  resetFilter: () => void;
}

export const useAcceptedReservationFilterStore = create<ReservationFilterState>(
  (set) => ({
    filter: {
      idAccommodation: undefined,
    },

    updateFilterAccommodationId: (idAccommodation) =>
      set((state) => ({
        filter: { ...state.filter, idAccommodation },
      })),

    resetFilter: () =>
      set(() => ({
        filter: {
          idAccommodation: undefined,
        },
      })),
  })
);

export const usePendingReservationFilterStore = create<ReservationFilterState>(
  (set) => ({
    filter: {
      idAccommodation: undefined,
    },

    updateFilterAccommodationId: (idAccommodation) =>
      set((state) => ({
        filter: { ...state.filter, idAccommodation },
      })),

    resetFilter: () =>
      set(() => ({
        filter: {
          idAccommodation: undefined,
        },
      })),
  })
);

export const usePassedReservationFilterStore = create<ReservationFilterState>(
  (set) => ({
    filter: {
      idAccommodation: undefined,
    },

    updateFilterAccommodationId: (idAccommodation) =>
      set((state) => ({
        filter: { ...state.filter, idAccommodation },
      })),

    resetFilter: () =>
      set(() => ({
        filter: {
          idAccommodation: undefined,
        },
      })),
  })
);
