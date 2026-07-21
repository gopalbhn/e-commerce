import { FiLoader } from "react-icons/fi"

const Loader = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <FiLoader className="text-3xl animate-spin " />
        </div>
    )
}

export default Loader
