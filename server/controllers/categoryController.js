const Category = require("../models/Category");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get active categories only
exports.getActiveCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if category already exists
    const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      slug,
      description: description || "",
      image: image || "",
    });

    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update slug if name changed
    if (name && name !== category.name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      category.slug = slug;
      category.name = name;
    }

    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if any products use this category
    const Product = require("../models/Product");
    const productsCount = await Product.countDocuments({ category: category.name });

    if (productsCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category. ${productsCount} product(s) are using this category. Please reassign or delete those products first.`,
        productsCount 
      });
    }

    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
