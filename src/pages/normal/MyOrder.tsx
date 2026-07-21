import { useEffect, useState } from "react";
import Loader from "@/components/normal/Loader";
import Footer from "../../components/normal/Footer";
import { useNavigate } from "react-router-dom";

function OrderComponent({ order }: { order: any }) {
    const navigate = useNavigate();
    const { id, status, createdAt, totalAmount } = order;
    const finalTotal = totalAmount + totalAmount * 0.13 + 10;
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });



    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Order #{id.slice(-8).toUpperCase()}
                    </h2>

                    <p className="text-gray-500">
                        Placed on{" "}
                        <span className="font-medium text-gray-700">
                            {formattedDate}
                        </span>
                    </p>

                    <p className="text-2xl font-bold text-primary">
                        ${finalTotal}
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4">
                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold `}
                    >
                        {status}
                    </span>

                    <button
                        onClick={() => navigate(`/orders/${id}`)}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div >
    );
}

const MyOrder = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);

    async function fetchOrders() {
        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/order`,
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (data.success) {
                console.log("data.data log", data.data)


                const transformed = data.data.map((item: any) => ({
                    id: item._id,
                    status: item.orderStatus,
                    createdAt:
                        item.createdAt ||
                        item.created_at ||
                        new Date().toISOString(),
                    totalAmount: item.items.reduce((sum: Number, prod: any) => sum + prod.price, 0),

                    raw: item,
                }));
                console.log("transformed output", transformed)
                setOrders(transformed);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);
    console.log("order", orders)
    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="max-w-6xl mx-auto w-full flex-1 px-5 py-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        My Orders
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage your recent purchases.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-16 text-center">
                        <div className="text-6xl mb-4">📦</div>

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Looks like you haven't placed any orders yet.
                        </p>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="mt-6 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {orders.map((order) => (
                            <OrderComponent
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyOrder;