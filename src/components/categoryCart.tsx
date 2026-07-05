import type { IconType } from "react-icons"


const CategoryCart = ({ icon, title }: {
    icon: IconType,
    title: string,
}) => {
    const Icon = icon
    return (
        <div className="h-30 w-40 shadow-xl rounded-xl flex flex-col items-center justify-center p-4 ">
            <div className="bg-primary-light/80 rounded-full p-2"> <Icon size={30} color="var(--color-primary)" /></div>
            <h1>{title}</h1>
        </div>
    )
}
export default CategoryCart