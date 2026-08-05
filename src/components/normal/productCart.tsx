
import { FaShoppingCart } from 'react-icons/fa'
import type { ProductCartType } from '../../types/types'

import { RxCross1 } from 'react-icons/rx'
import { toast } from 'sonner'
import { FiHeart } from 'react-icons/fi'

const ProductCart = ({ id, image, name, price, old, discount, onclick, wishList, onDelete }: ProductCartType) => {



  async function AddToCart(id: string) {

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/cart/add-to-cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: 1
      })
    })
    const data = await res.json()
    if (data.success) {

      toast.success("Product added to cart")

    }

  }
  async function addToWishList(id: string) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/wishlist/add/${id}`, {
      method: "POST",
      credentials: "include"
    })
    if (res.ok) {

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
  return (
    <div className="group relative bg-white hover:shadow-md rounded-xl overflow-hidden transition-shadow duration-300 border border-gray-400" onClick={onclick}>
      {wishList ? (
        <button className='absolute top-4 right-4 bg-black/30 text-white h-8 w-8 rounded-full z-40 flex items-center justify-center' onClick={onDelete}>
          <RxCross1 />
        </button>
      ) : (
        <button className='absolute top-4 right-4 bg-black/30 text-white h-8 w-8 rounded-full z-40 flex items-center justify-center' onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToWishList(id)



        }}>
          <FiHeart />
        </button>
      )
      }



      <div className="relative aspect-square overflow-hidden bg-surface-container-high">
        <img
          className="w-full h-full object-cover transition-soft group-hover:scale-110 transition-soft duration-300"
          src={image}
          alt={name}
        />

        {Number(discount) && (
          <div className="absolute top-4 left-4 bg-badge text-white px-3 py-1 rounded-full">
            -{discount} %
          </div>
        )}

      </div>


      <div className="p-4 space-y-2">


        <h3 className="font-semibold text-title">
          {name}
        </h3>
        <div className='flex items-center justify-between'>

          <div className="flex items-center gap-2">
            <span className="text-body font-bold text-primary uppercase">
              Npr.{price}
            </span>
            <span className="text-body text-outline line-through">
              Npr.{old}
            </span>
          </div>

          <button className=' absolute bottom-4 right-4 p-2 rounded-full  text-primary border border-primary hover:bg-primary/30 items-center justify-center hover:scale-110 transition-soft duration-300' onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            AddToCart(id)


          }}>
            <FaShoppingCart />
          </button>

        </div>

      </div>
    </div>
  )
}

export default ProductCart