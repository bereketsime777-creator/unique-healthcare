import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "./components/AdminLayout";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await API.get("/categories/all");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditMode(true);
      setCurrentCategory(category);
      setForm({
        name: category.name,
        description: category.description || "",
        image: category.image || "",
      });
    } else {
      setEditMode(false);
      setCurrentCategory(null);
      setForm({ name: "", description: "", image: "" });
    }
    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentCategory(null);
    setForm({ name: "", description: "", image: "" });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editMode && currentCategory) {
        await API.put(`/categories/${currentCategory._id}`, form);
        setSuccess("Category updated successfully!");
      } else {
        await API.post("/categories", form);
        setSuccess("Category created successfully!");
      }
      
      await fetchCategories();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      return;
    }

    try {
      await API.delete(`/categories/${id}`);
      setSuccess("Category deleted successfully!");
      await fetchCategories();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await API.put(`/categories/${category._id}`, {
        ...category,
        isActive: !category.isActive,
      });
      await fetchCategories();
    } catch (err) {
      setError("Failed to update category status");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
            <p className="text-gray-500 mt-1">Add, edit, or remove product categories</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Category
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            ✓ {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            ⚠ {error}
          </div>
        )}

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No categories yet</h3>
            <p className="text-gray-500 mb-4">Create your first product category to get started.</p>
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Add Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Category Image */}
                {category.image ? (
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      style={{ display: "none" }}
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
                    >
                      <span className="text-5xl">📂</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <span className="text-5xl">📂</span>
                  </div>
                )}

                {/* Category Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {category.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  <p className="text-xs text-gray-400 mb-3">
                    Slug: <code className="bg-gray-100 px-2 py-0.5 rounded">{category.slug}</code>
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(category)}
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      {category.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id, category.name)}
                      className="border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editMode ? "Edit Category" : "Add New Category"}
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  ⚠ {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  ✓ {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g., Diagnostic Equipment"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of this category"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editMode ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
