import { BiDevices, BiHome, BiFace, BiDumbbell } from "react-icons/bi";
import { TbShirt } from "react-icons/tb";


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
export const products = [
    {
        name: "Aura Studio Headphones",
        price: "$199",
        old: "$199",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        name: "Oceanic Chronograph",
        price: "$450",
        old: "$530",
        discount: "15%",
        wishList: true,
        isDiscounted: true,
        quantity: 4,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        name: "Nomad Backpack",
        price: "$125",
        old: "$210",
        discount: "40%",
        wishList: false,
        isDiscounted: true,
        quantity: 6,
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Smart LED Desk Lamp",
        price: "$45",
        old: "$45",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 2,
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
    },
    {
        name: "Smart Fitness Band",
        price: "$59",
        old: "$99",
        discount: "40%",
        wishList: true,
        isDiscounted: true,
        quantity: 7,
        img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
    },
    {
        name: "Wireless Gaming Mouse",
        price: "$75",
        old: "$75",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 3,
        img: "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },
    {
        name: "Mechanical Keyboard RGB",
        price: "$129",
        old: "$180",
        discount: "28%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
        name: "4K Action Camera",
        price: "$220",
        old: "$300",
        discount: "27%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd"
    },
    {
        name: "Bluetooth Speaker Mini",
        price: "$39",
        old: "$39",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1585386959984-a41552231693"
    },
    {
        name: "Classic Leather Wallet",
        price: "$35",
        old: "$55",
        discount: "36%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"
    },
    {
        name: "Running Shoes Pro",
        price: "$110",
        old: "$150",
        discount: "27%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        name: "Compact Espresso Pro",
        price: "$89",
        old: "$89",
        discount: "",
        wishList: true,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1517701550925-2f9c3e2f6c7d"
    },
    {
        name: "Smartphone Gimbal",
        price: "$99",
        old: "$140",
        discount: "29%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
    },
    {
        name: "Portable SSD 1TB",
        price: "$139",
        old: "$200",
        discount: "31%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5"
    },
    {
        name: "Smart Watch Series X",
        price: "$299",
        old: "$299",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        name: "Noise Cancelling Earbuds",
        price: "$89",
        old: "$130",
        discount: "32%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1585386959984-a41552231693"
    },
    {
        name: "Professional Tripod Stand",
        price: "$65",
        old: "$65",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
        name: "Gaming Chair Elite",
        price: "$199",
        old: "$280",
        discount: "29%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6"
    },
    {
        name: "Smart Home Speaker",
        price: "$120",
        old: "$170",
        discount: "29%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1543512214-318c7553f230"
    },
    {
        name: "Travel Duffel Bag",
        price: "$80",
        old: "$80",
        discount: "",
        wishList: true,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c"
    }
];



export const category = [
    { title: "Electronics", icon: BiDevices },
    { title: "Fashion", icon: TbShirt },
    { title: "Home Appliance", icon: BiHome },
    { title: "Beauty", icon: BiFace },
    { title: "Sports", icon: BiDumbbell }
];