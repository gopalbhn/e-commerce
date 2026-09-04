import { useEffect, useState } from "react";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { MdMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UserStore from "@/store/userStore";
import { Button } from "@/components/ui/button";
import OrderDetailComponent from "@/components/normal/orderDetail";
import Table from "@/components/normal/table";
import { Eye } from "lucide-react";
import MetricChart from "@/components/admin/MetricCard";

const cards = [{
    title: "Total Revenue",
    value: {
        "Week 1": 100,
        "Week 2": 200,
        "Week 3": 300,
        "Week 4": 400,
    },
    color: "#FF8C00",
},
{
    title: "Total Orders",
    value: {
        "Week 1": 10,
        "Week 2": 20,
        "Week 3": 40,
        "Week 4": 25,
    }

},
{
    title: "Total Products",
    value: {
        "Week 1": 5,
        "Week 2": 8,
        "Week 3": 2,
        "Week 4": 3,
    }

}
]


const SellerDashboard = () => {
    const [open, setOpen] = useState(true);
    const [lowStockProduct, setLowStockProduct] = useState<any | []>([])
    const [pendingOrder, setPendingOrder] = useState<any | []>([])
    const [orderDetail, setOrderDetail] = useState<any | []>([])
    const [viewOrder, setViewOrder] = useState(false)
    const user = UserStore(state => state?.user);
    const isStoreApproved = user?.storeApproved
    const navigate = useNavigate();

    const pendingOrderColumn = [
        {
            header: "Order Id",
            accessor: "_id",
        },
        {
            header: "Customer",
            render: (order: any) => order.buyer.name,
        },
        {
            header: "Date",
            render: (order: any) => new Date(order.createdAt).toLocaleDateString(),
        },
        {
            header: "Total",
            render: (order: any) => `Npr.${order.totalPrice}`,
        },
        {
            header: "Status",
            render: (order: any) => order.orderStatus,
        },
        {
            header: "Action",
            render: (order: any) => (
                <button className="hover:text-primary-hover" onClick={() => { setViewOrder(true), fetchOrderDetail(order._id) }}><Eye size={20} /></button>
            ),
        },
    ]
    async function fetchOrderDetail(id: string) {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/${id}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setOrderDetail(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchLowStockProduct() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/low-stock`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setLowStockProduct(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPendingOrder() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/pending`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setPendingOrder(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchLowStockProduct(),
            fetchPendingOrder()
    }, [])
    if (isStoreApproved === false) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col gap-y-4 items-center justify-center">
                <h1 className="text-2xl font-bold">Your Store is Not Approved Yet</h1>
                <Button onClick={() => navigate("/")} className={"mx-auto"}>Go Back</Button>
            </div>
        )
    }
    return (
        <div className="min-h-screen w-full bg-gray-100 flex overflow-x-hidden">
            <SellerSideBar open={open} />
            {viewOrder && <OrderDetailComponent onclose={() => setViewOrder(false)} orders={orderDetail} />}
            <section
                className={`flex-1 min-w-0 flex h-full flex-col transition-all duration-300  ${open ? " md:ml-[15%]  " : "ml-0 bg-gray-100 "
                    }`}
            >

                <div className={`h-16 w-full  ${open ? "px-10 " : "p-4 "} md:px-8 flex gap-2 flex-shrink-0 items-center  bg-white shadow-sm`}>
                    <button onClick={() => setOpen(!open)} className="hidden md:block">
                        <MdMenu size={28} />
                    </button>

                    <h1 className="text-xl font-bold font-fraunces">Dashboard</h1>
                </div>


                <div className="px-6 md:p-8 mt-6">
                    <div className=" grid grid-cols-[repeat(1,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
                        {cards.map((card: any) => (
                            <MetricChart
                                title={card.title}

                                data={[
                                    { week: "Week 1", value: card?.value?.["Week 1"] },
                                    { week: "Week 2", value: card?.value?.["Week 2"] },
                                    { week: "Week 3", value: card?.value?.["Week 3"] },
                                    { week: "Week 4", value: card?.value?.["Week 4"] },
                                ]}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full px-6 md:p-8 mt-6">
                    <h1 className=" text-title font-semibold font-fraunces">Low Stocks</h1>
                    <div className="w-full flex flex-col gap-2">
                        {lowStockProduct.length == 0 ? (
                            <div className="text-md mx-auto mt-3">You Dont have Any Product Now</div>
                        ) : (
                            lowStockProduct.map((product: any) => (

                                <div className="h-full w-full flex items-center gap-2 p-2 shadow-sm">

                                    <div className="h-15 w-15 flex items-center justify-center overflow-hidden rounded-xl mt-2">
                                        <img src={product.thumbnails} className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className=" w-full flex items-center justify-between mt-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold ">{product.name}</p>
                                            <p>Quantity: {product.stock}</p>
                                        </div>
                                        <button className="bg-primary-hover/5 p-2 rounded-lg mr-2 md:mr-10" onClick={() => navigate(`/seller/edit-product/${product._id}`)}><FiEdit color="" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="px-6 md:p-8 mt-6">
                    <h1 className="font-semibold text-title my-2">Pending Orders</h1>
                    <Table data={pendingOrder} columns={pendingOrderColumn} />
                </div>
            </section>
        </div>
    );
};




export default SellerDashboard;