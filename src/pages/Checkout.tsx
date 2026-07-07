import { useState } from "react";
import Footer from "../components/Footer";
import CreditCardImage from "../assets/credit-card-icon.webp"
import EsewaImage from "../assets/esewa.webp"
import KhaltiImage from "../assets/khalti-icon.webp"
const Checkout = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className="w-full h-full">
      <section className="w-full h- mt-10 mb-15 px-10">
        <div className="h-15 w-[60%] mx-auto relative flex items-center justify-between gap-2 ">
          <div className=" flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              1
            </div>
            <p className="text-sm text-primary">Shiping</p>
          </div>
          <div className="relative h-0.5 bg-primary flex-1 -mt-6" />
          <div className="flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              2
            </div>
            <p className="text-sm text-primary">Payment</p>
          </div>
          <div className="relative h-0.5 bg-gray-400 flex-1 -mt-6" />

          <div className=" flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-white border border-primary text-primary font-bold flex items-center justify-center">
              3
            </div>
            <p className="text-sm text-primary">Review</p>
          </div>
        </div>
        <div className="w-full mt-10 flex gap-10  ">
          {/* <div className="w-2/3 h-full shadow-sm rounded-xl  p-4">
            <div className="w-full flex justify-between items-center mb-5">
              <h1 className="text-title font-semibold">Shipping Address</h1>
              <button className="text-sm text-primary font-medium hover:underline">
                Add Address
              </buttosm
            </div>
            <div className="w-full h-full flex items-center gap-4">


            <div className="w-full h-full p-4 bg-primary-hover/10 border border-primary rounded-xl">
              <h1 className="text-sm font-bold">Home Address</h1>
              <p className="font-semibold text-primary-50">Alex Thompson</p>
              <p className="text-on-surface-variant text-body-sm leading-relaxed">
                1284 Tech Boulevard, Suite 402
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>
             <div className="w-full h-full p-4 border border-primary/30 rounded-xl">
              <h1 className="text-sm font-bold">Office Address</h1>
              <p className="font-semibold text-primary-50">Alex Thompson</p>
              <p className="text-on-surface-variant text-body-sm leading-relaxed">
                1284 Tech Boulevard, Suite 402
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>
            </div>
            <div className="h-full w-full mt-10">
                <h1 className="text-title font-semibold">Payment Method</h1>
            </div>
          </div> */}
          <div className="w-2/3 h-full shadow-sm rounded-xl  p-4">
            {step == 1 && <ShippingAddressForm nextStep={() => setStep(step + 1)} />}
            {step == 2 && <PaymentSetup />}

          </div>
          <div className="w-1/3 rounded-2xl bg-white shadow-md p-6">
            <h1 className="text-title font-bold mb-6">Order Summary</h1>

            <div className="flex gap-4 mb-6">
              <div className="w-15 h-15 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h2 className="font-semibold text-sm">Smart LED Desk Lamp</h2>
                  <p className="text-gray-500">Warm White</p>
                  <p className="text-sm ">Qty: 1</p>
                </div>

                <p className="font-semibold text-sm">$50.00</p>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-15 h-15 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                  alt="Headphones"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h2 className="font-semibold text-sm">Wireless Headphones</h2>
                  <p className="text-gray-500">Midnight Black</p>
                  <p className="text-sm ">Qty: 1</p>
                </div>

                <p className="font-semibold text-sm">$120.00</p>
              </div>
            </div>

            <hr className="my-6 bg-primary" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>$170.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>$13.60</span>
              </div>
            </div>

            <hr className="my-6" />

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Total</h2>
              <h2 className="text-lg font-bold text-orange-700">$183.60</h2>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;


const ShippingAddressForm = ({ nextStep }: any) => {
  return (
    <div className="h-full w-full">
      <h1 className="text-title font-semibold">Shipping Address</h1>
      <form className="w-full h-full flex flex-col gap-2 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">Phone Number</label>
          <input
            type="text"
            placeholder="Enter Your Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">Street Address</label>
          <input
            type="text"
            placeholder="Your Local Address"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="fname">City</label>
            <input
              type="text"
              placeholder="Enter Your City"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
            />
          </div>
          <div>
            <label htmlFor="fname">State</label>
            <input
              type="text"
              placeholder="Enter Your State"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
            />
          </div>
        </div>

      </form>
      <div className="w-full flex justify-end items-center gap-4 mt-5">
        <button className="bg-primary w-40 py-3 text-white rounded-xl">
          Return Back
        </button>
        <button className="bg-primary w-40 py-3 text-white rounded-xl" onClick={nextStep}>
          Proceed To Pay
        </button>
      </div>
    </div>
  )
}

const PaymentSetup = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  return (
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
  )
}