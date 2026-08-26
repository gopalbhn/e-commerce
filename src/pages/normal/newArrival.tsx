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

    useEffect(() => {
        const index = btnArray.indexOf(filter);
        const button = buttonRefs.current[index];

        if (button) {
            setIndicatorStyle({
                width: button.offsetWidth,
                height: button.offsetHeight,
                left: button.offsetLeft,
                top: button.offsetTop,
            });
        }
    }, [filter]);
    return (
        <div className="h-full w-full">

            <div className="min-h-[calc(100vh-8rem)] px-4 md:px-10 space-y-10 mb-10">
                <div className="relative flex flex-wrap items-center justify-start gap-2 mt-5">
                    <div
                        className="absolute rounded-lg bg-primary transition-all duration-500 ease-in-out"
                        style={{
                            width: `${indicatorStyle?.width}px`,
                            height: `${indicatorStyle?.height}px`,
                            transform: `translate(${indicatorStyle?.left}px, ${indicatorStyle?.top}px)`,
                        }}
                    />
                    {btnArray.map((item, index) => (
                        <button
                            key={index}
                            ref={(el: any) => (buttonRefs.current[index] = el)}
                            className={`relative z-10 px-4 py-2 rounded-lg transition-colors duration-300 font-ibm-plex-mono ${filter === item
                                ? "text-white"
                                : "border border-primary text-primary"
                                }`}
                            onClick={() => applyFilter(item)}
                        >
                            {item}
                        </button>
                    ))}
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