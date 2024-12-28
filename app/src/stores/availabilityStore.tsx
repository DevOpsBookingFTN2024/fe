import {
  Availability,
  InputAvailability,
} from "@api/accommodations/availability";
import { AxiosResponse } from "axios";
import { create } from "zustand";

export interface AvailabilityModalState {
  item?: InputAvailability;
  isOpen: boolean;
  shouldClose: boolean;
  submitAction?: (item: InputAvailability) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: InputAvailability,
    submitAction: (item: InputAvailability) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean
  ) => void;
  closeModal: () => void;
}

export const useAvailabilityModalStore = create<AvailabilityModalState>(
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
