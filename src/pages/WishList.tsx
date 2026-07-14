import { Button } from "@/components/ui/button"
import Footer from "../components/Footer"
import ProductCart from "../components/productCart"

import { useEffect, useState } from "react"



const WishList = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchAllItem() {
            const res = await fetch("http://localhost:3000/api/wishlist/get", {
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                const allProducts = data.wishlist.flatMap(
                    (wishlist: any) => wishlist.products
                );
                setProducts(allProducts)
                console.log(allProducts)
            }
            console.log(products);
        }
        fetchAllItem();
    }, [])
    async function clearAll() {
        const res = await fetch("http://localhost:3000/api/wishlist/clear", {
            method: "DELETE",
            credentials: "include"
        })
        const data = await res.json()
        if (data.success) {
            setProducts([])
            window.location.reload();
        }
    }
    if (products?.length == 0) {
        return (
            <div className="h-full w-full flex flex-col">
                <section className='h-full w-full px-10 mt-5 mb-10'>
                    <h1 className="text-title font-bold mb-8 mt-2">Your WishList</h1>
                    <div className="flex  justify-center gap-10">
                        <div className="w-2/3  rounded-xl">
                            <p>Your WishList is empty</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    return (
        <div className="h-full w-full mb-10">
            <section className="h-full w-full px-10 mb-10 ">
                <div className="w-full flex items-center justify-between mt-5">
                    <div >
                        <h1 className="text-header font-semibold text-primary">My WishList</h1>
                        <p> Items Saved In Your Wishlist</p>
                    </div>
                    <div className="flex gap-x-2">
                        <Button variant="default" >Add All to Cart</Button>
                        <Button variant="default" onClick={clearAll}>Clear All</Button>
                    </div>
                </div>
                <div className="h-full grid grid-cols-4 items-center gap-5 mt-5">
                    {
                        products.map((product, index) => {
                            return <ProductCart key={index} id={product._id} image={product.thumbnails} name={product.name} price={product.price} old={product.oldPrice} discount={product.discount} isDiscounted={product.isDiscounted} wishList={true} />
                        })
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default WishList