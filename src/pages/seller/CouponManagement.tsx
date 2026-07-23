import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiX } from "react-icons/fi";
import SellerSideBar from "../../components/Sellers/SellerSideBar";

interface Coupon {
    id: string;
    code: string;
    discountValue: number;
    maxUses: number;
    usedCount: number;
    expiryDate: string;
}

type FormState = Omit<Coupon, "id" | "usedCount">;

const initialCoupons: Coupon[] = [
    {
        id: "1",
        code: "SAVE10",
        discountValue: 10,
        maxUses: 100,
        usedCount: 34,
        expiryDate: "2026-12-31",
    },
    {
        id: "2",
        code: "FLAT20",
        discountValue: 20,
        maxUses: 50,
        usedCount: 50,
        expiryDate: "2026-08-15",
    },
    {
        id: "3",
        code: "WELCOME15",
        discountValue: 15,
        maxUses: 200,
        usedCount: 12,
        expiryDate: "2026-12-31",
    },
];

const emptyForm = (): FormState => ({
    code: "",
    discountValue: 0,
    maxUses: 100,
    expiryDate: "",
});

const CouponManagement = () => {
    const [open, setOpen] = useState(true);
    const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

    const [showFormModal, setShowFormModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm());
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const [deleteId, setDeleteId] = useState<string | null>(null);

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
            discountValue: coupon.discountValue,
            maxUses: coupon.maxUses,
            expiryDate: coupon.expiryDate,
        });
        setErrors({});
        setEditingId(coupon.id);
        setShowFormModal(true);
    };

    const validate = (): boolean => {
        const errs: Partial<Record<keyof FormState, string>> = {};
        if (!form.code.trim()) errs.code = "Coupon code is required.";
        if (form.discountValue <= 0) errs.discountValue = "Must be greater than 0.";
        if (form.maxUses <= 0) errs.maxUses = "Must be greater than 0.";
        if (!form.expiryDate) errs.expiryDate = "Expiry date is required.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        if (editingId) {
            setCoupons((prev) =>
                prev.map((item) => (item.id === editingId ? { ...item, ...form } : item))
            );
        } else {
            const newCoupon: Coupon = {
                ...form,
                id: Date.now().toString(),
                usedCount: 0,
            };
            setCoupons((prev) => [newCoupon, ...prev]);
        }

        setShowFormModal(false);
        setEditingId(null);
        setForm(emptyForm());
    };

    const handleDelete = (id: string) => {
        setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
        setDeleteId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SellerSideBar open={open} />

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

                {/* ── Coupon List ── */}
                <div className="p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700">All Coupons</h2>
                        </div>

                        {coupons.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <FiTag size={40} className="mb-3 opacity-40" />
                                <p className="text-sm">No coupons yet. Create your first one.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                            <th className="px-6 py-3">Code</th>
                                            <th className="px-4 py-3">Discount</th>
                                            <th className="px-4 py-3">Usage</th>
                                            <th className="px-4 py-3">Expires</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((coupon) => {
                                            const usagePct = Math.min(
                                                100,
                                                Math.round((coupon.usedCount / coupon.maxUses) * 100)
                                            );
                                            const isExpired = new Date(coupon.expiryDate) < new Date();
                                            return (
                                                <tr
                                                    key={coupon.id}
                                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                                >
                                                    {/* Code */}
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md text-xs">
                                                            <FiTag size={11} className="text-primary" />
                                                            {coupon.code}
                                                        </span>
                                                    </td>

                                                    {/* Discount */}
                                                    <td className="px-4 py-4 font-semibold text-primary">
                                                        {coupon.discountValue}%
                                                    </td>

                                                    {/* Usage */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${usagePct >= 100
                                                                        ? "bg-red-400"
                                                                        : usagePct >= 70
                                                                            ? "bg-yellow-400"
                                                                            : "bg-primary"
                                                                        }`}
                                                                    style={{ width: `${usagePct}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                {coupon.usedCount}/{coupon.maxUses}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Expiry */}
                                                    <td
                                                        className={`px-4 py-4 text-xs ${isExpired ? "text-red-500 font-medium" : "text-gray-500"
                                                            }`}
                                                    >
                                                        {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                        {isExpired && <span className="ml-1">(Expired)</span>}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => openEdit(coupon)}
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <FiEdit2 size={15} />
                                                            </button>
                                                            <button
                                                                onClick={() => setDeleteId(coupon.id)}
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Create / Edit Modal Overlay ── */}
            {showFormModal && (
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
                                    className="w-full border rounded-lg px-4 py-2.5 text-sm font-mono font-semibold text-gray-700 placeholder:font-normal placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
                                        value={form.discountValue || ""}
                                        onChange={(e) => updateForm("discountValue", Number(e.target.value))}
                                        placeholder="10"
                                        className="w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                    {errors.discountValue && (
                                        <p className="mt-1 text-xs text-red-500">{errors.discountValue}</p>
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
                                        className="w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
                                    className="w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
                                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
                            >
                                {editingId ? "Save Changes" : "Create Coupon"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirmation Modal ── */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-80 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <FiTrash2 size={18} className="text-red-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Delete Coupon</p>
                                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete coupon{" "}
                            <span className="font-mono font-semibold text-gray-800">
                                {coupons.find((c) => c.id === deleteId)?.code}
                            </span>
                            ?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponManagement;