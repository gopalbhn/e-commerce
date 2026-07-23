import { FaRegStar, FaStar } from "react-icons/fa"

import ProductCart from "../../components/normal/productCart"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { MdFilterAlt } from "react-icons/md"



const ProductListing = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState<number>(8);
    const [filters, setFilters] = useState({
        category: "",
        subCategory: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        rating: "",
    })

    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null)
    useEffect(() => {
        fetchAllProduct()
        fetchAllCategory();
    }, [])

    const fetchSubCategories = async (categoryId: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/category/subcategory/${categoryId}`
            );

            const data = await response.json();

            if (data.success) {
                setSubCategory(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const fetchAllProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product`)
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setProducts(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const fetchProducts = async (currentFilters = filters) => {
        const query = new URLSearchParams();

        if (currentFilters.category) {
            console.log(currentFilters)
            query.append("category", currentFilters.category);
        }

        if (currentFilters.subCategory) {
            query.append("subcategory", currentFilters.subCategory);
        }

        if (currentFilters.brand) {
            query.append("brand", currentFilters.brand);
        }

        if (currentFilters.minPrice) {

            query.append("minPrice", currentFilters.minPrice);
        }

        if (currentFilters.maxPrice) {
            query.append("maxPrice", currentFilters.maxPrice);
        }

        if (currentFilters.rating) {
            query.append("rating", currentFilters.rating);
            console.log("query", currentFilters)
        }
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URI}/api/product/filter?${query}`
        );

        const data = await response.json();

        if (data.success) {
            setProducts(data.data);
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

    return (
        <div className="h-full w-full px-10 flex ">
            <CategoryList category={category} filters={filters} setFilters={setFilters} fetchProducts={fetchProducts} fetchSubCategories={fetchSubCategories} subCategory={subCategory} fetchBrands={fetchBrands} brands={brands} />
            <section className="h-full w-4/5 ml-10 mb-10">
                <div className="w-full rounded-xl p-5 flex items-center justify-between ">
                    <h1 className="text-title font-semibold">Collection</h1>

                </div>
                <div className="h-[70%]  overflow-y-auto w-full grid grid-cols-3 gap-4">
                    {products.slice(0, currentIndex).map((product, index) => (
                        <ProductCart
                            id={product._id}
                            key={index}
                            name={product.name}
                            image={product.thumbnails}
                            price={product.price}
                            old={product.oldPrice}
                            discount={product.discount}
                            isDiscounted={product.isDiscounted}
                            wishList={product.wishList}
                            onclick={() => navigate(`/product-detail/{product._id}`)}
                        />
                    ))}
                </div>
                <div className='flex items-center justify-center mt-10'>
                    {currentIndex < products.length ? (
                        <button onClick={() => setCurrentIndex(currentIndex + 4)} className='rounded-xl bg-primary-light text-white py-2 px-4'>
                            Load More
                        </button>
                    ) : (
                        <div className="h-full w-full text-center font-semibold">No more products</div>
                    )}
                </div>
            </section>
        </div>
    )
}

const CategoryList = ({ category, filters, setFilters, fetchProducts, fetchSubCategories, subCategory, fetchBrands, brands }: any) => {

    const [currentSelectedCategory, setCurrentSelectedCategory] = useState('')
    return (
        <div className="h-full w-1/5 rounded-xl p-4 border border-gray-300  mb-5 text-sm " key={category}>
            <div >
                <h3 className="text-body font-semibold mb-4">Categories</h3>
                <ul className="flex flex-col justify-start">
                    {category?.map(item => (
                        <button
                            key={item.id}
                            className={currentSelectedCategory == item.id ? "text-primary text-start" : "text-start"}
                            onClick={() => {
                                setCurrentSelectedCategory(item.id)
                                const newFilters = {
                                    ...filters,
                                    category: item.id,

                                };

                                setFilters(newFilters);

                                fetchSubCategories(item.id);
                                fetchBrands(item.id)
                                fetchProducts(newFilters);
                            }}
                        >
                            {item.name}
                        </button>

                    ))}

                </ul>

            </div>
            <div>
                {subCategory && subCategory?.length > 0 && (
                    <>
                        <h3 className="text-body font-semibold mt-5 mb-2">
                            Sub Categories
                        </h3>

                        <ul className="flex flex-col">
                            {subCategory.map((item: any) => (
                                <button
                                    key={item._id}
                                    className="text-left mt-2 ml-3"
                                    onClick={() => {
                                        const newFilters = {
                                            ...filters,
                                            subCategory: item._id,

                                        };

                                        setFilters(newFilters);
                                        fetchBrands(item._id)
                                        fetchProducts(newFilters);
                                    }}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            {brands.map((brand: any) => (
                <div className="mt-2" key={brand}>
                    <h3 className="text-body font-semibold mb-4">Brand</h3>
                    <ul className="flex flex-col gap-2">
                        <li key={brand._id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.brand === brand._id}
                                onChange={() => {
                                    const newFilters = {
                                        ...filters,
                                        brand: brand._id,
                                    };

                                    setFilters(newFilters);
                                    fetchProducts(newFilters);
                                }}
                                className="h-5 w-5 accent-primary"
                            />

                            <label>{brand.name}</label>
                        </li>



                    </ul>

                </div>
            ))}
            <div className="mt-2">
                <h3 className="text-body font-semibold my-4"> Price Range</h3>
                <div className="w-full flex items-center gap-1">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                minPrice: e.target.value,
                            })
                        }
                        className="w-[45%] border border-gray-300 rounded-md px-2 py-1"
                    />

                    <p className="text-sm">to</p>

                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                maxPrice: e.target.value,
                            })
                        }
                        className="w-[45%] border border-gray-300 rounded-md px-2 py-1"
                    />
                    <button
                        className="w-8 h-8 bg-primary text-white rounded-md flex justify-center items-center"
                        onClick={() => {

                            fetchProducts(filters);
                        }}
                    >
                        <MdFilterAlt />
                    </button>
                </div>

            </div>
            <div className="mt-2">
                <h3 className="text-body font-semibold mb-2 ">Ratings</h3>

                <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.rating === rating.toString()}
                                onChange={() => {
                                    setFilters({
                                        ...filters,
                                        rating:
                                            filters.rating === rating.toString()
                                                ? ""
                                                : rating.toString(),
                                    });
                                    fetchProducts({ ...filters, rating: rating.toString() });
                                }}
                                className="h-5 w-5 accent-primary"
                            />

                            <div className="flex items-center">
                                {[...Array(4)].map((_, index) =>
                                    index < rating && (
                                        <FaStar
                                            key={index}
                                            className="text-yellow-400"
                                        />
                                    )
                                )}
                            </div>
                            <p className="text-xs">({rating} & Above)</p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}


export default ProductListing