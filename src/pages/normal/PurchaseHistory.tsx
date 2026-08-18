import { useEffect, useState } from "react"
import Footer from "../../components/normal/Footer"
import { toast } from "sonner"
import { ImSpinner8 } from "react-icons/im";
const PurchaseHistory = () => {
    const [purchasedProduct, setPurchasedProduct] = useState([])
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const [productId, setProductId] = useState<string>("");
    const getMyPurchaseOrder = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/order/history`, {
                credentials: "include",
            })

            const data = await res.json();
            if (data.success) {
                console.log("data", data.data)
                setPurchasedProduct(data.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMyPurchaseOrder()
    }, [])

    return (
        <div className="h-full w-full ">
            {openReviewModal && <CreateReviewModal onClose={() => setOpenReviewModal(false)} productId={productId} />}
            <section className="h-full w-full mb-15 px-10">
                <h1 className="text-title font-bold mb-8 mt-2 ">Your Purchase History</h1>

                <div className="h-full w-full flex flex-col gap-2">
                    {purchasedProduct.map((item: any) => (
                        <div key={item._id}>
                            <h1 className="text-title font-semibold  mt-5">
                                Delivered On: {new Date(item.updatedAt).toDateString()}
                            </h1>

                            {item.items.map((prod: any) => (
                                <div
                                    key={prod._id || prod.product?._id}
                                    className="w-full shadow-sm p-4 mt-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="md:h-15 md:w-15 h-18 w-18 flex items-center justify-center overflow-hidden rounded-xl">
                                            <img
                                                src={prod.product?.thumbnails}
                                                alt={prod.product?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-col gap-1">
                                                <p className="font-bold text-body line-clamp-2">
                                                    {prod.product?.name}
                                                </p>
                                                <p className="text-body ">Quantity: {prod.quantity}</p>
                                                <p className="text-body ">Total Cost: NPR.{prod.price}</p>
                                            </div>

                                            <button
                                                className="bg-primary px-4 py-2 md:px-5 md:py-3  rounded-xl text-white"
                                                onClick={() => {
                                                    setOpenReviewModal(true);
                                                    setProductId(prod.product?._id || null);
                                                }}
                                            >
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}


                </div>


            </section>
            <Footer />
        </div>
    )
}

const CreateReviewModal = ({ onClose, productId }: { onClose: () => void; productId: string }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false)
    async function handleSubmit() {
        try {
            setLoading(true)
            if (comment.trim() === "" || rating === 0) {
                toast.error("Please provide both rating and comment before submitting the review.");

                return;
            }



            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    productId: productId,
                    rating,
                    comment,
                }),
            });

            if (!res.ok) {
                setLoading(false)
                toast.error("Unable to Add review")
            }

            const data = await res.json();
            if (data.success) {

                toast.success("Review Added Successfully")
                setTimeout(() => {
                    setLoading(false)
                    onClose()
                }, 200)
            }
            console.log(data);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/20 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg w-2/3  md:w-1/3">
                <h1 className="text-xl font-semibold mb-4">Write a Review</h1>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Share your experience with this product..."
                />
                <div className="flex items-center mb-4">
                    <span className="mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={rating >= star ? "text-yellow-500" : "text-gray-300"}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                    {
                        loading ? (
                            <button className="bg-primary text-white px-4 py-2 rounded-lg disabled flex gap-2 items-center opacity-50 cursor-not-allowed " >
                                Submit
                                <ImSpinner8 className="animate-spin" />
                            </button>
                        ) : (
                            <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>
                                Submit
                            </button>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default PurchaseHistory