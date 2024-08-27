import React, { useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("Phone");
    const [top, setTop] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [sortBy, setSortBy] = useState("rating");
    const [order, setOrder] = useState("desc");

    // Function to fetch products based on current state values
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8080/api/v1/product/categories/${category}/products`,
                {
                    params: { top, minPrice, maxPrice, sortBy, order },
                }
            );
            setProducts(response.data);
        } catch (error) {
            setError("Error fetching products");
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchProducts(); // Fetch products when form is submitted
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Product List</h1>

            <form
                onSubmit={handleSubmit}
                className="mb-6 p-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="text-xl font-semibold mb-4">
                    Filter and Sort Products
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Top
                        </label>
                        <input
                            type="number"
                            value={top}
                            onChange={(e) => setTop(Number(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Min Price
                        </label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) =>
                                setMinPrice(Number(e.target.value))
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Max Price
                        </label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(Number(e.target.value))
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="rating">Rating</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Order
                        </label>
                        <select
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Apply Filters
                </button>
            </form>

            <div>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
                {products.length === 0 && !loading && !error && (
                    <p className="text-center">No products found</p>
                )}
                {products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.uniqueId}
                                className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {product.productName}
                                </h2>
                                <p className="text-gray-700 mb-1">
                                    Price: ${product.price.toLocaleString()}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    Rating: {product.rating}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    Discount: {product.discount}
                                </p>
                                <p className="text-gray-700">
                                    Availability: {product.availability}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
