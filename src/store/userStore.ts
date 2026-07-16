import type { User, UserState } from "@/types/types";
import { create } from "zustand";



const UserStore = create<UserState>((set) => ({
    user: null,
    isloading: true,
    setUser: (user: User) => set({ user }),
    setIsLoading: (loading: boolean) => set({ isloading: loading })
}))

export default UserStore;