import type { IconType } from "react-icons"


const CategoryCart = ({ icon, title }: {
    icon: IconType,
    title: string,
}) => {
    const Icon = icon
    return (
        <div className="h-40 w-50 shadow-sm rounded-xl flex flex-col items-center justify-center p-4 group hover:shadow-md  transition-all duration-200">
            <div className="bg-primary-light/80 rounded-full mb-4 flex h-16 w-16 items-center justify-center  group-hover:text-primary transition-all duration-200"> <Icon size={24} className="text-primary" /></div>
            <h1>{title}</h1>
        </div>
    )
}
export default CategoryCart