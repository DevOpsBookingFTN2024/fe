import { UserNotification } from "@api/user/notifications";
import { create } from "zustand";

export interface UserNotificationState {
  data: UserNotification[];
  setData: (notifications: UserNotification[]) => void;
  addData: (notifications: UserNotification | UserNotification[]) => void;
  clearData: () => void;
}

export const useUserNotificationStore = create<UserNotificationState>(
  (set) => ({
    data: [],
    setData: (notifications) => set({ data: notifications }),
    addData: (notifications) =>
      set((state) => ({
        data: Array.isArray(notifications)
          ? [...notifications, ...state.data]
          : [notifications, ...state.data],
      })),
    clearData: () => set({ data: [] }),
  })
);
