import { useCartContext } from "../context/CartContext"
import { useState } from "react";
function CartDrawer({isOpen, onClose}){
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = useCartContext()
    const displayCart = orderSuccess ? orderSuccess.items : cart;

    const total = displayCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const handleCheckout = async () => {
        setLoading(true);
        const cartSnapshot = [...cart];
        setOrderSuccess(null);
        try {
            const payload = {
                customer_name: "Frontend User",
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                }))
            };
            const API_BASE = import.meta.env.VITE_API_BASE_URL;

            const res = await fetch(`${API_BASE}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => null);

            // ❌ FAILURE PATH
            if (!res.ok || !data) {
                alert(data?.message|| "Cart is empty");
                setLoading(false);
                return;
            }

            if(!data){
                alert("Cart is empty.")
                return;
            }

            // ✅ SUCCESS PATH
            setOrderSuccess({
                orderId: data.orderId,
                items: cartSnapshot,
                totalItems: cartSnapshot.reduce((sum, i) => sum + i.quantity, 0),
                totalAmount: cartSnapshot.reduce((sum, i) => sum + (i.price * i.quantity), 0)
            });

            setLoading(false);

            clearCart();
            setTimeout(() => {
                setOrderSuccess(null);
                onClose();
            }, 3000);

        } catch (err) {
            console.error(err);
            alert("Unable to place Order.Please try again");
            setLoading(false);
        }
};

    if(!isOpen) return null

    return (
        <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-500" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        >
            <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-5 z-50 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
                
            }`}
            onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Your Cart</h2>
                    <button onClick={onClose}>❌</button>
                </div>

                {displayCart.length === 0 ? (
                    <div className="text-center mt-10">
                        <p className="text-gray-500">Your cart is empty</p>
                        <button
                        onClick={onClose}
                        className="mt-3 text-sm text-black underline">
                            Browse products
                        </button>
                    </div>
                    ):(
                    <div className="space-y-4">
                        {displayCart.map((item) => (
                            <div key={item.id} className="border-b pb-3" >
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                    ₹{item.price} * {item.quantity}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="px-2 bg-gray-200 rounded"
                                    > - 
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="px-2 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-red-500"
                                    >Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                
                )}
                <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total}</span> 
                </div>

                {orderSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mt-3">
                        🎉 Order placed successfully! <br/>
                        <strong>Order ID:</strong> {orderSuccess.orderId} <br/>
                        <strong>Total Items:</strong> {orderSuccess.totalItems}
                    </div>  
                )}


                <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-4 w-full bg-black text-white py-3 rounded-x1 cursor-pointer">
                    {loading? "Processing..." :"Checkout"}
                </button>
            </div>
        </div>
    )
}

export default CartDrawer