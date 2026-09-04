
import UserStore from "@/store/userStore";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { FiTag } from "react-icons/fi";

import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go"
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"



const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;
    const user = UserStore((state: any) => state?.user)
    let roles = user?.role
    console.log("user role`", roles)
    return (
        <div className="w-[95%] mx-auto rounded-xl  md:hidden border-t border-gray-200  bg-white/80 backdrop-blur-xl py-2 z-50 fixed bottom-2 px-6">
            <div className={`grid ${roles == "Seller" ? "grid-cols-4" : "grid-cols-3"}`}>
                <div onClick={() => navigate("/")} className={`flex flex-col items-center  ${current === "/" ? "text-secondary  " : "text-gray-500"}`}>
                    {current == "/" ? <GoHomeFill size={18} /> : <GoHome size={18} />}


                    <p>Home</p>
                </div>
                {
                    roles !== "Seller" && (

                        <div onClick={() => navigate("/wishlist")} className={`flex flex-col items-center  ${current === "/wishlist" ? "text-secondary" : "text-gray-500"}`}>
                            {current == "/wishlist" ? <GoHeartFill size={18} /> : <GoHeart size={18} />}
                            <p>Wishlist</p>
                        </div>
                    )
                }
                {
                    roles == "Seller" && (
                        <>
                            <div onClick={() => navigate("/seller/product")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                                {current == "/seller/product" ? <AiFillProduct size={18} /> : <AiOutlineProduct size={18} />}
                                <p>Products</p>
                            </div>

                            <div onClick={() => navigate("/seller/orders")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                                {current == "/seller/orders" ? <IoCartOutline size={18} /> : <IoCartOutline size={18} />}
                                <p>Orders</p>
                            </div>
                            <div onClick={() => navigate("/seller/coupons")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                                {current == "/seller/coupons" ? <FiTag size={18} /> : <FiTag size={18} />}
                                <p>Coupons</p>
                            </div>
                        </>
                    )
                }
                {roles !== "Seller" && (
                    <div onClick={() => navigate("/shoping-cart")} className={`flex flex-col items-center ${current === "/cart" ? "text-secondary" : "text-gray-500"}`}>
                        {current == "/shoping-cart" ? <IoCartSharp size={22} className="text-secondary" /> : <IoCartOutline size={22} />}
                        <p>Cart</p>
                    </div>
                )}
            </div>

        </div >
    )
}



export default BottomNav