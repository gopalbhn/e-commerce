import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Icoupon {
    _id?: string,
    code?: string,
    discountRate?: number
}

function calculateTotal(products: any[], isCouponApplied: boolean, coupon: any[]) {

    const subTotal = products.reduce((acc: number, item: any) => {
        return acc + Number(item?.productId?.price) * Number(item.quantity)
    }, 0)

    const check = products.reduce((acc: number, item: any) => {
        return acc + Number(item?.productId?.price) * Number(item.quantity)
    }, 0)
    console.log("subTotal", subTotal)
    console.log("check", check)
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
export default function OrderSummaryTable({ data, applyCode }: { data: any, applyCode?: () => void }) {
    const navigate = useNavigate();
    const { total, tax, shipping, subTotal, discount, totalDiscountRate } = calculateTotal(data.products, data.couponApplied, data.coupon)
    const [isCouponApplied, setIsCouponApplied] = useState(data.couponApplied)
    const [coupon, setCoupon] = useState<Icoupon[]>(data.coupon)
    const [code, setCode] = useState("")
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