import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";


interface BuyNowProps {
    productId: string
    onclose: () => void
}

const BuyNow = ({ onclose, productId }: BuyNowProps) => {
    if (!productId) {
        return;
    }
    const [products, setProducts] = useState<any>(null)
    const [totalCartItem, setTotalCartItem] = useState(1);
    const [address, setAddress] = useState<any>([])
    const [totalItem, setTotalItem] = useState(0)
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

    const buyNow = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/payment/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: total,
                currency: "NPR",
            }),
            credentials: "include"
        })
        const data = await res.json()
        console.log("Payment Intent", data)
    }

    if (!products) {
        return <div>Loading...</div>
    }

    const calculateTotal = () => {
        const subTotal = products?.price * totalItem;
        const tax = subTotal * 0.13;
        const shipping = 300
        const total = subTotal + tax + shipping
        return {
            subTotal,
            tax,
            shipping,
            total
        }
    }

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

                                        <div className='flex flex-col gap-4 mb-6'>
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

                    </div>


                    <div className="w-1/3 space-y-5 ">

                        <div className="shadow-md rounded-xl p-5">
                            <h3 className="font-semibold mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span>SubTotal</span>
                                    <span>{subTotal}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>


                                    {tax}

                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping}</span>
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
                            {console.log("addresssadf", address)}
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