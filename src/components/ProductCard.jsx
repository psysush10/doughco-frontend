import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "../context/CartContext"

function ProductCard({item}) {
    const navigate = useNavigate()
    const [added, setAdded] = useState(false)
    const { addToCart } = useCartContext()
    const handleClick = () => {
        addToCart(item)
        setAdded(true);
        setTimeout(() => {
            setAdded(false)
        },1000)
        }
    return (
        <div onClick={() => navigate(`/product/${item.id}`)}
        className="border rounded-x1 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <div className="bg-white rounded-2x1 shadow-sm p-4 hover:shadow-md transition">
                {item.price <=50 && (
                    <div className="text-xs text-green-600 font-semibold">
                        Budget Pick 💚
                    </div>
                )}
                <h2 className="font-semibold text-gray-800 text-sm">
                    {item.name}
                </h2>
                <p className="text-x1 font-bold mt-1 text-black">
                    ₹{item.price}
                </p>
                <p className={`text-xs font-semibold mt-1 ${
                    item.stock === 0
                        ? "text-red-600"
                        : item.stock <= 5
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}>
                    {item.stock === 0
                        ? "Out of stock"
                        : item.stock <= 5
                        ? `Only ${item.stock} left 🔥`
                        : `${item.stock} available`}
                </p>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mt-2 inline-block">
                    {item.tag}
                </span>
                <button
                disabled={item.stock === 0} 
                onClick={(e) => {
                    e.stopPropagation()
                    handleClick()
                }}
                className={`mt-4 w-full py-2 rounded-xl text-sm transition-all duration-200 ${
                    item.stock === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : added
                        ? "bg-green-500 text-white scale-105"
                        : "bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95"
                    }`}>

                    {item.stock === 0
                    ? "Out of Stock"
                    : added
                    ? "Added ✔"
                    : "Add"}
                    
                </button>
            </div>
        </div>
    )
}

export default ProductCard