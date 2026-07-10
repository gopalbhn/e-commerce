


export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface ProductCartType {
    image: string,
    name: string,
    price: string,
    old: string,
    discount?: string
    wishList?: Boolean
    isDiscounted: Boolean
    onclick?: () => void
}

export interface AdminTopBarProps {
    text: string,
    onclick?: () => void
}

