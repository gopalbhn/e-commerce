
import { useState } from "react";
import heroImage from "../../assets/hero.png";
import CreditCardImage from "../../assets/credit-card-icon.webp"
import EsewaImage from "../../assets/esewa.webp"
import KhaltiImage from "../../assets/khalti-icon.webp"


const SellerRegistration = () => {
    const [step, setStep] = useState<number>(1)
    const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
    return (
        <div className="h-screen w-full grid grid-cols-2">
            <section className="w-full h-full px-10 mt-5 flex flex-col items-center">
                <div className="h-15 w-[60%] mx-auto relative flex items-center justify-between gap-2 mt-10">
                    <div className=" flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full  font-bold flex items-center justify-center ${step >= 1 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                            1
                        </div>
                        <p className="text-sm text-primary">Shiping</p>
                    </div>
                    <div className="relative h-0.5 bg-primary flex-1 -mt-6" />
                    <div className="flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full  font-bold flex items-center justify-center ${step > 2 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                            2
                        </div>
                        <p className="text-sm text-primary">Payment</p>
                    </div>
                    <div className="relative h-0.5 bg-gray-400 flex-1 -mt-6" />

                    <div className=" flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full bg-white border border-primary text-primary font-bold flex items-center justify-center ${step > 3 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                            3
                        </div>
                        <p className="text-sm text-primary">Review</p>
                    </div>

                </div>
                <div className="h-full w-full ">
                    <div className="mt-5">
                        <p className="text-2xl font-bold">Create Seller Account</p>
                        <p className="text-sm text-gray-500">Enter your details to create an account</p>
                    </div>
                    <div className="h-full w-full">
                        <form className="h-full w-full">
                            {step == 1 && (
                                <div className="w-full h-full space-y-3">

                                    <div className="w-full grid grid-cols-2 gap-3 items-center">
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium">First Name</label>
                                            <input className="border rounded-xl px-5 py-2" type="text" />

                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <input className="border rounded-xl px-5 py-2" type="text" />

                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <input className="border rounded-xl px-5 py-2" type="email" name="email" id="email" />

                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="phone">Phone</label>
                                        <input className="border rounded-xl px-5 py-2" type="text" name="phone" id="phone" />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="address">Address</label>
                                        <input className="border rounded-xl px-5 py-2" type="text" name="address" id="address" />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="password">Password</label>
                                        <input className="border rounded-xl px-5 py-2" type="password" name="password" id="password" />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input className="border rounded-xl px-5 py-2" type="password" name="confirmPassword" id="confirmPassword" />
                                    </div>
                                    <div className="w-full">
                                        <button className="w-full bg-primary text-white py-2 rounded-xl" onClick={() => setStep(2)}>Next</button>
                                    </div>
                                </div>

                            )}
                            {step == 2 && (
                                <div className="h-full w-full">
                                    <h1>Choose Your Payment Method</h1>
                                    <div className="w-full flex gap-4 my-6 ">
                                        <div onClick={() => setPaymentMethod("credit-card")} className={`p-1 rounded-xl flex justify-center items-center gap-2 ${paymentMethod === "credit-card" ? `border border-primary shadow-sm` : ``}`} >
                                            <div className={`h-10 w-10 rounded-xl overflow-hidden `}>
                                                <img src={CreditCardImage} alt="Credit Card Icon" className="h-full w-full object-cover" />
                                            </div>
                                            <p className="text-sm font-semibold">Credit Card</p>
                                        </div>
                                        <div onClick={() => setPaymentMethod("esewa")} className={`p-1  rounded-xl flex justify-center items-center gap-2 ${paymentMethod === "esewa" ? `border border-primary shadow-sm` : ``}`} >
                                            <div className={`h-10 w-15 rounded-xl overflow-hidden `}>
                                                <img src={EsewaImage} alt="Credit Card Icon" className="h-full w-full object-cover" />
                                            </div>
                                            <p className="text-sm font-semibold">E-sewa</p>
                                        </div>
                                        <div onClick={() => setPaymentMethod("khalti")} className={`p-1 rounded-xl flex justify-center items-center gap-2 ${paymentMethod === "khalti" ? `border border-primary shadow-sm` : ``}`} >
                                            <div className={`h-10 w-10 rounded-xl overflow-hidden `}>
                                                <img src={KhaltiImage} alt="Credit Card Icon" className="h-full w-full object-cover" />
                                            </div>
                                            <p className="text-sm font-semibold">Khalti</p>
                                        </div>
                                    </div >
                                    <div>
                                        {paymentMethod == "credit-card" && (
                                            <div>
                                                <h1>Credit Card Payment</h1>
                                                <form className="w-full h-full flex flex-col gap-2 mt-5">
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="card-num">Card Number</label>
                                                        <input
                                                            type="text"
                                                            id="card-num"
                                                            placeholder="Enter Your Card Number"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label htmlFor="card-name">Card Holder Name</label>
                                                        <input
                                                            type="text"
                                                            id="card-name"
                                                            placeholder="Enter Your Card Holder Name"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label htmlFor="exp-date">Expiry Date</label>
                                                            <input
                                                                type="date"
                                                                id="exp-date"
                                                                placeholder="MM/YY"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="cvv">CVV</label>
                                                            <input
                                                                type="text"
                                                                id="cvv"
                                                                placeholder="CVV"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button className="bg-primary w-40 py-3 text-white rounded-xl">Pay Now</button>

                                                </form>
                                            </div>
                                        )}
                                        {paymentMethod == "esewa" && (
                                            <div className="flex flex-col gap-3">
                                                <h1>Esewa Payment</h1>
                                                <p>You Will be Redirected to Esewa Payment Page </p>
                                                <button className="bg-primary w-40 py-3 text-white rounded-xl">Pay Now</button>
                                            </div>
                                        )}
                                        {paymentMethod == "khalti" && (
                                            <div className="flex flex-col gap-3">
                                                <h1>Khalti Payment</h1>
                                                <p>You Will be Redirected to Khalti payment Page </p>
                                                <button className="bg-primary w-40 py-3 text-white rounded-xl">Pay Now</button>
                                            </div>
                                        )}
                                    </div>
                                </div >
                            )}
                            {step == 3 && (
                                <div className="w-full h-full space-y-3">
                                    <div className="w-full flex flex-col">
                                        <label htmlFor="review">Review</label>
                                        <input className="border rounded-xl px-5 py-2" type="text" name="review" id="review" />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
            <div className="h-full w-full overflow-hidden">
                <img src={heroImage} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default SellerRegistration