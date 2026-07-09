import { BiHeart, BiTrash } from "react-icons/bi";
import Footer from "../components/Footer";
import useCartStore from "@/store/cartStore";
import { products } from "@/types/types";

import { Button } from "@/components/ui/button";
const ShopingCart = () => {


    const product = useCartStore(state => state?.products)
    console.log(product)
    const removeItem = useCartStore(state => state?.removeFromCart)
    console.log("Product", product)

    const productCart = products.filter(item => product.some(prod => prod.productId == item.id)).map(item => {
        return {
            ...item,
            totalQuantity: product.find((item) => item.quantity)?.quantity
        }
    })

    console.log(productCart)

    function handleRevoeItem(id: string) {
        removeItem(id)
    }

    function calculateTotal() {
        console.log(productCart)
        const total = productCart.reduce((acc: number, item: any) => acc + Number(item.price) * Number(item.totalQuantity), 0)
        console.log("Total", total)
        const tax = total * 0.13
        const shipping = 10
        const subTotal = total + tax + shipping
        return { total, tax, shipping, subTotal }
    }
    const { total, tax, shipping, subTotal } = calculateTotal()
    if (productCart.length == 0) {
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
                            productCart?.map((item) => (
                                <div className="w-full  flex gap-2 shadow-md p-3 font-medium text-sm" key={item.id}>
                                    <div className="h-30 w-30 overflow-hidden rounded-xl">
                                        <img src={item.img} alt="Product Image" className="w-full h-full object-cover" />
                                    </div>
                                    <div className='h-full w-full flex flex-col gap-y-10 '>
                                        <div className="w-full flex justify-between">
                                            <div className="w-full ">
                                                <p>{item.name}</p>
                                                {/* <p>Size: {item.variants.size} | Color: {item.variants.color}</p> */}
                                            </div>
                                            <div className='flex justify-end'>
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                <button className='px-3 py-1.5 hover:bg-gray-200'>-</button>
                                                <span className='text-sm font-semibold'>{product[0].quantity}</span>
                                                <button className='px-3 py-1.5 hover:bg-gray-200' >+</button>

                                            </div>
                                            <div className='flex justify-end items-center gap-x-3'>
                                                <button className='hover:text-primary flex items-center gap-x-2'>
                                                    <BiHeart /> Save for Later
                                                </button>
                                                <button className='hover:text-primary flex items-center gap-x-2' onClick={() => handleRevoeItem(item.id)}>
                                                    <BiTrash /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
    return (
        <div>
            <h1 className="text-body font-semibold mb-8 mt-2">Order Summary</h1>
            <div className="flex flex-col gap-y-3 py-3 border-b border-gray-400">
                <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p>{subTotal}</p>
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
                    <p>{total}</p>
                </div>
            </div>
            <Button variant="default" className="w-full py-2 mt-5  text-white rounded-lg"> Proceed to Checkout</Button>
        </div>
    )
}

export default ShopingCart;