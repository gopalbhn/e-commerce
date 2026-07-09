import { create } from "zustand";

interface WishListStore {
    products: number[];
    addToWishlist: (productId: number) => void;
    removeFromWishlist: (productId: number) => void;
    clearWishlist: () => void;
}

const useWishListStore = create<WishListStore>((set) => ({
    products: [],
    addToWishlist: (productId: number) => set((state) => ({
        products: [...state.products, productId]
    })),
    removeFromWishlist: (productId: number) => set((state) => ({
        products: state.products.filter((id) => id !== productId)
    })),
    clearWishlist: () => set({ products: [] })
}))

export default useWishListStore