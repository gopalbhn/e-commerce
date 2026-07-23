import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import Table from "@/components/admin/table"
import { orderData } from "@/lib/data.js"
import { useEffect, useState } from "react"

const AllAdminOrders = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [orders, setOrders] = useState([])

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

    useEffect(() => {
        fetchAllOrder();
    }, []);

    return (
        <div className='h-full w-full'>
            <AdminSideBar open={open} />
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
                    <Table varaint="order" data={orders} />
                </div>
            </section>
        </div>
    )
}

export default AllAdminOrders;