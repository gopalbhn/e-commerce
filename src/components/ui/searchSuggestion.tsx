"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

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

interface ActionSearchBarProps {
    onSelectProduct?: (product: Product) => void;
}

function ActionSearchBar({ onSelectProduct }: ActionSearchBarProps) {
    const [query, setQuery] = useState("");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    // Fetch all products once
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URI}/api/product`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                const productList = data.data || data;

                setAllProducts(productList);
            } catch (error) {
                console.error("Product fetch error:", error);
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Filter products locally
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setProducts([]);
            return;
        }

        const filtered = allProducts.filter((product) =>
            product.name
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase())
        );

        setProducts(filtered);
    }, [debouncedQuery, allProducts]);

    const dropdownAnimation = {
        hidden: {
            opacity: 0,
            y: -6,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.18,
            },
        },
        exit: {
            opacity: 0,
            y: -6,
            transition: {
                duration: 0.15,
            },
        },
    };
    const navigate = useNavigate();
    return (
        <div className={` transition-all duration-300 ease-in-out w-70  ${isFocused && " w-full"}  `}>
            <div className="relative">
                <div className="relative">
                    <Input
                        placeholder="Search for products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                            setTimeout(() => setIsFocused(false), 200)
                        }
                        className="h-10 rounded-lg pl-4 pr-10 "
                    />

                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>

                <AnimatePresence>
                    {isFocused && query.trim() && (
                        <motion.div
                            variants={dropdownAnimation}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg"
                        >
                            <div className="max-h-80 overflow-y-auto py-1">
                                {loading ? (
                                    <div className="px-4 py-4 text-center text-sm text-muted-foreground">
                                        Loading products...
                                    </div>
                                ) : products.length > 0 ? (
                                    products.map((product) => (
                                        <button
                                            key={product._id}
                                            type="button"
                                            onClick={() => {
                                                // navigate(`/product-detail/${product._id}`);
                                                window.location.href = `/product-detail/${product._id}`;

                                            }}
                                            className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors border-gray-300 border-b hover:bg-primary-hover/30"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="h-12 w-12 rounded-md border overflow-hidden">
                                                    <img src={product.thumbnails} alt={product.name} />
                                                </div>
                                                <div className="flex flex-col">

                                                    <p className="text-sm font-medium">
                                                        {product.name}
                                                    </p>

                                                    {product.price && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Npr.{product.price}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-5 text-center text-sm text-muted-foreground">
                                        No products found
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export { ActionSearchBar };