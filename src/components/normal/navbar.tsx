
import UserStore from "@/store/userStore"

import { useEffect, useState } from "react"

import { FaRegUserCircle } from "react-icons/fa"

import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { toast } from "sonner"
import Logo from "@/assets/ecom_logo.webp"
import mobileLogo from "@/assets/logo_mobile.webp"
import { ActionSearchBar } from "../ui/searchSuggestion"
import { Search, X } from "lucide-react"
import SearchBox from "./SearchBox"

const NavBar = () => {
    const [color, setColor] = useState<string>("")
    const [open, setOpen] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const navigate = useNavigate();

    const user = UserStore(state => state?.user);
    const userId = user?.id
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 15) {
                setColor("bg-white/50 backdrop-blur-md")
            } else {
                setColor("bg-transparent ")
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
    const currentPath = window.location.pathname;

    return (
        <div className={`h-15 w-full flex  items-center gap-2 md:gap-8 px-2 md:px-10 inset-0  ${currentPath == "/" || currentPath == "/deals" ? "fixed" : "sticky"} ${color} top-0 left-0 z-100 ${currentPath == "/" && color == "bg-transparent " ? "text-white" : "text-grey"} `}>
            <div className="h-10 md:h-12 w-30 md:w-40  flex items-center justify-center text-white  ">
                <img src={Logo} alt="logo" className="w-full h-full object-cover hidden md:block " />
                <img src={mobileLogo} alt="logo" className="w-full h-full object-contain md:hidden block " />
            </div>

            <div className="flex  items-center gap-6 hidden md:flex pl-6">
                {['Home', 'Category', 'Deals', 'New Arrivals'].map((item) => {
                    const active = item == "Home" ? "/" : item === "New Arrivals" ? "/newarrivals" : `/${item.trim().toLowerCase()}`

                    return (
                        <Link
                            to={active}
                            key={item}
                            className={`relative text-sm font-medium font-ibm-plex-mono cursor-pointer transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${currentPath === active ? "text-primary after:w-full" : "after:w-0 hover:after:w-1/2"}`}>
                            {item}
                        </Link>

                    )
                })}
            </div>
            <div className=" flex-1 flex justify-end  rounded-xl  ">
                <Search onClick={() => setIsFocused(true)} className="md:hidden" />

                <ActionSearchBar />
                {isFocused && <SearchBox onclick={() => setIsFocused(!isFocused)} />}
            </div>
            <div className="flex items-center gap-1 md:gap-4 justify-end ">

                {
                    userId ? (
                        <button className="p-2 rounded-full transition hover:bg-gray-100 relative" onClick={() => setOpen(!open)}>
                            <FaRegUserCircle className="text-2xl" />
                            {open && (
                                <div className="absolute top-12 -right-5 bg-white shadow-lg rounded-lg w-28 flex flex-col items-center justify-center overflow-hidden font-ibm-plex-mono">
                                    <button className="text-grey hover:text-primary w-full  p-2 hover:bg-primary/30 cursor-pointer" onClick={() => navigate("/myorder")}>My Orders</button>
                                    <button className="text-grey hover:text-primary w-full p-2 hover:bg-primary/30 cursor-pointer" onClick={() => navigate("/purchase-history")}>History</button>
                                    <button className="text-grey hover:text-primary w-full p-2 cursor-pointer hover:bg-primary/30" onClick={handleLogOut}>Logout</button>
                                </div>
                            )}
                        </button>

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