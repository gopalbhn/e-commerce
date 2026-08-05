import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaPen, FaTrash } from "react-icons/fa"


const FlashSale = () => {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <div className='h-full w-full'>
            <AdminSideBar open={open} />

            <section
                className={`flex-1 transition-all duration-300 px-10 mb-10 ${open ? "ml-[15%]" : "ml-0"
                    }`}
            >
                <AdminTopBar text="Flash Sale" onclick={() => setOpen(!open)} />

                <div className="mt-6 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-title font-semibold">All Sale</h1>
                        </div>
                        <div className="flex gap-4 items-center ">


                            <input type="text"
                                placeholder="Search by name or category..."
                                className="border border-gray-300 p-2 rounded-xl w-64 focus:ring-2 focus:ring-primary/30 focus-outline-none focus:outline-none"
                            />
                            <div>

                            </div>
                            <button className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
                                Create Sale
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-3">
                        <SaleComponent />

                    </div>
                </div>
            </section>
        </div>
    )
}


export default FlashSale


function SaleComponent() {
    return (
        <div className="p-5  shadow-sm rounded-xl max-w-lg">
            <div className="flex items-center justify-between">
                <div className="text-title font-bold ">
                    Summer Sale
                </div>
                <div className="flex items-center gap-3">

                    <button className={" hover:text-primary"} title="Edit Sale">
                        <FaPen size={15} />

                    </button>
                    <button className={"hover:text-red-500"} title="Delete Sale">
                        <FaTrash size={15} />

                    </button>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3 mt-2 ">
                <div className="h-full w-full flex justify-between ">
                    <p>Sale Title</p>
                    <p>Summer Sale</p>

                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Starts Time</p>
                    <p>{new Date().toDateString()}</p>

                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Ends Time</p>
                    <p>{new Date().toDateString()}</p>
                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Total Listed Items</p>
                    <p>10</p>

                </div>
                <div className="h-full w-full flex justify-between">
                    <p>Total Sold Items</p>
                    <p>10</p>
                </div>
            </div>
        </div>
    )
}