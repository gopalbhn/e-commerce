import { Button } from "../ui/button";


interface Icoupon {
    _id?: string,
    code?: string,
    discountRate?: number
}



function calculateTotal(data: any, coupon: any[]) {
    console.log("calc", data)

    const products = data?.products ?? data?.items ?? [];
    console.log("products", products)
    const subTotal = products.reduce((acc: number, item: any) => {
        const product = item?.productId ?? item?.product;
        const price = Number(product?.price ?? 0);
        const quantity = Number(item?.quantity ?? 0);

        return acc + price * quantity;
    }, 0);

    const check = products?.reduce((acc: number, item: any) => {
        const product = item?.productId ?? item?.product;
        const price = Number(product?.price ?? 0);
        const quantity = Number(item?.quantity ?? 0);

        return acc + price * quantity;
    }, 0);
    console.log("subTotal", subTotal)
    console.log("check", check)
    const tax = subTotal * 0.13;
    const shipping = 10;

    let total = subTotal + tax + shipping;

    let discount = 0;
    let totalDiscountRate = 0
    if (coupon?.length > 0) {
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

interface props {
    data: any,
    applyCode?: () => void,
    handleCheckout?: () => void,
    mode?: string,
    code?: string,
    setCode?: (code: string) => void
}


export default function OrderSummaryTable({ data, applyCode, handleCheckout, mode, code, setCode }: props) {
    console.log('product data', data)
    const { total, tax, shipping, subTotal, discount, totalDiscountRate } = calculateTotal(data, data?.coupon)
    const coupon: Icoupon[] = data?.coupon
    console.log("coupon", coupon)
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
                    <h2>NPR.{shipping.toFixed(2)}</h2>
                </div>
                <div className="flex items-center justify-between">

                    <h2>Tax</h2>
                    <h2>NPR.{tax.toFixed(2)}</h2>
                </div>
            </div>

            {
                mode == "checkout" && (
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
                                coupon?.length > 0 && (
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
                )

            }

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
            {
                mode !== "checkout" && (
                    <Button variant="default" className="w-full py-2 mt-5  text-white rounded-lg" onClick={() => handleCheckout()}> Proceed to Checkout</Button>
                )
            }
        </div>
    )
}