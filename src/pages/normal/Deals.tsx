import Footer from "@/components/normal/Footer"
import ProductCart from "@/components/normal/productCart"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ProductInterface } from "@/types/types"
import { Button } from "@/components/ui/button"
import { FaArrowRightLong } from "react-icons/fa6"

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
        <div className="h-full w-full space-y-15">
            <section className="h-[80vh] w-full ">
                <div className="h-full w-full">
                    <Carousel />
                </div>

            </section>
            <div className="h-full px-4 md:px-10  space-y-15">



                <section className="h-full w-full ">
                    <div className="w-full">
                        <h1 className="text-header text-left font-semibold capitalize font-fraunces">Deals of the day</h1>
                        <p className="text-body text-secondary font-ibm-plex-mono">Limited time offers on top products. Don't miss Out</p>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 items-center ">
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

                <section className="h-full w-full">
                    <div className="w-full">
                        <h1 className="text-header text-left font-semibold capitalize font-fraunces">This Month Best Deal</h1>
                        <p className="text-body text-secondary font-ibm-plex-mono">Limited time offers on top products. Don't miss Out</p>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 items-center sroll-reveal">
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
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
        tag: "LIMITED TIME OFFER",
        headline: (
            <>
                Amazing Deals on{" "}
                <span className="text-primary">Electronics</span>
            </>
        ),
        sub: "Discover the latest gadgets, premium audio, smart devices, and accessories at prices you'll love.",
        cta: "Shop Now",
    },
    {
        image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
        tag: "NEW ARRIVALS",
        headline: (
            <>
                Premium Sound.{" "}
                <span className="text-primary">Perfectly Yours.</span>
            </>
        ),
        sub: "Experience immersive sound with our collection of premium headphones and wireless audio.",
        cta: "Explore Audio",
    },
    {
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
        tag: "SMART TECHNOLOGY",
        headline: (
            <>
                Smart Tech for{" "}
                <span className="text-primary">Every Day</span>
            </>
        ),
        sub: "Upgrade your everyday life with stylish smartwatches and the newest wearable technology.",
        cta: "Shop Smartwatches",
    },
    {
        image:
            "https://images.unsplash.com/photo-1592286927505-2fd0d9d7f3c5?auto=format&fit=crop&w=1200&q=80",
        tag: "FLASH SALE",
        headline: (
            <>
                Upgrade Your{" "}
                <span className="text-primary">Tech Setup</span>
            </>
        ),
        sub: "Find powerful gadgets and accessories designed to make your workspace smarter and better.",
        cta: "View Flash Deals",
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
                        className="absolute inset-0 bg-cover"

                    />
                    <div className="grid grid-cols-2 h-full w-full">
                        <div className="h-full w-full bg-transparent px-20">
                            <div className="h-full w-full flex flex-col justify-center gap-10">
                                <div className="space-y-2">
                                    <p className="font-body text-secondary font-ibm-plex-mono">{s.tag}</p>
                                    <h1 className="text-header font-semibold capitalize font-fraunces">{s.headline}</h1>
                                    <p className="text-body text-secondary font-ibm-plex-mono">{s.sub}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Button className="group flex items-center gap-3 ">
                                        {s.cta}
                                        <FaArrowRightLong
                                            size={12}
                                            className="transition-transform duration-500 ease-in-out group-hover:cursor-pointer group-hover:translate-x-[5px]"
                                        />
                                    </Button>


                                </div>
                            </div>

                        </div>
                        <div className="h-full w-full bg-primary">
                            <div className="h-full w-full flex items-center justify-center">
                                <img src={s.image} loading="lazy" decoding="async" alt={s.tag} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default Deals;