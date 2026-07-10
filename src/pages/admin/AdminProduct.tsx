import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
import Table from "@/components/admin/table"
import { productData } from "@/lib/data"
import { useState } from "react"

const AdminProduct = () => {
  const [open, setOpen] = useState<boolean>(true)
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
          <Table varaint="product" data={productData} />
        </div>
      </section>
    </div>
  )
}

export default AdminProduct;