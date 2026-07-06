import { useNavigate } from "react-router-dom"
import CategoryCart from "../components/categoryCart"
import Footer from "../components/Footer"
import ProductCart from "../components/productCart"
import { category, products } from "../types/types"

const Dashboard = () => {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const seconds = new Date().getSeconds()
    const navigate = useNavigate();
    const time = [hours, minutes, seconds]
    return (
        <div className="h-full w-full space-y-10">
            <section className="relative w-full h-[600px] overflow-hidden bg-background rounded flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `
      linear-gradient(to right, rgba(253,248,248,0.6), rgba(253,248,248,0)),
      url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8DXH1YLRRiE707hXk-XubZ779iS7Zydn7GrgK0DuojORFD2HEJxZEnGnMP55aYwmWAgjDGCS_boikQtEtUrWgzqK6yqjUnnXKfRIgeAHiPndI5FsDRDZ6FWGuPXSpPy8MMbPd2PRIT-bRU1y9dmlSBH5UMoTNFBYYnsqG_4IoWnkQr9KGLYvng5iURIFRYpF8N4A5taOwyczLnqbh8dUdOFUsfEWOvdN76htUnp-9-n2fIcLJjwm0pA')
    `
                    }}
                />
                <div className="relative max-w-3xl px-10">
                    <h2 className="text-5xl font-bold">
                        Elevate Your Lifestyle with <span className="text-primary">Aura</span>
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Discover the Spring 2024 collection. Minimalist aesthetics <br></br> meet unparalleled quality in our curated essentials.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-primary-light text-white rounded-lg">
                        Shop Collection
                    </button>
                </div>
            </section>
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
                            onclick={() => navigate(`/product`)}
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
                            onclick={() => navigate(`/product`)}
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}


export default Dashboard