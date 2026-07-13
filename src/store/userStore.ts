import type { User, UserState } from "@/types/types";
import { create } from "zustand";



const UserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user })
}))

export default UserStore;