import { useEffect, useState } from "react";
import Footer from "@/components/normal/Footer";
import CreditCardImage from "@/assets/credit-card-icon.webp"
import EsewaImage from "@/assets/esewa.webp"
import KhaltiImage from "@/assets/khalti-icon.webp"
import type { ShippingAddressState } from "@/types/types";
import Loader from "@/components/normal/Loader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)
  const [address, setAddress] = useState<ShippingAddressState | null>(null)
  const [products, setProducts] = useState<any[]>([]);
  async function fetchShippingAddress() {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/address`, {
      credentials: "include"
    })
    const data = await res.json();
    console.log(data)
    if (data.success) {
      setAddress(data.data)

    } else {
      setAddress(null)
      setStep(1)
    }
    setLoading(false)
  }


  async function fetchCartItems() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/cart`, {
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {


      const allProducts = data.data.products.map((item: any) => ({
        ...item.productId,
        quantity: item.quantity
      }));
      console.log("all products", allProducts)
      setProducts(allProducts);

    }
  }


  useEffect(() => {
    fetchShippingAddress()
    fetchCartItems()
  }, [])

  if (loading) {
    return (
      <Loader />
    )
  }

  async function handlePayment() {
    const subtotal = products.reduce((acc: number, item: any) => acc + Number(item.price) * Number(item.quantity), 0)
    const tax = Math.floor(subtotal * 0.13)
    const shipping = 10
    const total = subtotal + tax + shipping
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "esewa"
        }),
      })

      const data = await res.json();
      console.log(data)
      if (data.success) {

        res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/payment/initiate`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: data.data._id,
            amount: total,
            gateway: "ESEWA"
          })
        })
        const paymentRes = await res.json();
        console.log("paymentRes", paymentRes)
        if (paymentRes.success) {
          toast.success("fetched")
          redirectURI(paymentRes.paymentUrl, paymentRes.data)
        }
        toast.success("Item Purchased successfully")
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  function redirectURI(url, obj) {
    const form = document.createElement("form")

    form.method = "POST",
      form.action = url,

      Object.entries(obj).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      })

    document.body.appendChild(form)
    form.submit();
    document.body.removeChild(form);

  }

  // async function handlePay() {

  // }
  console.log("address", address)
  return (
    <div className="w-full h-full">
      <section className="w-full h-full mt-10 mb-15 px-10">
        <div className="h-15 w-[60%] mx-auto relative flex items-center justify-between gap-2 ">
          <div className=" flex flex-col items-center">
            <div className={`h-14 w-14 rounded-full  font-bold flex items-center justify-center ${step >= 1 ? `bg-primary text-white` : `bg-white border border-primary text-primary`}`}>
              1
            </div>
            <p className="text-sm text-primary">Shiping</p>
          </div>
          <div className="relative h-0.5 bg-primary flex-1 -mt-6" />
          <div className="flex flex-col items-center">
            <div className={`h-14 w-14 rounded-full  font-bold flex items-center justify-center ${step > 2 ? `bg-primary text-white` : `bg-white border border-primary text-primary`}`}>
              2
            </div>
            <p className="text-sm text-primary">Payment</p>
          </div>
          <div className="relative h-0.5 bg-gray-400 flex-1 -mt-6" />

          <div className=" flex flex-col items-center">
            <div className={`h-14 w-14 rounded-full bg-white border border-primary text-primary font-bold flex items-center justify-center ${step > 3 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
              3
            </div>
            <p className="text-sm text-primary">Review</p>
          </div>
        </div>
        <div className="w-full mt-10 flex gap-10  ">

          <div className="w-2/3 h-full shadow-sm rounded-xl  p-4">
            {step == 1 && !address && <ShippingAddressForm nextStep={() => setStep(step + 1)} />}
            {step == 1 && address && <AddressDetail address={address} nextStep={() => setStep(step + 1)} />}
            {step == 2 && <PaymentSetup nextStep={() => setStep(step + 1)} onpay={handlePayment} />}
            {step == 3 && <Review />}
          </div>
          {step !== 3 && <OrderSummary products={products} />}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;


const ShippingAddressForm = ({ nextStep }: any) => {
  const [state, setState] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [loading, setLoading] = useState(false)
  async function addShipingAddress() {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/address`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        district,
        city,
        street
      })
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      toast.error(data.message)
    }
    setLoading(false)
  }


  return (
    <div className="h-full w-full">
      <h1 className="text-title font-semibold">Shipping Address</h1>
      <form className="w-full h-full flex flex-col gap-2 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter Your State Name eg(Koshi,Bagmati)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">District</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter Your District eg(Khotang,Morang)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fname">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Your City eg(Kathmandu,Biratnagar)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">

          <label htmlFor="fname">Street Address</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Enter Your Street Address eg(Baneshwor,Thapathali)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light placeholder:text-sm"
          />


        </div>

      </form>
      <div className="w-full flex justify-end items-center gap-4 mt-5">
        <button className="bg-primary w-40 py-3 text-white rounded-xl" onClick={() => {
          addShipingAddress();
        }}>
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  )
}

const PaymentSetup = ({ nextStep, onpay }: any) => {
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
            <form className="w-full h-full flex flex-col gap-2 mt-5" >
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
            <button className="bg-primary w-40 py-3 text-white rounded-xl" onClick={onpay}>Pay Now</button>
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


``

const AddressDetail = ({ address, nextStep }: any) => {
  return (
    <div className="w-full h-full shadow-sm rounded-xl  p-4">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-title font-semibold">Shipping Address</h1>

      </div>
      <div className="w-full h-full flex items-center gap-4">


        <div className="w-1/2 h-full p-4 bg-primary-hover/10 border border-primary rounded-xl">
          <h1 className="text-sm font-bold">Home Address</h1>
          <p className="font-semibold text-primary-50">{address.user.name}</p>
          <p className=" text-sm leading-relaxed">
            {address.street}
            <br />
            {address.city}
            <br />
            {address.district},{address.state}
          </p>
        </div>

      </div>
      <div className="h-full w-full mt-10 flex justify-end items-center">
        <Button variant="default" onClick={nextStep} > Proceed to Payment </Button>
      </div>
    </div>
  )
}

const OrderSummary = ({ products }: any) => {



  function calculateTotal() {

    const Subtotal = products.reduce((acc: number, item: any) => acc + Number(item.price) * Number(item.quantity), 0)
    console.log("Subtotal", Subtotal)
    const tax = Math.floor(Subtotal * 0.13)
    const shipping = 10
    const total = Subtotal + tax + shipping
    return { total, tax, shipping, Subtotal }
  }
  const { total, tax, shipping, Subtotal } = calculateTotal()
  return (
    <div className="w-1/3 rounded-2xl bg-white shadow-md p-6">
      <h1 className="text-title font-bold mb-6">Order Summary</h1>
      {products.map((item) => (
        <div className="flex gap-4 mb-6">
          <div className="w-15 h-15 rounded-xl overflow-hidden shrink-0">
            <img
              src={item.images[0]}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-between w-full">
            <div>
              <h2 className="font-semibold text-sm">{item.name}</h2>
              <p className="text-gray-500">{item.color}</p>
              <p className="text-sm ">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold text-sm">${item.price * item.quantity}</p>
          </div>
        </div>
      ))
      }



      <hr className="my-6 bg-primary" />

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${Subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-semibold">${shipping}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax}</span>
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Total</h2>
        <h2 className="text-lg font-bold text-orange-700">${total}</h2>
      </div>
    </div>
  )
}

const Review = () => {
  const navigate = useNavigate()
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-4 ">
      <div className="w-full h-full bg-white rounded-xl flex flex-col items-center justify-center gap-4">
        <div className="h-20 w-20 bg-primary-hover/87 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-2xl font-bold text-center">You have Successfully Purchased </p>
        <div className="flex justify-center">
          <Button variant="default" onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>

    </div>
  )
}