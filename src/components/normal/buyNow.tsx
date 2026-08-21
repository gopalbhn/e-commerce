import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface Icoupon {
    _id?: string,
    code?: string,
    discountRate?: number
}

interface BuyNowProps {
    productId: string
    onclose: () => void
    coupon?: Icoupon[]
    setCoupon?: (data: any) => void
}

const BuyNow = ({ onclose, productId, coupon, setCoupon }: BuyNowProps) => {
    if (!productId) {
        return;
    }
    const [products, setProducts] = useState<any>(null)

    const [address, setAddress] = useState<any>([])
    const [totalItem, setTotalItem] = useState(1)
    const [code, setCode] = useState("")
    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const applyCode = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon/apply/${code}`, {
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                setCoupon((prev: any) => [...prev, data.data])
            }

        } catch (error) {
            console.log(error)
        }

    }


    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/${productId}`, {
                credentials: "include"
            })
            const data = await res.json()
            console.log("Product detail", data.data)
            if (data.success) {
                setProducts(data.data)
            }
        }
        fetchProduct()
        fetchAddresses()

        if (coupon?.length > 0) {
            setIsCouponApplied(true)
        }
    }, [productId])

    const fetchAddresses = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/address`, {
            credentials: "include"
        })
        const data = await res.json()
        console.log("Addresses", data.data)
        if (data.success) {
            setAddress(data.data)
        }
    }

    const handleBuyNow = async () => {
        if (totalItem > products?.stock) {
            toast.error("Out of Stock")
            return;
        }

        if (totalItem <= 0) {
            toast.error("Quantity must be greater than 0")
            return;
        }
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/buy-now/create`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId,
                        quantity: totalItem,
                    }),
                }
            );

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            navigate("/checkout?mode=buy-now");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    if (!products) {
        return <div>Loading...</div>
    }

    const calculateTotal = () => {
        const subTotal = products?.price * totalItem;
        const tax = subTotal * 0.13;
        const shipping = 10
        const total = subTotal + tax + shipping
        return {
            subTotal,
            tax,
            shipping,
            total
        }
    }
    console.log("couponse", coupon)
    const { subTotal, tax, shipping, total } = calculateTotal()
    return (
        <div className="fixed top-0 left-0 z-100  w-full h-full  flex items-center justify-center backdrop-blur-sm bg-black/50">
            <div className="bg-white h-[80vh] w-full max-w-4xl rounded-2xl shadow-2xl overflow-y-auto">


                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold">Product Details</h2>
                        <p className="text-sm text-gray-500">
                            Product ID: {products?._id}
                        </p>
                    </div>

                    <button
                        onClick={onclose}
                        className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition"
                    >
                        <RxCross1 />
                    </button>

                </div>

                <div className="w-full flex  gap-6 p-6">


                    <div className="w-2/3">

                        <h3 className="font-semibold text-lg mb-4">
                            Order Products
                        </h3>

                        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 ">


                            <div
                                className="flex items-center justify-between mb-2 rounded-xl p-4 hover:shadow-md transition shadow-sm"
                            >

                                <div className="flex gap-4">

                                    <img
                                        src={products.thumbnails}
                                        className="w-20 h-20 rounded-lg object-cover "
                                    />

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            {products.name}
                                        </h4>

                                        <div className='flex items-center gap-4 mb-2'>
                                            <p>Quantity</p>
                                            <div className='flex items-center gap-4 rounded-xl '>
                                                <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                    <button className='px-2 py-1 hover:bg-gray-200' onClick={() => setTotalItem(prev => {
                                                        if (prev == 1) {
                                                            return 1
                                                        } else {
                                                            prev--;
                                                            return prev;
                                                        }
                                                    })}>-</button>
                                                    <span className='text-sm font-semibold'>{totalItem}</span>
                                                    <button className='px-2 py-1 hover:bg-gray-200' onClick={() => setTotalItem(prev => {
                                                        if (prev >= products?.stock) {
                                                            toast.error("Out of Stock")
                                                            return products?.stock;
                                                        } else {
                                                            prev++;
                                                            return prev;
                                                        }
                                                    })}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            Stock: {products.stock}
                                        </p>

                                        <p className="text-sm mt-2">
                                            NPR.{products.price}
                                        </p>
                                    </div>

                                </div>

                            </div>


                        </div>
                        <button onClick={handleBuyNow} className="mt-6 px-10 py-2 bg-primary hover:bg-primary/80 text-white py-2 rounded-lg transition">
                            Buy Now
                        </button>
                    </div>
                    <div className="w-1/3 space-y-5 ">

                        <div className="shadow-md rounded-xl p-5">
                            <h3 className="font-semibold mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span>SubTotal</span>
                                    <span>{subTotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    {tax.toFixed(2)}
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping}</span>
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
                                                    <p className="text-primary"> Discount: {1}%</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>

                            </div>
                        </div>

                        <div className=" rounded-xl shadow-md p-5">
                            <h3 className="font-semibold mb-3">
                                Shipping Address
                            </h3>

                            <p>State: {address?.state} </p>
                            <p>City: {address?.city}</p>
                            <p>District: {address?.district}</p>
                            <p>Street: {address?.street}</p>

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}

export default BuyNow;