import { create } from "zustand";
import api from "../api";

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("auth_user")) || null,
  async login(email, password) {
    const u = await api.login?.(email, password);
    if (u) {
      localStorage.setItem("auth_user", JSON.stringify(u));
      set({ user: u });
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem("auth_user");
    set({ user: null });
  },
}));
