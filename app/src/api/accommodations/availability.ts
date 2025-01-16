import { get, post, put } from "../utils";

const baseUrl = new URL(
  "availabilities/",
  new URL(import.meta.env.VITE_ACCOMMODATIONS_API_URL, window.location.origin)
);

export type Availability = {
  id?: string;
  date: Date;
  isAvailable?: boolean;
  isReserved?: boolean;
  pricePerGuest: number;
  pricePerUnit: number;
};

export type InputAvailability = {
  id?: string;
  accommodationId: string;
  dateFrom: Date;
  dateTo: Date;
  isAvailable?: boolean;
  pricePerGuest: number;
  pricePerUnit: number;
};

export function getAvailabilitiesByAccommodation(
  id: string
): Promise<Availability[]> {
  return get(new URL("all/" + id, baseUrl));
}

export function createAvailability(input: InputAvailability) {
  return post(
    new URL("create/" + input.accommodationId, baseUrl),
    JSON.stringify(input)
  );
}

export function updateAvailability(input: InputAvailability) {
  return put(new URL("update/" + input.id, baseUrl), JSON.stringify(input));
}
