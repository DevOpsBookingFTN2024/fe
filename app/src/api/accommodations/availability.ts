import { del, get, InputFormData, post, postMultipart, put } from "../utils";

const baseUrl = new URL(
  "availabilities/",
  import.meta.env.VITE_ACCOMMODATIONS_API_URL
);

export type Availability = {
  dateFrom: Date;
  dateTo: Date;
  isAvailable?: boolean;
  pricePerGuest: number;
  pricePerUnit: number;
};

export type InputAvailability = Availability & {
  accommodationId: string;
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
  return put(
    new URL("update/" + input.accommodationId, baseUrl),
    JSON.stringify(input)
  );
}
