import { useState } from "react";

function AdminProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        price,
        stock,
        tag
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product created successfully!");
      setName("")
      setPrice("")
      setStock("")
      setTag("")
      setDescription("")
    } else {
      alert(data.message || "Error creating product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin - Add Product</h1>
      <div className="text-xs text-gray-400 mt-2">
        API: Connected • Environment: Local • Orders: Transactional Mode
        </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="textarea"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Create Product
        </button>

      </form>
    </div>
  );
}

export default AdminProducts;