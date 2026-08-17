import type { IconType } from "react-icons"
import { Link } from "react-router-dom"


const CategoryCart = ({ icon, title }: {
    icon: IconType,
    title: string,
}) => {
    const Icon = icon
    return (
        <Link to={`/category?catItem=${title}`} className="h-37 w-40 md:h-37 md:w-45 lg:h-40 lg:w-50 shadow-sm rounded-xl flex flex-col items-center justify-center p-4 group hover:shadow-md  transition-all duration-200">
            <div className="bg-primary-light/20 rounded-full mb-4 flex h-16 w-16 items-center justify-center  group-hover:text-primary transition-all duration-200"> <Icon size={34} className="text-primary" /></div>
            <h1>{title}</h1>
        </Link>
    )
}
export default CategoryCart