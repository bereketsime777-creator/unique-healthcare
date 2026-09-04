const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { getCategoryFilterValues, normalizeCategory } = require("../utils/categories");


// ==============================
// Generate Storekeeping ID
// ==============================
const generateStorekeepingId = async () => {
  const year = new Date().getFullYear();
  const latestProduct = await Product.findOne({ storekeepingId: { $regex: `^UHC-${year}-` } })
    .sort({ storekeepingId: -1 })
    .select('storekeepingId');
  
  if (latestProduct && latestProduct.storekeepingId) {
    const lastNumber = parseInt(latestProduct.storekeepingId.split('-')[2]);
    const nextNumber = (lastNumber + 1).toString().padStart(3, '0');
    return `UHC-${year}-${nextNumber}`;
  }
  
  return `UHC-${year}-001`;
};

// ==============================
// Create Product (Admin)
// ==============================

const createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "unique-healthcare-products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = result.secure_url;
    }

    // Auto-generate storekeeping ID if not provided
    let storekeepingId = req.body.storekeepingId?.trim();
    if (!storekeepingId) {
      storekeepingId = await generateStorekeepingId();
    }

    const product = await Product.create({
      storekeepingId,
      name: req.body.name,
      category: normalizeCategory(req.body.category),
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      description: req.body.description,
      specifications: req.body.specifications,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Get All Products (Public)
// ==============================

const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {};

    if (category) {
      const values = getCategoryFilterValues(category);
      filter.category = values.length === 1 ? values[0] : { $in: values };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { manufacturer: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json(
      products.map((product) => {
        const doc = product.toObject();
        doc.category = normalizeCategory(doc.category);
        return doc;
      })
    );
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Get Single Product (Public)
// ==============================

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const doc = product.toObject();
    doc.category = normalizeCategory(doc.category);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Update Product (Admin)
// ==============================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use explicit undefined checks so values like 0 are accepted
    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.category !== undefined) {
      product.category = normalizeCategory(req.body.category);
    }
    if (req.body.manufacturer !== undefined) product.manufacturer = req.body.manufacturer;
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.stock !== undefined) product.stock = Number(req.body.stock);
    if (req.body.description !== undefined) product.description = req.body.description;
    if (req.body.specifications !== undefined) product.specifications = req.body.specifications;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "unique-healthcare-products" },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      product.image = result.secure_url;
    }

    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Delete Product (Admin)
// ==============================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
