const mongoose = require("mongoose");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

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
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
      name: {
        type: String,
        required: true,
      },
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
  const shop = await this.findOne({ shopId });
  if (!shop) throw new NotFoundError("Shop not found");
  const deletedShop = await this.findByIdAndDelete(shopId);
  return deletedShop;
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

module.exports = Shop;
