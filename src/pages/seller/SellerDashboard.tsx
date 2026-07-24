import { useEffect, useState } from "react";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { MdMenu } from "react-icons/md";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { FiEdit } from "react-icons/fi";
import { products } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import UserStore from "@/store/userStore";
import { Button } from "@/components/ui/button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        x: {
            display: false,
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },
        y: {
            display: false,
            beginAtZero: true,
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },
    },
};

const cards = [
    {
        title: "Total Orders",
        value: "1,248",
        subtitle: "Active Orders",
        growth: "+8.2%",
        data: [12, 8, 18, 28, 36],
    },
    {
        title: "Revenue",
        value: "$24.8K",
        subtitle: "This Month",
        growth: "+12%",
        data: [8, 14, 22, 20, 30],
    },
    {
        title: "Products",
        value: "320",
        subtitle: "Listed",
        growth: "+5.5%",
        data: [5, 10, 15, 22, 26],
    },

];

const SellerDashboard = () => {
    const [open, setOpen] = useState(true);
    const [lowStockProduct, setLowStockProduct] = useState<any | []>([])
    const [pendingOrder, setPendingOrder] = useState<any | []>([])
    const [sellerProfile, setSellerProfile] = useState<any | []>([])
    const user = UserStore(state => state?.user);
    console.log("user seller", user)
    const isStoreApproved = user?.storeApproved
    console.log('from store aproved', isStoreApproved)
    const navigate = useNavigate();
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
    async function fetchSellerProfile() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/me`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            console.log(data)
            if (data.success) {
                setSellerProfile(data.data)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchLowStockProduct(),
            fetchPendingOrder(),
            fetchSellerProfile()
    }, [])
    console.log(lowStockProduct)
    console.log(pendingOrder)
    if (isStoreApproved === false) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col gap-y-4 items-center justify-center">
                <h1 className="text-2xl font-bold">Your Store is Not Approved Yet</h1>
                <Button onClick={() => navigate("/")} className={"mx-auto"}>Go Back</Button>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SellerSideBar open={open} />

            <section
                className={`flex-1 transition-all duration-300 ${open ? "ml-[15%]" : "ml-0"
                    }`}
            >
                {/* Header */}
                <div className="h-16 flex items-center px-8 bg-white shadow-sm">
                    <button onClick={() => setOpen(!open)}>
                        <MdMenu size={28} />
                    </button>

                    <h1 className="ml-4 text-2xl font-bold">Dashboard</h1>
                </div>

                {/* Cards */}
                <div className="p-8">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
                        {cards.map((card, index) => (
                            <StatsCard
                                key={index}
                                title={card.title}
                                value={card.value}
                                subtitle={card.subtitle}
                                growth={card.growth}
                                chartData={card.data}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full p-4">
                    <h1 className="text-primary text-title font-semibold">Low Stocks</h1>
                    <div className="w-full flex flex-col gap-2">
                        {lowStockProduct.length == 0 ? (
                            <div className="text-md mx-auto mt-3">You Dont have Any Product Now</div>
                        ) : (
                            lowStockProduct.map(product => (

                                <div className="h-full w-full flex items-center gap-2 p-2 shadow-sm">

                                    <div className="h-15 w-15 flex items-center justify-center overflow-hidden rounded-xl mt-2">
                                        <img src={product.thumbnails} className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className=" w-full flex items-center justify-between mt-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-primary">{product.name}</p>
                                            <p>Quantity: {product.stock}</p>
                                        </div>
                                        <button className="bg-primary-hover/5 p-2 rounded-lg mr-10" onClick={() => navigate(`/seller/edit-product/${product._id}`)}><FiEdit color="" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <PendingOrdersTable pendingOrder={pendingOrder} />
            </section>
        </div>
    );
};

const StatsCard = ({
    title,
    value,
    subtitle,
    growth,
    chartData,
}: { title: string, value: string, subtitle: string, growth: string, chartData: number[] }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                data: chartData,
                backgroundColor: [
                    "#FBE8E4",
                    "#F9D8D2",
                    "#F8C2B7",
                    "#F5D7CF",
                    "#FF9F8D",
                ],
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 20,
            },
        ],
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
            <div className="flex flex-col ">
                <div className="flex justify-between">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                        {title}
                    </p>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${growth.startsWith("-")
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                            }`}
                    >
                        {growth}
                    </span>
                </div>
                <div>
                    <h2 className="text-title font-bold text-[#8B4B39] mt-2">
                        {value}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 w-full">{subtitle}</p>
                </div>
            </div>



            <div className="h-14 mt-4">
                <Bar data={data} options={chartOptions} />
            </div>

        </div>
    );
};

const PendingOrdersTable = ({ pendingOrder }: any) => {
    console.log("table pending order", pendingOrder)
    const navigate = useNavigate();
    const pendingOrders = [
        {
            id: "#ORD-90210",
            customer: "Elena Smith",
            initials: "ES",
            color: "bg-gray-200",
            date: "Oct 24, 2024",
            total: "$124.50",
            status: "Processing",
            action: "Ship Now",
        },
        {
            id: "#ORD-90211",
            customer: "Marcus Johnson",
            initials: "MJ",
            color: "bg-teal-300",
            date: "Oct 24, 2024",
            total: "$56.00",
            status: "Awaiting Payment",
            action: "Details",
        },
        {
            id: "#ORD-90212",
            customer: "Lucas White",
            initials: "LW",
            color: "bg-orange-300",
            date: "Oct 23, 2024",
            total: "$210.00",
            status: "Ready to Ship",
            action: "Ship Now",
        },
    ];
    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Pending Fulfillment
                    </h2>

                    <button className="text-primary font-medium hover:underline">
                        View All Orders
                    </button>
                </div>
                {pendingOrder.length <= 0 ? (
                    <div className="text-center">No Pending Prdocut</div>
                ) : (


                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b">
                                    <th className="pb-4">Order ID</th>
                                    <th className="pb-4">Customer</th>
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4">Total</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pendingOrder.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="  hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5 font-semibold text-sm text-gray-800">
                                            {order._id}
                                        </td>

                                        <td className="py-5">
                                            <div className="flex items-center gap-3">


                                                <span className="text-gray-700">{order.buyer.name}</span>
                                            </div>
                                        </td>

                                        <td className="py-5 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>

                                        <td className="py-5 font-semibold text-sm">Npr.{order.totalPrice}</td>

                                        <td className="py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${order.orderStatus === "pending"
                                                        ? "bg-orange-100 text-orange-700"
                                                        : order.orderStatus === "awaiting_payment"
                                                            ? "bg-gray-200 text-gray-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>

                                        <td className="py-5 text-right">
                                            {order.action === "Ship Now" ? (
                                                <button className="bg-[#8B4B39] hover:bg-[#733a2b] text-white px-5 py-2 rounded-lg text-sm font-medium">
                                                    Ship Now
                                                </button>
                                            ) : (
                                                <button className="text-[#8B4B39] hover:underline font-medium" onClick={() => navigate(`/orders/${order._id}`)}>
                                                    Details
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SellerDashboard;