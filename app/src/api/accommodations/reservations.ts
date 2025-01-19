import { post } from "@api/utils";

const baseUrl = new URL(
  "reservations/",
  new URL(import.meta.env.VITE_ACCOMMODATIONS_API_URL, window.location.origin)
);

export type InputReservation = {
  accommodationId?: string;
  dateFrom: Date;
  dateTo: Date;
  numberOfGuests: number;
};

export default function createReservation(input: InputReservation) {
  return post(
    new URL("create/" + input.accommodationId, baseUrl),
    JSON.stringify(input)
  );
}
