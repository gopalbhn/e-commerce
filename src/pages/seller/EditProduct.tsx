import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { toast } from "sonner";
import { useParams } from "react-router-dom";


interface Spec {
    key: string;
    value: string;
}

const EditProduct = () => {
    const [open, setOpen] = useState(true);

    // Product Info
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null);
    const [brands, setBrands] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [basePrice, setBasePrice] = useState<number | null>(null);
    const [discountRate, setDiscountRate] = useState<number | null>(null);
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState<number | null>(null);
    const { id } = useParams();
    // Media
    const [images, setImages] = useState<(File | string)[]>([]);
    const [thumbnails, setThumbnails] = useState<File | string | null>(null)
    const [dragging, setDragging] = useState(false);
    const thumbnailsRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Specifications
    const [specs, setSpecs] = useState<Spec[]>([
        { key: "Material", value: "" },
        { key: "Dimensions", value: "" },
    ]);

    const handleImageFiles = (files: FileList | null) => {
        if (!files) return;
        const filesArr = Array.from(files);
        setImages((prev) => [...prev, ...filesArr].slice(0, 3));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        setThumbnails(e.dataTransfer.files[0]);
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

    const handleCategoryChange = (val: any) => {
        setSelectedCategory(val.id)
        fetchSubCategories(val.id);
        fetchBrands(val.id)
    };
    const fetchSubCategories = async (categoryId: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/category/subcategory/${categoryId}`
            );

            const data = await response.json();
            console.log("subcategory", data)
            if (data.success) {
                setSubcategory(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const fetchAllCategory = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/category`)
            const data = await response.json();
            console.log(data)
            if (data.success) {
                const dataObj = data.data;

                const allCategory = Array.from(dataObj.map((item: any) => ({ name: item.name, id: item._id })))
                console.log("all", allCategory)
                setCategory(allCategory)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchBrands = async (categoryId: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/category/brands/${categoryId}`
            );

            const data = await response.json();

            if (data.success) {
                setBrands(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchOneProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/${id}`)
            const data = await response.json();
            console.log("data from one fetch", data)
            if (data.success) {
                const dataObj = data.data;
                setTitle(dataObj.name)
                setDescription(dataObj.description)
                setBasePrice(dataObj.price)
                setDiscountRate(dataObj.discountRate)
                setSku(dataObj.sku)
                setStock(dataObj.stock)
                setImages(dataObj.images)
                setThumbnails(dataObj.thumbnails)

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllCategory();
        fetchOneProduct();
    }, [])
    async function handleUpdateProduct() {
        if (title === "" || category === "" || subcategory === "" || basePrice === 0 || discountRate === 0 || sku === "" || stock === 0 || images.length === 0 || thumbnails === null || specs.length === 0) {
            toast.error("Please fill all the fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", title);
        formData.append("description", description);
        formData.append("category", selectedCategory);
        formData.append("subcategory", selectedSubCategory);
        formData.append("brand", selectedBrand);
        formData.append("price", basePrice!.toString());
        formData.append("discountRate", discountRate!.toString());
        formData.append("sku", sku);
        formData.append("stock", stock!.toString());
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        formData.append("thumbnails", thumbnails!);
        formData.append("specs", JSON.stringify(specs));

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/${id}`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        })

        if (!res.ok) {
            throw new Error("Failed to add product");
        }

        const data = await res.json();
        console.log(data);
        if (data.success) {
            toast.success("Product Updated Successfully")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SellerSideBar open={open} />

            <section
                className={`flex-1 transition-all duration-300 ${open ? "ml-[15%]" : "ml-0"}`}
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
                            <h1 className="text-title font-bold leading-tight">Product Details</h1>
                            <p className="text-sm text-gray-400">Manage your product information, pricing, and inventory.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                            Discard Changes
                        </button>
                        <button className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
                            Save Product
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
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            const selected = category.find(
                                                (c: any) => c.id.toString() === e.target.value
                                            );

                                            if (selected) {
                                                handleCategoryChange(selected);
                                            }
                                        }}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                                    >
                                        {category?.map((c: any) => (
                                            <option key={c.id} value={c.id}>{c?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                                    <select
                                        value={selectedSubCategory}
                                        onChange={(e) => {
                                            const selected = subcategory.find(
                                                (s: any) => s._id.toString() === e.target.value
                                            );

                                            if (selected) {
                                                setSelectedSubCategory(selected._id)

                                            }
                                        }}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white"
                                    >
                                        {subcategory?.map((s: any) => (
                                            <option key={s._id} value={s._id}>{s.name}</option>
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
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Npr.</span>

                                    <input
                                        type="number"
                                        value={basePrice ?? ""}
                                        onChange={(e) => setBasePrice(
                                            e.target.value === "" ? null : Number(e.target.value)
                                        )}
                                        placeholder="0.00"
                                        className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Rate <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                    <input
                                        type="number"
                                        value={discountRate ?? ""}
                                        onChange={(e) => setDiscountRate(
                                            e.target.value === "" ? null : Number(e.target.value)
                                        )}
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
                                    value={stock ?? ""}
                                    onChange={(e) => setStock(
                                        e.target.value === "" ? null : Number(e.target.value)
                                    )}
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
                            Add Thumbnail
                        </h2>

                        {/* Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => thumbnailsRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center ${thumbnails ? "" : "py-10"} cursor-pointer transition-colors ${dragging ? "border-primary bg-primary-light/10" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"}`}
                        >
                            {thumbnails ? (
                                <img src={
                                    typeof thumbnails === "string" ? thumbnails : URL.createObjectURL(thumbnails)
                                } alt="Thumbnail" className="w-full h-100  object-cover rounded-lg" />
                            ) : (
                                <>
                                    <FiUploadCloud size={36} className="text-primary mb-3" />
                                    <p className="text-sm text-gray-600 font-medium">Click or drag images here to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP up to 10MB. Recommended size: 1200×1200px</p>
                                </>
                            )}
                            <input
                                ref={thumbnailsRef}
                                type="file"
                                accept="image/*"
                                multiple={false}
                                className="hidden"
                                onChange={(e) => setThumbnails(e.target.files[0])}
                            />
                        </div>

                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary-light/30 text-primary flex items-center justify-center text-xs">▣</span>
                            Add Supporting Images
                        </h2>

                        {/* Drop Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center ${images.length > 0 ? "" : "py-10"} cursor-pointer transition-colors ${dragging ? "border-primary bg-primary-light/10" : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"}`}
                        >
                            {images.length > 0 ? (


                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 my-1">
                                    {images.map((file, i) => (
                                        <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">

                                            <img src={typeof file === "string" ? file : URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FiTrash2 size={18} className="text-white" />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 3 && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-primary/50 hover:bg-gray-50 transition-colors"
                                        >
                                            <FiPlus size={20} className="text-gray-400" />
                                        </button>
                                    )}
                                </div>
                            )
                                : (
                                    <>

                                        <FiUploadCloud size={36} className="text-primary mb-3" />
                                        <p className="text-sm text-gray-600 font-medium">Click or drag images here to upload</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP up to 10MB. Recommended size: 1200×1200px</p>

                                    </>)}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple={true}

                                className="hidden"
                                onChange={(e) => handleImageFiles(e.target.files)}
                            />
                        </div>

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
                        <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors" onClick={handleUpdateProduct}>
                            Save Product
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default EditProduct;
