
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar'
import Dashboard from './pages/Dashboard'
import ProductDetail from './pages/ProductDetail'
import ShopingCart from './pages/ShopingCart'
import ProductListing from './pages/ProductListing'
import WishList from './pages/WishList'
import MyOrders from './pages/MyOrders'
import Checkout from './pages/Checkout'
import PurchaseHistory from './pages/PurchaseHistory'
import Login from './pages/Login'
import SellerDashboard from './pages/seller/SellerDashboard'
import MyProducts from './pages/seller/MyProducts'
import AllOrders from './pages/seller/AllOrders'
import AddProduct from './pages/seller/AddProduct'
import EditProduct from './pages/seller/EditProduct'
import SellerRegistration from './pages/seller/SellerRegistration'
import CouponManagement from './pages/seller/CouponManagement'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProduct from './pages/admin/AdminProduct'
import AllAdminOrders from './pages/admin/AllAdminOrders'
import AllUsers from './pages/admin/AllUser'
import { Toaster } from 'sonner'
import VerifyEmail from './pages/verifyEmail'
import { useEffect } from 'react'
import UserStore from './store/userStore'
import { Loader } from 'lucide-react'

function App() {



  return (
    <div className="App">
      <Toaster position='bottom-right' toastOptions={{
        style: {
          background: "#fff",
          color: "#8F4B3D",
          border: "1px solid #8F4B3D",
        }
      }} />

      <Init />
    </div>
  )

}


function Init() {
  const location = useLocation();
  const user = UserStore((state: any) => state.user);
  const setUser = UserStore((state: any) => state.setUser);
  const loading = UserStore(state => state.isloading)
  const setIsLoading = UserStore(state => state.setIsLoading)
  const email = user?.id
  const role = user?.role;
  async function fetchMyInfo() {
    try {
      setIsLoading(true)
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/me`, {
        credentials: "include"
      });

      if (!res.ok) {
        const refreshRes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/refresh-token`, {
          method: "GET",
          credentials: "include"
        })

        if (!refreshRes.ok) {
          setUser(null)
          return
        }

        res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/me`, {
          method: "GET",
          credentials: "include"
        })

      }
      const data = await res.json();
      console.log(data);

      if (data.success) {
        setUser({
          id: data.data._id,

          role: data.data.role,


        });
      } else {
        setUser(null)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
      setIsLoading(false)
    } finally {

      setIsLoading(false)
    }
  }



  useEffect(() => {
    fetchMyInfo();

  }, []);
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }
  return (
    <>
      {role !== "Seller" && role !== "Admin " && location.pathname !== "/login" && <NavBar />}
      <Routes>
        <Route path='/' element={
          role === "Seller" ? <SellerDashboard /> : role === "Admin" ? <AdminDashboard /> : <Dashboard />
        } />

        <Route path='/login' element={<Login />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path='/shoping-cart' element={
          email ? <ShopingCart /> : <Navigate to="/login" />


        } />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/category' element={<ProductListing />} />
        <Route path='/myorder' element={<MyOrders />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/purchase-history' element={<PurchaseHistory />} />

        {
          role === "Seller" && (
            <>
              <Route path='/seller/product' element={<MyProducts />} />
              <Route path='/seller/orders' element={<AllOrders />} />
              <Route path='/seller/add-product' element={<AddProduct />} />
              <Route path='/seller/edit-product' element={<EditProduct />} />
              <Route path="/seller/registration" element={<SellerRegistration />} />
              <Route path="/seller/coupons" element={<CouponManagement />} />
            </>
          )
        }
        {
          role === "Admin" && (
            <>
              <Route path='admin/product' element={<AdminProduct />} />
              <Route path="/admin/orders" element={<AllAdminOrders />} />
              <Route path='admin/users' element={<AllUsers />} />
            </>
          )

        }

      </Routes>
    </>
  )

}

export default App
