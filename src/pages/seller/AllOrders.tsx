import { useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md'
import SellerSideBar from '../../components/Sellers/SellerSideBar'

import { FaCalendarAlt, FaCar } from 'react-icons/fa'
import { BsBoxSeamFill } from 'react-icons/bs'
import { toast } from 'sonner'
import Table from '@/components/normal/table'
import { Eye } from 'lucide-react'
import { CiDeliveryTruck } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const AllOrders = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [order, setOrder] = useState<any[] | null>(null)
    const [filteredOrder, setFilteredOrder] = useState<any[]>([])
    const [view, setView] = useState<string>("all")
    const navigate = useNavigate();
    const totalPendingOrder = order?.filter((item: any) => item.orderStatus === "Pending").length;
    const totalCompletedOrder = order?.filter((item: any) => item.orderStatus === "Delivered").length;
    async function fetchAllOrder() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/seller`, {
                credentials: 'include'
            })

            const data = await res.json();

            if (data.success) {
                console.log('all order', data.data)
                setOrder(data.data)
                setFilteredOrder(data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log('all order', order)
    useEffect(() => {
        fetchAllOrder()
    }, [])
    function handleShippedOrder() {
        setView("shipped");
        setFilteredOrder(order.filter((item: any) => item.orderStatus === "Shipped"))
    }
    function handlePendingOrder() {
        setView("pending")
        setFilteredOrder(order.filter((item: any) => item.orderStatus === "Pending"))
    }
    function handleCompletedOrder() {
        setView("completed")
        setFilteredOrder(order.filter((item: any) => item.orderStatus === "Delivered"))
    }

    async function updateStatus(status: string, id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/update/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status
            })
        })

        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
            fetchAllOrder()
        }
    }

    const OrderColumn = [
        {
            header: "Order Id",
            accessor: "_id"
        },
        {
            header: "Date",
            render: (order: any) => new Date(order.createdAt).toLocaleDateString(),
        },
        {
            header: "Customer",
            render: (order: any) => order.buyer.name,
        },
        {
            header: "Price",
            render: (order: any) => `Npr.${order.totalPrice}`,
        },
        {
            header: "Status",
            render: (order: any) => order.orderStatus,
        },
        {
            header: "Actions",
            render: (order: any) => (
                <div className='flex items-center gap-x-3'>

                    <button
                        onClick={() => {
                            navigate(`/seller/order/${order._id}`)
                        }}
                        className="text-gray-400 hover:text-primary-hover transition-colors"
                        title="View Order"
                    >
                        <Eye size={20} />
                    </button>
                    {order.orderStatus !== "Shipped" && order.orderStatus !== "Delivered" ? (
                        <button
                            onClick={() => {
                                updateStatus("Shipped", order._id)
                            }}
                            className="text-gray-400 hover:text-primary-hover transition-colors"
                            title="Ship Order"
                        >
                            <CiDeliveryTruck size={20} />
                        </button>
                    ) : (
                        <button
                            disabled
                            className="text-gray-400/50 cursor-not-allowed hover:bg-transparent transition-colors"
                            title="Order Shipped Already"
                        >
                            <CiDeliveryTruck size={20} />
                        </button>
                    )}
                    {order.orderStatus !== "Delivered" ? (
                        <button
                            onClick={() => {
                                updateStatus("Delivered", order._id)
                            }}
                            className="text-gray-400 hover:text-primary-hover transition-colors"
                            title="Delivered Order"
                        >
                            <BsBoxSeamFill size={20} />
                        </button>
                    ) : (
                        <button
                            disabled
                            className="text-gray-400/50 cursor-not-allowed hover:bg-transparent transition-colors"
                            title="Order Delivered Already"
                        >
                            <BsBoxSeamFill size={20} />
                        </button>
                    )}
                </div>
            ),
        },
    ]

    return (
        <div className="h-full w-full bg-gray-50 flex">
            <SellerSideBar open={open} />

            <section className={`w-full h-full ${open ? "ml-[15%] p-4" : "ml-0 "} transition-all duration-300 px-10`}>
                <div className="h-15 w-full flex items-center ">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <MdMenu size={30} />
                        </button>
                        <h1 className="text-title font-bold">Dashboard</h1>
                    </div>
                </div>

                <div className="max-w-7xl flex gap-4 items-center ">
                    <StatsCard title="Pending Shipments" statsNum={totalPendingOrder} icon={<FaCar size={20} />} />
                    <StatsCard title="Completed Orders" statsNum={totalCompletedOrder} icon={<FaCalendarAlt size={20} />} />
                </div>

                <div className="w-full h-full mt-5">
                    <div className='px-5 py-2 flex gap-2'>
                        <button onClick={() => {
                            fetchAllOrder()
                            setView("all")
                        }} className={`px-8 py-2 rounded-full shadow-sm text-sm font-medium transition-all hover:shadow-md ${view === "all" ? "bg-primary-hover text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-primary-hover hover:text-white hover:border-primary-hover"}`}>All</button>
                        <button onClick={handlePendingOrder} className={`px-8 py-2 rounded-full shadow-sm text-sm font-medium transition-all hover:shadow-md ${view === "pending" ? "bg-primary-hover text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-primary-hover hover:text-white hover:border-primary-hover"}`}>Pending</button>
                        <button onClick={handleShippedOrder} className={`px-8 py-2 rounded-full shadow-sm text-sm font-medium transition-all hover:shadow-md ${view === "shipped" ? "bg-primary-hover text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-primary-hover hover:text-white hover:border-primary-hover"}`}>Shipped</button>
                        <button onClick={handleCompletedOrder} className={`px-8 py-2 rounded-full shadow-sm text-sm font-medium transition-all hover:shadow-md ${view === "completed" ? "bg-primary-hover text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-primary-hover hover:text-white hover:border-primary-hover"}`}>Completed</button>
                    </div>

                    <div className="mt-10 ">
                        <Table columns={OrderColumn} data={filteredOrder} />
                    </div>
                </div>
            </section>
        </div>
    )
}

const StatsCard = ({
    title,
    statsNum,
    icon,

}: {
    title: string
    statsNum: number
    icon: React.ReactNode
}) => {


    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100  flex items-center gap-4 hover:shadow-md transition-shadow`}>
            <div className={`w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{statsNum}</p>
            </div>
        </div>
    )
}





export default AllOrders
