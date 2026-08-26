import { BiTrash } from "react-icons/bi";
import Footer from "../../components/normal/Footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiHeart } from "react-icons/fi";

import OrderSummaryTable from "@/components/normal/orderSummary";
import { useNavigate } from "react-router-dom";
import NotFound from "@/components/normal/not-found";
import { ShoppingCart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ShopingCart = () => {


    const [products, setProducts] = useState<any[]>([]);
    const [isWishListed, setIsWishlisted] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState<any[]>([])
    const [cart, setCart] = useState<any[]>([])


    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);



    const handleSelectedProduct = (id: string) => {

        if (selectedProduct.some(selected => selected.id === id)) {
            setSelectedProduct(selectedProduct.filter((item) => item.id !== id))
            setCart(prev => prev.filter(item => item.products._id !== id))
        } else {
            const quantity = products.find(item => item._id === id)?.quantity
            setSelectedProduct([...selectedProduct, { id, quantity: quantity }])
            setCart(prev => [
                ...prev,
                {
                    products: products.find((item: any) => item._id === id),
                    quantity: products?.find((item: any) => item._id === id)?.quantity,
                }
            ])
        }
    }

    async function fetchCartItems() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/cart`, {
            credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
            const allProducts = data.data.products.map((item: any) => ({
                ...item.productId,
                quantity: item.quantity

            }));
            console.log("all products", allProducts)
            setProducts(allProducts);

        }
    }

    async function removeFromCart(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/remove/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            toast.success("Item Removed Successfully");
            setTimeout(() => {
                fetchCartItems()
            }, 500)
        }
    }



    async function addToWishList(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/add/${id}`, {
            method: "POST",
            credentials: "include"
        })
        if (res.ok) {
            setIsWishlisted(true)
            setTimeout(() => {
                toast.success("Added Successfully")
            }, 500)
        }
    }

    async function removeFromWishList(id: string) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/remove/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        if (res.ok) {
            setIsWishlisted(false)
            setTimeout(() => {
                toast.success("Removed Successfully")
            }, 500)
        }
    }

    async function updateProductQuantitiy(id: string, quantity: number) {
        console.log("quantity", quantity)
        if (quantity < 1) {
            toast.error("Quantity must be at least 1")
            return
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/update-cart/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity
                })
            })
            const data = await res.json()
            if (data.success) {
                await fetchCartItems()
                toast.success("Quantity Updated Successfully")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProceedToCheckout = async () => {
        console.log("control here ")
        if (selectedProduct.length === 0) {
            toast.error("Please select at least one product")
            return
        }
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/checkout/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: selectedProduct
            })
        })

        const data = await res.json()
        if (data.success) {
            navigate("/checkout",)
        }

    }

    console.log("cart", cart)

    if (products.length == 0) {
        return (
            <NotFound
                icon={ShoppingCart}
                eyebrow={""}
                title={"Your Shoping Cart is empty"}
                description={"Add items to your cart to save them for later."}
                buttonText={"Shop Now"}
                onButtonClick={() => {
                    navigate("/")
                }}
                showButton={true}

            />
        )
    }

    return (
        <div className="h-full w-full flex flex-col">
            <section className='h-full w-full px-4 md:px-10 mt-5 mb-10'>
                <h1 className="text-title font-bold mb-8 mt-2 font-fraunces">Your Shoping Cart</h1>
                <div className="flex flex-col md:flex-row justify-center gap-10">

                    <div className="w-full md:w-2/3 space-y-5  rounded-xl">
                        {
                            products?.map((item) => {
                                console.log("product selected", selectedProduct)
                                const isSelected = selectedProduct.some(selected => selected.id == item._id)
                                return (

                                    <div className={`w-full  flex gap-2 shadow-md p-3 font-medium font-ibm-plex-mono text-sm ${isSelected ? "bg-primary/5 scale-95" : ""}`} key={item.id} onClick={() => handleSelectedProduct(item._id)} >
                                        <div className='flex items-center justify-center w-5 h-5'>
                                            <Checkbox checked={isSelected} onCheckedChange={() => handleSelectedProduct(item._id)} />
                                        </div>
                                        <div className="h-30 w-30 overflow-hidden rounded-xl">

                                            <img src={item?.thumbnails} alt="Product Image" className="w-full h-full object-cover" />
                                        </div>
                                        <div className='h-full w-full flex flex-col gap-y-8 '>
                                            <div className="w-full flex items-center justify-between">
                                                <div className="w-full ">
                                                    <p>{item.name}</p>
                                                    <p>Total quantity: {item.quantity}</p>
                                                    <p> Price: Npr.{item.price}</p>
                                                    {/* <p>Size: {item.variants.size} | Color: {item.variants.color}</p> */}
                                                </div>
                                                <div className='flex justify-end'>
                                                    <p> Npr.{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between">
                                                <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                    <button className={`px-3 py-1.5 hover:bg-gray-200 ${isSelected ? "bg-primary/5" : ""}`} disabled={isSelected} onClick={(e) => {
                                                        e.stopPropagation()
                                                        updateProductQuantitiy(item._id, item.quantity - 1)
                                                    }} >-</button>
                                                    <span className='text-sm font-semibold'>{item.quantity}</span>
                                                    <button className={`px-3 py-1.5 hover:bg-gray-200 ${isSelected ? "bg-primary/5" : ""}`} disabled={isSelected} onClick={(e) => {
                                                        e.stopPropagation()
                                                        updateProductQuantitiy(item._id, item.quantity + 1)
                                                    }} >+</button>

                                                </div>
                                                <div className='flex justify-end items-center gap-x-3'>
                                                    {isWishListed ? (
                                                        <button className='w-5 h-5' onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeFromWishList(item._id)
                                                        }}>
                                                            <FiHeart fill='red' className='w-full h-full text-red-500' />
                                                        </button>
                                                    ) : (
                                                        <button className='w-5 h-5' onClick={(e) => {
                                                            e.stopPropagation()
                                                            addToWishList(item._id)
                                                        }}>
                                                            <FiHeart className='h-full w-full' />
                                                        </button>
                                                    )}
                                                    <button className='hover:text-primary flex items-center gap-x-2' onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeFromCart(item._id)
                                                    }}>
                                                        <BiTrash /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    <div className="w-full md:w-1/3  p-6 rounded-xl shadow-md">

                        <OrderSummaryTable data={cart} handleCheckout={handleProceedToCheckout} />
                    </div>
                </div>
            </section >
            <Footer />

        </div >
    )
}




export default ShopingCart;