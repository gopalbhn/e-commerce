
import { Route, Routes, useLocation } from 'react-router-dom'
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

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname.startsWith('/seller') || location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!hideNav && <NavBar />}
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/shoping-cart' element={<ShopingCart />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/history' element={<PurchaseHistory />} />
        <Route path='/seller' element={<SellerDashboard />} />
        <Route path='/seller/product' element={<MyProducts />} />
        <Route path='/seller/orders' element={<AllOrders />} />
        <Route path='/seller/add-product' element={<AddProduct />} />
        <Route path='/seller/edit-product' element={<EditProduct />} />
        <Route path="/seller/registration" element={<SellerRegistration />} />
        <Route path="/seller/coupons" element={<CouponManagement />} />


        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='admin/product' element={<AdminProduct />} />
        <Route path="/admin/orders" element={<AllAdminOrders />} />
        <Route path='admin/users' element={<AllUsers />} />
      </Routes>
    </div>
  )

}

export default App
