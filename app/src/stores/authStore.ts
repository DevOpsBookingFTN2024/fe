import getApiToken, { isTokenValid, USER_KEY } from "@api/auth";
import { User } from "@api/user/user";
import { create } from "zustand";

export interface AuthStore {
  isValid: boolean;
  isGuest: boolean;
  user?: User;
  setUser: (newUser: User) => void;
  deleteUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => {
  // Always prioritize localStorage for persistence across tabs
  const localUser = localStorage.getItem(USER_KEY);
  const sessionUser = sessionStorage.getItem(USER_KEY);

  // If we have a user in localStorage but not in sessionStorage, copy it over
  // This ensures session data is available in new tabs
  if (localUser && !sessionUser) {
    sessionStorage.setItem(USER_KEY, localUser);
  }

  // Use localStorage as the primary source of truth for cross-tab persistence
  const user = localUser || sessionUser;

  const parsedToken = getApiToken(
    user ? (JSON.parse(user) as User).token : null
  );

  return {
    isValid: isTokenValid(parsedToken),
    isGuest: user
      ? (JSON.parse(user) as User).roles.includes("ROLE_GUEST")
      : false,
    user: user ? (JSON.parse(user) as User) : undefined,
    // permissions: getTokenPermissions(parsedToken),
    setUser: (newUser) => {
      // Always save to both localStorage and sessionStorage
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));
      const newParsedToken = getApiToken(newUser.token);

      return set(() => ({
        isValid: isTokenValid(newParsedToken),
        isGuest: newUser.roles.includes("ROLE_GUEST"),
        user: newUser,
      }));
    },
    // deleteToken: () => set(() => ({ isValid: false, permissions: [] })),
    deleteUser: () => {
      // Clear both storages when logging out
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
      return set(() => ({ isValid: false, user: undefined, isGuest: false }));
    },
  };
});

export default useAuthStore;
