import {
  InputAvailability
} from "@api/accommodations/availability";
import { AxiosResponse } from "axios";
import { create } from "zustand";
export interface AvailabilityModalState {
  item?: InputAvailability;
  isOpen: boolean;
  shouldClose: boolean;
  isUpdate: boolean; // ✅ Explicit isUpdate flag
  pricingStrategy?: "PER_GUEST" | "PER_UNIT"; // ✅ Add pricing strategy
  submitAction?: (item: InputAvailability) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: InputAvailability,
    submitAction: (item: InputAvailability) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean,
    isUpdate: boolean, // ✅ New parameter for explicit control
    pricingStrategy?: "PER_GUEST" | "PER_UNIT" // ✅ Add pricing strategy parameter
  ) => void;
  closeModal: () => void;
}

export const useAvailabilityModalStore = create<AvailabilityModalState>(
  (set) => ({
    item: undefined,
    isOpen: false,
    shouldClose: false,
    isUpdate: false,
    pricingStrategy: undefined,
    submitAction: undefined,

    openModal: (item, submitAction, shouldClose, isUpdate, pricingStrategy) =>
      set(() => ({
        item,
        isOpen: true,
        submitAction,
        shouldClose,
        isUpdate, // ✅ Directly set from parameter
        pricingStrategy, // ✅ Set pricing strategy
      })),

    closeModal: () =>
      set(() => ({
        item: undefined,
        isOpen: false,
        submitAction: undefined,
        shouldClose: false,
        isUpdate: false,
        pricingStrategy: undefined,
      })),
  })
);
