const mongoose = require("mongoose");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../errors");
const { ProductReview } = require("./Review");

const ProductSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
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
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.statics.addProduct = async function (productData, shopId) {
  // const Shop = mongoose.model("Shop");
  const newProduct = await this.create(productData);
  // Find the shop by its ID and update its products array
  // await Shop.findByIdAndUpdate(
  // shopId,
  // { $push: { products: newProduct._id } },
  // { new: true }
  // );

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
  await ProductReview.deleteMany({ productId: { $in: productsToDelete } });
  const Product = this;

  const result = await Product.deleteMany({
    _id: { $in: productsToDelete }, // Delete products with IDs in the productsToDelete array
  });

  // Check if any products were deleted
  if (result.deletedCount > 0) {
    // If products were deleted, remove them from the shop's product list
    // await Shop.findByIdAndUpdate(
    //   shopId,
    //   { $pull: { products: { $in: productsToDelete } } }, // Remove deleted products from the shop's products array
    //   { new: true }
    // );

    // Also, delete the reviews associated with the deleted products

    return { success: true, message: "Products deleted successfully", result };
  } else {
    throw new NotFoundError("No products found with the provided IDs");
  }
};

// ProductSchema.statics.getProducts = async function (queryParameters) {
//   let query = this.find(queryParameters);

//   // Retrieve the products based on the query parameters
//   const products = await query.exec();

//   // Randomize the order of the products
//   const shuffledProducts = products.sort(() => Math.random() - 0.5);

//   // Separate the products with offers
//   const productsWithOffers = shuffledProducts.filter(
//     (product) => product.offer > 0
//   );

//   return {
//     products: shuffledProducts,
//     productsWithOffers: productsWithOffers,
//   };
// };

ProductSchema.statics.getProducts = async function (queryParameters) {
  if (queryParameters._id) {
    const product = await this.find({ _id: queryParameters._id });
    const productsWithOffers = [];

    return {
      products: product,
      productsWithOffers: productsWithOffers,
    };
  }
  // Retrieve all products first
  const allProducts = await this.find({ shopId: queryParameters.shopId });

  // Separate the products with offers
  const productsWithOffers = allProducts.filter((product) => product.offer > 0);

  // Apply the query parameters to the remaining products
  const query = this.find(queryParameters);
  const filteredProducts = await query.exec();

  // Randomize the order of the filtered products
  const shuffledFilteredProducts = filteredProducts.sort(
    () => Math.random() - 0.5
  );

  return {
    products: shuffledFilteredProducts,
    productsWithOffers: productsWithOffers,
  };
};

ProductSchema.statics.getProductsById = async function (productIds) {
  try {
    const products = await this.find({ _id: { $in: productIds } }).populate(
      "categories"
    );
    return products;
  } catch (error) {
    throw new Error(`Error fetching products by IDs: ${error.message}`);
  }
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
