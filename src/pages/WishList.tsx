import { Button } from "@/components/ui/button"
import Footer from "../components/Footer"
import ProductCart from "../components/productCart"
import { products } from "@/lib/data"



const WishList = () => {
    return (
        <div className="h-full w-full mb-10">
            <section className="h-full w-full px-10 mb-10 ">
                <div className="w-full flex items-center justify-between mt-5">
                    <div >
                        <h1 className="text-header font-semibold text-primary">My WishList</h1>
                        <p>5 Items Saved In Your Wishlist</p>
                    </div>
                    <div className="flex gap-x-2">
                        <Button variant="default">Add All to Cart</Button>
                        <Button variant="default" >Clear All</Button>
                    </div>
                </div>
                <div className="h-full grid grid-cols-4 items-center gap-5 mt-5">
                    {
                        products.filter(item => item.wishList === true).slice(0, 7).map((product, index) => {
                            return <ProductCart key={index} image={product.img} name={product.name} price={product.price} old={product.old} discount={product.discount} wishList={product.wishList} isDiscounted={product.isDiscounted} />
                        })
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default WishList