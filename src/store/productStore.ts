
import { create } from "zustand";

const ProductStore = create((set) => ({
    products: [],
    setProducts: (products: any) => set({ products }),
}))

export default ProductStore