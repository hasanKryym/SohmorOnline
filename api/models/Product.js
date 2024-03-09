const mongoose = require("mongoose");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../errors");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  offer: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

ProductSchema.statics.addProduct = async function (productData, shopId) {
  const Shop = mongoose.model("Shop");
  const newProduct = await this.create(productData);
  // Find the shop by its ID and update its products array
  await Shop.findByIdAndUpdate(
    shopId,
    { $push: { products: newProduct._id } },
    { new: true }
  );

  return newProduct;
};

ProductSchema.statics.editProduct = async function (productId, updatedData) {
  try {
    // Find the product by ID and update it
    const updatedProduct = await this.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error editing product:", error);
    throw error;
  }
};

ProductSchema.statics.deleteProducts = async function (
  productsToDelete,
  shopId
) {
  const Shop = mongoose.model("Shop");
  const Product = this;

  const result = await Product.deleteMany({
    _id: { $in: productsToDelete }, // Delete products with IDs in the productsToDelete array
  });

  // Check if any products were deleted
  if (result.deletedCount > 0) {
    // If products were deleted, remove them from the shop's product list
    await Shop.findByIdAndUpdate(
      shopId,
      { $pull: { products: { $in: productsToDelete } } }, // Remove deleted products from the shop's products array
      { new: true }
    );
    return { success: true, message: "Products deleted successfully", result };
  } else {
    throw new NotFoundError("No products found with the provided IDs");
  }
};

ProductSchema.statics.getProducts = async function (queryParameters) {
  const products = await this.find(queryParameters);
  return products;
};

// static method to calculate average rating
ProductSchema.statics.calculateAverageRating = async function (productId) {
  const Product = this;
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  // Placeholder logic to calculate average rating
  const totalRatings = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings / product.reviews.length;

  // Update the product's rating
  product.rating = averageRating;
  await product.save();

  return averageRating;
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
