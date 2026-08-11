import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import FalshSaleModal from "@/components/admin/FlashSaleModal"
import DeleteModal from "@/components/normal/Delete"
import Table from "@/components/normal/table"

import { useEffect, useState } from "react"
import { FaCheck, FaPen, FaTrash } from "react-icons/fa"
import { toast } from "sonner"

type FormState = {

    saleTitle: string;
    discountPercentage: number;
    startTime: string;
    endTime: string;
}

const emptyForm = (): FormState => ({
    saleTitle: "",
    discountPercentage: 0,
    startTime: "",
    endTime: "",
})

const FlashSale = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [form, setForm] = useState<FormState>(emptyForm())
    const [loading, setLoading] = useState<boolean>(false)
    const [sales, setSales] = useState<any[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editId, setEditId] = useState<string>("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
    const [requestedProducts, setRequestedProducts] = useState<any[]>([])
    const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    async function handleSave() {
        if (isEditing) {
            await handleUpdate()
        } else {
            await handleCreateSale()
        }
    }

    async function handleUpdate() {
        try {
            setLoading(true)
            if (!editId) {
                toast.error("Sale not found")
                setLoading(false)
                return
            }
            if (form.discountPercentage === 0 || form.saleTitle === "" || form.startTime === "" || form.endTime === "") {
                toast.error("Please fill all the fields")
                setLoading(false)
                return
            }
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/update/${editId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Sale updated successfully")
                setTimeout(() => {

                    setOpenModal(false)
                    setForm(emptyForm())
                    setLoading(false)
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleCreateSale() {
        try {
            setLoading(true)
            if (form.discountPercentage === 0 || form.saleTitle === "" || form.startTime === "" || form.endTime === "") {
                toast.error("Please fill all the fields")
                setLoading(false)
                return
            }
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Sale created successfully")
                setTimeout(() => {

                    setOpenModal(false)
                    setForm(emptyForm())
                    setLoading(false)
                }, 1000)
            }
            if (!data.success) {
                toast.error(data.message)
                setLoading(false)
                return
            }

        } catch (error) {

            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    async function handleDelete() {
        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/delete/${editId}`, {
                method: "DELETE",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Sale deleted successfully")
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function fetchSales() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                setSales(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchRequestedProducts() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/requested-product`, {
                method: "GET",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                const allRequestedProducts = data.data.map((product: any) => {
                    return {
                        productName: product.productId?.name,
                        sellerName: product.productId?.seller?.name,
                        price: product.productId?.price,
                        totalStock: product.productId?.stock,
                        sellerId: product.productId?.seller,
                        quantity: product.stock,
                        id: product._id,
                        requestStatus: product.requestStatus
                    }
                })
                setRequestedProducts(allRequestedProducts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRequestedProducts()
    }, [])

    async function handleAccept(id: string) {
        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/accept/${id}`, {
                method: "POST",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Sale accepted successfully")
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } else {
                toast.error(data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleReject(id: string) {
        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/reject/${id}`, {
                method: "POST",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Sale rejected successfully")
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSales()
    }, [])

    useEffect(() => {
        if (isEditing) {

            console.log("time", sales.find((sale) => sale._id === editId)?.startTime)
            setForm({
                saleTitle: sales.find((sale) => sale._id === editId)?.saleTitle || "",
                discountPercentage: sales.find((sale) => sale._id === editId)?.discountPercentage || 0,
                startTime: sales.find((sale) => sale._id === editId)?.startTime || "",
                endTime: sales.find((sale) => sale._id === editId)?.endTime || "",
            })
        }
    }, [isEditing])

    const productTableColums = [
        {
            header: "Product Name",
            render: (product: any) => product.productName
        },
        {
            header: "Seller ",
            render: (product: any) => product.sellerName
        },
        {
            header: "Price",
            render: (product: any) => `NPR.${product.price}`
        },
        {
            header: "Total Stock",
            render: (product: any) => `${product.totalStock} units`
        },
        {
            header: "Sale Stock",
            render: (product: any) => `${product.quantity} units`
        },
        {
            header: "Actions",
            render: (product: any) => (
                <div className="flex items-center gap-x-2">

                    <button onClick={() => handleAccept(product.id)} title="Accept" className="p-4 hover:text-primary text-gray-400 rounded-xl">
                        <FaCheck size={15} />
                    </button>

                    <button onClick={() => handleReject(product.id)} title="Reject" className="p-4 hover:text-red-500 text-gray-400 rounded-xl">
                        <FaTrash size={15} />
                    </button>
                </div>
            )
        }
    ]
    console.log('table data', requestedProducts)
    return (
        <div className='h-full w-full flex'>
            <AdminSideBar open={open} />
            {openModal && <FalshSaleModal onclose={() => setOpenModal(false)} form={form} updateForm={updateForm} handleSave={handleSave} loading={loading} editId={editId} isEditing={isEditing} />}
            {showDeleteConfirm && (
                <DeleteModal
                    onCancel={() => setShowDeleteConfirm(false)}
                    onConfirm={handleDelete}

                />
            )}
            <section
                className={`flex-1 transition-all duration-300 px-10 mb-10 ${open ? "ml-[15%]" : "ml-0"
                    }`}
            >
                <AdminTopBar text="Flash Sale" onclick={() => setOpen(!open)} />

                <div className="mt-6 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-header font-semibold">All Sale</h1>
                        </div>
                        <div className="flex gap-4 items-center ">


                            <input type="text"
                                placeholder="Search by name or category..."
                                className="border border-gray-300 p-2 rounded-xl w-64 focus:ring-2 focus:ring-primary/30 focus-outline-none focus:outline-none"
                            />
                            <div>

                            </div>
                            <button className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors" onClick={() => setOpenModal(true)}>
                                Create Sale
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-3">
                        {
                            sales.length === 0 ? (
                                <p className="text-header text-center col-span-2 font-semibold my-14">No sales found</p>
                            ) : (
                                sales?.map((sale) => (
                                    <SaleComponent key={sale._id} sale={sale} setIsEditing={setIsEditing} setOpenModal={setOpenModal} setEditId={setEditId} setShowDeleteConfirm={setShowDeleteConfirm} />
                                ))
                            )
                        }
                    </div>
                    {sales.length !== 0 && (
                        <>
                            <div className="flex items-center gap-3 mt-5">
                                <h1 className="text-header font-bold">Products Requested for Sale</h1>
                            </div>
                            <div className="w-full overflow-x-auto">
                                <Table columns={productTableColums} data={requestedProducts} />
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}


export default FlashSale


function SaleComponent({ sale, setIsEditing, setOpenModal, setEditId, setShowDeleteConfirm }: { sale: any, setIsEditing: (value: boolean) => void, setOpenModal: (value: boolean) => void, setEditId: (value: string) => void, setShowDeleteConfirm: (value: boolean) => void }) {
    const calculateRemaingTime = () => {
        const endTime = new Date(sale?.endTime).getTime();
        if (endTime < new Date().getTime()) {
            return "Sale Ended";
        }
        const now = new Date().getTime();
        const diff = endTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const [time, setTime] = useState(calculateRemaingTime())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateRemaingTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);
    return (
        <div className="p-5  shadow-sm rounded-xl max-w-lg">
            <div className="flex items-center justify-between">
                <div className="text-title font-bold ">
                    {sale?.saleTitle}
                </div>
                <div className="flex items-center gap-3">

                    <button className={" hover:text-primary"} title="Edit Sale" onClick={() => {
                        setEditId(sale._id)
                        setIsEditing(true)
                        setOpenModal(true)
                    }}>
                        <FaPen size={15} />

                    </button>
                    <button className={"hover:text-red-500"} title="Delete Sale" onClick={() => {
                        setEditId(sale._id)
                        setShowDeleteConfirm(true)

                    }}>
                        <FaTrash size={15} />

                    </button>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3 mt-2 ">
                <div className="h-full w-full flex justify-between ">
                    <p>Sale Title</p>
                    <p>{sale?.saleTitle}</p>

                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Starts Time</p>
                    <p>{new Date(sale?.startTime).toDateString()}</p>

                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Ends Time</p>
                    <p>{new Date(sale?.endTime).toDateString()}</p>
                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Remaining Time</p>
                    <p>{time}</p>
                </div>
                <div className="h-full w-full flex justify-between ">
                    <p>Discount Percentage</p>
                    <p>{sale?.discountPercentage}%</p>

                </div>

                <div className="h-full w-full flex justify-between">
                    <p>Total Listed Items</p>
                    <p>{sale?.products?.length || 0}</p>
                </div>
            </div>
        </div>
    )
}