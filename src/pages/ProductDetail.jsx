import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCartContext } from "../context/CartContext"


function ProductDetail(){
    const navigate = useNavigate()
    const {id} = useParams()
    const { addToCart, cart } = useCartContext()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`)

                if (!res.ok) {
                    throw new Error("Failed to fetch product")
                }

                const data = await res.json()

                const foundProduct = data.find(p => p.id === Number(id))
                setProduct(foundProduct)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if(loading){
        return (
            <div className="p-5">
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="p-5 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
                onClick={fetchProducts}
                className="bg-black text-white px-4 py-2 rounded-xl"
            >
                Retry
            </button>
            </div>
        )
    }
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
                    {product.description}
                </p>
                <p className={`mb-4 font-semibold ${
                product.stock === 0
                    ? "text-red-600"
                    : product.stock <= 5
                    ? "text-orange-500"
                    : "text-green-600"
                }`}>
                {product.stock === 0
                    ? "Out of stock"
                    : product.stock <= 5
                    ? `Only ${product.stock} left 🔥`
                    : `${product.stock} in stock`}
                </p>
                <button
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                    className={`px-6 py-3 rounded-xl w-full transition ${
                        product.stock === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                    {product.stock === 0
                        ? "Out of Stock"
                        : existingItem
                        ? `Add More (${existingItem.quantity})`
                        : "Add to Cart"}
                </button>
            </div> 
        </div>
    )
}

export default ProductDetail