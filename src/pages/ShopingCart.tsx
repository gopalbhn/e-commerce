import { BiHeart, BiTrash } from "react-icons/bi";
import Footer from "../components/Footer";
const ShopingCart = () => {
    const cartItems = [
        {
            "id": "p1",
            "name": "Artisan Terracotta Vase",
            "price": 45.0,
            "quantity": 1,
            "image": "https://images.unsplash.com/photo-1612197527787-4a9b9c0d8b9b?auto=format&fit=crop&w=800&q=60",
            "variants": {
                "size": "Medium",
                "color": "Burnt Sienna"
            }
        },
        {
            "id": "p2",
            "name": "Lumina Smart Speaker Gen 2",
            "price": 129.0,
            "quantity": 1,
            "image": "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=60",
            "variants": {
                "color": "Charcoal Grey"
            }
        },
        {
            "id": "p3",
            "name": "Sustainable Cotton Lounge Set",
            "price": 88.0,
            "quantity": 2,
            "image": "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=60",
            "variants": {
                "size": "Large",
                "color": "Sage Green"
            }
        }
    ]


    return (
        <div className="h-full w-full flex flex-col">
            <section className='h-full w-full px-10 mt-5 mb-10'>
                <h1 className="text-title font-bold mb-8 mt-2">Your Shoping Cart</h1>
                <div className="flex items-center justify-center gap-10">

                    <div className="w-2/3  rounded-xl  space-y-5 ">
                        {
                            cartItems.map((item) => (
                                <div className="w-full  flex gap-2 shadow-md p-3 font-medium text-sm" key={item.id}>
                                    <div className="h-30 w-30 overflow-hidden rounded-xl">
                                        <img src={item.image} alt="Product Image" className="w-full h-full object-cover" />
                                    </div>
                                    <div className='h-full w-full flex flex-col gap-y-10 '>
                                        <div className="w-full flex justify-between">
                                            <div className="w-full ">
                                                <p>{item.name}</p>
                                                <p>Size: {item.variants.size} | Color: {item.variants.color}</p>
                                            </div>
                                            <div className='flex justify-end'>
                                                ${item.price}
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                                                <button className='px-3 py-1.5 hover:bg-gray-200'>-</button>
                                                <span className='text-sm font-semibold'>1</span>
                                                <button className='px-3 py-1.5 hover:bg-gray-200'>+</button>

                                            </div>
                                            <div className='flex justify-end items-center gap-x-3'>
                                                <button className='hover:text-primary flex items-center gap-x-2'>
                                                    <BiHeart /> Save for Later
                                                </button>
                                                <button className='hover:text-primary flex items-center gap-x-2'>
                                                    <BiTrash /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="w-1/3  p-6 rounded-xl shadow-md">
                        <h1 className="text-body font-semibold mb-8 mt-2">Order Summary</h1>
                        <div className="flex flex-col gap-y-3 py-3 border-b border-gray-400">

                            <div className="flex items-center justify-between">
                                <p>Subtotal</p>
                                <p>$120</p>
                            </div>
                            <div className="flex items-center justify-between">

                                <h2>Shipping</h2>
                                <h2>$10</h2>
                            </div>
                            <div className="flex items-center justify-between">

                                <h2>Tax</h2>
                                <h2>$1</h2>
                            </div>
                        </div>
                        <div className="w-full border-b border-gray-400">
                            <p>Discount Code</p>
                            <div className="w-full flex items-center justify-between my-3">
                                <input placeholder="Enter Code"
                                    className="py-1.5  px-8 rounded-xl border border-gray-300 bg-white"
                                >
                                </input>
                                <button className="py-1.5 px-3 rounded-xl bg-secondary-light text-white">Apply</button>
                            </div>
                        </div>
                        <div className="w-full ">
                            <div className="flex items-center justify-between my-3">
                                <p>Total</p>
                                <p>$120</p>
                            </div>
                        </div>
                        <button className="w-full py-2 mt-5 bg-primary-light text-white rounded-lg"> Proceed to Checkout</button>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    )
}

export default ShopingCart;