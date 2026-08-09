import SellerSideBar from "@/components/Sellers/SellerSideBar";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";


const SellerFlashSale = () => {
    const [open, setOpen] = useState(true)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [products, setProduct] = useState<any[]>([])

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
    useEffect(() => {
        fetchMyProducts()
    }, [])
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
                    <div className="w-full h-full border border-gray-300 mt-6 rounded-xl">
                        <CurrentFlashSaleCard setShowAddProduct={setShowAddProduct} />
                    </div>
                </div>
                {showAddProduct && <AddProductComponet setShowAddProduct={setShowAddProduct} products={products} />}
            </section>
        </div>
    );
}

export default SellerFlashSale

function CurrentFlashSaleCard({ setShowAddProduct }: { setShowAddProduct: (show: boolean) => void }) {
    return (
        <div className="p-5 shadow-sm rounded-xl max-w-lg ">
            <div className="w-full flex justify-between">
                <p className="text-body font-semibold">Summer Title</p>
                <p>{ }</p>
            </div>
            <div className="w-full flex justify-between mt-4">
                <p className="font-semibold text-body">Starts Time</p>
                <p>10th Aug, 2024 11:59:PM</p>
            </div>
            <div className="w-full flex justify-between mt-4">
                <p className="font-semibold text-body">Discount Percentage</p>
                <p>10%</p>
            </div>
            <div className="w-full flex justify-between mt-4">
                <p className="font-semibold text-body">Ends Time</p>
                <p>11th Aug, 2024 11:59:PM</p>
            </div>
            <div className="w-full flex justify-between mt-4">
                <p className="font-semibold text-body">Status</p>
                <p className="text-green-600 font-semibold text-sm">Running</p>
            </div>
            <div className="w-full flex justify-center items-center gap-3 mt-5">
                <button className="px-3 py-1.5 bg-primary text-white rounded-full " onClick={() => setShowAddProduct(true)}>
                    Add Product
                </button>
            </div>
        </div>
    )
}

function AddProductComponet({ setShowAddProduct, products }: { setShowAddProduct: (show: boolean) => void, products: any[] }) {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    function handleAddSelectedProducts(id: string) {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
        } else {
            setSelectedProducts([...selectedProducts, id])
        }
    }
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center justify-center">

            <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Add Products to Flash Sale</h3>
                    <button
                        onClick={() => setShowAddProduct(false)}
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
                                    {["Select", "Product", "Price", " Total Stock", "Stock in Flash", "Action"].map((item: string) => (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {products.map((product: any) => {
                                    const isChecked = selectedProducts.includes(product._id)
                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleAddSelectedProducts(product._id)}>
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
                                                    <input type="number" className="border border-gray-300 rounded-lg px-2 py-1 w-20" max={product.stock} min={0} placeholder='Enter stock' onChange={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-primary hover:text-primary-hover">
                                                    <BiPlus size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowAddProduct(false)}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                            Add Selected Products
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}