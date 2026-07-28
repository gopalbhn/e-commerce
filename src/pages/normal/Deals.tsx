import ProductCart from "@/components/normal/productCart"
import { useEffect, useState } from "react"

const Deals = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/product`)
            const data = await response.json()
            console.log("datafetched", data)
            setProduct(data.data)
        }
        fetchProduct()
    }, [])
    console.log(product)
    const Electronics = product.filter((item: any) => item.category.name === "Audio")
    console.log("Electronics", Electronics)

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100vh-8rem)]  px-10 space-y-5">
                <section className="h-full w-full ">
                    <h1 className="text-2xl text-left font-semibold">Electornics</h1>
                </section>
                <section className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
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
                </section>
            </div>
        </div>
    )
}


export default Deals;