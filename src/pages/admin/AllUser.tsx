import AdminSideBar from "@/components/admin/AdminSideBar"
import AdminTopBar from "@/components/admin/AdminTopBar"
// import Table from "@/components/admin/table"
import Table from "@/components/normal/table"

import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { toast } from "sonner"

const AllUsers = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [users, setUsers] = useState<any>([])

    async function fetchAllUser() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/all-users`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                console.log(data)
                setUsers(data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    const userColumn = [
        {
            header: "User ID",
            accessor: "_id"
        },
        {
            header: "Name",
            accessor: "name"
        },
        {
            header: "Email",
            accessor: "email"
        },
        {
            header: "Role",
            accessor: "role"
        },
        {
            header: "Actions",
            render: (data: any) => (
                <div className="flex items-center gap-x-2">
                    <button onClick={() => handleUserDelete(data._id)} className="p-4 hover:text-red-500 rounded-xl">
                        <FaTrash size={15} />
                    </button>

                </div>
            )
        }
    ]
    const handleUserDelete = async (userId: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/delete-user/${userId}`, {
                method: "DELETE",
                credentials: "include"
            })
            const data = await res.json()

            if (data.success) {
                toast.success("User deleted successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            }
        } catch (error) {
            console.log(error)
        }
    }
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
                    <Table data={users} columns={userColumn} />
                </div>
            </section>
        </div>
    )
}

export default AllUsers;