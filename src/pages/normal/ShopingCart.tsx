import { BiTrash } from "react-icons/bi";
import Footer from "../../components/normal/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
    const [coupon, setCoupon] = useState<Icoupon[]>([]);
    const [code, setCode] = useState("")
    useEffect(() => {
        fetchCartItems();
    }, []);

    async function fetchCartItems() {
        const res = await fetch("http://localhost:3000/api/cart/cart", {
            credentials: "include",
        });

        const data = await res.json();
        console.log('iscoupon', data)
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
            if (data.data.couponApplied) {
                setIsCouponApplied(true)
                // setCoupon({
                //     _id: data.data.coupon._id,
                //     code: data.data.coupon.code,
                //     discountRate: data.data.coupon.discountRate
                // })
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


    function calculateTotal() {

        const subTotal = products.reduce(
            (acc: number, item: any) =>
                acc + Number(item.price) * Number(item.quantity),
            0
        );

        const tax = subTotal * 0.13;
        const shipping = 10;

        let total = subTotal + tax + shipping;

        let discount = 0;
        let totalDiscountRate = 0
        if (isCouponApplied) {
            totalDiscountRate = coupon.reduce((acc: number, coupon: any) => acc + coupon.discountRate, 0)
            discount = total * (totalDiscountRate / 100);

            total = total - discount;

        }


        return {
            total,
            tax,
            shipping,
            subTotal,
            discount,
            totalDiscountRate
        };
    }
    const { total, tax, shipping, subTotal, discount, totalDiscountRate } = calculateTotal()
    console.log("total from out", total)
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

                    <div className="w-full md:w-2/3  rounded-xl">
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
                                                <p> Price: Npr.{item.price}</p>
                                                {/* <p>Size: {item.variants.size} | Color: {item.variants.color}</p> */}
                                            </div>
                                            <div className='flex justify-end'>
                                                <p> Npr.{item.price * item.quantity}</p>
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
                    <div className="w-full md:w-1/3  p-6 rounded-xl shadow-md">

                        <OrderSummaryTable total={total} tax={tax} shipping={shipping} subTotal={subTotal} code={code} setCode={setCode} applyCode={applyDiscount} isCouponApplied={isCouponApplied} coupon={coupon} discount={discount} totalDiscountRate={totalDiscountRate} />
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
    subTotal,
    code,
    setCode,
    applyCode,
    isCouponApplied,
    coupon,
    discount,
    totalDiscountRate
}: {
    total: number,
    tax: number,
    shipping: number,
    subTotal: number,
    setCode: (value: string) => void,
    applyCode: () => void,
    code: string,
    isCouponApplied: boolean,
    discount: number,
    totalDiscountRate: number,
    coupon: Icoupon[]
}) {
    console.log(total, tax, shipping, subTotal)
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-body font-semibold mb-8 mt-2">Order Summary</h1>
            <div className="flex flex-col gap-y-3 py-3 border-b border-gray-400">
                <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p>NPR.{subTotal}</p>
                </div>
                <div className="flex items-center justify-between">

                    <h2>Shipping</h2>
                    <h2>NPR.{shipping}</h2>
                </div>
                <div className="flex items-center justify-between">

                    <h2>Tax</h2>
                    <h2>NPR.{tax}</h2>
                </div>
            </div>
            <div className="w-full border-b border-gray-400">
                <p>Discount Code</p>
                <div className="w-full flex items-center justify-between my-3 gap-x-3">
                    <input placeholder="Enter Code"
                        onChange={(e) => {
                            const value = e.target.value.trim().toUpperCase()
                            setCode(value)
                        }}
                        value={code}
                        className="py-1.5 w-full  px-8 rounded-xl border border-gray-300 bg-white"
                    >
                    </input>
                    {
                        code.length > 4 ? (
                            <button className="py-1.5 px-3 rounded-xl bg-primary text-white" onClick={applyCode}>Apply</button>
                        ) : (
                            <button disabled className="py-1.5 px-3 rounded-xl bg-secondary-light text-white">Apply</button>
                        )
                    }
                </div>
                <div>
                    {
                        isCouponApplied && (
                            <div className="w-full flex items-center justify-between my-3">
                                {coupon.map((coupon: any, index: number) => (
                                    <div key={index} className="w-full flex items-center justify-between ">
                                        <div className="bg-secondary-light text-primary px-3 rounded-lg">
                                            {coupon?.code}
                                        </div>
                                    </div>
                                ))}
                                <p className="text-primary"> Discount: {totalDiscountRate}%</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="w-full ">
                <div className="flex items-center justify-between">

                    <h2>Discount</h2>
                    <h2>NPR.{discount.toFixed(2)}</h2>
                </div>
                <div className="flex items-center justify-between my-3">
                    <p>Total</p>
                    <p>NPR.{total.toFixed(2)}</p>
                </div>
            </div>
            <Button variant="default" className="w-full py-2 mt-5  text-white rounded-lg" onClick={() => navigate("/checkout")}> Proceed to Checkout</Button>
        </div>
    )
}

export default ShopingCart;