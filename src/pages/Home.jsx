import { useState, useEffect } from "react"
import { products as data } from "../data/products"
import ProductCard from "../components/ProductCard"
import { useCartContext } from "../context/CartContext"


function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")
    const [error, setError] = useState(null)
    const cheapItems = products.filter(p => p.price <= 50)
    const premiumItems = products.filter(p => p.price > 50)
    const { addToCart } = useCartContext()
    const filteredCheapProducts = cheapItems.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    const filteredPremiumProducts = premiumItems.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

    const fetchProducts = () => {
    setLoading(true)
    setError(null)

    const timer = setTimeout(() => {
        // simulate failure randomly
        const shouldFail = Math.random() < 0.3

        if (shouldFail) {
            setError("Failed to load products. Please try again.")
            setLoading(false)
            } else {
            setProducts(data)
            setLoading(false)
        }
        }, 1000)

        return () => clearTimeout(timer)
    }
    useEffect(() => {
        fetchProducts()
    },[])

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
    if (error) {
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
    return (
        <div className="p-5 space-y-6">
            <p className="text-sm text-gray-500">
                Quick bites for school breaks🍪
            </p>

            <input
                type="text"
                placeholder="Search Cookie Dough..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 mb-5 border rounded-x1" />

            <h2 className="text-xl font-bold mb-3">
                Under ₹50
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {filteredCheapProducts.map((item) => (
                    <ProductCard
                    key={item.id}
                    item={item}
                    />
                ))}
            </div>
            <h2 className="text-xl font-bold mb-3">
                Treat Yourself
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {filteredPremiumProducts.map((item) => (
                    <ProductCard
                    key={item.id}
                    item={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home