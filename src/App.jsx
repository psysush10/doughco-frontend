import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import { useCart } from './hooks/useCart'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CartDrawer from './components/CartDrawer';
import ProductDetail from './pages/ProductDetail';
import AdminProducts from './pages/AdminProducts'
import DevMode from './pages/DevMode'
import Orders from "./pages/Orders"
import { useCartContext } from './context/CartContext'

function App() {
  const {
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = useCartContext()
  const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    <>
    <Navbar
        onCartClick={() => setIsCartOpen(true)}
      />
      <Routes>

        <Route
        path="/"
        element={<Home/>}
        />

        <Route
        path="/product/:id"
        element={<ProductDetail/>}
        />

        <Route 
        path="/orders" 
        element={<Orders />} />

        <Route
        path="/admin/products"
        element={<AdminProducts />} />

        <Route
        path="/dev"
        element={<DevMode />} />

      </Routes>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
      
)
}

export default App
