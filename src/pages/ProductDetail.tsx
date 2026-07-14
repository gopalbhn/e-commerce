
import { useEffect, useState } from 'react'
import { BiCart, BiCheckCircle } from 'react-icons/bi'
import { FiHeart, FiStar } from 'react-icons/fi'
import { HiMiniMagnifyingGlassPlus } from 'react-icons/hi2'

import Footer from '../components/Footer';
import { useParams, useSearchParams } from 'react-router-dom';


import useCartStore from '@/store/cartStore';
import { products } from '@/lib/data';
import { toast } from 'sonner';
import UserStore from '@/store/userStore';

const ProductDetail = () => {
  const [activeButton, setActiveButton] = useState<string>("Product Specs")
  const buttonList = ["Product Specs", "Description", "Reviews"];
  const user = UserStore(state => state?.user);
  const userId = user?.id;
  const [totalCartItem, setTotalCartItem] = useState<number>(1)
  const [isWishListed, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState(null)
  const { id } = useParams();

  const [previewimage, setPreviewimage] = useState<string>(product?.thumbnails)
  console.log(product)


  const addToCart = useCartStore(state => state?.addToCart)
  const handleAddToCart = () => {
    addToCart(product?.id, totalCartItem)
    setTimeout(() => {
      toast.success("Product added to cart")
    }, 1000)
  }

  async function checkWishlisted() {
    let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/check/${id}`, {
      credentials: "include"
    })

    if (!res.ok) {
      setIsWishlisted(false)
    }

    const data = await res.json();
    if (data.success) {
      setIsWishlisted(true)
    }

  }

  async function addToWishList() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/add/${id}`, {
      method: "POST",
      credentials: "include"
    })
    if (res.ok) {
      setIsWishlisted(true)
      setTimeout(() => {
        toast.success("Added Successfully")
      }, 500)
    } else {
      const data = await res.json()
      setTimeout(() => {
        toast.error(data.message)
      }, 500)
    }
  }

  async function removeFromWishList() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/remove/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    if (res.ok) {
      setIsWishlisted(false)
      setTimeout(() => {
        toast.success("Removed Successfully")
      }, 500)
    }
  }
  async function fetchProductDetail() {


    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/${id}`)
    if (!res.ok) {
      toast.error("Product not found")
    }
    const data = await res.json()
    if (data.success) {
      setProduct(data.data)
      setPreviewimage(data.data.thumbnails)
    }
  }

  useEffect(() => {
    fetchProductDetail()
    checkWishlisted();

  }, [])
  async function AddToCart() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/add-to-cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: totalCartItem
      })
    })
    const data = await res.json()
    if (data.success) {
      toast.success("Product added to cart")
    }

  }



  console.log(product)
  return (
    <div className='h-full w-full '>

      <h1 className='text-primary text-md px-14 font-semibold '>Home / Electornics / HeadPhone</h1>
      <section className='w-full h-[90vh] rounded-lg flex items-center justify-center gap-1 px-10'>
        <div className='w-1/2 h-full p-4 group'>
          <div className='relative h-[60vh] w-full flex justify-center items-center overflow-hidden '>
            <img src={previewimage} alt="Product Image" className='w-full h-full object-cover rounded-lg transition-soft duration-300 hover:scale-110' />
            <button className='absolute top-4 right-4 text-primary bg-white/50 text-2xl p-2 rounded-full hover:scale-110 transition-soft duration-300 backdrop-blur-sm'>
              <HiMiniMagnifyingGlassPlus />
            </button>
          </div>
          <div className="w-full h-30 grid grid-cols-5 gap-2 mt-6">
            {product?.images?.map((img: string) => (
              <div className="h-25 w-25 overflow-hidden rounded-lg hover:border border-primary " onClick={() => setPreviewimage(img)}>
                <img
                  src={img}
                  alt="Headphone 1"
                  className="w-full h-full object-cover rounded-lg "
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/2 h-full p-4 flex flex-col justify-center gap-y-4'>

          <h1 className='text-title font-bold'>{product?.name}</h1>

          <div className='flex items-center gap-4 '>
            <div className='flex items-center gap-2'>
              <FiStar className='text-yellow-500 text-xl' fill='currentColor' />
              <FiStar className='text-yellow-500 text-xl' fill='currentColor' />
              <FiStar className='text-yellow-500 text-xl' fill='currentColor' />
              <FiStar className='text-yellow-500 text-xl' fill='currentColor' />
              <FiStar className='text-yellow-500 text-xl' />
              <span className="ml-2 text-sm text-gray-500">4.8/5 (248 Reviews)</span>
            </div>
          </div>
          <div className='flex items-center gap-4 '>


            <h2 className='text-title font-bold text-primary'>${product?.price}</h2>
            <h2 className='text-body text-gray-500 line-through'>${product?.oldPrice}</h2>
            <h2 className='text-title font-bold text-primary-light'>{product?.discount}</h2>
          </div>
          <div className='  px-3 py-1.5 rounded-xl border border-gray-300 bg-[#f1edec]'>
            <p className='flex items-center gap-4 mb-1'>
              <BiCheckCircle className='text-2xl text-accent-light' />
              <span className='text-small font-semibold'>In Stock - {product?.stock} Left</span>
            </p>
            <p className='text-small font-semibold text-gray-500'>Order within 2h 15m for Same-Day Shipping.</p>
          </div>
          <div className='flex items-center gap-2'>
            <p>Save For later </p>
            {isWishListed ? (
              <button className='w-5 h-5' onClick={removeFromWishList}>
                <FiHeart fill='red' className='w-full h-full text-red-500' />
              </button>
            ) : (
              <button className='w-5 h-5' onClick={addToWishList}>
                <FiHeart className='h-full w-full' />
              </button>
            )}
          </div>
          <div className='flex flex-col gap-4 '>
            <p>
              <span className='font-bold text-sm mr-2'>Color:</span>
              Dark Walnut
            </p>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-[#3D2B1F] h-10 w-10 border border-gray-400'></div>
              <div className='rounded-full bg-[#6D4C41] h-10 w-10 border border-gray-400'></div>
              <div className='rounded-full bg-[#8D6E63] h-10 w-10 border border-gray-400'></div>

            </div>
          </div>
          <div className='flex flex-col gap-4 mb-6'>
            <p>Quantity</p>
            <div className='flex items-center gap-4 rounded-xl '>
              <div className='rounded-xl border border-gray-300 bg-white flex items-center gap-4'>
                <button className='px-4 py-2.5 hover:bg-gray-200' onClick={() => setTotalCartItem(prev => {
                  if (prev == 1) {
                    return 1
                  } else {
                    prev--;
                    return prev;
                  }
                })}>-</button>
                <span className='text-sm font-semibold'>{totalCartItem}</span>
                <button className='px-4 py-2.5 hover:bg-gray-200' onClick={() => setTotalCartItem(prev => {
                  if (prev >= product.quantity) {
                    return product.quantity;
                  } else {
                    prev++;
                    return prev;
                  }
                })}>+</button>

              </div>
              <button className='w-full max-w-xl px-10 py-4 rounded-xl bg-primary text-white flex items-center justify-center gap-x-2 hover:scale-101 transition-soft duration-300' onClick={AddToCart}>
                <BiCart className='text-xl' /> Add To cart
              </button>

            </div>

            <button className='w-full max-w-xl px-10 py-4 rounded-xl bg-black text-white flex items-center justify-center gap-x-2 hover:scale-101 transition-soft duration-300'>
              Buy Now
            </button>
          </div>
        </div>
      </section >
      <section className='h-full w-full my-10 px-10'>
        <div className='h-full w-full flex gap-4'>
          {buttonList.map((item, index) => (
            <button key={index} className={` pb-2 px-3 hover:text-primary ${item == activeButton ? "border-b-2 border-primary text-primary" : "text-gray-500"}`} onClick={() => setActiveButton(item)}>{item}</button>
          ))}
        </div>
        <div className='h-full w-full '>
          {activeButton === "Product Specs" && (
            <div className="animate-in fade-in duration-300 mt-4" id="tab-specs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Driver Size</span>
                  <span className="">40 mm Dynamic Drivers</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Connectivity</span>
                  <span className="">Bluetooth 5.3</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Battery Life</span>
                  <span className="">Up to 40 Hours</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Charging Port</span>
                  <span className="">USB Type-C</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Noise Cancellation</span>
                  <span className="">Active Noise Cancellation (ANC)</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Microphone</span>
                  <span className="">Built-in HD Microphone</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Frequency Response</span>
                  <span className="">20 Hz – 20 kHz</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Weight</span>
                  <span className="">250 g</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Compatibility</span>
                  <span className="">Android, iOS, Windows, macOS</span>
                </div>

                <div className="flex justify-between border-b border-outline-variant py-2">
                  <span className="text-on-surface-variant">Color</span>
                  <span className="">Matte Black</span>
                </div>
              </div>
            </div>
          )}
          {activeButton === "Description" && (

            <div className="py-stack-lg animate-in fade-in duration-300 mt-4">
              <div className="max-w-3xl">
                <h3 className="text-headline-sm mb-4">Immerse Yourself in Premium Sound</h3>

                <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">
                  Experience every beat with powerful audio, deep bass, and crystal-clear
                  vocals. Designed for music lovers and professionals alike, these wireless
                  headphones combine advanced Active Noise Cancellation (ANC), long-lasting
                  battery life, and all-day comfort to deliver an exceptional listening
                  experience wherever you go.
                </p>

                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary">check</span>
                    <span>40 mm dynamic drivers provide rich, balanced, and immersive sound.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary">check</span>
                    <span>Advanced Active Noise Cancellation blocks unwanted background noise.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary">check</span>
                    <span>Up to 40 hours of battery life with fast USB-C charging support.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary">check</span>
                    <span>Soft memory foam ear cushions and an adjustable headband for maximum comfort.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-primary">check</span>
                    <span>Built-in HD microphone ensures clear voice calls and online meetings.</span>
                  </li>
                </ul>
              </div>
            </div>

          )}
          {activeButton === "Reviews" && (
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Customer Photos */}
              <div className="flex flex-col gap-4">
                <h4 className="font-headline-sm">Customer Photos</h4>

                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  <img
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-outline-variant"
                    src="/assets/review1.jpg"
                    alt="Customer wearing the wireless headphones while working at a desk."
                  />

                  <img
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-outline-variant"
                    src="/assets/review2.jpg"
                    alt="Close-up of the premium ear cushions and headband."
                  />

                  <img
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-outline-variant"
                    src="/assets/review3.jpg"
                    alt="Customer using the headphones during a workout."
                  />

                  <img
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-outline-variant"
                    src="/assets/review4.jpg"
                    alt="Headphones packed inside the premium carrying case."
                  />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-8">
                <div className="border-b border-outline-variant pb-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">Sarah Jenkins</div>

                      <div className="text-[#FFB400] flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-body"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-on-surface-variant mt-3">
                    The sound quality is amazing with deep bass and crisp vocals. The ANC
                    works surprisingly well during my daily commute, and the battery easily
                    lasts for several days.
                  </p>
                </div>

                <div className="border-b border-outline-variant pb-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">Michael Carter</div>

                      <div className="text-[#FFB400] flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-body"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-on-surface-variant mt-3">
                    Extremely comfortable even after wearing them for 6-7 hours while
                    working. The memory foam ear cushions are soft, and Bluetooth connects
                    instantly to my phone and laptop.
                  </p>
                </div>

                <div className="border-b border-outline-variant pb-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">Emily Rodriguez</div>

                      <div className="text-[#FFB400] flex">
                        {[...Array(4)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-body"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                        <span
                          className="material-symbols-outlined text-body"
                          style={{ fontVariationSettings: "'FILL' 0" }}
                        >
                          star
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-on-surface-variant mt-3">
                    Great value for the price. Fast charging is incredibly convenient, and
                    the microphone quality is excellent for meetings. I only wish the
                    carrying case was slightly smaller.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div >
  )
}

export default ProductDetail