import { useParams } from "react-router-dom"
import {products} from "../data/products"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "../context/CartContext"


function ProductDetail(){
    const navigate = useNavigate()
    const {id} = useParams()
    const product = products.find(p => p.id === Number(id))
    const { addToCart, cart } = useCartContext()
    if(!product) return <p>Product not found!</p>
    const existingItem = cart.find(p => p.id === product.id)

    return(
        <div className="p-6 max-w-5x1 mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-sm text-gray-500 underline">
                    ⬅ Back
            </button>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-x1 h-80 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                </div>
            </div>

            <div>
                <h1 className="text-3x1 font-bold mb-2">
                    {product.name}
                </h1>

                 <p className="text-x1 text-gray-700 mb-4">
                    ₹{product.price}
                </p>
                <p className="text-gray-500 mb-6">
                    Delicious cookie made fresh 🍪.
                </p>
                <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-6 py-3 rounded-x1 w-full hover:bg-gray-800 transition"
                >
                    {existingItem ? `Add More (${existingItem.quantity})` : "Add to Cart"}
                </button>
            </div>
            
           
            
            
        </div>
    )
}

export default ProductDetail