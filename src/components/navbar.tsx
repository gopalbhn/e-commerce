import { useEffect, useState } from "react"
import { CiHeart } from "react-icons/ci"
import { FaRegUserCircle } from "react-icons/fa"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const NavBar = () => {
    const [color, setColor] = useState<string>("")
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

    return (
        <div className={`h-15 w-full flex items-center gap-8 px-10 inset-0 sticky ${color} top-0 left-0 z-10`}>
            <div className="text-2xl font-bold text-primary">
                Logo
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
                <button className="p-2 rounded-full transition hover:bg-gray-100 group ">
                    <CiHeart className="text-2xl" />
                </button>
                <button className="p-2 rounded-full transition hover:bg-gray-100 ">
                    <IoCartOutline className="text-2xl" />
                </button>
                <button className="p-2 rounded-full transition hover:bg-gray-100 ">
                    <FaRegUserCircle className="text-2xl" />
                </button>
            </div>
        </div>
    )
}
export default NavBar