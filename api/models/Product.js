const mongoose = require("mongoose");
const { NotFoundError } = require("../errors");

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
});

// static method to calculate average rating
productSchema.statics.calculateAverageRating = async function (productId) {
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
