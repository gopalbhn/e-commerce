import Footer from "@/components/normal/Footer"
import ProductCart from "@/components/normal/productCart"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ProductInterface } from "@/types/types"

const Deals = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState<ProductInterface[]>([])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product`)
            const data = await response.json()
            console.log("datafetched", data)
            setProduct(data.data)
        }
        fetchProduct()
    }, [])

    const discountedProduct = product.filter(pro => Number(pro.discount) > 0)
    console.log("discountedProduct", discountedProduct)
    return (
        <div className="h-full w-full">
            <section className="h-[80vh] w-full ">
                <div className="h-full w-full">
                    <Carousel />
                </div>

            </section>
            <div className="h-full  px-10 space-y-10 mb-10">



                <section className="h-full w-full mt-5 ">
                    <div className="w-full">
                        <h1 className="text-header text-left font-semibold capitalize">Deals of the day</h1>
                        <p className="text-body text-secondary">Limited time offers on top products. Don't miss Out</p>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-4 mt-5 items-center">
                        {product.slice(0, 4).map((item: any, index: any) => (
                            <ProductCart
                                id={item._id}
                                image={item.thumbnails}
                                name={item.name}
                                price={item.price}
                                old={item.oldPrice}
                                key={index}
                                discount={item.discount}
                                isDiscounted={item.isDiscounted}
                                wishList={item.wishList}
                                onclick={() => navigate(`/product-detail/${item._id}`)}
                            />
                        ))}
                    </div>
                </section>
                {/* <section className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    {Electronics.slice(0, 4).map((product: any, index: any) => (
                        <ProductCart
                            id={product._id}
                            image={product.thumbnails}
                            name={product.name}
                            price={product.price}
                            old={product.oldPrice}
                            key={index}
                            discount={product.discount}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail/${product._id}`)}
                        />
                    ))}
                </section> */}
                <section className="h-full w-full mt-5">
                    <div className="w-full">
                        <h1 className="text-header text-left font-semibold capitalize">This Month Best Deal</h1>
                        <p className="text-body text-secondary ">Limited time offers on top products. Don't miss Out</p>
                    </div>
                    <div className="w-full grid grid-cols-4 gap-4 mt-5 items-center">
                        {product.slice(4, 8).map((item: any, index: any) => (
                            <ProductCart
                                id={item._id}
                                image={item.thumbnails}
                                name={item.name}
                                price={item.price}
                                old={item.oldPrice}
                                key={index}
                                discount={item.discount}
                                isDiscounted={item.isDiscounted}
                                wishList={item.wishList}
                                onclick={() => navigate(`/product-detail/${item._id}`)}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}


const heroSlides = [
    {
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
        tag: "Spring Collection 2024",
        headline: (
            <>
                Elevate Your Lifestyle with{" "}
                <span className="text-primary">Aura</span>
            </>
        ),
        sub: "Minimalist aesthetics meet unparalleled quality in our curated essentials.",
        cta: "Shop Collection",
        overlay: "from-white/80 via-white/40 to-transparent",
    },
    {
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=80",
        tag: "New Arrivals",
        headline: (
            <>
                Precision Crafted{" "}
                <span className="text-primary">Timepieces</span>
            </>
        ),
        sub: "Explore our exclusive watch collection — built for those who value every second.",
        cta: "Discover Watches",
        overlay: "from-white/80 via-white/40 to-transparent",
    },
    {
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1800&q=80",
        tag: "Best Sellers",
        headline: (
            <>
                Sound That Moves{" "}
                <span className="text-primary">You</span>
            </>
        ),
        sub: "Premium audio gear for audiophiles and everyday listeners alike.",
        cta: "Shop Audio",
        overlay: "from-white/80 via-white/40 to-transparent",
    },
    {
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80",
        tag: "Flash Deals",
        headline: (
            <>
                Gear Up for{" "}
                <span className="text-primary">Adventure</span>
            </>
        ),
        sub: "Top-rated sports & outdoor essentials at prices that keep you moving.",
        cta: "View Deals",
        overlay: "from-white/80 via-white/40 to-transparent",
    },
]
const Carousel = () => {
    const [current, setCurrent] = useState(0)
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const total = heroSlides.length;

    const interval = 5000;
    useEffect(() => {
        timeRef.current = setTimeout(() => { setCurrent((prev) => (prev + 1) % total) }, interval)
        return () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current)
            }
        }
    }, [current])

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md select-none">

            {heroSlides.map((s, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${s.image}')` }}
                    />
                    <div
                        className={`absolute inset-0 bg-linear-to-r ${s.overlay}`}
                    />
                </div>
            ))}


        </div>
    )
}

export default Deals;