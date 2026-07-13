
import { GoPackage } from "react-icons/go"
import { IoBagOutline } from "react-icons/io5"
import { LuLogOut } from "react-icons/lu"
import { MdOutlineDashboard } from "react-icons/md"
import { RiCoupon3Line } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"


const SellerSideBar = ({ open }: { open: boolean }) => {
    const location = useLocation();
    const MenuItems = [
        { id: 1, title: "Dashboard", link: '/', icon: MdOutlineDashboard },
        { id: 2, title: "Products", link: '/seller/product', icon: GoPackage },
        { id: 3, title: "Orders", link: "/seller/orders", icon: IoBagOutline },
        { id: 4, title: "Coupons", link: "/seller/coupons", icon: RiCoupon3Line },
    ]

    async function handleLogOut() {
        const res = await fetch("http://localhost:3000/api/user/logout", {
            method: "POST",
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Logout Successful")
            setTimeout(() => {
                window.location.href = "/"
            }, 1500)
        } else {
            toast.error("Logout Failed")
        }

    }

    return (
        <div className={`h-screen w-1/4 flex flex-col fixed top-0 left-0 z-20 bg-white shadow-sm border-r border-gray-400 p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-center">

                <h1 className="text-xl text-center  font-bold text-primary tracking-tight">Logo</h1>
            </div>
            <div className="px-3 py-2.5 my-5 flex items-center gap-3.5 rounded-xl shadow-sm ">
                <div className="h-10 w-10 rounded-full border border-primary bg-gray-400">
                </div>
                <div>

                    <p className="text-md font-bold">Alex Sandro</p>
                    <p className="font-bold text-sm">Seller</p>
                </div>
            </div>

            {MenuItems.map((item) => {
                const active = item.link === location.pathname;
                return (
                    <Link to={item.link} key={item.id} className={` w-full flex items-center  gap-1 px-4 py-2.5  mb-1 rounded-xl hover:bg-primary-hover/1 hover:text-primary transition-colors ${active ? "underline text-primary" : ""}`}>
                        <item.icon className="w-4 h-4 shrink-0" />
                        <p>{item.title}</p>
                    </Link>
                )
            })}

            <div className="w-full flex items-center justify-center  absolute px-3 bottom-10 left-0">
                <button onClick={handleLogOut} className=" w-full flex items-center px-6 gap-2 py-2.5 hover:bg-primary-hover/5 hover:text-primary">
                    <LuLogOut className="text-xl" />
                    Logout
                </button>
            </div>


        </div>

    )
}

export default SellerSideBar