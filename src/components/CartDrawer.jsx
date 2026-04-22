import { useCartContext } from "../context/CartContext"
function CartDrawer({isOpen, onClose}){
    const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = useCartContext()
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity,0)
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

                {cart.length === 0 ? (
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
                        {cart.map((item) => (
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
                <button
                className="mt-4 w-full bg-black text-white py-3 rounded-x1">
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default CartDrawer