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
  const localUser = localStorage.getItem(USER_KEY);
  const sessionUser = sessionStorage.getItem(USER_KEY);

  if (localUser && !sessionUser) {
    sessionStorage.setItem(USER_KEY, localUser);
  }

  const user = sessionStorage.getItem(USER_KEY);

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
      sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));
      if (localStorage.getItem(USER_KEY))
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      const newParsedToken = getApiToken(newUser.token);

      return set(() => ({
        isValid: isTokenValid(newParsedToken),
        isGuest: newUser.roles.includes("ROLE_GUEST"),
        user: newUser,
      }));
    },
    // deleteToken: () => set(() => ({ isValid: false, permissions: [] })),
    deleteUser: () => set(() => ({ isValid: false })),
  };
});

export default useAuthStore;
