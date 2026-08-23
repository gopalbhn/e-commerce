import { BiTrash } from "react-icons/bi";
import Footer from "../../components/normal/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";

import OrderSummaryTable from "@/components/normal/orderSummary";
interface Icoupon {
    _id?: string,
    code?: string,
    discountRate?: number
}
const ShopingCart = () => {

    const [quantity, setQuantity] = useState<number>(0);
    const [products, setProducts] = useState<any[]>([]);
    const [isWishListed, setIsWishlisted] = useState(false)
    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any[]>([])
    const [cart, setCart] = useState<any>()
    const [coupon, setCoupon] = useState<Icoupon[]>([]);
    const [code, setCode] = useState("")
    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleSelectedProduct = (id: string) => {

        if (selectedProduct.includes(id)) {
            setSelectedProduct(selectedProduct.filter((item) => item !== id))
        } else {
            setSelectedProduct([...selectedProduct, id])
        }
    }

    async function fetchCartItems() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/cart`, {
            credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
            setCart(data.data)
            const allProducts = data.data.products.map((item: any) => ({
                ...item.productId,
                quantity: item.quantity

            }));
            if (data.data.couponApplied) {
                setIsCouponApplied(true)
                setCoupon(data.data.coupon);
            }
            console.log("all products", allProducts)
            setProducts(allProducts);

        }
    }

    async function removeFromCart(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/remove/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Item Removed Successfully");
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
    }

    async function applyDiscount() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon/apply/${code}`, {
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Coupon Applied Successfully")
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function addToWishList(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/add/${id}`, {
            method: "POST",
            credentials: "include"
        })
        if (res.ok) {
            setIsWishlisted(true)
            setTimeout(() => {
                toast.success("Added Successfully")
            }, 500)
        }
    }

    async function removeFromWishList(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/remove/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        if (res.ok) {
            setIsWishlisted(false)
            setTimeout(() => {
                toast.success("Removed Successfully")
            }, 500)
        }
    }



    if (products.length == 0) {
        return (
            <div className="h-full w-full flex flex-col">
                <section className='h-full w-full px-10 mt-5 mb-10'>
                    <h1 className="text-title font-bold mb-8 mt-2">Your Shoping Cart</h1>
                    <div className="flex  justify-center gap-10">
                        <div className="w-2/3  rounded-xl">
                            <p>Your cart is empty</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="h-full w-full flex flex-col">
            <section className='h-full w-full px-4 md:px-10 mt-5 mb-10'>
                <h1 className="text-title font-bold mb-8 mt-2">Your Shoping Cart</h1>
                <div className="flex flex-col md:flex-row justify-center gap-10">

                    <div className="w-full md:w-2/3 space-y-5  rounded-xl">
                        {
                            products?.map((item) => {
                                const isSelected = selectedProduct.includes(item._id)
                                return (

                                    <div className={`w-full  flex gap-2 shadow-md p-3 font-medium text-sm ${isSelected ? "bg-primary/5 scale-95" : ""}`} key={item.id} onClick={() => handleSelectedProduct(item._id)}>
                                        <div className="h-30 w-30 overflow-hidden rounded-xl">

                                            <img src={item?.thumbnails} alt="Product Image" className="w-full h-full object-cover" />
                                        </div>
                                        <div className='h-full w-full flex flex-col gap-y-8 '>
                                            <div className="w-full flex items-center justify-between">
                                                <div className="w-full ">
                                                    <p>{item.name}</p>
                                                    <p>Total quantity: {item.quantity}</p>
                                                    <p> Price: Npr.{item.price}</p>
                                                    {/* <p>Size: {item.variants.size} | Color: {item.variants.color}</p> */}
                                                </div>
                                                <div className='flex justify-end'>
                                                    <p> Npr.{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between">
                                                <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                    <button className='px-3 py-1.5 hover:bg-gray-200' onClick={(e) => {
                                                        e.stopPropagation()
                                                        setQuantity(quantity - 1)
                                                    }} >-</button>
                                                    <span className='text-sm font-semibold'>{quantity}</span>
                                                    <button className='px-3 py-1.5 hover:bg-gray-200' onClick={(e) => {
                                                        e.stopPropagation()
                                                        setQuantity(quantity + 1)
                                                    }} >+</button>

                                                </div>
                                                <div className='flex justify-end items-center gap-x-3'>
                                                    {isWishListed ? (
                                                        <button className='w-5 h-5' onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeFromWishList(item._id)
                                                        }}>
                                                            <FiHeart fill='red' className='w-full h-full text-red-500' />
                                                        </button>
                                                    ) : (
                                                        <button className='w-5 h-5' onClick={(e) => {
                                                            e.stopPropagation()
                                                            addToWishList(item._id)
                                                        }}>
                                                            <FiHeart className='h-full w-full' />
                                                        </button>
                                                    )}
                                                    <button className='hover:text-primary flex items-center gap-x-2' onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeFromCart(item._id)
                                                    }}>
                                                        <BiTrash /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="w-full md:w-1/3  p-6 rounded-xl shadow-md">

                        <OrderSummaryTable data={cart} applyCode={applyDiscount} />
                    </div>
                </div>
            </section >
            <Footer />

        </div >
    )
}




export default ShopingCart;