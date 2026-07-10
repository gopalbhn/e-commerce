import { productData } from "@/lib/data"
import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import Popup from "./Popup"
import DeleteModal from "./Delete"




const UserColumn = ["Id", "Name", "Email", "Role", "Action"]
const ProductColumn = ["Id", "Product Name", "Price", "Stock", "Image", "Category", "Action"]
const OrderColumn = ["Id", "Product", "Quantity", "Price", "Stock", "Image", "Status"]
const MostSellingProductColumn = ["Id", "Product Name", "Price", "Total Sold", "Image", "Category", "Seller"]

interface TableProps {
    varaint: "product" | "order" | "user" | "most-selling"
    data: any[]
}

export default function Table({ varaint, data }: TableProps) {
    const [popup, setPopup] = useState(false)
    const [targetId, setTargetId] = useState("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const handlePopup = (id: string) => {
        setPopup(!popup)
        setTargetId(id)
    }




    switch (varaint) {
        case "product":
            return (

                <table className="w-full relative shadow-sm rounded-xl">
                    {showDeleteConfirm && <DeleteModal onCancel={() => {
                        setPopup(false)
                        setShowDeleteConfirm(false)
                    }} />}
                    <thead>
                        <tr className="border-b border-gray-500">

                            {ProductColumn.map((column, index) => (
                                <th key={index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productData.slice(0, 4).map(product => (
                            <tr key={product._id} className="border-b border-gray-300">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product.stock}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="h-15 w-15 rounded-xl overflow-hidden">

                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 flex relative ">

                                    <button className="p-4 hover:bg-gray-100 rounded-xl" onClick={() => handlePopup(product._id)}>
                                        <BsThreeDotsVertical size={20} />
                                    </button>

                                    {product._id == targetId && (
                                        <Popup
                                            varaint="product"
                                            id={product._id}
                                            onDelete={() => {
                                                setPopup(false)
                                                setTargetId(null)
                                                setShowDeleteConfirm(true)
                                            }}

                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            )
            break;

        case "order":
            return (
                <table className="w-full shadow-sm">
                    <thead>
                        <tr>
                            {OrderColumn.map((column, index) => (
                                <th key={index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 4).map((item) => (
                            <tr key={item._id} className="border-b border-gray-300">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.productName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.stock}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="h-15 w-15 rounded-xl overflow-hidden">

                                        <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            break;

        case "user":
            return (
                <table className="w-full">
                    <thead>
                        <tr>
                            {UserColumn.map((column, index) => (
                                <th key={index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 4).map((user) => (
                            <tr key={user._id} className="border-b border-gray-300 relative">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {user._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 flex  ">

                                    <button className="p-4 hover:bg-gray-100 rounded-xl" onClick={() => {
                                        setPopup(!popup)
                                        setTargetId(user._id)
                                    }}>
                                        <BsThreeDotsVertical size={20} />
                                    </button>

                                    {user._id == targetId && (
                                        <Popup
                                            varaint="user"
                                            id={user._id}
                                            onDelete={() => {
                                                setPopup(false)
                                                setTargetId(null)
                                                setShowDeleteConfirm(true)
                                            }}

                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )
            break;
        case "most-selling":
            return (
                <table className="w-full shadow-md p-2 rounded-xl overflow-hidden">
                    <thead>
                        <tr className="border-b border-gray-500">
                            {MostSellingProductColumn.map((column, index) => (
                                <th key={index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 4).map((item, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item._id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.productName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    ${item.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.totalSold}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="h-15 w-15 rounded-xl overflow-hidden">

                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {item.seller}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
    }
}