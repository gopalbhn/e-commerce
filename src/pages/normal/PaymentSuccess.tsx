const PaymentSuccess = () => {
    const products = [
        {
            id: 1,
            name: "Nike Air Max 270",
            qty: 1,
            price: 8500,
            image: "https://placehold.co/100"
        },
        {
            id: 2,
            name: "Wireless Mouse",
            qty: 2,
            price: 1200,
            image: "https://placehold.co/100"
        },
        {
            id: 3,
            name: "USB-C Cable",
            qty: 1,
            price: 450,
            image: "https://placehold.co/100"
        },
    ];

    const subtotal = 11350;
    const shipping = 100;
    const discount = 500;
    const total = subtotal + shipping - discount;


    return (
        <div className="h-[calc(100vh-5rem)] w-full bg-slate-100 p-4">

            <div className="h-full w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">


                {/* LEFT SIDE */}
                <div className="w-[60%] bg-gray-50 p-6 flex flex-col">

                    <h1 className="text-2xl font-bold mb-5 text-gray-800">
                        Order Summary
                    </h1>


                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="bg-white rounded-xl border shadow-sm p-4 flex items-center justify-between"
                            >

                                <div className="flex gap-4 items-center">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 rounded-lg object-cover border"
                                    />

                                    <div>

                                        <h2 className="font-semibold text-lg">
                                            {product.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Quantity : {product.qty}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Color : Black
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Size : M
                                        </p>

                                    </div>

                                </div>


                                <div className="font-semibold text-lg">
                                    Rs. {product.price.toLocaleString()}
                                </div>

                            </div>

                        ))}

                    </div>



                    {/* Total Section */}
                    <div className="bg-white border rounded-xl shadow-sm p-5 mt-5">

                        <div className="flex justify-between text-sm mb-2">
                            <span>Total Items</span>
                            <span>{products.length}</span>
                        </div>


                        <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>


                        <div className="flex justify-between text-sm mb-2">
                            <span>Shipping</span>
                            <span>Rs. {shipping}</span>
                        </div>


                        <div className="flex justify-between text-sm mb-3">
                            <span>Discount</span>
                            <span className="text-green-600">
                                - Rs. {discount}
                            </span>
                        </div>



                        <div className="border-t pt-3 flex justify-between text-xl font-bold">

                            <span>
                                Total
                            </span>

                            <span className="text-green-600">
                                Rs. {total.toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>





                {/* RIGHT SIDE - LIGHT THEME */}
                <div className="w-[40%] h-screen bg-white flex items-center justify-center p-6 border-l">


                    <div className="w-full max-w-[330px]">


                        {/* Logo */}
                        <div className="text-center mb-7">

                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                                e
                            </div>


                            <h2 className="text-gray-800 text-3xl font-bold mt-2">
                                eSewa
                            </h2>


                            <p className="text-gray-500 text-sm">
                                Secure Payment Gateway
                            </p>

                        </div>





                        <h3 className="text-gray-800 font-semibold mb-4">
                            Login to Continue
                        </h3>





                        <input
                            type="text"
                            placeholder="Mobile Number"
                            className="w-full h-10 bg-gray-100 border border-gray-300 rounded-lg px-3 text-gray-800 text-sm mb-3 outline-none focus:border-green-500"
                        />



                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-10 bg-gray-100 border border-gray-300 rounded-lg px-3 text-gray-800 text-sm mb-4 outline-none focus:border-green-500"
                        />





                        {/* Captcha */}
                        <div className="bg-gray-100 border rounded-lg p-3 flex items-center gap-3 mb-4">

                            <input type="checkbox" />

                            <span className="text-xs text-gray-700">
                                I'm not a robot
                            </span>

                        </div>





                        <button
                            className="w-full h-10 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm"
                        >
                            Login & Pay Rs. {total.toLocaleString()}
                        </button>





                        <button
                            className="w-full mt-3 text-gray-500 text-sm"
                        >
                            Cancel Payment
                        </button>





                        <div className="border-t border-gray-200 mt-6 pt-4 text-xs text-gray-500">


                            <div className="flex justify-between">
                                <span>
                                    SSL Secured Payment
                                </span>

                                <span>
                                    🔒
                                </span>
                            </div>



                            <div className="flex justify-between mt-2">

                                <span>
                                    Powered by
                                </span>

                                <span className="text-green-500 font-semibold">
                                    eSewa
                                </span>

                            </div>


                        </div>



                    </div>


                </div>



            </div>


        </div>
    );
};


export default PaymentSuccess;