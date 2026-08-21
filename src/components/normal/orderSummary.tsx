
export default function OrderSummary({ order }: any) {

    console.log("order from order", order)

    function calculateTotal() {

        const subtotal = Number(order.totalAmount)
        const tax = Math.floor(subtotal * 0.13)
        const shipping = 10
        const total = subtotal + tax + shipping
        return { total, tax, shipping, subtotal }
    }
    const { total, tax, shipping, subtotal } = calculateTotal()
    const shippingAddress = order.shippingAddress
    console.log("shippingAddress", shippingAddress)
    return (
        <div className="h-full w-full md:w-1/3 shadow-sm rounded-xl mt-5 p-4">
            <h1 className="text-title font-bold">Order Summary</h1>
            <div className="flex justify-between items-center">
                <p className="text-body ">Subtotal</p>
                <p className="text-body  text-primary">Npr. {subtotal}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-body ">Shipping</p>
                <p className="text-body  text-primary">Npr. {shipping}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-body ">Tax</p>
                <p className="text-body  text-primary">Npr. {tax}</p>
            </div>
            <hr className="mt-10" />
            <div className="flex justify-between items-center mt-4">
                <p className="text-title font-semibold">Total</p>
                <p className="text-title font-semibold text-primary">Npr. {total}</p>
            </div>
            <div className=" h-30 w-[75%] md:mx-auto mt-5 border border-primary/20 rounded-xl text-sm p-3">
                <p className="uppercase text-primary">Shipping Address</p>
                <p>State : {shippingAddress?.state}</p>
                <p>District : {shippingAddress?.district}</p>
                <p>City : {shippingAddress?.city}</p>
                <p>Street : {shippingAddress?.street}</p>
            </div>
        </div>
    )
}