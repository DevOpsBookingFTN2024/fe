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
  submitAction?: (item: InputAvailability) => Promise<AxiosResponse<any, any>>;
  openModal: (
    item: InputAvailability,
    submitAction: (item: InputAvailability) => Promise<AxiosResponse<any, any>>,
    shouldClose: boolean,
    isUpdate: boolean // ✅ New parameter for explicit control
  ) => void;
  closeModal: () => void;
}

export const useAvailabilityModalStore = create<AvailabilityModalState>(
  (set) => ({
    item: undefined,
    isOpen: false,
    shouldClose: false,
    isUpdate: false,
    submitAction: undefined,

    openModal: (item, submitAction, shouldClose, isUpdate) =>
      set(() => ({
        item,
        isOpen: true,
        submitAction,
        shouldClose,
        isUpdate, // ✅ Directly set from parameter
      })),

    closeModal: () =>
      set(() => ({
        item: undefined,
        isOpen: false,
        submitAction: undefined,
        shouldClose: false,
        isUpdate: false,
      })),
  })
);
