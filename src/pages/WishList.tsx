import Footer from "../components/Footer"
import ProductCart from "../components/productCart"
import { products } from "../types/types"


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
                        <button className="rounded-xl w-40 h-12 bg-primary text-white text-sm">Add All to Cart</button>
                        <button className="rounded-xl w-40 h-12 bg-primary text-white text-sm">Clear All</button>
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