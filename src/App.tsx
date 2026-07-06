
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar'
import Dashboard from './pages/Dashboard'
import ProductDetail from './pages/ProductDetail'
import ShopingCart from './pages/ShopingCart'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/product/' element={<ProductDetail />} />
        <Route path='/shoping-cart' element={<ShopingCart />} />
      </Routes>
    </div>
  )

}

export default App
