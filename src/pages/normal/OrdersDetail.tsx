import { FaVanShuttle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


import Footer from "../../components/normal/Footer";
import { useEffect, useState } from "react";
import Loader from "@/components/normal/Loader";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr"

const OrderDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>({});

  const { id } = useParams();
  async function fetchMyOrder() {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/${id}`, {
        credentials: "include"
      })

      const data = await res.json();
      if (data.success) {
        const datas = data.data;
        console.log("dat", datas)
        const orderData = {
          id: datas._id,
          products: datas.items.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            price: item.price,
          })),

          status: datas.orderStatus,
          shippingAddress: datas.shippingAddress,
          totalAmount: datas.items.reduce((acc: number, item: any) => acc + item.price, 0),
        }
        console.log("orderdata", orderData)
        setOrders(orderData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyOrder();
  }, [])
  const step = 1
  if (loading) {
    return <Loader />
  }
  return (
    <div className="h-full w-full">
      <section className="mt-10 mb-15 px-10">
        <div className="text-primary text-sm mb-5"> Home / My Orders</div>
        {!orders ? (
          <div className="h-[50vh] w-full flex items-center justify-center">
            <h1 className="text-2xl text-center">No Orders Found</h1>
          </div>
        ) : (
          <div>

            <div className="flex justify-between items-center mb-5">
              <div>
                <h1 className=" text-header font-semibold"> Orders Details</h1>
                <p>Placed On: 2023-10-10</p>
              </div>
              <div>
                <button className="bg-primary text-white px-5 py-2 rounded-md">
                  Download Invoice
                </button>
              </div>
            </div>

            <div className="h-15 w-[60%] mx-auto relative flex items-center justify-between gap-2 mt-10">
              <div className=" flex flex-col items-center">
                <div className={`h-15 w-15 rounded-full  font-bold flex items-center justify-center ${step >= 1 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                  <IoMdCheckmarkCircleOutline className="text-white" size={30} />
                </div>
                <p className="text-sm text-primary">Pending</p>
              </div>
              <div className="relative h-0.5 bg-primary flex-1 -mt-6" />
              <div className="flex flex-col items-center">
                <div className={`h-15 w-15 rounded-full  font-bold flex items-center justify-center ${step > 2 ? `bg-primary text-white` : `bg-gray-200 text-gray-200`}`}>

                  <FaVanShuttle className="text-white" size={30} />
                </div>
                <p className="text-sm text-primary">Shipped</p>
              </div>
              <div className="relative h-0.5 bg-gray-400 flex-1 -mt-6" />

              <div className=" flex flex-col items-center">
                <div className={`h-15 w-15 rounded-full bg-white border border-primary text-primary font-bold flex items-center justify-center ${step > 3 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                  <GrLocation className="text-primary" size={30} />

                </div>
                <p className="text-sm text-primary">Delivered</p>
              </div>

            </div>
            <div className="w-full mt-10 flex gap-10">
              <div className="h-full w-2/3 shadow-sm rounded-xl ">
                <h1 className="text-title font-semibold">Items In Your Order</h1>

                <div>
                  {

                    orders?.products?.map((prod: any, index: number) => (
                      <div key={index} className="p-3 w-full flex gap-2">
                        <div className="h-25 w-25 rounded-xl flex items-center justify-between overflow-hidden">
                          <img
                            src={prod.product.thumbnails}
                            alt={prod.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="w-full flex justify-between items-center">
                          <div className="flex flex-col">
                            <h1 className="text-body font-semibold">{prod.name}</h1>
                            <p className="text-sm text-primary">
                              Color: {prod.color} | Qty: {prod.quantity}
                            </p>
                            <p className="text-title font-semibold text-primary">
                              Price: {prod.price}
                            </p>
                          </div>

                          <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover">
                            Track Item
                          </button>
                        </div>
                      </div>
                    ))
                  }



                </div>
              </div>
              <OrderSummary order={orders} />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default OrderDetail;


function OrderSummary({ order }: any) {

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
    <div className="h-full w-1/3 shadow-sm rounded-xl mt-5 p-4">
      <h1 className="text-title font-semibold">Order Summary</h1>
      <div className="flex justify-between items-center">
        <p className="text-body ">Subtotal</p>
        <p className="text-body  text-primary">$ {subtotal}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body ">Shipping</p>
        <p className="text-body  text-primary">$ {shipping}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body ">Tax</p>
        <p className="text-body  text-primary">$ {tax}</p>
      </div>
      <hr className="mt-10" />
      <div className="flex justify-between items-center mt-4">
        <p className="text-title font-semibold">Total</p>
        <p className="text-title font-semibold text-primary">$ {total}</p>
      </div>
      <div className=" h-30 w-[75%] mx-auto mt-5 border border-primary/20 rounded-xl text-sm p-3">
        <p className="uppercase text-primary">Shipping Address</p>
        <p>State : {shippingAddress?.state}</p>
        <p>District : {shippingAddress?.district}</p>
        <p>City : {shippingAddress?.city}</p>
        <p>Street : {shippingAddress?.street}</p>
      </div>
    </div>
  )
}