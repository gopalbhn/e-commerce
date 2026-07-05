
import { FaShoppingCart } from 'react-icons/fa'
import type { ProductCartType } from '../types/types'

const ProductCart = ({ image, name, price, old }: ProductCartType) => {
  return (
    <div className="group relative bg-white hover:shadow-xl rounded-xl overflow-hidden transition-shadow duration-300">


      <div className="relative aspect-square overflow-hidden bg-surface-container-high">
        <img
          className="w-full h-full object-cover transition-soft group-hover:scale-110 transition-soft duration-300"
          src={image}
          alt={name}
        />


        <span className="absolute top-4 left-4 bg-badge text-white font-label-sm px-3 py-1 rounded-full">
          -10%
        </span>
      </div>


      <div className="p-4 space-y-2">


        <h3 className="font-body-md font-bold text-on-surface">
          {name}
        </h3>
        <div className='flex item-center justify-between'>

          <div className="flex items-center gap-2">
            <span className="text-headline-sm font-bold text-primary">
              ${price}
            </span>
            <span className="text-body-sm text-outline line-through">
              ${old}
            </span>
          </div>

          <button className='p-2 hidden group-hover:flex rounded-full bg-primary-light text-white items-center justify-center hover:scale-110 transition-soft duration-300'>
            <FaShoppingCart />
          </button>

        </div>

      </div>
    </div>
  )
}

export default ProductCart