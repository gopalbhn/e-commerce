import { FaRegUserCircle } from "react-icons/fa"
import { GoHeart, GoHome } from "react-icons/go"
import { IoCartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"



const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;
    return (
        <div className="w-full md:hidden border-t border-gray-200  bg-white/50 backdrop-blur-sm py-2 z-50 fixed bottom-0  px-6">
            <div className="grid grid-cols-4">
                <div onClick={() => navigate("/")} className={`flex flex-col items-center ${current === "/" ? "text-secondary" : "text-gray-500"}`}>
                    <GoHome size={18} />
                    <p>Home</p>
                </div>
                <div onClick={() => navigate("/wishlist")} className={`flex flex-col items-center ${current === "/wishlist" ? "text-secondary" : "text-gray-500"}`}>
                    <GoHeart size={18} />
                    <p>Wishlist</p>
                </div>
                <div onClick={() => navigate("/profile")} className={`flex flex-col items-center ${current === "/profile" ? "text-secondary" : "text-gray-500"}`}>
                    <FaRegUserCircle size={18} />
                    <p>Profile</p>
                </div>
                <div onClick={() => navigate("/shoping-cart")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                    <IoCartOutline size={18} />
                    <p>Cart</p>
                </div>
            </div>

        </div>
    )
}

export default BottomNav