import { BiHeart, BiTrash } from "react-icons/bi";
import Footer from "../components/Footer";
import useCartStore from "@/store/cartStore";


import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import productCart from "@/components/productCart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const ShopingCart = () => {

    const [quantity, setQuantity] = useState<number>(0);
    const [products, setProducts] = useState<any[]>([]);
    const [isWishListed, setIsWishlisted] = useState(false)
    useEffect(() => {
        fetchCartItems();
    }, []);

    async function fetchCartItems() {
        const res = await fetch("http://localhost:3000/api/cart/cart", {
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {

            // const allProducts = data.data.flatMap((cart: any) =>
            //     cart.products.map((item: any) => ({
            //         ...item.productId,
            //         quantity: item.quantity,
            //     }))
            // );
            const allProducts = data.data.products.map((item: any) => ({
                ...item.productId,
                quantity: item.quantity
            }));
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


    function calculateTotal() {

        const total = products.reduce((acc: number, item: any) => acc + Number(item.price) * Number(item.quantity), 0)
        console.log("Total", total)
        const tax = total * 0.13
        const shipping = 10
        const subTotal = total + tax + shipping
        return { total, tax, shipping, subTotal }
    }
    const { total, tax, shipping, subTotal } = calculateTotal()

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
            <section className='h-full w-full px-10 mt-5 mb-10'>
                <h1 className="text-title font-bold mb-8 mt-2">Your Shoping Cart</h1>
                <div className="flex  justify-center gap-10">

                    <div className="w-2/3  rounded-xl">
                        {
                            products?.map((item) => (


                                <div className="w-full  flex gap-2 shadow-md p-3 font-medium text-sm" key={item.id}>
                                    <div className="h-30 w-30 overflow-hidden rounded-xl">
                                        <img src={item?.thumbnails} alt="Product Image" className="w-full h-full object-cover" />
                                    </div>
                                    <div className='h-full w-full flex flex-col gap-y-8 '>
                                        <div className="w-full flex items-center justify-between">
                                            <div className="w-full ">
                                                <p>{item.name}</p>
                                                <p>Total quantity: {item.quantity}</p>
                                                <p> Price: ${item.price}</p>
                                                {/* <p>Size: {item.variants.size} | Color: {item.variants.color}</p> */}
                                            </div>
                                            <div className='flex justify-end'>
                                                <p> ${item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                <button className='px-3 py-1.5 hover:bg-gray-200' onClick={() => setQuantity(quantity - 1)} >-</button>
                                                <span className='text-sm font-semibold'>{item.quantity}</span>
                                                <button className='px-3 py-1.5 hover:bg-gray-200' onClick={() => setQuantity(quantity + 1)} >+</button>

                                            </div>
                                            <div className='flex justify-end items-center gap-x-3'>
                                                {isWishListed ? (
                                                    <button className='w-5 h-5' onClick={() => removeFromWishList(item._id)}>
                                                        <FiHeart fill='red' className='w-full h-full text-red-500' />
                                                    </button>
                                                ) : (
                                                    <button className='w-5 h-5' onClick={() => addToWishList(item._id)}>
                                                        <FiHeart className='h-full w-full' />
                                                    </button>
                                                )}
                                                <button className='hover:text-primary flex items-center gap-x-2' onClick={() => removeFromCart(item._id)}>
                                                    <BiTrash /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                    </div>
                    <div className="w-1/3  p-6 rounded-xl shadow-md">

                        <OrderSummaryTable total={total} tax={tax} shipping={shipping} subTotal={subTotal} />
                    </div>
                </div>
            </section >
            <Footer />

        </div >
    )
}


function OrderSummaryTable({
    total,
    tax,
    shipping,
    subTotal
}: {
    total: number,
    tax: number,
    shipping: number,
    subTotal: number
}) {
    console.log(total, tax, shipping, subTotal)
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-body font-semibold mb-8 mt-2">Order Summary</h1>
            <div className="flex flex-col gap-y-3 py-3 border-b border-gray-400">
                <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p>{total}</p>
                </div>
                <div className="flex items-center justify-between">

                    <h2>Shipping</h2>
                    <h2>{shipping}</h2>
                </div>
                <div className="flex items-center justify-between">

                    <h2>Tax</h2>
                    <h2>{tax}</h2>
                </div>
            </div>
            <div className="w-full border-b border-gray-400">
                <p>Discount Code</p>
                <div className="w-full flex items-center justify-between my-3">
                    <input placeholder="Enter Code"
                        className="py-1.5  px-8 rounded-xl border border-gray-300 bg-white"
                    >
                    </input>
                    <button className="py-1.5 px-3 rounded-xl bg-secondary-light text-white">Apply</button>
                </div>
            </div>
            <div className="w-full ">
                <div className="flex items-center justify-between my-3">
                    <p>Total</p>
                    <p>{subTotal}</p>
                </div>
            </div>
            <Button variant="default" className="w-full py-2 mt-5  text-white rounded-lg" onClick={() => navigate("/checkout")}> Proceed to Checkout</Button>
        </div>
    )
}

export default ShopingCart;