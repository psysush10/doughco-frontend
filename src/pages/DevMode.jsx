import { useEffect, useState } from "react";

function DevMode() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const orderRes = await fetch(`${API_BASE}/api/orders`);
      const orderData = await orderRes.json();

      const productRes = await fetch(`${API_BASE}/api/products`);
      const productData = await productRes.json();

      setOrders(orderData);
      setProducts(productData);
    };

    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order.total_amount || 0);
  }, 0);

  const lastOrder = orders[orders.length - 1];

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-xl font-bold mb-4">Dev Mode</h1>

      {/* SYSTEM STATUS */}
      <div className="border p-3 rounded mb-3">
        <p>API: Connected</p>
        <p>Environment: Local</p>
      </div>

      {/* BUSINESS SNAPSHOT */}
      <div className="border p-3 rounded mb-3">
        <p>Total Products: {products.length}</p>
        <p>Total Orders: {orders.length}</p>
      </div>

      {/* REVENUE */}
      <div className="border p-3 rounded mb-3">
        <p>Total Revenue: ₹{totalRevenue}</p>
      </div>

      {/* LAST ACTIVITY */}
      <div className="border p-3 rounded">
        <p>Last Order ID: {lastOrder?.id || "N/A"}</p>
      </div>

    </div>
  );
}

export default DevMode;