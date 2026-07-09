import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiX, FiCheck } from "react-icons/fi";
import SellerSideBar from "../../components/Sellers/SellerSideBar";

type DiscountType = "percentage" | "fixed";
type CouponStatus = "active" | "inactive";

interface Coupon {
    id: string;
    code: string;
    discountType: DiscountType;
    discountValue: number;
    minOrderAmount: number;
    maxUses: number;
    usedCount: number;
    expiryDate: string;
    status: CouponStatus;
}

const initialCoupons: Coupon[] = [
    {
        id: "1",
        code: "SAVE10",
        discountType: "percentage",
        discountValue: 10,
        minOrderAmount: 50,
        maxUses: 100,
        usedCount: 34,
        expiryDate: "2026-12-31",
        status: "active",
    },
    {
        id: "2",
        code: "FLAT20",
        discountType: "fixed",
        discountValue: 20,
        minOrderAmount: 80,
        maxUses: 50,
        usedCount: 50,
        expiryDate: "2026-08-15",
        status: "inactive",
    },
    {
        id: "3",
        code: "WELCOME15",
        discountType: "percentage",
        discountValue: 15,
        minOrderAmount: 0,
        maxUses: 200,
        usedCount: 12,
        expiryDate: "2026-12-31",
        status: "active",
    },
];

const emptyForm = (): Omit<Coupon, "id" | "usedCount"> => ({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 0,
    maxUses: 100,
    expiryDate: "",
    status: "active",
});

const CouponManagement = () => {
    const [open, setOpen] = useState(true);
    const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

    // form panel state
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm());
    const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

    // delete confirm
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // ── helpers ──────────────────────────────────────────────────────────────

    const validate = () => {
        const e: typeof errors = {};
        if (!form.code.trim()) e.code = "Coupon code is required.";
        else if (!/^[A-Z0-9_-]{3,20}$/.test(form.code.trim()))
            e.code = "Use 3–20 uppercase letters, numbers, _ or -.";
        if (form.discountValue <= 0) e.discountValue = "Discount must be greater than 0.";
        if (form.discountType === "percentage" && form.discountValue > 100)
            e.discountValue = "Percentage discount cannot exceed 100.";
        if (form.maxUses <= 0) e.maxUses = "Max uses must be at least 1.";
        if (!form.expiryDate) e.expiryDate = "Expiry date is required.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const openCreate = () => {
        setForm(emptyForm());
        setErrors({});
        setEditingId(null);
        setShowForm(true);
    };

    const openEdit = (coupon: Coupon) => {
        setForm({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            minOrderAmount: coupon.minOrderAmount,
            maxUses: coupon.maxUses,
            expiryDate: coupon.expiryDate,
            status: coupon.status,
        });
        setErrors({});
        setEditingId(coupon.id);
        setShowForm(true);
    };

    const handleSave = () => {
        if (!validate()) return;

        if (editingId) {
            setCoupons((prev) =>
                prev.map((c) =>
                    c.id === editingId ? { ...c, ...form, code: form.code.trim().toUpperCase() } : c
                )
            );
        } else {
            const newCoupon: Coupon = {
                id: Date.now().toString(),
                ...form,
                code: form.code.trim().toUpperCase(),
                usedCount: 0,
            };
            setCoupons((prev) => [newCoupon, ...prev]);
        }

        setShowForm(false);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
        setDeleteId(null);
    };

    const toggleStatus = (id: string) => {
        setCoupons((prev) =>
            prev.map((c) =>
                c.id === id
                    ? { ...c, status: c.status === "active" ? "inactive" : "active" }
                    : c
            )
        );
    };

    const updateForm = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SellerSideBar open={open} />

            <section className={`flex-1 transition-all duration-300 ${open ? "ml-[25%]" : "ml-0"}`}>

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

                <div className="p-8 flex gap-6">

                    {/* ── Coupon List ─────────────────────────────────────────── */}
                    <div className={`flex-1 flex flex-col gap-4 transition-all duration-300 ${showForm ? "max-w-[55%]" : "max-w-full"}`}>

                        {/* Stats strip */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Total Coupons", value: coupons.length },
                                { label: "Active", value: coupons.filter((c) => c.status === "active").length },
                                { label: "Inactive", value: coupons.filter((c) => c.status === "inactive").length },
                            ].map((s) => (
                                <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 text-center">
                                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Table */}
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
                                                <th className="px-4 py-3">Min. Order</th>
                                                <th className="px-4 py-3">Usage</th>
                                                <th className="px-4 py-3">Expires</th>
                                                <th className="px-4 py-3">Status</th>
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
                                                            {coupon.discountType === "percentage"
                                                                ? `${coupon.discountValue}%`
                                                                : `$${coupon.discountValue}`}
                                                        </td>

                                                        {/* Min order */}
                                                        <td className="px-4 py-4 text-gray-600">
                                                            {coupon.minOrderAmount > 0 ? `$${coupon.minOrderAmount}` : "—"}
                                                        </td>

                                                        {/* Usage */}
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full ${usagePct >= 100 ? "bg-red-400" : usagePct >= 70 ? "bg-yellow-400" : "bg-primary"}`}
                                                                        style={{ width: `${usagePct}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {coupon.usedCount}/{coupon.maxUses}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        {/* Expiry */}
                                                        <td className={`px-4 py-4 text-xs ${isExpired ? "text-red-500 font-medium" : "text-gray-500"}`}>
                                                            {new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                            {isExpired && <span className="ml-1">(Expired)</span>}
                                                        </td>

                                                        {/* Status toggle */}
                                                        <td className="px-4 py-4">
                                                            <button
                                                                onClick={() => toggleStatus(coupon.id)}
                                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${coupon.status === "active"
                                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                                    }`}
                                                            >
                                                                {coupon.status === "active" ? (
                                                                    <><FiCheck size={10} /> Active</>
                                                                ) : (
                                                                    <><FiX size={10} /> Inactive</>
                                                                )}
                                                            </button>
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

                    {/* ── Create / Edit Panel ──────────────────────────────────── */}
                    {showForm && (
                        <div className="w-[45%] flex-shrink-0">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                {/* Panel header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-base font-semibold text-gray-800">
                                        {editingId ? "Edit Coupon" : "Create Coupon"}
                                    </h2>
                                    <button
                                        onClick={() => { setShowForm(false); setEditingId(null); }}
                                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                    >
                                        <FiX size={18} />
                                    </button>
                                </div>

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
                                            className={`w-full border rounded-lg px-4 py-2.5 text-sm font-mono font-semibold text-gray-700 placeholder:font-normal placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${errors.code ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                        />
                                        {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                                    </div>

                                    {/* Discount type + value */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                                            <select
                                                value={form.discountType}
                                                onChange={(e) => updateForm("discountType", e.target.value as DiscountType)}
                                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                                            >
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="fixed">Fixed Amount ($)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {form.discountType === "percentage" ? "Percentage" : "Amount ($)"}
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                    {form.discountType === "percentage" ? "%" : "$"}
                                                </span>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={form.discountType === "percentage" ? 100 : undefined}
                                                    value={form.discountValue || ""}
                                                    onChange={(e) => updateForm("discountValue", Number(e.target.value))}
                                                    placeholder="0"
                                                    className={`w-full border rounded-lg pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${errors.discountValue ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.discountValue && (
                                                <p className="mt-1 text-xs text-red-500">{errors.discountValue}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Min order + Max uses */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Min. Order ($) <span className="text-gray-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={form.minOrderAmount || ""}
                                                    onChange={(e) => updateForm("minOrderAmount", Number(e.target.value))}
                                                    placeholder="0"
                                                    className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={form.maxUses || ""}
                                                onChange={(e) => updateForm("maxUses", Number(e.target.value))}
                                                placeholder="100"
                                                className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${errors.maxUses ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                            />
                                            {errors.maxUses && (
                                                <p className="mt-1 text-xs text-red-500">{errors.maxUses}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expiry date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={form.expiryDate}
                                            onChange={(e) => updateForm("expiryDate", e.target.value)}
                                            className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition ${errors.expiryDate ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                                        />
                                        {errors.expiryDate && (
                                            <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <div className="flex gap-3">
                                            {(["active", "inactive"] as CouponStatus[]).map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => updateForm("status", s)}
                                                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${form.status === s
                                                        ? s === "active"
                                                            ? "bg-green-50 border-green-400 text-green-700"
                                                            : "bg-gray-100 border-gray-300 text-gray-600"
                                                        : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => { setShowForm(false); setEditingId(null); }}
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
                        </div>
                    )}
                </div>
            </section>

            {/* ── Delete Confirm Modal ─────────────────────────────────── */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
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
