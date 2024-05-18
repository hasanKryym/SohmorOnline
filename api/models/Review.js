const mongoose = require("mongoose");
// const Product = require("./Product");
const User = require("./User");

// schema for product reviews
const ProductReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductReviewSchema.statics.addReview = async function (review) {
  try {
    const { productId, userId, rating, comment } = review;

    // Check if the user has already reviewed the product
    const existingReview = await this.findOne({ productId, userId });

    if (existingReview) {
      // Update the existing review
      if (rating) existingReview.rating = rating;
      if (comment) existingReview.comment = comment;
      await existingReview.save();
    } else {
      // Create a new review
      const newReview = new this({ productId, userId, rating, comment });
      await newReview.save();
    }

    // Calculate the new average rating for the product
    const Product = require("./Product");
    const product = await Product.findById(productId);
    const allReviews = await this.find({ productId });
    const totalRatings = allReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    ); // sum: This is the accumulator that keeps track of the sum of ratings as the reduce function iterates over each review

    const averageRating = parseFloat(
      (totalRatings / allReviews.length).toFixed(1)
    );

    // Update the rating field of the corresponding Product document
    product.rating = averageRating;
    await product.save();

    return {
      success: true,
      message: "Review added successfully",
      averageRating,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

ProductReviewSchema.statics.getReview = async function (productId, userId) {
  try {
    const userReview = await this.findOne({ productId, userId });
    const rating = userReview?.rating ?? 0;
    const comment = userReview?.comment ?? "";

    return {
      success: true,
      review: { rating, comment },
      message: "User review retrieved successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ProductReviewSchema.statics.getReviews = async function (productId, userId) {
//   try {
//     const reviews = await this.find({ productId });
//     return {
//       success: true,
//       reviews,
//       message: "Product reviews retrieved successfully",
//     };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };

ProductReviewSchema.statics.getReviews = async function (productId) {
  try {
    const User = require("./User");
    let query = { productId };
    // if (excludeUserId) {
    //   query.userId = { $ne: excludeUserId };
    // }
    let reviews = await this.find(query);

    // Create a new array of plain JavaScript objects with the added username property
    const updatedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await User.findById(review.userId);
        return { ...review.toObject(), username: user.name };
      })
    );

    return {
      success: true,
      reviews: updatedReviews,
      message: "Product reviews retrieved successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// schema for shop reviews
const ShopReviewSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Static function to add a shop review and update the shop's rating
ShopReviewSchema.statics.addReviewAndUpdateRating = async function (review) {
  try {
    // Check if the user has already submitted a review for the same shop
    const existingReview = await this.findOne({
      shopId: review.shopId,
      userId: review.userId,
    });

    if (existingReview) {
      // Update the existing review
      if (rating) existingReview.rating = review.rating;
      if (comment) existingReview.comment = review.comment;
      await existingReview.save();
      return existingReview;
    } else {
      // Add a new review
      const newReview = await this.create(review);

      // Calculate the new average rating for the shop
      const allReviews = await this.find({ shopId: review.shopId });
      const totalRatings = allReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = parseFloat(
        (totalRatings / allReviews.length).toFixed(1)
      );

      // Update the shop's rating in the shop collection
      await Shop.findByIdAndUpdate(review.shopId, { rating: averageRating });

      return newReview;
    }
  } catch (error) {
    throw new Error("Failed to add shop review and update rating");
  }
};

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);
const ShopReview = mongoose.model("ShopReview", ShopReviewSchema);

module.exports = {
  ProductReview,
  ShopReview,
};
