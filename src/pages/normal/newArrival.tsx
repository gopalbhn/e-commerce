import Footer from "@/components/normal/Footer";
import ProductCart from "@/components/normal/productCart";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const NewArrival = () => {

    const btnArray = ["All", "Electronics", "Accessories", "Bags", "Audio",]
    const [product, setProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([])
    const [filter, setFilter] = useState<string | null>("All")
    const navigate = useNavigate();

    const applyFilter = (filter: string) => {
        setFilter(filter)
        if (filter === "All") {
            setFilteredProduct(product)
            setFilter("All")
        }
        else {
            console.log('text', filter)
            const filtered = product.filter((item: any) => item.category.name === filter)
            console.log("filtered", filtered)
            setFilteredProduct(filtered)
            setFilter(filter)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product`)
            const data = await response.json()
            console.log("datafetched", data)
            setProduct(data.data)
            setFilteredProduct(data.data)
            setFilter("All")
        }
        fetchProduct()
    }, [])
    const [indicatorStyle, setIndicatorStyle] = useState<{ width?: number; height?: number; left?: number; top?: number }>({});

    const buttonRefs = useRef<HTMLButtonElement[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateIndicator = (index: number) => {
        const button = buttonRefs.current[index];
        const container = containerRef.current;

        if (!button || !container) return;

        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
            width: buttonRect.width,
            height: buttonRect.height,
            left: buttonRect.left - containerRect.left,
            top: buttonRect.top - containerRect.top
        })
    }

    useEffect(() => {
        if (!filter) return;

        const index = btnArray.indexOf(filter)

        if (index === -1) {
            return
        }
        requestAnimationFrame(() => {
            updateIndicator(index)
        })
    }, [filter])


    useEffect(() => {
        const handleResize = () => {
            if (!filter) return

            const index = btnArray.indexOf(filter)
            if (index !== -1) {
                updateIndicator(index)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [filter])

    return (
        <div className="h-full w-full">

            <div className="min-h-[calc(100vh-8rem)] px-4 md:px-10 space-y-10 mb-10">
                <div className="inline-flex mt-5 p-1 rounded-xl border border-primary">
                    <div ref={containerRef} className="relative flex flex-wrap items-center justify-start gap-1">
                        <div className="absolute z-0 rounded-lg bg-primary pointer-events-none transition-[transform,width,height] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                            style={{
                                width: `${indicatorStyle.width}px`,
                                height: `${indicatorStyle.height}px`,
                                transform: `translate(${indicatorStyle.left}px,${indicatorStyle.top}px)`,
                            }} />

                        {btnArray.map((item, index) => (
                            <button key={item} ref={(el: HTMLButtonElement) => {
                                buttonRefs.current[index] = el;
                            }} className={`relative z-10 px-4 py-2 rounded-lg font-ibm-plex-mono border-none outline-none ${filter === item ? "text-white" : "text-primary"}`}
                                onClick={() => applyFilter(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>


                <section className="h-full w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 items-center">
                    {
                        filteredProduct.slice(0, 8).map((item: any, index: any) => (
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
                        ))
                    }
                </section>
            </div>
            <Footer />
        </div>

    )
}

export default NewArrival