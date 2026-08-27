import { Link } from "react-router-dom"

const CategoryCart = ({
    image,
    title,
}: {
    image: string
    title: string
}) => {
    return (
        <Link to={`/category?catItem=${title}`} className="
                relative h-37 w-40 md:h-37 md:w-45 lg:h-60 lg:w-50
                overflow-hidden rounded-xl
                border border-card-border
                shadow-sm
                group
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-lg"
        >

            <img src={image} loading="lazy" decoding="async" alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />

            <div className=" absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/90" />

            <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1">

                <h1
                    className="text-center text-base font-semibold font-fraunces text-white/60 group-hover:text-white transition-all duration-300 group-hover:tracking-wide">
                    {title}
                </h1>
            </div>
        </Link>
    )
}

export default CategoryCart
