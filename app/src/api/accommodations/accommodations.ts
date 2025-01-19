import {
  addListFilterParams,
  del,
  get,
  InputFormData,
  post,
  postMultipart,
  put,
  putMultipart,
} from "../utils";

console.log(
  "accommodation url jeee, ",
  import.meta.env.VITE_ACCOMMODATIONS_API_URL
);
console.log("user url je, ", import.meta.env.VITE_USER_API_URL);
console.log(import.meta.env.VITE_ACCOMMODATIONS_API_URL);

const baseUrl = new URL(
  "accommodations/",
  new URL(import.meta.env.VITE_ACCOMMODATIONS_API_URL, window.location.origin)
);

export type Facility = {
  id: string;
  name: string;
};

export type Photo = {
  id: string;
  url: string;
};

export interface FilterAccommodation {
  country?: string;
  city?: string;
  guestCount?: number;
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
  host?: string;
  hostScore?: number;
  pricingStrategy: "PER_GUEST" | "PER_UNIT";
  approvalStrategy: "MANUAL" | "AUTOMATIC";
  facilities: Facility[];
  photos: Photo[];
};

// export type SearchAccommodation = {
//   acommodationDTO: Accommodation;
//   pricePerGuest?: number;
//   pricePerUnit?: number;
//   priceAll: number;
// };

export function getAccommodations(): Promise<Accommodation[]> {
  return get(new URL("all", baseUrl));
}

export function searchAccommodations(
  filter: FilterAccommodation
): Promise<Accommodation[]> {
  return get(addListFilterParams(new URL("search", baseUrl), filter));
}

export function getAccommodationById(id: string): Promise<Accommodation> {
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

export function updateAccommodation(input: InputFormData<InputAccommodation>) {
  return putMultipart(new URL("update/" + input.body?.id, baseUrl), input);
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
