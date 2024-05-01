const mongoose = require("mongoose");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  InternalServerError,
} = require("../errors");
const User = require("./User");
const Product = require("./Product");
const registrationRequestStatus = require("../Enums/shopEnums/shopRegistrationStatus");
const { ProductReview } = require("./Review");
const sendEmail = require("../mailer");

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

  isActive: {
    type: Boolean,
    default: true,
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

ShopSchema.statics.editShop = async function (shopId, shopData) {
  // Check if the provided shop name already exists
  const existingShop = await this.findOne({
    name: shopData.name,
    _id: { $ne: shopId }, // Exclude the current shop being edited
  });

  if (existingShop) {
    throw new BadRequestError("Shop name already exists");
  }

  // Find the shop by its ID and update its data
  const updatedShop = await this.findByIdAndUpdate(shopId, shopData, {
    new: true, // Return the modified document rather than the original
    runValidators: true, // Run validators to ensure the updated data is valid
  });

  if (!updatedShop) {
    throw new NotFoundError("Shop not found");
  }

  return updatedShop;
};

ShopSchema.statics.deleteShop = async function (shopId) {
  const shop = await this.findById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found");
  }

  // Delete all shop products reviews
  // Find all products belonging to the shop
  const productsToDelete = await Product.find({ shopId: shopId });
  // Extract the IDs of the products to delete
  const productIdsToDelete = productsToDelete.map((product) => product._id);
  // Delete all product reviews associated with the products to delete
  await ProductReview.deleteMany({ productId: { $in: productIdsToDelete } });

  // Delete all products associated with the shop
  // await Product.deleteMany({ _id: { $in: shop.products } });
  await Product.deleteMany({ shopId });

  // Delete all categories associated with the shop
  await Category.deleteMany({ _id: { $in: shop.categories } });

  // await ProductReview.deleteMany({ productId: { $in: shop.products } });

  // Delete all users with role.shop equal to the shop being deleted
  await User.deleteMany({ "role.shop": shopId });

  // Delete the shop itself
  const deletedShop = await this.findByIdAndDelete(shopId);

  return deletedShop;
};

// ShopSchema.statics.getShops = async function (queryParameters) {
//   let query = this.find(queryParameters);

//   if (queryParameters._id) {
//     // Populate the categories field
//     query = query.populate("categories");
//   }

//   const shops = await query.exec();
//   return shops;
// };

ShopSchema.statics.getShops = async function (queryParameters) {
  let query = this.find(queryParameters);

  if (queryParameters._id) {
    // Populate the categories field
    query = query.populate("categories");
  }

  // Retrieve the shops based on the query parameters
  const shops = await query.exec();

  // Randomize the order of the shops
  const shuffledShops = shops.sort(() => Math.random() - 0.5);

  return shuffledShops;
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
      (category) => category.name.toLowerCase() === name.toLowerCase()
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

CategorySchema.statics.editCategory = async function (categoryData, shop) {
  const { _id, name } = categoryData;

  // Fetch the category IDs from the shop document
  const shopCategories = await Shop.findById(shop).select("categories");
  if (shopCategories) {
    const categoryIds = shopCategories.categories;

    // Fetch the categories with the IDs
    const categories = await this.find({ _id: { $in: categoryIds } });

    // Check if the category name already exists for the shop
    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );

    if (existingCategory) {
      throw new BadRequestError("Category already exists for this shop.");
    }
  }

  // Find the category by ID
  const category = await this.findById(_id);
  if (!category) {
    throw new Error("Category not found.");
  }

  // Check if the new name is already in use
  // const existingCategory = await this.findOne({ name: newName });
  // if (existingCategory && existingCategory._id.toString() !== categoryId) {
  //   throw new BadRequestError("Category name already exists.");
  // }

  // Update the category name
  category.name = name;
  await category.save();

  return category;
};

const Category = mongoose.model("Category", CategorySchema);

const shopRegistrationSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  shopInfo: {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    domain: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domain",
      },
    ],
  },
  adminInfo: {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "please provide password (min 6 characters)"],
      minlength: 6,
    },
    address: {
      type: String,
      required: [true, "please provide address"],
    },

    number: {
      type: String,
      required: [true, "please provide phone number"],
    },

    role: {
      position: {
        type: String,
        enum: ["user", "shopAdmin", "siteAdmin", "delivery"],
        default: "user",
      },
      shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        default: null,
      },
    },
  },
});

shopRegistrationSchema.statics.addRegistrationRequest = async function (
  requestData
) {
  try {
    const newRequest = await this.create(requestData);

    const emailBody = `
Dear ${newRequest.adminInfo.name},

Thank you for your interest in creating a shop account with Sohmor Online. We have received your request, and our team is currently reviewing it.

Please note that it may take some time to process your request. We will notify you via email once your shop account has been successfully created.

In the meantime, if you have any questions or need further assistance, feel free to contact our support team at leb.sohmor.online@gmail.com.

Best regards,
Sohmor Online Team
`;

    if (newRequest)
      await sendEmail(
        "",
        [newRequest.adminInfo.email],
        "Shop Account Request Confirmation",
        emailBody
      );
    return newRequest;
  } catch (error) {
    throw new InternalServerError(
      "Failed to add registration request: " + error.message
    );
  }
};

shopRegistrationSchema.statics.changeStatus = async function (
  requestId,
  newStatus
) {
  try {
    if (
      newStatus === registrationRequestStatus.REJECTED ||
      newStatus === registrationRequestStatus.ACCEPTED
    ) {
      const deletedRequest = await this.findByIdAndDelete(requestId);
      if (!deletedRequest) {
        throw new NotFoundError("Registration request not found");
      }
      return deletedRequest;
    } else {
      const request = await this.findByIdAndUpdate(
        requestId,
        { status: newStatus },
        { new: true }
      );
      if (!request) {
        throw new NotFoundError("Registration request not found");
      }
      return request;
    }
  } catch (error) {
    throw new InternalServerError("Failed to change status: " + error.message);
  }
};

shopRegistrationSchema.statics.getRegistrationRequests = async function (
  status
) {
  try {
    const requests = await this.find({ status });
    return requests;
  } catch (error) {
    throw new InternalServerError(
      "Failed to retrieve registration requests: " + error.message
    );
  }
};

const ShopRegistration = mongoose.model(
  "ShopRegistration",
  shopRegistrationSchema
);

module.exports = { Shop, Category, ShopRegistration };
