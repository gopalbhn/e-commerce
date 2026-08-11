import Table from "@/components/normal/table";
import SellerSideBar from "@/components/Sellers/SellerSideBar";
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { toast } from "sonner";

interface FlashSaleProduct {
    productId: string;
    stock: number;
}

const SellerFlashSale = () => {
    const [open, setOpen] = useState(true)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [products, setProduct] = useState<any[]>([])
    const [selectedProducts, setSelectedProducts] = useState<FlashSaleProduct[]>([])
    const [flashSaleId, setFlashSaleId] = useState<string>("")
    const [runningFlashSale, setRunningFlashSale] = useState<any[]>([])
    const [myFlashSaleProducts, setMyFlashSaleProducts] = useState([])
    const [editProduct, setEditProduct] = useState<any>({})
    const [showEditProduct, setShowEditProduct] = useState(false)

    async function fetchMyProducts() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/my-products`, {
                credentials: "include"
            })
            const data = await res.json();

            if (data.success) {
                console.log(data)
                setProduct(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleAddProduct() {
        try {
            console.log("Select", selectedProducts)
            if (selectedProducts.length === 0) {
                toast.error("Please select at least one product")
                return;
            }
            if (!selectedProducts.every(p => p.stock > 0)) {
                toast.error("Please enter stock for all products")
                return;
            }
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/add-product/${flashSaleId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: selectedProducts
                })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Products added to flash sale successfully")
                setShowAddProduct(false)
                setSelectedProducts([])
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    async function getRunningFlashSale() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/running`, {
                credentials: 'include'
            })

            const data = await res.json();
            if (data.success) {
                setRunningFlashSale([data.data])
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getAllMyFlashSaleProduct() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/seller-sale`, {
                credentials: 'include'
            })

            const data = await res.json();
            if (data.success) {
                console.log("data.data", data.data)

                const mySaleProductData = data.data.map((item: any) => ({
                    id: item._id,
                    thumbnails: item.thumbnails,
                    name: item.productName,
                    price: item.productPrice,
                    stock: item.stock,
                    status: item.status,
                }));
                setMyFlashSaleProducts(mySaleProductData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function removeProduct(id: string) {
        console.log("id", id)

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/delete-my-item/${id}`, {
                method: "DELETE",
                credentials: "include",
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Product removed from flash sale successfully")
                getAllMyFlashSaleProduct()

                setTimeout(() => {
                    // window.location.reload()
                }, 1000)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    function handleEdit(id: string) {
        console.log("id", id)
        const eidtingProduct = products.find(prod => prod._id === id)
        console.log("Editing Product")
        setEditProduct([eidtingProduct])
        setShowEditProduct(true)

    }
    useEffect(() => {
        fetchMyProducts()
        getRunningFlashSale()
        getAllMyFlashSaleProduct()
    }, [])
    console.log("status", myFlashSaleProducts)
    const sellerFlashSaleColumn = [
        {
            header: "Image",
            render: (product: any) => (
                <div className="h-14 w-14 rounded-xl overflow-hidden">

                    <img src={product.thumbnails} alt="" className="h-full w-full object-cover" />
                </div>
            )
        },
        {
            header: "Product Name",
            render: (product: any) => product.name
        },
        {
            header: "Price",
            render: (product: any) => `NPR.${product.price}`
        },
        {
            header: "Status",
            render: (product: any) => product.status
        },
        {
            header: "Stock",
            render: (product: any) => product.stock
        },
        {
            header: "Action",
            render: (product: any) => (
                <div className="flex items-center gap-4">
                    {/* <button className=" hover:text-primary" title="Edit" onClick={() => handleEdit(product.id)}><FaPen size={14} /></button> */}
                    <button className=" hover:text-red-500" title="Delete" onClick={() => removeProduct(product.id)}><FaTrash size={14} /></button>
                </div>
            )
        }
    ]
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SellerSideBar open={open} />
            <section
                className={`flex-1 transition-all duration-300 ${open ? "ml-[15%]" : "ml-0"
                    }`}
            >

                <div className="h-16 flex items-center px-8 bg-white shadow-sm">
                    <button onClick={() => setOpen(!open)}>
                        <MdMenu size={28} />
                    </button>

                    <h1 className="ml-4 text-2xl font-bold">Flash Sale</h1>
                </div>

                <div className="h-full w-full p-8 ">
                    <h1 className="text-header font-bold">Running Flash Sale</h1>
                    <div className="w-full  mt-6 rounded-xl">
                        {runningFlashSale?.length == 0 ? (
                            <div>

                                <p className="text-center mt-10 font-semibold">No Running FlashSale</p>

                            </div>
                        ) : (

                            <CurrentFlashSaleCard setShowAddProduct={setShowAddProduct} setFlashSaleId={setFlashSaleId} runningFlashSale={runningFlashSale} />
                        )}
                    </div>
                    {myFlashSaleProducts.length !== 0 && (
                        <div>
                            <>
                                <div className="flex items-center gap-3 mt-5">
                                    <h1 className="text-header font-bold">My Flash Sale Products</h1>
                                </div>
                                <div className="w-full overflow-x-auto mt-5">
                                    <Table columns={sellerFlashSaleColumn} data={myFlashSaleProducts} />
                                </div>
                            </>
                        </div>
                    )}
                </div>

                {showAddProduct && <AddProductComponet setShowAddProduct={setShowAddProduct} products={products} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} handleAddProduct={handleAddProduct} />}
                {showEditProduct && <AddProductComponet setShowAddProduct={setShowAddProduct} products={editProduct} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} handleAddProduct={handleAddProduct} />}
            </section>
        </div>
    );
}

export default SellerFlashSale

function CurrentFlashSaleCard({ setShowAddProduct, setFlashSaleId, runningFlashSale }: { setShowAddProduct: (show: boolean) => void, setFlashSaleId: (id: string) => void, runningFlashSale: any[] }) {
    console.log("running flashshale", runningFlashSale)
    return (
        runningFlashSale?.map((sale, index) => {
            const status = new Date() < new Date(sale.endTime) ? "Running" : "Ended"


            return (
                <div className="p-5 shadow-sm rounded-xl max-w-lg " key={index}>
                    <div className="w-full flex justify-between">
                        <p className="text-body font-semibold">Summer Title</p>
                        <p>{sale.saleTitle}</p>
                    </div>
                    <div className="w-full flex justify-between mt-4">
                        <p className="font-semibold text-body">Starts Time</p>
                        <p>{new Date(sale.startTime).toDateString()}</p>
                    </div>
                    <div className="w-full flex justify-between mt-4">
                        <p className="font-semibold text-body">Discount Percentage</p>
                        <p>{sale.discountPercentage}</p>
                    </div>
                    <div className="w-full flex justify-between mt-4">
                        <p className="font-semibold text-body">Ends Time</p>
                        <p>{new Date(sale.endTime).toDateString()}</p>
                    </div>

                    <div className="w-full flex justify-between mt-4">
                        <p className="font-semibold text-body">Status</p>
                        <p className="text-green-600 font-semibold text-sm">{status}</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-3 mt-5">
                        <button className="px-3 py-1.5 bg-primary text-white rounded-full " onClick={() => {
                            setShowAddProduct(true);
                            setFlashSaleId(sale._id)
                        }}>
                            Add Product
                        </button>
                    </div>
                </div>
            )
        })
    )
}


function AddProductComponet({ setShowAddProduct, products, setSelectedProducts, handleAddProduct, selectedProducts }:
    {
        setShowAddProduct: (show: boolean) => void,
        products: any[],
        setSelectedProducts: (products: FlashSaleProduct[]) => void
        handleAddProduct: () => void,
        selectedProducts: FlashSaleProduct[]
    }) {


    function handleAddSelectedProducts(id: string, selectStock: { id: string; stock: number; }[]) {
        if (selectedProducts.some(product => product.productId === id)) {
            setSelectedProducts(selectedProducts.filter((product: FlashSaleProduct) => product.productId !== id))
        } else {
            console.log("selected", selectedProducts)
            if (selectedProducts.length >= 2) {
                toast.error("You can only add 2 products to the flash sale.")
                return;
            }
            if (selectStock.every(pro => pro.stock <= 0)) {
                toast.error("Please enter stock greater than 0 for all products")
                return;
            }
            setSelectedProducts([...selectedProducts, { productId: id, stock: selectStock.some(pro => pro.id == id) ? selectStock.find(pro => pro.id == id)?.stock : 0 }])
        }

    }
    const [selectStock, setSelectStock] = useState<{ id: string, stock: number }[]>([]);
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center justify-center">

            <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Add Products to Flash Sale</h3>
                    <button
                        onClick={() => {
                            setSelectedProducts([])
                            setShowAddProduct(false)

                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaX size={14} />
                    </button>
                </div>
                <div className="p-6 space-y-4">

                    <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {["Select", "Product", "Price", " Total Stock", "Stock in Flash"].map((item: string) => (<th key={item} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {products.map((product: any) => {
                                    const isChecked = selectedProducts.some(item => item.productId === product._id)

                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleAddSelectedProducts(product._id, selectStock)}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" checked={isChecked} readOnly />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-500">
                                                        <img src={product.thumbnails} alt={product.name} className="w-full h-full object-cover rounded" />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NPR {product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.stock} in stock</div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <input type="number" className="border border-gray-300 rounded-lg px-2 py-1 w-20" max={product.stock} min={0} placeholder='Enter stock' onClick={(e) => e.stopPropagation()} onChange={(e) => {
                                                        if (Number(e.target.value) > product.stock) {
                                                            toast.error("Stock is not available")
                                                            e.target.value = ""
                                                            return
                                                        }
                                                        if (selectStock.some(item => item.id === product._id)) {
                                                            setSelectStock(selectStock.map((item) => item.id === product._id ? { ...item, stock: Number(e.target.value) } : item))
                                                        } else {
                                                            setSelectStock([...selectStock, { id: product._id, stock: Number(e.target.value) }])
                                                        }
                                                    }} />
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => {
                                setSelectedProducts([])
                                setSelectStock([])
                                setShowAddProduct(false)
                            }}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors" onClick={handleAddProduct}>
                            Add Selected Products
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}