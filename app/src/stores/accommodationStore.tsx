import {
  Accommodation,
  FilterAccommodation,
  InputAccommodation,
} from "@api/accommodations/accommodations";
import { InputFormData } from "@api/utils";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface AccommodationFilterState {
  filter: FilterAccommodation;
  updateFilterCountry: (country?: string) => void;
  updateFilterCity: (city?: string) => void;
  updateFilterGuestCount: (guestCount?: number) => void;
  updateFilterStartDate: (startDate?: Date) => void;
  updateFilterEndDate: (endDate?: Date) => void;
  resetFilter: () => void;
}

export const useAccommodationFilterStore = create<AccommodationFilterState>(
  (set) => ({
    filter: {
      country: undefined,
      city: undefined,
      guestCount: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    updateFilterCountry: (country) =>
      set((state) => ({
        filter: { ...state.filter, country },
      })),
    updateFilterCity: (city) =>
      set((state) => ({
        filter: { ...state.filter, city },
      })),
    updateFilterGuestCount: (guestCount) =>
      set((state) => ({
        filter: { ...state.filter, guestCount },
      })),
    updateFilterStartDate: (startDate) =>
      set((state) => ({
        filter: { ...state.filter, startDate },
      })),
    updateFilterEndDate: (endDate) =>
      set((state) => ({
        filter: { ...state.filter, endDate },
      })),
    resetFilter: () =>
      set(() => ({
        filter: {
          country: undefined,
          city: undefined,
          guestCount: undefined,
          startDate: undefined,
          endDate: undefined,
        },
      })),
  })
);

export interface AccommodationModalState {
  item?: Accommodation;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (
    item: InputFormData<InputAccommodation>
  ) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: Accommodation,
    submitAction: (
      item: InputFormData<InputAccommodation>
    ) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useAccommodationModalStore = create<AccommodationModalState>(
  (set) => ({
    item: undefined,
    isOpen: false,
    shouldClose: false,
    submitAction: undefined,
    openModal: (item, submitAction, shouldClose) =>
      set(() => ({ item, isOpen: true, submitAction, shouldClose })),
    closeModal: () =>
      set(() => ({
        item: undefined,
        isOpen: false,
        submitAction: undefined,
        shouldClose: false,
      })),
  })
);
