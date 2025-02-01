import { del, get, post, put } from "@api/utils";

const baseUrlHost = new URL(
  "ratings/host/",
  new URL(import.meta.env.VITE_RESERVATIONS_API_URL, window.location.origin)
);

const baseUrlAccommodation = new URL(
  "ratings/accommodation/",
  new URL(import.meta.env.VITE_RESERVATIONS_API_URL, window.location.origin)
);

export type InputRating = {
  rating: number;
  id: string;
};

export function rateHost(input: InputRating) {
  return post(
    new URL("create/" + input.id, baseUrlHost),
    JSON.stringify(input)
  );
}

export function getHostRatingsByHost(host: string) {
  return get(new URL("all/" + host, baseUrlHost));
}

export function getHostRatingById(id: string) {
  return get(new URL(id, baseUrlHost));
}

export function updateHostRatingById(input: InputRating) {
  return put(new URL("update/" + input.id, baseUrlHost), JSON.stringify(input));
}

export function deleteHostRatingById(id: string) {
  return del(new URL("delete/" + id, baseUrlHost));
}

export function rateAccommodation(input: InputRating) {
  return post(
    new URL("create/" + input.id, baseUrlAccommodation),
    JSON.stringify(input)
  );
}

export function getAccommodationRatingsByAccommodationId(
  accommodationId: string
) {
  return get(new URL("all/" + accommodationId, baseUrlAccommodation));
}

export function getAccommodationRatingById(id: string) {
  return get(new URL(id, baseUrlAccommodation));
}

export function updateAccommodationRatingById( input: InputRating) {
  return put(
    new URL("update/" + input.id, baseUrlAccommodation),
    JSON.stringify(input)
  );
}

export function deleteAccommodationRatingById(id: string) {
  return del(new URL("delete/" + id, baseUrlAccommodation));
}
