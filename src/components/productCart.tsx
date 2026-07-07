
import { FaShoppingCart } from 'react-icons/fa'
import type { ProductCartType } from '../types/types'

import { RxCross1 } from 'react-icons/rx'

const ProductCart = ({ image, name, price, old, discount, onclick, wishList, isDiscounted }: ProductCartType) => {
  console.log(wishList)
  return (
    <div className="group relative bg-white hover:shadow-md rounded-xl overflow-hidden transition-shadow duration-300" onClick={onclick}>
      {wishList && (
        <div className='absolute top-4 right-4 bg-black/30 text-white h-8 w-8 rounded-full z-40 flex items-center justify-center'>
          <RxCross1 />
        </div>
      )
      }

      <div className="relative aspect-square overflow-hidden bg-surface-container-high">
        <img
          className="w-full h-full object-cover transition-soft group-hover:scale-110 transition-soft duration-300"
          src={image}
          alt={name}
        />

        {isDiscounted && (
          <div className="absolute top-4 left-4 bg-badge text-white px-3 py-1 rounded-full">
            -{discount}
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
              {price}
            </span>
            <span className="text-body-sm text-outline line-through">
              {old}
            </span>
          </div>

          <button className='p-2 opacity-0 group-hover:opacity-100 rounded-full bg-primary-light text-white items-center justify-center hover:scale-110 transition-soft duration-300'>
            <FaShoppingCart />
          </button>

        </div>

      </div>
    </div>
  )
}

export default ProductCart