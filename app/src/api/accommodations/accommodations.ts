import { del, get, InputFormData, post, postMultipart, put } from "../utils";

const baseUrl = new URL(
  "accommodations/",
  import.meta.env.VITE_ACCOMMODATIONS_API_URL
);

export type Facility = {
  id: string;
  name: string;
};

export interface FilterAccommodation {
  country?: string;
  city?: string;
  guestCount?: string;
  startDate?: Date;
  endDate?: Date;
}

export type InputAccommodation = {
  id?: string;
  name: string;
  address: string;
  city: string;
  country: string;
  minimumGuests: number;
  maximumGuests: number;
  pricingStrategy: "PER_GUEST" | "PER_UNIT";
  approvalStrategy: "MANUAL" | "AUTOMATIC";
  facilityIds: string[];
};

export type Accommodation = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  minimumGuests: number;
  maximumGuests: number;
  hostScore?: number;
  pricingStrategy: "PER_GUEST" | "PER_UNIT";
  approvalStrategy: "MANUAL" | "AUTOMATIC";
  facilities: Facility[];
};

export function getAccommodations(): Promise<Accommodation[]> {
  return get(new URL("all", baseUrl));
}

export function getAccommodationById(id: string): Promise<Accommodation[]> {
  return get(new URL(id, baseUrl));
}

export function getAccommodationsByHost(
  host: string
): Promise<Accommodation[]> {
  return get(new URL("all/" + host, baseUrl));
}

export function createAccommodation(input: InputFormData<InputAccommodation>) {
  return postMultipart(new URL("create", baseUrl), input);
}

// export function createAccommodation(request: InputAccommodation) {
//   return post(new URL("create", baseUrl), JSON.stringify(request));
// }

export function updateAccommodation(request: InputAccommodation) {
  return put(new URL("upate/" + request.id, baseUrl), JSON.stringify(request));
}

export function deleteAccommodation(id: string) {
  return del(new URL("delete/" + id, baseUrl));
}

export function deleteAllAccommodationsByHost() {
  return del(new URL("delete/all-host", baseUrl));
}

export function getFacilities(): Promise<Facility[]> {
  return get(new URL("facilities", baseUrl));
}
