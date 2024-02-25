const mongoose = require("mongoose");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("./User");
const Product = require("./Product");

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  image: {
    type: String,
  },
  sliderImages: [
    {
      type: String,
    },
  ],
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  domain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

// static method to create a new shop
ShopSchema.statics.createShop = async function (shopData) {
  const { name } = shopData;
  const shop = await this.findOne({ name });

  if (shop) throw new BadRequestError("Shop name already taken");

  const newShop = new this(shopData);
  await newShop.save();

  return newShop;
};

ShopSchema.statics.deleteShop = async function (shopId) {
  const shop = await this.findById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found");
  }

  // Delete all products associated with the shop
  await Product.deleteMany({ _id: { $in: shop.products } });

  // Delete all categories associated with the shop
  await Category.deleteMany({ _id: { $in: shop.categories } });

  // Delete all users with role.shop equal to the shop being deleted
  await User.deleteMany({ "role.shop": shopId });

  // Delete the shop itself
  const deletedShop = await this.findByIdAndDelete(shopId);

  return deletedShop;
};

ShopSchema.statics.getShops = async function (queryParameters) {
  const shops = await this.find(queryParameters);
  return shops;
};

// Define the static method to retrieve shop categories
ShopSchema.statics.getShopCategories = async function (shopId) {
  // Find the shop by its ID and extract the category IDs
  const shop = await this.findById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found");
  }
  const categoryIds = shop.categories;

  // Find categories with the extracted IDs
  const categories = await Category.find({ _id: { $in: categoryIds } });
  // Extract and return the category names
  // const categoryNames = categories.map((category) => category.name);
  return categories;
};

// static method to update shop rating
ShopSchema.statics.updateRating = async function (shopId) {
  const Review = mongoose.model("Review");

  // Calculate average rating for the shop based on reviews
  const averageRating = await Review.aggregate([
    {
      $match: { shopId: mongoose.Types.ObjectId(shopId) },
    },
    {
      $group: {
        _id: "$shopId",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  // Update the shop's rating with the calculated average rating
  await this.findByIdAndUpdate(shopId, {
    rating: averageRating[0]?.averageRating,
  });
};

const Shop = mongoose.model("Shop", ShopSchema);

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

CategorySchema.statics.createCategory = async function (categoryData) {
  const { name, shop } = categoryData;

  // Fetch the category IDs from the shop document
  const shopCategories = await Shop.findById(shop).select("categories");
  if (shopCategories) {
    const categoryIds = shopCategories.categories;

    // Fetch the categories with the IDs
    const categories = await this.find({ _id: { $in: categoryIds } });

    // Check if the category name already exists for the shop
    const existingCategory = categories.find(
      (category) => category.name === name
    );
    if (existingCategory) {
      throw new BadRequestError("Category already exists for this shop.");
    }
  }

  // Create the new category
  const newCategory = new this({ name });
  await newCategory.save();
  // Update the shop document with the new category ID
  await Shop.findByIdAndUpdate(
    shop,
    { $push: { categories: newCategory._id } },
    { new: true }
  );

  return newCategory;
};

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Shop, Category };
