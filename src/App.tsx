
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar'
import Dashboard from './pages/Dashboard'
import ProductDetail from './pages/ProductDetail'
import ShopingCart from './pages/ShopingCart'
import ProductListing from './pages/ProductListing'
import WishList from './pages/WishList'
import MyOrders from './pages/MyOrders'
import Checkout from './pages/Checkout'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/product-detail' element={<ProductDetail />} />
        <Route path='/shoping-cart' element={<ShopingCart />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
  )

}

export default App
