import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export interface Product {
    _id: any;
    id: string;
    name: string;
    thumbnails?: string;
    price?: number;
}

const SearchBox = ({ onclick }: { onclick: () => void }) => {
    const [query, setQuery] = useState("");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URI}/api/product`
                );

                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                setAllProducts(data.data || data);
            } catch (error) {
                console.error("Product fetch error:", error);
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setProducts([]);
            return;
        }

        const searchTerm = debouncedQuery.toLowerCase().trim();
        setProducts(
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm)
            )
        );
    }, [debouncedQuery, allProducts]);

    const handleClose = () => {
        setQuery("");
        onclick();
    };

    const handleProductClick = (id: string) => {
        window.location.href = `/product-detail/${id}`;
    };

    return (
        <div className="fixed inset-x-0 top-16 z-[100] mx-auto h-[70vh] w-[95%] overflow-hidden rounded-xl bg-white px-4 py-4 text-black md:hidden">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h1 className="font-fraunces text-2xl font-bold">Search</h1>
                    <p className="mt-0.5 font-ibm-plex-mono text-xs text-gray-400">
                        Find your favorite products
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-gray-200 active:scale-95"
                    aria-label="Close search"
                >
                    <X className="h-5 w-5 text-gray-700" />
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 font-ibm-plex-mono text-sm text-black outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-300 active:scale-90"
                    >
                        <X className="h-4 w-4 text-gray-600" />
                    </button>
                )}
            </div>

            <div className="mt-5">
                {!query.trim() && (
                    <div className="flex flex-col items-center justify-center pt-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <Search className="h-7 w-7 text-gray-400" />
                        </div>

                        <h2 className="font-fraunces text-lg font-semibold">
                            Search products
                        </h2>

                        <p className="mt-1 max-w-[250px] text-sm text-gray-400">
                            Start typing to discover products from our store.
                        </p>
                    </div>
                )}

                {query.trim() && (
                    <div className="animate-in fade-in duration-200">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">
                                {loading
                                    ? "Searching..."
                                    : `${products.length} ${products.length === 1
                                        ? "result"
                                        : "results"
                                    }`}
                            </p>
                        </div>

                        <div className="max-h-[calc(100vh-190px)] overflow-y-auto pb-5">
                            {loading && (
                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                                        >
                                            <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />
                                            <div className="flex-1">
                                                <div className="mb-2 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                                                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!loading && products.length > 0 && (
                                <div className="space-y-2">
                                    {products.map((product) => (
                                        <button
                                            key={product._id}
                                            type="button"
                                            onClick={() =>
                                                handleProductClick(product._id)
                                            }
                                            className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 text-left transition-all duration-200 hover:border-gray-200 hover:bg-gray-50 active:scale-[0.98]"
                                        >
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                {product.thumbnails ? (
                                                    <img
                                                        src={product.thumbnails}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Search className="h-5 w-5 text-gray-300" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {product.name}
                                                </p>

                                                {product.price !== undefined && (
                                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                                        Npr.{" "}
                                                        {product.price.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 transition-all duration-200 group-hover:bg-gray-100">
                                                <span className="text-sm text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5">
                                                    →
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {!loading && products.length === 0 && (
                                <div className="flex flex-col items-center justify-center pt-16 text-center">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                        <Search className="h-6 w-6 text-gray-400" />
                                    </div>

                                    <h2 className="font-fraunces text-lg font-semibold">
                                        No products found
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Try searching with a different keyword.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
