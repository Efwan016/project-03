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

  async register({ name, email, password, role }) {
    const users = JSON.parse(localStorage.getItem("auth_users") || "[]");

    if (users.some(u => u.email === email)) {
      throw new Error("Email sudah digunakan");
    }

    const newUser = { id: Date.now(), name, email, password, role };
    users.push(newUser);
    localStorage.setItem("auth_users", JSON.stringify(users));
    return newUser;
  },

  logout() {
    localStorage.removeItem("auth_user");
    set({ user: null });
  },
}));
