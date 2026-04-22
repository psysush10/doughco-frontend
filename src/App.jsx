import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import { useCart } from './hooks/useCart'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CartDrawer from './components/CartDrawer';
import ProductDetail from './pages/ProductDetail';
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
      </Routes>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
      
)
}

export default App
