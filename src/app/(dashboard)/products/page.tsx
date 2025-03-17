"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import useProductStore from "@/store/useProductStore";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useProductStore();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
    image: "",
    barcode: "",
  });

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    addProduct(newProduct);
    toast.success(`Added ${newProduct.name}`);

    setNewProduct({
      name: "",
      price: 0,
      category: "",
      description: "",
      stock: 0,
      image: "",
      barcode: "",
    });

    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (id: string) => {
    const product = products.find((p) => p.id === id);

    if (!product) return;

    if (!product.name || !product.category || product.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateProduct(id, product);
    toast.success(`Updated ${product.name}`);

    setEditingProductId(null);
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find((p) => p.id === id);

    if (!product) return;

    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(id);
      toast.success(`Deleted ${product.name}`);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
  };

  const updateProductField = (
    id: string,
    field: keyof Product,
    value: string | number
  ) => {
    updateProduct(id, { [field]: value });
  };

  const updateNewProductField = (
    field: keyof Omit<Product, "id">,
    value: string | number
  ) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsAddingProduct(!isAddingProduct)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isAddingProduct ? "Cancel" : "Add Product"}
        </button>
      </div>

      {isAddingProduct && (
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-lg font-medium mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => updateNewProductField("name", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  updateNewProductField("price", parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) =>
                  updateNewProductField("category", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Category"
                list="categories"
              />
              <datalist id="categories">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  updateNewProductField("stock", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barcode
              </label>
              <input
                type="text"
                value={newProduct.barcode || ""}
                onChange={(e) =>
                  updateNewProductField("barcode", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Barcode (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={newProduct.image || ""}
                onChange={(e) => updateNewProductField("image", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Image URL (optional)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newProduct.description || ""}
                onChange={(e) =>
                  updateNewProductField("description", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Description (optional)"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Product
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        updateProductField(product.id, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 border rounded-md"
                      aria-label="Product Name"
                      placeholder="Product name"
                    />
                  ) : (
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 mr-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover rounded-md"
                          />
                        ) : (
                          <span>No img</span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      value={product.category}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border rounded-md"
                      list="edit-categories"
                      aria-label="Product Category"
                      placeholder="Category"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 border rounded-md"
                      min="0"
                      step="0.01"
                      aria-label="Product Price"
                      placeholder="0.00"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.price)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "stock",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 border rounded-md"
                      min="0"
                      aria-label="Product Stock"
                      placeholder="0"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingProductId === product.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProductId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <datalist id="edit-categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
