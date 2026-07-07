
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

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/login';

  return (
    <div className="App">
      {!hideNav && <NavBar />}
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product-detail' element={<ProductDetail />} />
        <Route path='/shoping-cart' element={<ShopingCart />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/history' element={<PurchaseHistory />} />
      </Routes>
    </div>
  )

}

export default App
