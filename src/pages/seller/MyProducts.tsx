import { useEffect, useRef, useState } from "react";
import SellerSideBar from "../../components/Sellers/SellerSideBar";
import { MdMenu } from "react-icons/md";
import { BiPlus, BiSearch } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/normal/Delete";
import Table from "@/components/normal/table";
import { toast } from "sonner";

interface productstatsProps {
  totalProduct: number
  availableProduct: number
  lowStockedProduct: number
}

const MyProducts = () => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;

    if (searchText.trim() === "") {
      setProduct(product);
      return;
    }
    setProduct(product.filter((product) =>
      product?.name.toLowerCase().includes(searchText.toLowerCase())
    ))
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    const handleScroll = () => {
      setIsFocused(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        toast.success("Product Deleted Successfully")
        setTimeout(() => {
          setProduct(product => product.filter((pro: any) => pro._id !== productId))
          setShowDeleteConfirm(false)
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const productColumns = [
    {
      header: "product name",
      render: (item: any) => (
        <div className="flex items-center gap-2">

          <div className="w-16 h-16 rounded-lg overflow-hidden">

            <img src={item.thumbnails} alt={item.name} className="w-full h-full object-cover" />

          </div>
          <p className="text-sm font-semibold text-gray-800">
            {item.name}
          </p>
        </div>
      )
    },
    {
      header: "Category",
      render: (item: any) => (
        <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
          {item.category.name}
        </span>
      )
    },
    {
      header: "Price",
      render: (item: any) =>
        <p>NPR: {item.price}</p>
    },
    {
      header: "stock",
      render: (item: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border border-gray-100 bg-gray-50`}
        >
          {item.stock} in stock
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item: any) => <div className="flex items-center gap-2">
        <button className="hover:text-primary-hover p-1.5 rounded-lg text-gray-400 " onClick={() => {
          navigate(`/seller/edit-product/${item._id}`)
        }}><FaEdit size={14} /></button>
        <button className="hover:text-red-500 p-1.5 rounded-lg text-gray-400" onClick={() => {
          setDeleteItemId(item._id)
          setShowDeleteConfirm(true)
        }}><FaTrash size={14} /></button>
      </div>
    }
  ]


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
        className={`w-full h-full ${open ? "md:ml-[15%] p-4" : "ml-0 "} transition-all duration-300 px-6 md:px-10`}
      >
        <div className="h-16 w-full flex items-center justify-between px-1">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all duration-150 hidden md:block"
            >
              <MdMenu size={24} />
            </button>
            {!isFocused && (
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight font-fraunces">
                My Products
              </h1>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <div
              ref={searchRef}
              className={`h-10 bg-white border border-gray-200 rounded-xl flex items-center px-3 gap-2 shadow-sm
      focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/60
      transition-all duration-200 ${isFocused ? "w-68" : "w-10 md:w-64"} md:w-64 overflow-hidden`}
            >
              <BiSearch
                size={17}
                className="text-gray-400 shrink-0 cursor-pointer"
                onClick={() => setIsFocused(!isFocused)}
              />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => handleSearch(e)}
                className={`w-full h-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent transition-opacity duration-200 ${isFocused ? "opacity-100 block" : "opacity-0 hidden"
                  } md:opacity-100 md:block`}
              />
            </div>

            <button
              className="h-10 px-4 bg-primary rounded-xl flex items-center gap-2 text-sm text-white font-semibold
      shadow-sm hover:bg-primary-hover hover:shadow-md active:scale-95 transition-all duration-150"
              onClick={() => navigate('/seller/add-product')}
            >
              <BiPlus size={17} />
              <span className="hidden md:block">Add Product</span>
            </button>
          </div>
        </div>

        <div className="w-full flex items-center gap-4 py-4">
          <StatsCard title="Total Products" statsNum={productStats?.totalProduct} />
          <StatsCard title="Available" statsNum={productStats?.availableProduct} />
          <StatsCard title="Low Stock" statsNum={productStats?.lowStockedProduct} />
        </div>


        <div className="w-full h-full">
          <Table columns={productColumns} data={product} />
        </div>
      </section>
    </div>
  );
};

const StatsCard = ({
  title,
  statsNum,

}: {
  title: string;
  statsNum: number;

}) => {



  return (
    <div className="w-[170px] bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide text-primary/80">
        {title}
      </p>
      <h2 className={`text-2xl font-bold mt-1 `}>
        {statsNum}
      </h2>
    </div>
  );
};




export default MyProducts;
