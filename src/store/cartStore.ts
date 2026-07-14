
import { create } from "zustand";
import { persist } from "zustand/middleware"
interface CartState {
    products: { productId: string, quantity: number }[];
    addToCart: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
}

// const useCartStore = create<CartState>()(
//     persist(
//         (set) => ({
//             products: [],
//             addToCart: (productId: string, quantity: number) => set((state) => ({

//                 products: [...state.products, { productId, quantity }]
//             })),
//             removeFromCart: (productId: string) => set((state) => ({
//                 products: state.products.filter((item) => item.productId !== productId)
//             })),
//             clearCart: () => set({ products: [] })
//         }),

//         {
//             name: 'cart'
//         }

//     )
// )


// const useCartStore = create<CartState>()(
//     persist(
//         (set) => ({
//             products: [],
//             addToCart: (productId: string, quantity: number) => set((state) => {
//                 const existingProduct = state.products.find(item => item.productId === productId)
//                 if (existingProduct) {
//                     return {
//                         products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
//                     }
//                 }
//                 return {
//                     products: [...state.products, { productId, quantity }]
//                 }
//             }),
//             removeFromCart: (productId: string) => set((state) => {
//                 const existingProduct = state.products.find(item => item.productId === productId)
//                 if (existingProduct) {
//                     return {
//                         products: state.products.filter(item => item.productId !== productId)
//                     }
//                 }

//             }),
//             clearCart: () => set({ products: [] }),
//             increaseQuantity: (productId: string) => set((state) => ({
//                 products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
//             })),
//             decreaseQuantity: (productId: string) => set((state) => ({
//                 products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item)
//             }))

//         }),
//         {
//             name: 'cart'
//         }
//     )
// )


const useCartStore = create<CartState>()((set) => ({
    products: [],
    addToCart: (productId: string, quantity: number) => set((state) => {
        const existingProduct = state.products.find(item => item.productId === productId)
        if (existingProduct) {
            return {
                products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
            }
        }
        return {
            products: [...state.products, { productId, quantity }]
        }
    }),
    removeFromCart: (productId: string) => set((state) => {
        const existingProduct = state.products.find(item => item.productId === productId)
        if (existingProduct) {
            return {
                products: state.products.filter(item => item.productId !== productId)
            }
        }

    }),
    clearCart: () => set({ products: [] }),
    increaseQuantity: (productId: string) => set((state) => ({
        products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
    })),
    decreaseQuantity: (productId: string) => set((state) => ({
        products: state.products.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item)
    }))

}))

export default useCartStore