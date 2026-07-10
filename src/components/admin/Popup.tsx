import { useNavigate } from "react-router-dom";



interface PopupProps {
    varaint: "user" | "product"
    id: string

    onEdit?: () => void;
    onDelete?: () => void;
}

const Popup = ({ varaint, id, onDelete }: PopupProps) => {
    const navigate = useNavigate();
    if (varaint === "user") {
        return (
            <div className="absolute top-10 right-10 bg-white rounded-lg shadow-lg z-50 min-w-max p-2">

                <button
                    onClick={onDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors border-t border-gray-200"
                >
                    Delete User
                </button>
            </div>
        )
    }
    return (
        <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg z-50 min-w-max">
            <button
                onClick={() => navigate(`/product-detail/${id}`)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors"
            >
                Preview
            </button>
            <button
                onClick={onDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors border-t border-gray-200"
            >
                Delete
            </button>
        </div>
    )
}

export default Popup;