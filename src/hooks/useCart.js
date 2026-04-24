import { useState, useEffect } from "react";

export function useCart(){
    const [cart, setCart] = useState(() => {
      try{
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
      }catch(error){
        console.log("Failed to parse cart from localStorage", error);
        return [];
      }
    });

    useEffect(() => {
      try{
        localStorage.setItem("cart",JSON.stringify(cart))
      }catch(error){
        console.log("Failed to save cart",error)
      }
    },[cart])

    const addToCart = (item) => {
    const exisitingItem = cart.find((p) => p.id === item.id)

    if(exisitingItem){
      const updatedCart = cart.map((p) => 
        p.id === item.id
        ? {...p, quantity: p.quantity + 1}
        :p
      )

      setCart(updatedCart);
    }else{
      setCart([...cart,{ ...item, quantity:1}])
    }
  }

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
      ? {... item, quantity: item.quantity + 1} 
      : item
    )
    setCart(updatedCart)
  }

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => 
      item.id === id 
      ? {...item, quantity: item.quantity - 1}
      : item
    )
    .filter((item) => item.quantity > 0)
    setCart(updatedCart)
  }

  const removeFromCart = (id) => {
    //const updatedCart = cart.filter((item) => item.id !== id)
    //setCart(updatedCart)
    setCart([]);
    localStorage.setItem("cart",JSON.stringify([]));
  }

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  }
}