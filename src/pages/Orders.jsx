import { useEffect, useState } from "react"

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [expandedOrder, setExpandedOrder] = useState(null);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/orders`)
                const data = await res.json()
                setOrders(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) return (
            <div className="p-5">
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        )

    if (!loading && orders.length === 0) {
    return (
        <div className="p-4 text-center text-gray-500">
        No orders yet 🧾
        </div>
    );
}

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div 
                            key={order.id}
                            className="border rounded p-4 mb-3 cursor-pointer"
                            onClick={() => 
                                setExpandedOrder(expandedOrder === order.id ? null : order.id)
                            }>

                            {/* HEADER */}
                            <div className="flex justify-between">
                            <div>
                                <p className="font-bold">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">{order.customer_name}</p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">₹{order.total_amount}</p>
                                <p className="text-xs text-gray-500">{order.status}</p>
                            </div>
                            </div>

                            {/* ITEMS */}
                            { expandedOrder === order.id && (
                                <div className="mt-3 text-sm text-gray-700">
                                    {order.items?.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                    <span>
                                        • {item.product?.name || "Product"} × {item.quantity}
                                    </span>
                                    <span>₹{item.price * item.quantity}</span>
                                    </div>
                            ))}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders