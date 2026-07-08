import { useState, useRef } from "react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import SellerSideBar from "../../components/Sellers/SellerSideBar";

const categories = ["Home Decor", "Electronics", "Fashion", "Beauty", "Sports"];
const subcategories: Record<string, string[]> = {
    "Home Decor": ["Vases & Vessels", "Wall Art", "Lighting", "Textiles"],
    Electronics: ["Phones", "Laptops", "Accessories", "Cameras"],
    Fashion: ["Tops", "Bottoms", "Footwear", "Accessories"],
    Beauty: ["Skincare", "Haircare", "Fragrance", "Makeup"],
    Sports: ["Gym Equipment", "Outdoor", "Footwear", "Apparel"],
};

interface Spec {
    key: string;
    value: string;
}

// Simulated existing product data (replace with real data from router params / API)
const existingProduct = {
    title: "Minimalist Ceramic Vase - Matte White",
    description:
        "Discover handcrafted elegance with our Minimalist Ceramic Vase. Perfect for modern interiors, featuring a sleek matte finish and sustainable stoneware.",
    category: "Home Decor",
    subcategory: "Vases & Vessels",
    basePrice: "49.99",
    discountPrice: "39.99",
    sku: "LMN-CER-VSE-01",
    stock: "100",
    specs: [
        { key: "Material", value: "Premium Stoneware" },
        { key: "Dimensions", value: "12cm x 24cm" },
    ],
    images: [] as string[],
};

const EditProduct = () => {
    const [open, setOpen] = useState(true);

    // Product Info — pre-filled with existing product values
    const [title, setTitle] = useState(existingProduct.title);
    const [description, setDescription] = useState(existingProduct.description);
    const [category, setCategory] = useState(existingProduct.category);
    const [subcategory, setSubcategory] = useState(existingProduct.subcategory);

    // Pricing & Inventory
    const [basePrice, setBasePrice] = useState(existingProduct.basePrice);
    const [discountPrice, setDiscountPrice] = useState(existingProduct.discountPrice);
    const [sku, setSku] = useState(existingProduct.sku);
    const [stock, setStock] = useState(existingProduct.stock);

    // Media
    const [images, setImages] = useState<string[]>(existingProduct.images);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Specifications
    const [specs, setSpecs] = useState<Spec[]>(existingProduct.specs);

    const handleImageFiles = (files: FileList | null) => {
        if (!files) return;
        const newUrls = Array.from(files).map((f) => URL.createObjectURL(f));
        setImages((prev) => [...prev, ...newUrls].slice(0, 6));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        handleImageFiles(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const addSpec = () => {
        setSpecs((prev) => [...prev, { key: "", value: "" }]);
    };

    const removeSpec = (index: number) => {
        setSpecs((prev) => prev.filter((_, i) => i !== index));
    };

    const updateSpec = (index: number, field: "key" | "value", val: string) => {
        setSpecs((prev) =>
            prev.map((s, i) => (i === index ? { ...s, [field]: val } : s))
        );
    };

    const handleCategoryChange = (val: string) => {
        setCategory(val);
        setSubcategory(subcategories[val]?.[0] ?? "");
    };

    return (
        <div className="min-h-screen bg-white flex">
            <SellerSideBar open={open} />

            <section
                className={`flex-1 transition-all duration-300 ${open ? "ml-[25%]" : "ml-0"}`}
            >
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
                            <h1 className="text-title font-bold leading-tight">Edit Product</h1>
                            <p className="text-sm text-gray-400">Update your product information, pricing, and inventory.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                            Discard Changes
                        </button>
                        <button className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="p-8 flex flex-col gap-6 max-w-4xl">

                    {/* Product Information */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-light/30 text-primary flex items-center justify-center text-xs font-bold">i</span>
                            Product Information
                        </h2>

                        <div className="flex flex-col gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Minimalist Ceramic Vase - Matte White"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell the story of your product..."
                                    rows={5}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                                />
                            </div>

                            {/* Category & Subcategory */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                    <select
                                        value={subcategory}
                                        onChange={(e) => setSubcategory(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                                    >
                                        {(subcategories[category] ?? []).map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-light/30 text-primary flex items-center justify-center text-xs">$</span>
                            Pricing &amp; Inventory
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                    <input
                                        type="number"
                                        value={basePrice}
                                        onChange={(e) => setBasePrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Price <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                    <input
                                        type="number"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    placeholder="LMN-CER-VSE-01"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="100"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Gallery */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-light/30 text-primary flex items-center justify-center text-xs">▣</span>
                            Media Gallery
                        </h2>

                        {/* Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary-light/10" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"}`}
                        >
                            <FiUploadCloud size={36} className="text-primary mb-3" />
                            <p className="text-sm text-gray-600 font-medium">Click or drag images here to upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP up to 10MB. Recommended size: 1200×1200px</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handleImageFiles(e.target.files)}
                            />
                        </div>

                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                                {images.map((src, i) => (
                                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                                        {i === 0 && (
                                            <span className="absolute top-1 left-1 z-10 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">
                                                MAIN
                                            </span>
                                        )}
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FiTrash2 size={18} className="text-white" />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 6 && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-primary/50 hover:bg-gray-50 transition-colors"
                                    >
                                        <FiPlus size={20} className="text-gray-400" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Specifications */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary-light/30 text-primary flex items-center justify-center text-xs">≡</span>
                                Specifications
                            </h2>
                            <button
                                onClick={addSpec}
                                className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                            >
                                <FiPlus size={14} />
                                Add Specification
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => updateSpec(i, "key", e.target.value)}
                                        placeholder="Key"
                                        className="w-1/3 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => updateSpec(i, "value", e.target.value)}
                                        placeholder="Value"
                                        className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                    <button
                                        onClick={() => removeSpec(i)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pb-8">
                        <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                            Cancel and Exit
                        </button>
                        <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
                            Save Changes
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default EditProduct;
