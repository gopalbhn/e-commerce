import { useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md'
import SellerSideBar from '../../components/Sellers/SellerSideBar'

import { FaCalendarAlt, FaCar } from 'react-icons/fa'
import Popup from '@/components/normal/Popup'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'sonner'

const AllOrders = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [order, setOrder] = useState<[] | any[] | null>([])
    const [view, setView] = useState<string>("all")
    async function fetchAllOrder() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/seller`, {
                credentials: 'include'
            })

            const data = await res.json();

            if (data.success) {
                setOrder(data.data)
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
        setOrder(order.filter((item: any) => item.orderStatus === "Shipped"))
    }
    function handlePendingOrder() {
        setView("pending")
        setOrder(order.filter((item: any) => item.orderStatus === "Pending"))
    }
    function handleCompletedOrder() {
        setView("completed")
        setOrder(order.filter((item: any) => item.orderStatus === "Delivered"))
    }

    async function updateStatus(status, id) {
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
                    <StatsCard title="Pending Shipments" statsNum={12} icon={<FaCar size={20} />} accent="primary" />
                    <StatsCard title="Completed Orders" statsNum={12} icon={<FaCalendarAlt size={20} />} accent="accent" />
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
                    <OrderTable order={order} updateStatus={updateStatus} />
                </div>
            </section>
        </div>
    )
}

const StatsCard = ({
    title,
    statsNum,
    icon,
    accent,
}: {
    title: string
    statsNum: number
    icon: React.ReactNode
    accent: 'primary' | 'accent'
}) => {
    const accentStyles = {
        primary: {
            bg: 'bg-primary-light/20',
            text: 'text-primary',
            border: 'border-l-primary',
        },
        accent: {
            bg: 'bg-accent-light/20',
            text: 'text-accent',
            border: 'border-l-accent',
        },
    }
    const s = accentStyles[accent]

    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 ${s.border} flex items-center gap-4 hover:shadow-md transition-shadow`}>
            <div className={`w-12 h-12 ${s.bg} rounded-full flex items-center justify-center ${s.text}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{statsNum}</p>
            </div>
        </div>
    )
}

const statusConfig: Record<string, { label: string; className: string }> = {
    Delivered: { label: 'Delivered', className: 'bg-green-100 text-green-700 border border-green-200' },
    Pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
    Shipped: { label: 'Shipped', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
    Cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700 border border-red-200' },
    Processing: { label: 'Processing', className: 'bg-purple-100 text-purple-700 border border-purple-200' },
}

const OrderTable = ({ order, updateStatus }: { order: any[]; updateStatus: (status: string, id: string) => void }) => {
    const [targetId, setTargetId] = useState<string | null>(null)
    const [popup, setPopup] = useState<boolean>(false)

    const handlePopup = (id: string) => {
        setPopup(!popup)
        setTargetId(id)
    }

    return (
        <div className="w-full h-full bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
            <table className="w-full border-separate border-spacing-y-1.5">
                <thead>
                    <tr>
                        <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Order Id</th>
                        <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Date</th>
                        <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Customer Name</th>
                        <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Price</th>
                        <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Status</th>
                        <th className='text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3'>Action</th>
                    </tr>
                </thead>

                <tbody className="text-sm font-normal text-gray-700">
                    {order.map((order: any, index: number) => {
                        const status = statusConfig[order.orderStatus] ?? { label: order.orderStatus, className: 'bg-gray-100 text-gray-600' }
                        return (
                            <tr
                                key={index}
                                className="bg-gray-50 hover:bg-primary-light/10 transition-colors group rounded-lg"
                            >
                                <td className="p-3 rounded-l-lg">
                                    <span className="font-semibold text-primary">{order._id}</span>
                                </td>
                                <td className="p-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-3 font-medium text-gray-800">{order.buyer.name}</td>
                                <td className="p-3 font-semibold text-gray-900">Npr.{order.totalPrice}</td>
                                <td className="p-3 rounded-r-lg">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                                        {status.label}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 flex relative ">

                                    <button className="p-4 hover:bg-gray-100 rounded-xl" onClick={() => handlePopup(order._id)}>
                                        <BsThreeDotsVertical size={20} />
                                    </button>

                                    {order._id === targetId && popup && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => {
                                                    setPopup(false);
                                                    setTargetId(null);
                                                }}
                                            />


                                            <div
                                                className="absolute right-0 top-12 z-50"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Popup
                                                    varaint='order'
                                                    id={order._id}
                                                    onDelete={() => {
                                                        setPopup(false);
                                                        setTargetId(null);
                                                        updateStatus("Cancelled", order._id)
                                                    }}
                                                    onDeliver={() => {
                                                        setPopup(false);
                                                        setTargetId(null);
                                                        updateStatus("Delivered", order._id)
                                                    }}
                                                    onShip={() => {
                                                        setPopup(false);
                                                        setTargetId(null);
                                                        updateStatus("Shipped", order._id)
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllOrders
