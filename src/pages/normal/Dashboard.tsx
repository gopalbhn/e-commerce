import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import CategoryCart from "../../components/normal/categoryCart"
import Footer from "../../components/normal/Footer"
import ProductCart from "../../components/normal/productCart"
import { category } from "@/lib/data.js"
import { toast } from "sonner"
import type { ProductInterface } from "@/types/types"
import ChatBot from "@/components/normal/chatBot"
import useScrollReveal from "@/hooks/observer-hook"


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

const AUTOPLAY_INTERVAL = 4500



const HeroCarousel = () => {
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const total = heroSlides.length

    const goTo = useCallback(
        (index: number) => {
            if (animating) return
            setAnimating(true)
            setCurrent((index + total) % total)
            setTimeout(() => setAnimating(false), 350)
        },
        [animating, total]
    )

    const next = useCallback(() => goTo(current + 1), [current, goTo])

    useEffect(() => {
        const loadTimer = setTimeout(() => setLoaded(true), 500)
        return () => clearTimeout(loadTimer)
    }, [])

    useEffect(() => {
        timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [next])

    const slide = heroSlides[current]


    return (
        <section className="relative h-screen min-h-[650px] w-full overflow-hidden bg-[#f3f1eb] select-none">

            {/* Images */}
            <div
                className={`absolute top-0 h-full overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(.77,0,.18,1)] ${loaded ? "left-0 w-full" : "left-1/2 w-1/2"
                    }`}
            >
                {heroSlides.map((s, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${i === current
                            ? "scale-100 opacity-100"
                            : "scale-105 opacity-0"
                            }`}
                        style={{ backgroundImage: `url('${s.image}')` }}
                    />
                ))}

                <div
                    className={`absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/30 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"
                        }`}
                />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 mt-40  px-6 text-white md:px-10 lg:px-[5vw]">
                <div
                    className={`max-w-2xl transition-all duration-500 ${animating
                        ? "translate-y-5 opacity-0 blur-md"
                        : "translate-y-0 opacity-100 blur-0"
                        }`}
                >
                    <p className="mb-5 text-xs font-semibold font-ibm-plex-mono uppercase tracking-[0.3em] text-white/70">
                        {slide.tag}
                    </p>

                    <h2 className="mb-7 text-xl font-semibold font-fraunces leading-[0.95] tracking-[-0.05em] sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.headline}
                    </h2>

                    <p className="mb-8 max-w-lg text-base leading-7 font-ibm-plex-mono text-white/80 md:text-lg">
                        {slide.sub}
                    </p>

                    <button className="group inline-flex items-center gap-4 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover">
                        {slide.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 font-ibm-plex-mono ${i === current
                            ? "w-8 bg-white"
                            : "w-2 bg-white/40"
                            }`}
                    />
                ))}
            </div>

        </section>
    )
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [remainingTime, setRemainingTime] = useState("")
    const [products, setProducts] = useState<ProductInterface[]>([])
    const [flashSale, setFlashSale] = useState<ProductInterface[]>([]);
    const [runningsale, setRunningSale] = useState(false)
    const [saleTitle, setSaleTitle] = useState("")
    function FlashShaleCountDown() {
        if (!remainingTime) return ["00", "00", "00"]
        const endTime = new Date(remainingTime).getTime()
        console.log("end time", endTime)
        const difference = endTime - new Date().getTime()
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return [
            String(hours).padStart(2, "0"),
            String(minutes).padStart(2, "0"),
            String(seconds).padStart(2, "0"),
        ];
    }

    const [time, setTime] = useState(FlashShaleCountDown());
    useEffect(() => {
        const id = setInterval(() => {
            setTime(FlashShaleCountDown())
        }, 1000)
        return () => clearInterval(id)

    }, [remainingTime])
    useEffect(() => {
        if (searchParams.get('login') == "success") {
            toast.success("Login Success")
        }
        fetchAllProduct();
        fetchFlashSale();
    }, [searchParams])

    const fetchAllProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product`)
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setProducts(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchFlashSale = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/flash-sale/products`)
            const data = await response.json();
            console.log(data)
            if (data.success) {
                console.log("data", data)
                console.log("products", data.product[0].products)
                setFlashSale(data.product[0].products)
                setRemainingTime(data.product[0].endTime)
                setSaleTitle(data.product[0].saleTitle)
                setRunningSale(true)
            } else {
                setRunningSale(false)
                setSaleTitle("Flash Sale")
            }
        } catch (error) {
            console.log(error)

        }
    }

    console.log("flashSale", flashSale)
    useScrollReveal()
    return (
        <div className="h-full w-full space-y-15  relative">
            <HeroCarousel />
            <ChatBot />
            {runningsale && (


                <section className="h-full w-full px-10 scroll-reveal">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex flex-col">

                            <h2 className="text-header font-semibold text-primary">{saleTitle}</h2>
                            <p className="text-body text-secondary">Grab your offer fast</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <p className="font-bold uppercase text-title">Ends In:</p>
                            <div className="flex gap-x-2">
                                {time.map((value, index) => {
                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className="p-2 bg-badge text-white rounded ">{value}</div>
                                            <p>{index === 0 ? "Hrs" : index === 1 ? "Min" : "Sec"}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="h-full w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 mt-5 ">
                        {flashSale.slice(0, 4).map((product, index) => (
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
                    </div>
                </section>
            )}
            <section className="h-full w-full px-4 md:px-10 scroll-reveal">
                <h1 className="text-header text-left font-semibold font-fraunces">Shop by Category</h1>
                <p className="text-body text-secondary font-ibm-plex-mono">Best deals and offers for you</p>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 items-center mb-10 mt-5">
                    {category.map((item, index) => (
                        <CategoryCart
                            image={item.image}
                            title={item.title}
                            key={index}
                        />
                    ))}

                </div>

            </section>

            <section className="h-full w-full px-4 md:px-10 scroll-reveal">
                <h1 className="text-header font-semibold font-fraunces line-height-[40px]">Just For You</h1>
                <p className="text-body text-secondary font-ibm-plex-mono">Curated just for you</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                    {products.slice(0, 8).map((product, index) => (
                        <ProductCart
                            id={product._id}
                            image={product.thumbnails}
                            name={product.name}
                            price={product.price}
                            old={product.oldPrice}
                            discount={product.discount}
                            key={index}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail/${product._id}`)}
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}


export default Dashboard