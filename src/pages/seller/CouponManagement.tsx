import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiX } from "react-icons/fi";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import Table from "@/components/normal/table";
import { toast } from "sonner";
import DeleteModal from "@/components/normal/Delete";

interface Coupon {
    _id: string;
    code: string;
    discountRate: number;
    maxUses: number;
    usedCount: number;
    expiryDate: string;
}

type FormState = Omit<Coupon, "_id" | "usedCount">;



const emptyForm = (): FormState => ({
    code: "",
    discountRate: 0,
    maxUses: 100,
    expiryDate: "",
});

const CouponManagement = () => {
    const [open, setOpen] = useState(true);
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const [showFormModal, setShowFormModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm());
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<string>("");

    const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const openCreate = () => {
        setForm(emptyForm());
        setErrors({});
        setEditingId(null);
        setShowFormModal(true);
    };

    const openEdit = (coupon: Coupon) => {
        setForm({
            code: coupon.code,
            discountRate: coupon.discountRate,
            maxUses: coupon.maxUses,
            expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0],
        });
        setErrors({});
        setEditingId(coupon._id);
        setShowFormModal(true);
    };

    const validate = (): boolean => {
        const errs: Partial<Record<keyof FormState, string>> = {};
        if (!form.code.trim()) errs.code = "Coupon code is required.";
        if (form.discountRate <= 0) errs.discountRate = "Must be greater than 0.";
        if (form.maxUses <= 0) errs.maxUses = "Must be greater than 0.";
        if (!form.expiryDate) errs.expiryDate = "Expiry date is required.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        if (editingId) {
            console.log("control here")
            handleUpdateCoupon(editingId)
        } else {
            handleAddCoupon()
        }

        setShowFormModal(false);
        setEditingId(null);
        setForm(emptyForm());
    };

    const couponColumn = [
        {
            header: "Code",
            render: (coupon: any) => (
                <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md text-xs">
                    <FiTag size={11} className="text-primary" />
                    {coupon.code}
                </span>
            ),
        },
        {
            header: "Discount",
            render: (coupon: any) => <span className="font-medium text-gray-700">{coupon.discountRate}%</span>,
        },
        {
            header: "Usage",
            render: (coupon: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full bg-primary `}
                            style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-gray-500">
                        {coupon.usedCount}/{coupon.maxUses}
                    </span>
                </div>
            ),
        },
        {
            header: "Expires",
            render: (coupon: any) => coupon.expiryDate,
        },
        {
            header: "Actions",
            render: (coupon: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openEdit(coupon)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                        title="Edit Coupon"
                    >
                        <FiEdit2 size={15} />
                    </button>
                    <button
                        onClick={() => {
                            setShowDeleteConfirm(true);
                            setDeleteId(coupon._id)
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Coupon"
                    >
                        <FiTrash2 size={15} />
                    </button>
                </div>
            ),
        },
    ]

    async function handleAddCoupon() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: form.code,
                discountRate: form.discountRate,
                maxUses: form.maxUses,
                expiryDate: form.expiryDate
            })
        })
        const data = await res.json()
        if (data.success) {
            toast.success("Coupon Added successfully")
            setShowFormModal(false)
        } else {
            toast.error(data.message)
        }
    }
    async function handleUpdateCoupon(id: String) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: form.code,
                discountRate: form.discountRate,
                maxUses: form.maxUses,
                expiryDate: form.expiryDate
            })
        })
        const data = await res.json()
        if (data.success) {
            toast.success("Coupon Added successfully")
            setShowFormModal(false)
        } else {
            toast.error(data.message)
        }
    }
    async function fetchAllCoupons() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon`, {
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                console.log("coupons")
                setCoupons(data.coupons)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteCoupon(id: string) {
        if (id.trim() == "") {
            toast.error("Please enter coupon id")
            return
        }
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/coupon/${id}`, {
            credentials: "include",
            method: "DELETE",
        })
        const data = await res.json()
        if (data.success) {
            toast.success("Coupon Deleted successfully")
            setShowFormModal(false)
            setShowDeleteConfirm(false)
            setDeleteId("")
        } else {
            toast.error(data.message)
            setShowDeleteConfirm(false)
            setDeleteId("")
        }
    }

    useEffect(() => {
        fetchAllCoupons()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SellerSideBar open={open} />
            {showDeleteConfirm && (
                <DeleteModal
                    onCancel={() => setShowDeleteConfirm(false)}
                    onConfirm={() => handleDeleteCoupon(deleteId)}
                />
            )}
            <section className={`flex-1 transition-all duration-300 ${open ? "ml-[15%]" : "ml-0"}`}>
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-8 bg-white shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <MdMenu size={28} />
                        </button>
                        <div>
                            <h1 className="text-title font-bold leading-tight">Coupon Management</h1>
                            <p className="text-sm text-gray-400">Create and manage discount coupons for your store.</p>
                        </div>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                    >
                        <FiPlus size={16} />
                        New Coupon
                    </button>
                </div>


                <div className="p-8">
                    <Table columns={couponColumn} data={coupons} />
                </div>
            </section>


            {showFormModal && (
                <CreateCouponModal setShowFormModal={setShowFormModal} editingId={editingId} form={form} updateForm={updateForm} errors={errors} handleSave={handleSave} />
            )}



        </div>
    );
};


function CreateCouponModal({
    setShowFormModal,
    editingId,
    form,
    updateForm,
    errors,
    handleSave,

}: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col gap-5">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-800">

                        {editingId ? "Edit Coupon" : "Create Coupon"}
                    </h2>
                    <button
                        onClick={() => setShowFormModal(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex flex-col gap-4">
                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coupon Code <span className="text-gray-400 font-normal">(auto-uppercased)</span>
                        </label>
                        <input
                            type="text"
                            value={form.code}
                            onChange={(e) => updateForm("code", e.target.value.toUpperCase())}
                            placeholder="e.g. SUMMER25"
                            className="w-full border rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-gray-700 placeholder:font-normal placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        />
                        {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                    </div>

                    {/* Discount Value + Max Uses */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={form.discountRate || ""}
                                onChange={(e) => updateForm("discountRate", Number(e.target.value))}
                                placeholder="10"
                                className="w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            />
                            {errors.discountRate && (
                                <p className="mt-1 text-xs text-red-500">{errors.discountRate}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Uses
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={form.maxUses || ""}
                                onChange={(e) => updateForm("maxUses", Number(e.target.value))}
                                placeholder="100"
                                className="w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            />
                            {errors.maxUses && <p className="mt-1 text-xs text-red-500">{errors.maxUses}</p>}
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                            type="date"
                            value={form.expiryDate}
                            onChange={(e) => updateForm("expiryDate", e.target.value)}
                            className="w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        />
                        {errors.expiryDate && (
                            <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => setShowFormModal(false)}
                        className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                    >
                        {editingId ? "Save Changes" : "Create Coupon"}
                    </button>
                </div>
            </div>
        </div>
    )
}



export default CouponManagement;
