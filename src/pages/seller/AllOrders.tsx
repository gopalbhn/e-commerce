import { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import SellerSideBar from '../../components/Sellers/SellerSideBar'

import { FaCalendarAlt, FaCar } from 'react-icons/fa'

const AllOrders = () => {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <div className="h-full w-full bg-gray-50 flex">
            <SellerSideBar open={open} />

            <section className={`w-full h-full ${open ? "ml-[25%] p-4" : "ml-0 "} transition-all duration-300 px-10`}>
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
                        <button className='px-8 py-2 rounded-full bg-primary-hover text-white shadow-sm text-sm font-medium transition-all hover:shadow-md'>All</button>
                        <button className='px-8 py-2 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm text-sm font-medium hover:bg-primary-hover hover:text-white hover:border-primary-hover transition-all'>Pending</button>
                        <button className='px-8 py-2 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm text-sm font-medium hover:bg-primary-hover hover:text-white hover:border-primary-hover transition-all'>Completed</button>
                    </div>
                    <OrderTable />
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

const OrderTable = () => {
    const orderDetail = [
        { id: 'ORD-1001', date: '2026-07-08', customerName: 'John Smith', price: 129.99, status: 'Delivered' },
        { id: 'ORD-1002', date: '2026-07-08', customerName: 'Emma Johnson', price: 59.49, status: 'Pending' },
        { id: 'ORD-1003', date: '2026-07-07', customerName: 'Michael Brown', price: 249.99, status: 'Shipped' },
        { id: 'ORD-1004', date: '2026-07-07', customerName: 'Sophia Davis', price: 89.95, status: 'Cancelled' },
        { id: 'ORD-1005', date: '2026-07-06', customerName: 'William Wilson', price: 179.50, status: 'Delivered' },
        { id: 'ORD-1006', date: '2026-07-06', customerName: 'Olivia Martinez', price: 39.99, status: 'Pending' },
        { id: 'ORD-1007', date: '2026-07-05', customerName: 'James Anderson', price: 399.99, status: 'Processing' },
        { id: 'ORD-1008', date: '2026-07-05', customerName: 'Ava Thomas', price: 74.99, status: 'Delivered' },
    ]

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
                    </tr>
                </thead>

                <tbody className="text-sm font-normal text-gray-700">
                    {orderDetail.slice(0, 3).map((order, index) => {
                        const status = statusConfig[order.status] ?? { label: order.status, className: 'bg-gray-100 text-gray-600' }
                        return (
                            <tr
                                key={index}
                                className="bg-gray-50 hover:bg-primary-light/10 transition-colors group rounded-lg"
                            >
                                <td className="p-3 rounded-l-lg">
                                    <span className="font-semibold text-primary">{order.id}</span>
                                </td>
                                <td className="p-3 text-gray-500">{order.date}</td>
                                <td className="p-3 font-medium text-gray-800">{order.customerName}</td>
                                <td className="p-3 font-semibold text-gray-900">${order.price.toFixed(2)}</td>
                                <td className="p-3 rounded-r-lg">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                                        {status.label}
                                    </span>
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
