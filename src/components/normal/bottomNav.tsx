
import UserStore from "@/store/userStore";

import { GoHeart, GoHome } from "react-icons/go"
import { IoCartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"



const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;
    const user = UserStore((state: any) => state?.user)
    let roles = user?.role
    console.log("user role`", roles)
    return (
        <div className="w-full md:hidden border-t border-gray-200  bg-white/50 backdrop-blur-sm py-2 z-50 sticky bottom-0 px-6">
            <div className="grid grid-cols-3">
                <div onClick={() => navigate("/")} className={`flex flex-col items-center ${current === "/" ? "text-secondary" : "text-gray-500"}`}>
                    <GoHome size={18} />
                    <p>Home</p>
                </div>
                {
                    roles !== "Seller" && (

                        <div onClick={() => navigate("/wishlist")} className={`flex flex-col items-center ${current === "/wishlist" ? "text-secondary" : "text-gray-500"}`}>
                            <GoHeart size={18} />
                            <p>Wishlist</p>
                        </div>
                    )
                }
                {
                    roles == "Seller" && (
                        <>
                            <div onClick={() => navigate("/seller/product")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                                <IoCartOutline size={18} />
                                <p>Products</p>
                            </div>

                            <div onClick={() => navigate("/seller/orders")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                                <IoCartOutline size={18} />
                                <p>Orders</p>
                            </div>
                        </>
                    )
                }
                {roles !== "Seller" && (
                    <div onClick={() => navigate("/shoping-cart")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                        <IoCartOutline size={18} />
                        <p>Cart</p>
                    </div>
                )}
            </div>

        </div >
    )
}

export default BottomNav