import useCartStore from "@/store/cartStore"
import UserStore from "@/store/userStore"

import { useEffect, useState } from "react"
import { CiHeart } from "react-icons/ci"
import { FaRegUserCircle } from "react-icons/fa"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { toast } from "sonner"
import Logo from "@/assets/ecom_logo.webp"

const NavBar = () => {
    const [color, setColor] = useState<string>("")
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const cartItem = useCartStore(state => state?.products)
    const cartItemLength = cartItem?.length;
    const user = UserStore(state => state?.user);
    console.log("user", user)
    const userId = user?.id
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 15) {
                setColor("bg-white/50 backdrop-blur-md")
            } else {
                setColor("bg-transparent")
            }
        }
        handleScroll();
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    async function handleLogOut() {
        const res = await fetch("http://localhost:3000/api/user/logout", {
            method: "POST",
            credentials: "include"
        })

        const data = await res.json()

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
        <div className={`h-15 w-full flex items-center gap-8 px-10 inset-0 sticky ${color} top-0 left-0 z-100`}>
            <div className="h-12 w-40  flex items-center justify-center text-white">
                <img src={Logo} alt="logo" className="w-full h-full object-cover " />
            </div>
            <div className="flex  items-center gap-6">
                {['Home', 'Category', 'Deals', 'New Arrivals'].map((item) => (
                    <Link to={`/${item == "Home" ? "" : item.trim().toLowerCase()}`} key={item} className="text-sm font-medium text-secondary cursor-pointer hover:text-primary hover:underline transition-colors duration-300">
                        {item}
                    </Link>
                ))}
            </div>
            <div className=" flex-1 flex  rounded-xl relative">
                <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input type="text" placeholder="Search for product"
                    className="w-full max-w-xl  pl-12 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light"
                />
            </div>
            <div className="flex items-center gap-4 ">
                <button className="p-2 rounded-full transition hover:bg-gray-100 group " onClick={() => navigate("/wishlist")}>
                    <CiHeart className="text-2xl" />
                </button>
                <button className="p-2 rounded-full transition hover:bg-gray-100 relative" onClick={() => navigate('/shoping-cart')}>
                    <IoCartOutline className="text-2xl" />
                    {cartItemLength > 0 && (
                        <span className="absolute top-0 right-0 bg-primary text-white rounded-full px-2 text-xs">
                            {cartItemLength}
                        </span>
                    )}
                </button>
                {
                    userId ? (
                        <button className="p-2 rounded-full transition hover:bg-gray-100 relative" onClick={() => setOpen(!open)}>
                            <FaRegUserCircle className="text-2xl" />
                            {open && (
                                <div className="absolute top-12 -right-5 bg-white shadow-lg rounded-lg w-28 flex flex-col items-center justify-center overflow-hidden">
                                    <button className="text-secondary hover:text-primary w-full  p-2 hover:bg-primary/30 cursor-pointer" onClick={() => navigate("/myorder")}>My Orders</button>
                                    <button className="text-secondary hover:text-primary w-full p-2 cursor-pointer hover:bg-primary/30" onClick={handleLogOut}>Logout</button>
                                </div>
                            )}
                        </button>
                        // <Button variant={"default"} onClick={handleLogOut}>
                        //     Logout
                        // </Button>
                    ) : (
                        <Button variant={"default"} onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )
                }
            </div>
        </div>
    )
}
export default NavBar