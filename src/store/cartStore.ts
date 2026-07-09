
import { create } from "zustand";
import { persist } from "zustand/middleware"
interface CartState {
    products: { productId: string, quantity: number }[];
    addToCart: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            products: [],
            addToCart: (productId: string, quantity: number) => set((state) => ({

                products: [...state.products, { productId, quantity }]
            })),
            removeFromCart: (productId: string) => set((state) => ({
                products: state.products.filter((item) => item.productId !== productId)
            })),
            clearCart: () => set({ products: [] })
        }),

        {
            name: 'cart'
        }

    )
)



export default useCartStore