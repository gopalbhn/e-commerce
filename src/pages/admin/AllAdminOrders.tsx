import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import Table from "@/components/normal/table"
import OrderDetailComponent from "@/components/normal/orderDetail"

import { useEffect, useState } from "react"
import { FaRegEye } from "react-icons/fa"

const AllAdminOrders = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [orders, setOrders] = useState([])
    const [orderDetail, setOrderDetail] = useState<any | []>([])
    const [viewOrder, setViewOrder] = useState(false)
    const fetchAllOrder = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/order`, {
                credentials: "include"
            })
            const data = await response.json();
            console.log(data)
            if (data.success) {

                setOrders(data.orders)
            }

        } catch (error) {
            console.log(error)
        }
    }
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
    useEffect(() => {
        fetchAllOrder();
    }, []);

    const orderColumn = [{
        header: "OrderId",
        accessor: "_id"
    }, {
        header: "OrderDate",
        accessor: "createdAt"
    }, {
        header: "Buyer",
        render: (data: any) => data.buyer.name
    }, {
        header: "Status",
        accessor: "orderStatus"
    }, {
        header: "Total Amount",
        render: (data: any) => `Npr.${data.totalPrice}`
    }, {
        header: "Actions",
        render: (data: any) => (
            <div className="flex items-center gap-x-2">
                <button onClick={() => { console.log(data); setViewOrder(true); fetchOrderDetail(data._id) }} className="p-4 hover:text-primary rounded-xl">
                    <FaRegEye size={15} />
                </button>

            </div>
        )
    }]

    return (
        <div className='h-full w-full'>
            <AdminSideBar open={open} />
            {viewOrder && <OrderDetailComponent onclose={() => setViewOrder(false)} orders={orderDetail} />}
            <section
                className={`flex-1 transition-all duration-300 px-10 mb-10 ${open ? "ml-[15%]" : "ml-0"
                    }`}
            >
                <AdminTopBar text="Order" onclick={() => setOpen(!open)} />

                <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-body font-semibold">All Order</h1>
                        </div>
                        <input type="text"
                            placeholder="Search by name or category..."
                            className="border border-gray-300 p-2 rounded-xl w-64 focus:ring-2 focus:ring-primary/30 focus-outline-none focus:outline-none"
                        />

                    </div>
                    {/* <Table varaint="order" data={orders} /> */}
                    <Table data={orders} columns={orderColumn} />
                </div>
            </section>
        </div>
    )
}

export default AllAdminOrders;