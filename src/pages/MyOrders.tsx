import { FaVanShuttle } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { VscLocation } from "react-icons/vsc";

import Footer from "../components/Footer";
import { products } from "@/lib/data";

const MyOrders = () => {
  return (
    <div className="h-full w-full">
      <section className="mt-10 mb-15 px-10">
        <div className="text-primary text-sm mb-5"> Home / My Orders</div>
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
        {/* <div className=" w-full border border-gray-300 rounded-md p-5">
          <div className="flex items-center">


          <div className=" relative flex-1 flex flex-col items-center  mb-3">
            <div className="absolute top-7 left-1.2 w-full h-1 bg-primary -z-10" />
            <div className="h-15 w-15 rounded-full bg-primary flex items-center justify-center">
              <TiTick className="text-white" size={24} />
            
            </div>
            <p className="text-sm font-medium mb-1">Order Confirmed</p>
            <p className="text-gray-500 text-sm">
              Expected Delivery: 2023-10-20
            </p>
          </div>
          <div className=" relative flex-1 flex flex-col items-center mb-3">
            <div className="absolute top-7 left-1.2 w-full h-1 bg-primary -z-10" />
            <div className="h-15 w-15 rounded-full bg-primary flex items-center justify-center">
              <TiTick className="text-white" size={24} />
            </div>
            <p className="text-sm font-medium ">Processing</p>
            <p className="text-gray-500 text-sm">Completed: 2023-10-20</p>
          </div>
            <div className="relative flex-1 flex flex-col items-center mb-3">
            <div className="absolute top-7 left-1.2 w-full h-1 bg-primary -z-10" />
            <div className="h-15 w-15 rounded-full bg-primary flex items-center justify-center">
              <FaVanShuttle className="text-white" size={24} />
            </div>
            <p className="text-sm font-medium ">Shipped</p>
            <p className="text-gray-500 text-sm">Completed: 2023-10-20</p>
          </div>
               <div className="relative flex-1 flex flex-col items-center mb-3">
            <div className="absolute top-7 left-1.2 w-full h-1 bg-primary -z-10" />
            <div className="h-15 w-15 rounded-full border border-primary bg-white flex items-center justify-center">
              <VscLocation  className="text-primary" size={24} />
            </div>
            <p className="text-sm font-medium ">Out for Delivery</p>
            <p className="text-gray-500 text-sm">Today </p>
          </div>
                 <div className="relative flex-1 flex flex-col items-center mb-3">
            <div className="absolute top-7 left-1.2 w-full h-1 bg-primary -z-10" />
            <div className="h-15 w-15 rounded-full bg-gray-200 border border-primary flex items-center justify-center">
              <IoMdCheckmarkCircleOutline   className="text-primary" size={24} />
            </div>
            <p className="text-sm font-medium ">Delivered</p>
            <p className="text-gray-500 text-sm">pending </p>
          </div>
        </div>
        </div> */}
        <div className="w-full border border-gray-300 rounded-md p-6">
          <div className="relative flex items-start justify-between">

            <div className="absolute top-7 left-[8%] right-[8%] h-1 bg-gray-300"></div>


            <div className="absolute top-7 left-[8%] w-[62%] h-1 bg-primary"></div>

            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                <TiTick className="text-white" size={24} />
              </div>

              <p className="mt-3 text-lg font-medium">Order Confirmed</p>
              <p className="text-gray-500 text-sm">
                Expected Delivery: 2023-10-20
              </p>
            </div>


            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                <TiTick className="text-white" size={24} />
              </div>

              <p className="mt-3 text-lg font-medium">Processing</p>
              <p className="text-gray-500 text-sm">Completed: 2023-10-20</p>
            </div>


            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                <FaVanShuttle className="text-white" size={24} />
              </div>

              <p className="mt-3 text-lg font-medium">Shipped</p>
              <p className="text-gray-500 text-sm">Completed: 2023-10-20</p>
            </div>


            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                <VscLocation className="text-primary" size={24} />
              </div>

              <p className="mt-3 text-lg font-medium">Out for Delivery</p>
              <p className="text-gray-500 text-sm">Today</p>
            </div>


            <div className="relative z-10 flex-1 flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gray-200 border-2 border-primary flex items-center justify-center">
                <IoMdCheckmarkCircleOutline
                  className="text-primary"
                  size={24}
                />
              </div>

              <p className="mt-3 text-lg font-medium">Delivered</p>
              <p className="text-gray-500 text-sm">Pending</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 flex gap-10">
          <div className="h-full w-2/3 shadow-sm rounded-xl ">
            <h1 className="text-title font-semibold">Items In Your Order</h1>
            <div>
              {products.slice(0, 3).map((item) => (

                <div className="p-3 w-full flex gap-2">
                  <div className=" h-25 w-25 rounded-xl flex items-center justify-between overflow-hidden">
                    <img src={item.img} className="h-full w-full object-cover" />

                  </div>
                  <div className=" w-full flex justify-between items-center ">
                    <div className="flex flex-col">
                      <h1 className="text-body font-semibold">{item.name}</h1>
                      <p className="text-sm text-primary">Color:black | Qty:1</p>
                      <p className="text-title font-semibold text-primary">Price: {item.price}</p>

                    </div>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover">
                      Track Item
                    </button>
                  </div>
                </div>

              ))}
            </div>
          </div>
          <div className="h-full w-1/3 shadow-sm rounded-xl mt-5 p-4">
            <h1 className="text-title font-semibold">Order Summary</h1>
            <div className="flex justify-between items-center">
              <p className="text-body ">Subtotal</p>
              <p className="text-body  text-primary">$ 1000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body ">Shipping</p>
              <p className="text-body  text-primary">$ 10</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body ">Tax</p>
              <p className="text-body  text-primary">$ 12</p>
            </div>
            <hr className="mt-10" />
            <div className="flex justify-between items-center mt-4">
              <p className="text-title font-semibold">Total</p>
              <p className="text-title font-semibold text-primary">$ 1022</p>
            </div>
            <div className=" h-30 w-[75%] mx-auto mt-5 border border-primary/20 rounded-xl text-sm p-3">
              <p className="uppercase text-primary">Shipping Address</p>
              <p>Alex Rivera</p>
              <p>123 Main Street</p>
              <p>City, State, ZIP</p>
              <p>Country</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MyOrders;
