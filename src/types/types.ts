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
        id: "8f3a9c21-7d64-4b82-a9e5-1c6f3d8b7420",
        name: "Aura Studio Headphones",
        price: "199",
        old: "199",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        relatedImages: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944"
        ]
    },
    {
        id: "c72e5a90-14bf-4d68-93ac-7f281e6b5409",
        name: "Oceanic Chronograph",
        price: "450",
        old: "530",
        discount: "15%",
        wishList: true,
        isDiscounted: true,
        quantity: 4,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        relatedImages: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
        ]
    },
    {
        id: "a91d6f42-3be8-49c7-b052-8e174d6f9321",
        name: "Nomad Backpack",
        price: "125",
        old: "210",
        discount: "40%",
        wishList: false,
        isDiscounted: true,
        quantity: 6,
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
        relatedImages: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a"
        ]
    },
    {
        id: "5d8f1a92-3c74-4e61-b8a5-92f6d7c31084",
        name: "Smart LED Desk Lamp",
        price: "45",
        old: "45",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 2,
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        relatedImages: [
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
            "https://images.unsplash.com/photo-1534105615256-13940a56ff3b",
            "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22"
        ]
    },
    {
        id: "e2b47c91-8a53-4f20-a6d9-1c735b9e8246",
        name: "Smart Fitness Band",
        price: "59",
        old: "99",
        discount: "40%",
        wishList: true,
        isDiscounted: true,
        quantity: 7,
        img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        relatedImages: [
            "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
            "https://images.unsplash.com/photo-1508685096489-7aacd5a7b3b1"
        ]
    },
    {
        id: "7a6d9f30-2e81-4c57-93b4-6f812d5a7093",
        name: "Wireless Gaming Mouse",
        price: "75",
        old: "75",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 3,
        img: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        relatedImages: [
            "https://images.unsplash.com/photo-1527814050087-3793815479db",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"
        ]
    },
    {
        id: "b9c41e72-5d63-48af-81e9-3a760c2f9458",
        name: "Mechanical Keyboard RGB",
        price: "129",
        old: "180",
        discount: "28%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        relatedImages: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
            "https://images.unsplash.com/photo-1595225476474-87563907a212"
        ]
    },
    {
        id: "4f92ab63-7e18-4d50-b6c3-8a251f9d7042",
        name: "4K Action Camera",
        price: "220",
        old: "300",
        discount: "27%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
        relatedImages: [
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        ]
    },
    {
        id: "91bc7e42-6d85-4a39-b712-5f903e8c2461",
        name: "Bluetooth Speaker Mini",
        price: "39",
        old: "39",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1585386959984-a41552231693",
        relatedImages: [
            "https://images.unsplash.com/photo-1585386959984-a41552231693",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d"
        ]
    },
    {
        id: "3e75a9c1-82f4-4b60-96d3-1a5278ce9046",
        name: "Classic Leather Wallet",
        price: "35",
        old: "55",
        discount: "36%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
        relatedImages: [
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
            "https://images.unsplash.com/photo-1627123424574-724758594e93"
        ]
    },
    {
        id: "d61a8f35-9c42-4e70-a581-7b236d4f8092",
        name: "Running Shoes Pro",
        price: "110",
        old: "150",
        discount: "27%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        relatedImages: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
        ]
    },
    {
        id: "6b92e4a7-15cd-49f8-b360-2a781d5c9340",
        name: "Compact Espresso Pro",
        price: "89",
        old: "89",
        discount: "",
        wishList: true,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1517701550925-2f9c3e2f6c7d",
        relatedImages: [
            "https://images.unsplash.com/photo-1517701550925-2f9c3e2f6c7d",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0"
        ]
    },
    {
        id: "f83c6a21-7d94-45be-9026-3c518a7e2469",
        name: "Smartphone Gimbal",
        price: "99",
        old: "140",
        discount: "29%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        relatedImages: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
        ]
    },
    {
        id: "2a64f9d8-3e71-4c50-b892-6f135a7d8042",
        name: "Portable SSD 1TB",
        price: "139",
        old: "200",
        discount: "31%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
        relatedImages: [
            "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
            "https://images.unsplash.com/photo-1625948515291-69613efd103f",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        ]
    },
    {
        id: "9c31e7a5-68f2-4d40-b791-5e826a3f0946",
        name: "Smart Watch Series X",
        price: "299",
        old: "299",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        relatedImages: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            "https://images.unsplash.com/photo-1508685096489-7aacd5a7b3b1",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d"
        ]
    },
    {
        id: "7f52c8a1-94d6-4b30-a871-2e639f5c0489",
        name: "Noise Cancelling Earbuds",
        price: "89",
        old: "130",
        discount: "32%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1585386959984-a41552231693",
        relatedImages: [
            "https://images.unsplash.com/photo-1585386959984-a41552231693",
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb"
        ]
    },
    {
        id: "1d83a6f9-52c7-4e80-b649-9f237d5a8164",
        name: "Professional Tripod Stand",
        price: "65",
        old: "65",
        discount: "",
        wishList: false,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        relatedImages: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        ]
    },
    {
        id: "a57e9c32-6b41-4d90-8f26-3c718e5a0492",
        name: "Gaming Chair Elite",
        price: "199",
        old: "280",
        discount: "29%",
        wishList: true,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
        relatedImages: [
            "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
            "https://images.unsplash.com/photo-1616627987099-1f9d8f6d5f44"
        ]
    },
    {
        id: "c48d7a91-25f6-4e30-b892-6a713f5d9048",
        name: "Smart Home Speaker",
        price: "120",
        old: "170",
        discount: "29%",
        wishList: false,
        isDiscounted: true,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1543512214-318c7553f230",
        relatedImages: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc",
            "https://images.unsplash.com/photo-1558089687-f282ffcbc126"
        ]
    },
    {
        id: "e96b3c72-81d5-4a60-9574-2f638a1c9045",
        name: "Travel Duffel Bag",
        price: "80",
        old: "80",
        discount: "",
        wishList: true,
        isDiscounted: false,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c",
        relatedImages: [
            "https://images.unsplash.com/photo-1526481280695-3c687fd5432c",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"
        ]
    }

];



export const category = [
    { title: "Electronics", icon: BiDevices },
    { title: "Fashion", icon: TbShirt },
    { title: "Home Appliance", icon: BiHome },
    { title: "Beauty", icon: BiFace },
    { title: "Sports", icon: BiDumbbell }
];