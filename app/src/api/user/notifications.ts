import { get, put } from "@api/utils";

const baseUrl = new URL(
  "notifications/",
  new URL(import.meta.env.VITE_NOTIFICATION_API_URL, window.location.origin)
);

export type ENotificationType =
  | "RESERVATION_REQUEST"
  | "RESERVATION_CANCELED"
  | "HOST_RATED"
  | "ACCOMMODATION_RATED"
  | "RESERVATION_RESPONSE";

export interface UserNotification {
  id?: number;
  recipient: string;
  message: string;
  type: ENotificationType;
  dateTime?: string;
  isRead?: boolean;
}

export type InputNotificationHost = {
  isReservationRequestEnabled: boolean;
  isReservationCanceledEnabled: boolean;
  isHostRatedEnabled: boolean;
  isAccommodationRatedEnabled: boolean;
};

export type InputNotificationGuest = {
  isReservationResponseEnabled: boolean;
};

export function getNotifications(): Promise<UserNotification[]> {
  return get(new URL("all", baseUrl));
}

export function getNotificationSettingsHost() {
  return get(new URL("host/my", baseUrl));
}

export function getNotificationSettingsGuest() {
  return get(new URL("guest/my", baseUrl));
}

export function updateNotificationSettingsHost(input: InputNotificationHost) {
  return put(new URL("host/update", baseUrl), JSON.stringify(input));
}

export function readNotifications() {
  return put(new URL("read-unread", baseUrl), JSON.stringify({}));
}

export function updateNotificationSettingsGuest(input: InputNotificationGuest) {
  return put(new URL("guest/update", baseUrl), JSON.stringify(input));
}

export const notificationTypeMapping: Record<
  string,
  { label: string; color: "error" | "warning" | "info" | "default" }
> = {
  RESERVATION_CANCELED: { label: "Reservation Cancelled", color: "error" },
  HOST_RATED: { label: "Host Rated", color: "warning" },
  ACCOMMODATION_RATED: { label: "Accommodation Rated", color: "warning" },
  RESERVATION_REQUEST: { label: "Reservation Request", color: "info" },
  RESERVATION_RESPONSE: { label: "Reservation Response", color: "info" },
};
