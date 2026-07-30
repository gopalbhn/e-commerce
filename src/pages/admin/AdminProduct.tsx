import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import Table from "@/components/normal/table"
// import Table from "@/components/admin/table"

import { useEffect, useState } from "react"
import { FaRegEye, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const AdminProduct = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product`)
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setProducts(data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const productColumn = [{
    header: "Id",
    accessor: "_id"
  }, {
    header: "Product Name",
    accessor: "name"
  }, {
    header: "Category",
    render: (item: any) => item?.category?.name
  },
  {
    header: "Price",
    accessor: "price"
  }, {
    header: "Stock",
    accessor: "stock"
  }, {
    header: "Image",
    render: (item: any) => (
      <div className="w-14 h-14 rounded-md overflow-hidden">
        <img src={item.thumbnails} alt="" className="w-full h-full object-cover" />
      </div>
    )
  }, {
    header: "Actions",
    render: (data: any) => (
      <div className="flex items-center gap-x-2">

        <button onClick={() => navigate(`/product-detail/${data._id}`)} className="p-4 hover:text-primary rounded-xl">
          <FaRegEye size={15} />
        </button>

        <button onClick={() => handleProductDelete(data._id)} className="p-4 hover:text-red-500 rounded-xl">
          <FaTrash size={15} />
        </button>
      </div>
    )
  }]
  return (
    <div className='h-full w-full'>
      <AdminSideBar open={open} />
      <section
        className={`flex-1 transition-all duration-300 px-10 mb-10 ${open ? "ml-[15%]" : "ml-0"
          }`}
      >
        <AdminTopBar text="Product" onclick={() => setOpen(!open)} />

        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-body font-semibold">All Product</h1>
              <p className="text-sm text-gray-500">Manage and display all products</p>
            </div>
            <input type="text"
              placeholder="Search by name or category..."
              className="border border-gray-300 p-2 rounded-xl w-64 focus:ring-2 focus:ring-primary/30 focus-outline-none focus:outline-none"
            />

          </div>
          {/* <Table varaint="product" data={products} /> */}
          <Table data={products} columns={productColumn} />
        </div>
      </section>
    </div>
  )
}

export default AdminProduct;

function handleProductDelete(_id: any): void {
  throw new Error("Function not implemented.")
}
