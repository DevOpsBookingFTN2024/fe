import { del, get, put } from "../utils";

const baseUrl = new URL("users/", import.meta.env.VITE_API_URL);

export type Role = "ROLE_ADMIN" | "ROLE_HOST" | "ROLE_GUEST";

export type User = {
  id: number;
  username: string;
  password: string;
  emailAddress?: string;
  firstName: string;
  lastName: string;
  residence: string;
  roles: Role[];
  token: string;
  refreshToken: string;
};

export type InputUser = {
  username: string;
  emailAddress?: string;
  firstName: string;
  lastName: string;
  residence: string;
};

export type PasswordUpdateRequest = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export function changePassword(request: PasswordUpdateRequest) {
  return put(new URL("change-password", baseUrl), JSON.stringify(request));
}

export function updateUser(input: InputUser) {
  return put(new URL("update", baseUrl), JSON.stringify(input));
}

export function deleteUser(id: number) {
  return del(new URL("delete", baseUrl), id);
}

export function getCurrentUser() {
  return get(new URL("me", baseUrl));
}
