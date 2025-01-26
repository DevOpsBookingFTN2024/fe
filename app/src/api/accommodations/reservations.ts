import { addListFilterParams, get, post, put } from "@api/utils";
import { User } from "@api/user/user";

const baseUrlGuest = new URL(
  "reservations/guest/",
  new URL(import.meta.env.VITE_RESERVATIONS_API_URL, window.location.origin)
);

const baseUrlHost = new URL(
  "reservations/host/",
  new URL(import.meta.env.VITE_RESERVATIONS_API_URL, window.location.origin)
);

export type ReservationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED"
  | "PASSED";

export type InputReservation = {
  accommodationId?: string;
  dateFrom: Date;
  dateTo: Date;
  numberOfGuests: number;
};

export type Accommodation = {
  id: string;
  name: string;
  host: string;
  address: string;
  city: string;
  country: string;
  minimumGuests: number;
  maximumGuests: number;
  pricingStrategy: string;
  approvalStrategy: string;
};
export type Reservation = {
  id: string;
  guest: string;
  idAccommodation: string;
  dateFrom: string;
  dateTo: string;
  numberOfGuests: number;
  totalPrice: number;
  reservationStatus: ReservationStatus;
  accommodation: Accommodation;
};

export type FilterReservation = {
  idAccommodation?: string;
};

function getBaseUrl(isGuest?: boolean) {
  return isGuest ? baseUrlGuest : baseUrlHost;
}

export function createReservation(input: InputReservation) {
  return post(
    new URL("create/" + input.accommodationId, baseUrlGuest),
    JSON.stringify(input)
  );
}

export function cancelReservation(id: string) {
  return put(new URL("cancel/" + id, baseUrlGuest), JSON.stringify({}));
}

export function declineReservation(id: string) {
  return put(new URL("decline/" + id, baseUrlHost), JSON.stringify({}));
}

export function getAcceptedReservations(
  filter: FilterReservation,
  isGuest: boolean
): Promise<Reservation[]> {
  return get(
    addListFilterParams(new URL("accepted", getBaseUrl(isGuest)), filter)
  );
}

export function getPendingReservations(
  filter: FilterReservation,
  isGuest: boolean
): Promise<Reservation[]> {
  return get(
    addListFilterParams(new URL("pending", getBaseUrl(isGuest)), filter)
  );
}

export function getPassedReservations(
  filter: FilterReservation,
  isGuest: boolean
): Promise<Reservation[]> {
  return get(addListFilterParams(new URL("past", getBaseUrl(isGuest)), filter));
}
