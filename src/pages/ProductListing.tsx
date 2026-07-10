import { FaRegStar, FaStar } from "react-icons/fa"

import ProductCart from "../components/productCart"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { products } from "@/lib/data"


const ProductListing = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState<number>(8);
    return (
        <div className="h-full w-full px-10 flex ">
            <CategoryList />
            <section className="h-full w-4/5 ml-10 mb-10">
                <div className="w-full rounded-xl p-5 flex items-center justify-between ">
                    <h1 className="text-title font-semibold">Collection</h1>
                    <div className="flex items-center gap-2">
                        <p> Showing 4 out of 20 Products </p>
                        <select className="rounded-lg p-2 border border-gray-300">
                            <option>Default Sort</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                            <option>Rating High to Low</option>
                            <option>Rating Low to High</option>
                        </select>
                    </div>
                </div>
                <div className="h-[70%]  overflow-y-auto w-full grid grid-cols-3 gap-4">
                    {products.slice(0, currentIndex).map((product, index) => (
                        <ProductCart
                            key={index}
                            name={product.name}
                            price={product.price}
                            old={product.old}
                            discount={product.discount}
                            image={product.img}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail`)}
                        />
                    ))}
                </div>
                <div className='flex items-center justify-center mt-10'>
                    {currentIndex < products.length ? (
                        <button onClick={() => setCurrentIndex(currentIndex + 4)} className='rounded-xl bg-primary-light text-white py-2 px-4'>
                            Load More
                        </button>
                    ) : (
                        <div className="h-full w-full text-center font-semibold">No more products</div>
                    )}
                </div>
            </section>
        </div>
    )
}

const CategoryList = () => {
    return (
        <div className="h-full w-1/5 rounded-xl p-4 border border-gray-300  mb-5 text-sm ">
            <div >
                <h3 className="text-body font-semibold mb-4">Categories</h3>
                <ul className="flex flex-col gap-2">
                    <li><a href="#">Electronics</a></li>
                    <li><a href="#">Fashion</a></li>
                    <li><a href="#">Home Appliance</a></li>
                    <li><a href="#">Beauty</a></li>
                    <li><a href="#">Sports</a></li>
                </ul>

            </div>
            <div className="mt-2">
                <h3 className="text-body font-semibold mb-4">Brand</h3>
                <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                        <input type="checkbox" className="h-5 w-5 rounded-md accent-violet-500" />
                        <label htmlFor="Luminia" className="text-sm">
                            Luminia
                        </label>
                    </li>
                    <li className="flex items-center gap-2">
                        <input type="checkbox" className="h-5 w-5 rounded-md accent-violet-500" />
                        <label htmlFor="Nordic" className="text-sm">
                            Nordic Design
                        </label>
                    </li>
                    <li className="flex items-center gap-2">
                        <input type="checkbox" className="h-5 w-5 rounded-full accent-primary  " />
                        <label htmlFor="Urban">
                            Urban Edge
                        </label>
                    </li>

                </ul>

            </div>
            <div className="mt-2">
                <h3 className="text-body font-semibold mb-2 uppercase"> Price Range</h3>
                <div className="w-full">
                    <input type="range" className="h-2 w-full appearance-none 
                    rounded-lg bg-gray-200 accent-primary " />
                </div>
                <div className="flex justify-between items-center">
                    <p>$0</p>
                    <p>$100</p>
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-body font-semibold mb-2 uppercase"> Ratings</h3>
                <div className="space-y-3">

                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex  items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded-md accent-primary"
                            />

                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) =>
                                    index < rating ? (
                                        <FaStar key={index} className="text-yellow-400" />
                                    ) : (
                                        <FaRegStar key={index} className="text-gray-300" />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-3">
                <button className="w-full bg-primary text-white py-2 rounded-md">Apply Filters</button>
            </div>
        </div >
    )
}


export default ProductListing