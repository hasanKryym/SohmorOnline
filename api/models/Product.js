const mongoose = require("mongoose");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../errors");
const Shop = require("./Shop");

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
      type: String,
    },
  ],
});

ProductSchema.statics.addProduct = async function (productData, shopId) {
  const newProduct = await this.create(productData);

  // Find the shop by its ID and update its products array
  await Shop.findByIdAndUpdate(
    shopId,
    { $push: { products: newProduct._id } },
    { new: true }
  );

  return newProduct;
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
