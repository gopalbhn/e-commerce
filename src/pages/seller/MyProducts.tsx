import { useState } from "react";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { MdMenu } from "react-icons/md";
import { BiPlus, BiSearch } from "react-icons/bi";

import { products } from "../../types/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-gray-50 flex">
      <SellerSideBar open={open} />

      <section
        className={`w-full h-full ${open ? "ml-[25%] p-4" : "ml-0 "} transition-all duration-300 px-10`}
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
          <StatsCard title="Total Products" statsNum={100} color="primary" />
          <StatsCard title="Available" statsNum={20} color="accent" />
          <StatsCard title="Low Stock" statsNum={18} color="badge" />
        </div>

        <div className="w-full h-full">
          <ProductTable />
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

const ProductTable = () => {
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
                        src={product.img}
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
                    Electronics
                  </span>
                </td>
                <td className="p-3 font-semibold text-gray-900">{product.price}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stock.className}`}>
                    {stock.label}
                  </span>
                </td>
                <td className="p-3 rounded-r-lg">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-primary-light/20 hover:text-primary transition-colors"
                      onClick={() => navigate('/seller/edit-product')}
                    >
                      <FaEdit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors">
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
