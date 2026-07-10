
import type { AdminTopBarProps } from '@/types/types'
import { MdMenu } from 'react-icons/md'


const AdminTopBar = ({ onclick, text }: AdminTopBarProps) => {
  return (
    <div className="h-16 sticky top-0  flex items-center px-8 bg-white shadow-sm ">
      <div>

        <button onClick={onclick}>
          <MdMenu size={28} />
        </button>

      </div>
      <h1 className="ml-4 text-2xl font-bold">{text}</h1>
    </div>
  )
}

export default AdminTopBar