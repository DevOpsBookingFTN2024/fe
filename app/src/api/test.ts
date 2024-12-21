import { get } from "@api/utils";

const baseUrl = new URL("test/get", import.meta.env.VITE_API_URL);

export function getTest() {
  return get(baseUrl);
}
