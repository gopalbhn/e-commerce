


export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface ProductCartType {
    id: string
    image: string,
    name: string,
    price: string,
    old: string,
    discount?: string
    wishList?: Boolean
    isDiscounted: Boolean
    onclick?: () => void
}

export interface WishListItemType {
    id: string,
    image: string,
    name: string,
    price: string,
    old: string,
    discount?: string
    isDiscounted: Boolean,
    onclick?: () => void
    onDelete?: () => void
}

export interface AdminTopBarProps {
    text: string,
    onclick?: () => void
}

export interface User {
    role: String,
    id: string
}
export interface UserState {
    user: User | null;
    setUser: (user: User) => void
}