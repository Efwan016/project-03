import { create } from "zustand";

const useUsers = create((set) => ({
    users: [],

    refresh: async () => {
        const stored = JSON.parse(localStorage.getItem("users")) || [];
        set({ users: stored });
    },

    addUser: (user) => {
    set((state) => {
      const updated = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updated));
      return { users: updated };
    });
  },

   updateUser: (id, newData) => {
    set((state) => {
      const updated = state.users.map((u) => (u.id === id ? { ...u, ...newData } : u));
      localStorage.setItem("users", JSON.stringify(updated));
      return { users: updated };
    });
  },

  deleteUser: (id) => {
    set((state) => {
      const updated = state.users.filter((u) => u.id !== id);
      localStorage.setItem("users", JSON.stringify(updated));
      return { users: updated };
    });
  },
}));

export { useUsers };