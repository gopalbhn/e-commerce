import { useEffect, useState } from "react";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { MdMenu } from "react-icons/md";
import { BiPlus, BiSearch } from "react-icons/bi";


import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/normal/Delete";

interface productstatsProps {
  totalProduct: number
  availableProduct: number
  lowStockedProduct: number
}

const MyProducts = () => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();


  const [product, setProduct] = useState<any[] | []>([])
  const [productStats, setProductStats] = useState<productstatsProps>(
    {
      totalProduct: 0,
      availableProduct: 0,
      lowStockedProduct: 0,
    }
  )
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  async function handleSearch(searchText: string) {
    if (searchText.trim() === "") {
      setProduct(product);
      return;
    }
    setProduct(product.filter((product) =>
      product?.name.toLowerCase().includes(searchText.toLowerCase())
    ))
  }

  async function fetchProductStats() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/seller/product-stats`, {
        credentials: "include"
      })
      const data = await res.json();

      if (data.success) {
        console.log(data)
        setProductStats(data.productStats)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMyProducts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/my-products`, {
        credentials: "include"
      })
      const data = await res.json();

      if (data.success) {
        console.log(data)
        setProduct(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleProductDelete(productId: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/${productId}`, {
        method: "DELETE",
        credentials: "include"
      })
      const data = await res.json();

      if (data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyProducts();
    fetchProductStats();
  }, []);
  return (
    <div className="h-full w-full bg-gray-50 flex">
      <SellerSideBar open={open} />
      {showDeleteConfirm && (
        <DeleteModal
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => handleProductDelete(deleteItemId)}
        />
      )}
      <section
        className={`w-full h-full ${open ? "ml-[15%] p-4" : "ml-0 "} transition-all duration-300 px-10`}
      >
        <div className="h-15 w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MdMenu size={30} />
            </button>
            <h1 className="text-title font-bold">My Products</h1>
          </div>

          <div className="max-w-7xl flex gap-3 items-center">
            <div className="w-100 h-10 bg-white border border-gray-200 rounded-lg flex items-center px-3 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all">
              <BiSearch size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <button className="h-10 px-4 bg-primary border border-gray-200 rounded-lg flex items-center gap-2 text-sm text-white font-medium hover:bg-primary-hover hover:border-gray-300 transition-all shadow-sm"
              onClick={() => navigate('/seller/add-product')}
            >
              <BiPlus size={15} />
              Add Product
            </button>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 py-4">
          <StatsCard title="Total Products" statsNum={productStats?.totalProduct} color="primary" />
          <StatsCard title="Available" statsNum={productStats?.availableProduct} color="accent" />
          <StatsCard title="Low Stock" statsNum={productStats?.lowStockedProduct} color="badge" />
        </div>

        <div className="w-full h-full">
          <ProductTable products={product} setShowDeleteConfirm={setShowDeleteConfirm} setDeleteItemId={setDeleteItemId} />
        </div>
      </section>
    </div>
  );
};

const StatsCard = ({
  title,
  statsNum,
  color,
}: {
  title: string;
  statsNum: number;
  color: "primary" | "accent" | "badge";
}) => {
  const colorStyles = {
    primary: { bar: "bg-primary", num: "text-primary" },
    accent: { bar: "bg-accent", num: "text-accent" },
    badge: { bar: "bg-badge", num: "text-badge" },
  };
  const s = colorStyles[color];

  return (
    <div className="w-[170px] bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-8 h-1 ${s.bar} rounded-full mb-3`} />
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
        {title}
      </p>
      <h2 className={`text-2xl font-bold mt-1 ${s.num}`}>
        {statsNum}
      </h2>
    </div>
  );
};

const stockConfig = (stock: number) => {
  if (stock > 50)
    return { label: `${stock} in stock`, className: "bg-green-100 text-green-700 border border-green-200" };
  if (stock > 10)
    return { label: `${stock} in stock`, className: "bg-yellow-100 text-yellow-700 border border-yellow-200" };
  return { label: `${stock} low stock`, className: "bg-red-100 text-red-700 border border-red-200" };
};

const ProductTable = ({ products, setShowDeleteConfirm, setDeleteItemId }: { products: any[] | [], setShowDeleteConfirm: (value: boolean) => void, setDeleteItemId: (productId: string) => void }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
      <table className="w-full border-separate border-spacing-y-1.5">
        <thead>
          <tr>
            <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Product Name</th>
            <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Category</th>
            <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Price</th>
            <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Stock</th>
            <th className="text-left text-[11px] uppercase tracking-wider font-semibold text-gray-400 pb-2 px-3">Action</th>
          </tr>
        </thead>

        <tbody className="text-sm font-normal text-gray-700">
          {products.slice(0, 3).map((product, index) => {
            const stock = stockConfig(100);
            return (
              <tr
                key={index}
                className="bg-gray-50 hover:bg-primary-light/10 transition-colors group"
              >
                <td className="p-3 rounded-l-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-[46px] h-[46px] rounded-xl overflow-hidden ring-1 ring-gray-200 shrink-0">
                      <img
                        src={product.thumbnails}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.name}
                    </p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-secondary-light text-secondary text-xs font-medium rounded-full">
                    {product.category.name}
                  </span>
                </td>
                <td className="p-3 font-semibold text-gray-900"> Rs.{product.price}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stock.className}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="p-3 rounded-r-lg">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-primary-light/20 hover:text-primary transition-colors"
                      onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors" onClick={() => {
                      setShowDeleteConfirm(true)
                      setDeleteItemId(product._id)
                    }}>
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
