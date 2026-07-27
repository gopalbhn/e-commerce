import { RxCross1 } from "react-icons/rx";

interface orderDetailProps {
    onclose: () => void
    orders: any | []
}

const OrderDetailComponent = ({ onclose, orders }: orderDetailProps) => {
    console.log("order detail data", orders)
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">


                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <p className="text-sm text-gray-500">
                            Order ID: {orders?._id}
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
                            Ordered Products
                        </h3>

                        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 ">

                            {orders?.items?.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between mb-2 rounded-xl p-4 hover:shadow-md transition shadow-sm"
                                >

                                    <div className="flex gap-4">

                                        <img
                                            src={item.product.thumbnails}
                                            className="w-20 h-20 rounded-lg object-cover "
                                        />

                                        <div>
                                            <h4 className="font-semibold text-lg">
                                                {item.product.name}
                                            </h4>

                                            <p className="text-gray-500 text-sm">
                                                Colour: {item.product.color}
                                            </p>

                                            <p className="text-gray-500 text-sm">
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="text-sm mt-2">
                                                NPR.{item.product.price}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>


                    <div className="w-1/3 space-y-5">

                        <div className="shadow-md rounded-xl p-5">
                            <h3 className="font-semibold mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between">
                                    <span>Products</span>
                                    <span>{orders?.items?.length}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Status</span>


                                    {orders?.orderStatus}

                                </div>

                                <div className="flex justify-between">
                                    <span>Payment</span>
                                    <span>{orders?.paymentMethod}</span>
                                </div>

                                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>NPR.{orders?.totalPrice}</span>
                                </div>

                            </div>
                        </div>

                        <div className=" rounded-xl shadow-md p-5">
                            <h3 className="font-semibold mb-3">
                                Shipping Address
                            </h3>

                            <p>State: {orders?.shippingAddress?.state} </p>
                            <p>City: {orders?.shippingAddress?.city}</p>
                            <p>District: {orders.shippingAddress?.district}</p>
                            <p>Street: {orders?.shippingAddress?.street}</p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default OrderDetailComponent;