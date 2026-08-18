
import { useEffect, useState } from 'react'
import { BiCart, BiCheckCircle } from 'react-icons/bi'
import { FiHeart, FiStar } from 'react-icons/fi'
import { HiMiniMagnifyingGlassPlus } from 'react-icons/hi2'
import Footer from '../../components/normal/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import SuccessModal from '@/components/normal/successModal';
import BreadcrumbDemo from '@/components/ui/breadCrumbComponent';
import UserStore from '@/store/userStore';
import { FaStar } from 'react-icons/fa';
import BuyNow from '@/components/normal/buyNow';

const ProductDetail = () => {
  const [activeButton, setActiveButton] = useState<string>("Product Specs")
  const buttonList = ["Product Specs", "Description", "Reviews"];

  const [totalCartItem, setTotalCartItem] = useState<number>(1)
  const [isWishListed, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [reviews, setReviews] = useState([])
  const [openProductModal, setOpenProductModal] = useState(false)
  const { id } = useParams();
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const user = UserStore(state => state.user?.id);
  console.log("userRole", user)
  const [previewimage, setPreviewimage] = useState<string>(product?.thumbnails)
  console.log(product)
  const navigate = useNavigate()


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

      if (res.status == 429) {
        setTimeout(() => {
          toast.error("Too many requests, please wait for some time")
        }, 500)
        return;
      }

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

  async function fetchReview() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/review/reviews/${id}`)
    if (!res.ok) {
      toast.error("Failed to fetch reviews")
    }
    const data = await res.json()
    if (data.success) {
      setReviews(data.reviews)
    }
  }

  useEffect(() => {
    fetchProductDetail()
    checkWishlisted();
    fetchReview();
  }, [])

  async function AddToCart() {
    if (!user) {
      toast.error("Please login to add product to cart")
      setTimeout(() => {

        navigate("/login")
      }, 1500)
      return;
    }
    setButtonDisabled(true)
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
      // toast.success("Product added to cart")
      setSuccessModalOpen(true)
      setTimeout(() => {
        setButtonDisabled(false)
        setSuccessModalOpen(false)
      }, 2 * 1000)

    }

  }

  return (
    <div className='h-full w-full relative'>
      {successModalOpen && (
        <SuccessModal text="Product added to cart" onclick={() => setSuccessModalOpen(false)} />
      )}
      {openProductModal && (
        <BuyNow onclose={() => setOpenProductModal(false)} productId={product?._id} />
      )}
      <div className="pl-16 pt-2">
        <BreadcrumbDemo />
      </div>
      <section className='w-full h-full rounded-lg flex flex-col md:flex-row items-center justify-center gap-1 px-4 md:px-10'>
        <div className='w-full md:w-1/2 h-full p-4 group'>
          <div className='relative h-[60vh] w-full flex justify-center items-center overflow-hidden '>
            <img src={previewimage} alt="Product Image" className='w-full h-full object-cover rounded-lg transition-soft duration-300 hover:scale-110' />
            <button className='absolute top-4 right-4 text-primary bg-white/50 text-2xl p-2 rounded-full hover:scale-110 transition-soft duration-300 backdrop-blur-sm'>
              <HiMiniMagnifyingGlassPlus />
            </button>
          </div>
          <div className="w-full h-30 grid grid-cols-3 md:grid-cols-5 gap-5 md:gap-2 mt-2 md:mt-6">
            {product?.images?.map((img: string, index: number) => (
              <div key={index} className="h-25 w-25 overflow-hidden rounded-lg hover:border border-primary " onClick={() => setPreviewimage(img)}>
                <img
                  src={img}
                  alt="Headphone 1"
                  className="w-full h-full object-cover rounded-lg "
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full md:w-1/2 h-full p-4 flex flex-col justify-center gap-y-3'>

          <h1 className='text-header font-bold'>{product?.name}</h1>

          <div className='flex items-center gap-4 '>
            <div className='flex items-center gap-2'>
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < product?.rating;
                return (
                  <FiStar key={i} className="text-yellow-500 text-xl"
                    fill={isFilled ? 'currentColor' : 'none'} />
                )
              })}
              <span className="ml-2 text-sm text-gray-500">{product?.rating}/5 (248 Reviews)</span>
            </div>
          </div>
          <div className='flex items-center gap-4 '>


            <h2 className='text-title font-bold '>Npr.{product?.price}</h2>
            <h2 className='text-body text-gray-500 line-through'>Npr.{product?.oldPrice}</h2>
            <h2 className='text-title font-bold text-primary-light'>{product?.discount}%</h2>
          </div>
          <div className='  px-3 py-1.5 rounded-xl border border-gray-300 bg-[#f1edec]'>
            <p className='flex items-center gap-4 mb-1'>
              <BiCheckCircle className='text-2xl text-accent-light' />
              <span className='text-small font-semibold'>In Stock - {product?.stock} Left</span>
            </p>
            <p className='text-small font-semibold text-gray-500'>Order within 2h 15m for Same-Day Shipping.</p>
          </div>
          <div className='flex items-center gap-2'>

            {isWishListed ? (
              <button className=' h-10 flex items-center px-5 gap-2 rounded-xl hover:scale-101 bg-red-500 transition-all duration-300 ease-in-out' onClick={removeFromWishList}>
                <FiHeart fill='white' className=' h-full text-white' />
                <span className='text-white text-body'>Save for Later</span>
              </button>
            ) : (
              <button className=' h-10 flex  items-center px-5 gap-2 rounded-xl border border-gray-500 hover:scale-105 transition-all duration-300 ease-in-out' onClick={addToWishList}>
                <FiHeart className='h-full ' />
                <span className='text-body'>Save for Later</span>
              </button>
            )}
          </div>
          {/* <div className='flex flex-col gap-4 '>
            <p>
              <span className='font-bold text-sm mr-2'>Color:</span>
              Dark Walnut
            </p>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-[#3D2B1F] h-10 w-10 border border-gray-400'></div>
              <div className='rounded-full bg-[#6D4C41] h-10 w-10 border border-gray-400'></div>
              <div className='rounded-full bg-[#8D6E63] h-10 w-10 border border-gray-400'></div>

            </div>
          </div> */}
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
                  if (prev >= product?.stock) {
                    toast.error("Out of Stock")
                    return product?.stock;
                  } else {
                    prev++;
                    return prev;
                  }
                })}>+</button>

              </div>
              <button disabled={buttonDisabled} className={`w-full max-w-xl md:px-10 md:py-4 py-3 px-6 rounded-xl bg-primary text-white flex items-center justify-center gap-x-2 hover:scale-101 transition-soft duration-300 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={AddToCart}>
                <BiCart className='text-xl' /> Add To cart
              </button>
            </div>

            <button className='w-full max-w-xl md:px-10 md:py-4 py-3 px-6 rounded-xl bg-black text-white flex items-center justify-center gap-x-2 hover:scale-101 transition-soft duration-300' onClick={() => setOpenProductModal(true)}>
              Buy Now
            </button>
          </div>
        </div>
      </section >
      <section className='h-full w-full my-10 px-10'>
        <div className='h-full w-full flex gap-5'>
          {buttonList.map((item, index) => (
            <button key={index} className={` pb-2  hover:text-primary ${item == activeButton ? "border-b-2 border-primary text-primary" : "text-gray-500"}`} onClick={() => setActiveButton(item)}>{item}</button>
          ))}
        </div>
        <div className='h-full w-full '>
          {activeButton === "Product Specs" && (
            <div className="animate-in fade-in duration-300 mt-4" id="tab-specs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {
                  product?.specification && Object.entries(product?.specification).map(([key, value]: [string, any]) => (
                    <div className="flex justify-between gap-10 border-b border-outline-variant py-2">
                      <span className="text-on-surface-variant">{key}</span>
                      <span className="text-end">{value}</span>
                    </div>
                  ))
                }


              </div>
            </div>
          )}
        </div>
        {activeButton === "Description" && (
          <div className="py-stack-lg animate-in fade-in duration-300 mt-4">
            <div className="w-full">
              <div className="text-body-md text-on-surface-variant leading-relaxed">
                {product?.description?.split("\n").map((line: string, index: number) => {
                  const text = line.trim();

                  // Treat short lines without punctuation as headings
                  const isHeading =
                    text &&
                    text.length < 50 &&
                    !text.endsWith(".") &&
                    !text.includes(",");

                  return isHeading ? (
                    <h3
                      key={index}
                      className="font-bold text-lg text-on-surface mt-6 mb-2"
                    >
                      {text}
                    </h3>
                  ) : (
                    <p key={index} className="mb-3">
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeButton === "Reviews" && (
          <div className="lg:col-span-8 flex flex-col gap-8">
            {reviews.length == 0 && (
              <div>
                No Reviews found
              </div>
            )}

            {reviews.length > 0 && (
              <>

                {reviews.map((review: any) => (
                  <div className="space-y-8 mt-5 ">
                    <div className="border-b border-gray-300 pb-1">
                      <div className='flex justify-between'>
                        <div className="flex gap-2 mb-2">
                          <div className='h-10 w-10 rounded-full bg-primary txt-2xl text-white flex items-center justify-center'>
                            {review.user.name.split("")[0]}
                          </div>
                          <div>
                            <div className="font-bold text-body">{review.user.name}</div>

                            <div className="text-[#FFB400] flex text-body">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-500 text-body" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className='text-body'>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-on-surface-variant  pl-2">
                        {review.comment}
                      </p>
                    </div>


                  </div>
                ))}

              </>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div >
  )
}

export default ProductDetail