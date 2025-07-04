import type { AccountInterface } from "@/interfaces/Account";

interface UserState {
  user: AccountInterface | null;
  loading: {
    fetch: boolean;
    update: boolean;
    login: boolean;
    register: boolean;
    completed: boolean;
  };
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean; // ✅ importante
}

export const initialState: UserState = {
  user: null,
  loading: {
    fetch: false,
    update: false,
    login: false,
    register: false,
    completed: false,
  },
  error: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  initialized: false,
};
