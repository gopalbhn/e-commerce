import { FaVanShuttle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Footer from "../../components/normal/Footer";
import { useEffect, useState } from "react";
import Loader from "@/components/normal/Loader";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr"
import OrderSummary from "@/components/normal/orderSummary";

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
      <section className="mt-10 mb-15 px-4 md:px-10">
        <div className="text-primary text-sm mb-5"> Home / My Orders</div>
        {!orders ? (
          <div className="h-[50vh] w-full flex items-center justify-center">
            <h1 className="text-2xl text-center">No Orders Found</h1>
          </div>
        ) : (
          <div>

            <div className="flex justify-between items-center mb-5">
              <div>
                <h1 className="md:text-header text-title font-semibold"> Orders Details</h1>
                <p className="text-body">Placed On: 2023-10-10</p>
              </div>
              <div>
                <button className="bg-primary text-white md:px-5 py-2 rounded-md px-2">
                  Download Invoice
                </button>
              </div>
            </div>

            <div className="h-15 md:w-[60%] w-full mx-auto relative flex items-center justify-between gap-2 mt-10">
              <div className=" flex flex-col items-center">
                <div className={`md:h-15 h-10 md:w-15 w-10 rounded-full  font-bold flex items-center justify-center ${step >= 1 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                  <IoMdCheckmarkCircleOutline className="text-white" size={30} />
                </div>
                <p className="text-sm text-primary">Pending</p>
              </div>
              <div className="relative h-0.5 bg-primary flex-1 -mt-6" />
              <div className="flex flex-col items-center">
                <div className={`md:h-15 h-10 md:w-15 w-10 rounded-full  font-bold flex items-center justify-center ${step > 2 ? `bg-primary text-white` : `bg-gray-200 text-gray-200`}`}>

                  <FaVanShuttle className="text-white" size={30} />
                </div>
                <p className="text-sm text-primary">Shipped</p>
              </div>
              <div className="relative h-0.5 bg-gray-400 flex-1 -mt-6" />

              <div className=" flex flex-col items-center">
                <div className={`md:h-15 h-10 md:w-15 w-10 rounded-full bg-white border border-primary text-primary font-bold flex items-center justify-center ${step > 3 ? `bg-primary text-white` : `bg-gray-400 text-gray-200`}`}>
                  <GrLocation className="text-primary" size={30} />

                </div>
                <p className="text-sm text-primary">Delivered</p>
              </div>

            </div>
            <div className="w-full mt-10 flex flex-col md:flex-row gap-10">
              <div className="h-full w-full md:w-2/3 shadow-sm rounded-xl ">
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


