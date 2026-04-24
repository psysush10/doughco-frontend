import { useCartContext } from "../context/CartContext"
function Navbar({onCartClick}){
    const { cart } = useCartContext()

    return (
        <div className="flex justify-between items-center px-5 py-4 bg-white shadow-sm sticky top-0">
            
            {/* Logo */}
            <h1 className="text-2x1 font-extrabold tex-gray-800">
                Dough Co. 🍪
            </h1>

            {/* Cart History*/}
            <a href="/orders" className="text-sm underline">
                View Orders
            </a>
            

            {/* Cart Placeholder*/}
            <div 
            onClick={onCartClick}
            className="relative text-2x1 cursor-pointer"
            >
                🛒
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 rounded-full">
                        {cart.length}
                    </span>
                )}
            </div>

        </div>
    )
}
export default Navbar