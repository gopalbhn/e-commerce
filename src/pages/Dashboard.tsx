import { useCallback, useEffect, useRef, useState } from "react"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import CategoryCart from "../components/categoryCart"
import Footer from "../components/Footer"
import ProductCart from "../components/productCart"
import { category, products } from "../types/types"


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
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const total = heroSlides.length

    const goTo = useCallback(
        (index: number) => {
            if (animating) return
            setAnimating(true)
            setCurrent((index + total) % total)
            setTimeout(() => setAnimating(false), 600)
        },
        [animating, total]
    )

    const next = useCallback(() => goTo(current + 1), [current, goTo])
    const prev = useCallback(() => goTo(current - 1), [current, goTo])

    // auto-play
    useEffect(() => {
        timerRef.current = setTimeout(next, AUTOPLAY_INTERVAL)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [current, next])

    const slide = heroSlides[current]

    return (
        <section className="relative w-full h-145 overflow-hidden rounded-xl shadow-md select-none">

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

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl">
                <span
                    key={`tag-${current}`}
                    className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3
                               animate-[fadeSlideUp_0.5s_ease_both]"
                >
                    {slide.tag}
                </span>
                <h2
                    key={`h-${current}`}
                    className="text-5xl font-bold leading-tight
                               animate-[fadeSlideUp_0.5s_0.1s_ease_both]"
                >
                    {slide.headline}
                </h2>
                <p
                    key={`p-${current}`}
                    className="mt-4 text-secondary text-base max-w-md
                               animate-[fadeSlideUp_0.5s_0.2s_ease_both]"
                >
                    {slide.sub}
                </p>
                <button
                    key={`btn-${current}`}
                    className="mt-7 self-start px-7 py-3 bg-primary text-white rounded-lg
                            
                               font-medium hover:bg-primary-hover transition-colors duration-200
                               animate-[fadeSlideUp_0.5s_0.3s_ease_both]"
                >
                    {slide.cta}
                </button>

            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30
                           w-10 h-10 flex items-center justify-center
                           bg-white/70 hover:bg-white rounded-full shadow
                           transition-colors duration-200"
            >
                <IoChevronBackOutline className="text-xl text-secondary" />
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30
                           w-10 h-10 flex items-center justify-center
                           bg-white/70 hover:bg-white rounded-full shadow
                           transition-colors duration-200"
            >
                <IoChevronForwardOutline className="text-xl text-secondary" />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === current
                            ? "w-7 h-2.5 bg-primary"
                            : "w-2.5 h-2.5 bg-white/60 hover:bg-white"
                            }`}
                    />
                ))}
            </div>

        </section>
    )
}

const Dashboard = () => {
    const navigate = useNavigate();

    const endTime = useRef(Date.now() + 5 * 60 * 60 * 1000);
    function FlashShaleCountDown() {
        const difference = endTime.current - new Date().getTime()
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
    }, [])

    return (
        <div className="h-full w-full space-y-10">
            <HeroCarousel />
            <section className="h-full w-full px-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col">

                        <h2 className="text-title font-semibold line-height-[40px] ">Flash Sale</h2>
                        <p>Grab your offer fast</p>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <p className="font-bold uppercase text-small">Ends In:</p>
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
                <div className="h-full w-full grid grid-cols-4 items-center gap-4 mt-5">
                    {products.slice(0, 4).map((product, index) => (
                        <ProductCart
                            image={product.img}
                            name={product.name}
                            price={product.price}
                            old={product.old}
                            key={index}
                            discount={product.discount}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail/${product.id}`)}
                        />
                    ))}
                </div>
            </section>
            <section className="h-full w-full px-10">
                <h1 className="text-title text-center font-semibold line-height-[40px]">Shop by Category</h1>
                <div className="w-full grid grid-cols-5 gap-4 items-center mb-10 mt-5">
                    {category.map((item, index) => (
                        <CategoryCart
                            icon={item.icon}
                            title={item.title}
                            key={index}
                        />
                    ))}

                </div>

            </section>

            <section className="h-full w-full px-10">
                <h1 className="text-title font-semibold line-height-[40px] mb-10">Just For You</h1>


                <div className="grid grid-cols-4 gap-4">
                    {products.slice(0, 8).map((product, index) => (
                        <ProductCart
                            image={product.img}
                            name={product.name}
                            price={product.price}
                            old={product.old}
                            discount={product.discount}
                            key={index}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail`)}
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}


export default Dashboard