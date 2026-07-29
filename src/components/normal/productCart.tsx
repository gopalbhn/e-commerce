
import { FaShoppingCart } from 'react-icons/fa'
import type { ProductCartType } from '../../types/types'

import { RxCross1 } from 'react-icons/rx'
import { toast } from 'sonner'

const ProductCart = ({ id, image, name, price, old, discount, onclick, wishList, onDelete }: ProductCartType) => {
  console.log(wishList)


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
  return (
    <div className="group relative bg-white hover:shadow-md rounded-xl overflow-hidden transition-shadow duration-300" onClick={onclick}>
      {wishList && (
        <button className='absolute top-4 right-4 bg-black/30 text-white h-8 w-8 rounded-full z-40 flex items-center justify-center' onClick={onDelete}>
          <RxCross1 />
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


        <h3 className="font-body-md font-bold text-on-surface">
          {name}
        </h3>
        <div className='flex items-center justify-between'>

          <div className="flex items-center gap-2">
            <span className="text-headline-sm font-bold text-primary">
              Rs.{price}
            </span>
            <span className="text-body-sm text-outline line-through">
              Rs.{old}
            </span>
          </div>

          <button className=' absolute top-4 right-4 p-2 rounded-full  text-primary border border-primary hover:bg-primary/30 items-center justify-center hover:scale-110 transition-soft duration-300' onClick={(e) => {
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