import React, { useEffect, useState } from "react";
import "../index.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products from multiple APIs and save to localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      async function fetchProducts() {
        const urls = [
          "https://dummyjson.com/products/category/mens-watches",
          "https://dummyjson.com/products/category/mens-shoes",
          "https://dummyjson.com/products/category/mens-shirts",
          "https://dummyjson.com/products/category/tops",
          "https://dummyjson.com/products/category/womens-watches",
          "https://dummyjson.com/products/category/womens-shoes",
          "https://dummyjson.com/products/category/womens-bags",
          "https://dummyjson.com/products/category/womens-jewellery",
          "https://dummyjson.com/products/category/beauty",
          "https://dummyjson.com/products/category/fragrances",
          "https://dummyjson.com/products/category/furniture",
          "https://dummyjson.com/products/category/laptops",
        ];

        const allProducts = [];

        for (const url of urls) {
          const response = await fetch(url);
          const data = await response.json();
          const formattedProducts = data.products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail || "https://via.placeholder.com/150",
          }));
          allProducts.push(...formattedProducts);
        }

        setProducts(allProducts);
        localStorage.setItem("products", JSON.stringify(allProducts));
      }
      fetchProducts();
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add a new product
  const handleAddProduct = () => {
    const newEntry = {
      id: Date.now(),
      ...newProduct,
      image: newProduct.image || "https://via.placeholder.com/150",
    };
    setProducts([...products, newEntry]);
    setNewProduct({ title: "", price: "", image: "" });
  };

  // Update a product
  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editProduct.id ? editProduct : product
      )
    );
    setEditProduct(null);
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="w-full pt-20 min-h-screen container mx-auto">
      <h1 className="text-4xl text-center font-semibold uppercase font-mono underline">
        Admin Panel
      </h1>

      {/* Add Product */}
      <div className="mt-8 border p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Product Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={
                        product.image && product.image.startsWith("http")
                          ? product.image
                          : "https://via.placeholder.com/150"
                      }
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setEditProduct(product)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product */}
      {editProduct && (
        <div className="mt-8 border p-4 rounded shadow-lg">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Product Title"
              value={editProduct.title}
              onChange={(e) =>
                setEditProduct({ ...editProduct, title: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Product Price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Product Image URL"
              value={editProduct.image}
              onChange={(e) =>
                setEditProduct({ ...editProduct, image: e.target.value })
              }
              className="border p-2 rounded"
            />
            <button
              onClick={handleUpdateProduct}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Update Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
