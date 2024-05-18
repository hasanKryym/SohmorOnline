const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../errors");
const sendEmail = require("../mailer");
const { ShopRegistration } = require("./Shop");

const UserSchema = new mongoose.Schema({
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

  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  fav: {
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shop" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

UserSchema.statics.login = async function (email, password) {
  email = email.trim();
  password = password.trim();

  const user = await this.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  // Exclude password from user object
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

UserSchema.statics.validateUserBeforeRegister = async function (
  name,
  email,
  fromShopRegistrationRequest
) {
  name = name.trim();
  email = email.trim();
  const username = await this.findOne({ name });
  if (username) throw new BadRequestError("username already exists");

  const userEmail = await this.findOne({ email });
  if (userEmail) throw new BadRequestError("email already exists");

  // Check if the email already exists in the ShopRegistration schema

  if (!fromShopRegistrationRequest) {
    const existingRequestAdminName = await ShopRegistration.findOne({
      "adminInfo.name": name,
    });
    if (existingRequestAdminName) {
      throw new BadRequestError("username already exists");
    }

    const existingRequestAdmin = await ShopRegistration.findOne({
      "adminInfo.email": email,
    });
    if (existingRequestAdmin) {
      throw new BadRequestError("email already exists");
    }
  }
};

UserSchema.statics.register = async function (
  userData,
  fromShopRegistrationRequest
) {
  // fromShopRegistrationRequest is a boolean value that allow the system to know if he need to check the user name and email in the shopRegistration schema before registering a user
  console.log(fromShopRegistrationRequest);
  let { name, email, password, address, number, role } = userData;

  name = name.trim();
  email = email.trim();
  password = password.trim();
  address = address.trim();
  number = number.trim();

  const trimmedData = {
    name,
    email,
    password,
    address,
    number,
    role,
  };

  await this.validateUserBeforeRegister(
    name,
    email,
    fromShopRegistrationRequest
  );

  const newUser = new this(trimmedData);
  newUser.password = await newUser.hashPassword(trimmedData.password); // Assign hashed password
  await newUser.save();
  // Exclude password from user object
  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  // token null because the site admin registered this user no need for the token
  if (userData?.role?.position === "shopAdmin") {
    const emailBody = `
Dear ${name},

Congratulations! Your shop account with Sohmor Online has been successfully created.

You can now log in to your account using the email and password you provided during the application process.

Thank you for choosing Sohmor Online. If you have any questions or need assistance, please don't hesitate to contact our support team at leb.sohmor.online@gmail.com.

Best regards,
Sohmor Online Team
`;

    await sendEmail(
      "",
      [email],
      "Your Shop Account with Sohmor Online",
      emailBody
    );

    return { user: userWithoutPassword, token: null };
  }

  const token = newUser.createJWT();

  return { user: userWithoutPassword, token };
};

UserSchema.statics.updateCart = async function (userId, cartItems) {
  try {
    const User = this;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.cart = cartItems;

    // Save the updated user document
    await user.save();

    return user.cart; // Return the updated cart
  } catch (error) {
    throw new InternalServerError(`Failed to update cart: ${error.message}`);
  }
};

UserSchema.statics.clearCart = async function (userId) {
  try {
    const User = this;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.cart = [];
    await user.save();

    return { success: true, message: "cart cleared successfully" };
  } catch (error) {
    throw new InternalServerError(`Failed to clear cart: ${error.message}`);
  }
};

// Static method to replace the user's cart
UserSchema.statics.replaceCart = async function (userId, newCartItems) {
  try {
    const User = this;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Replace the user's cart with the new cart items
    user.cart = newCartItems;

    // Save the updated user document
    await user.save();

    return user.cart; // Return the updated cart
  } catch (error) {
    throw new InternalServerError(`Failed to replace cart: ${error.message}`);
  }
};

UserSchema.statics.editUserData = async function (userId, userData) {
  try {
    const existingUserName = await User.findOne({
      name: userData.name,
      _id: { $ne: userId },
    });

    if (existingUserName) {
      throw new BadRequestError("username already exists");
    }

    const newUserData = await this.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!newUserData) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      newUserData,
      message: "User data updated successfully",
    };
  } catch (error) {
    throw new InternalServerError(
      `Failed to update user data: ${error.message}`
    );
  }
};

UserSchema.statics.editFavorites = async function (userId, newFavorites) {
  try {
    // Find the user by userId and populate the shops and products fields
    const user = await this.findById(userId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    // Update the user's favorites with the newFavorites object
    user.fav = newFavorites;

    // Save the updated user object
    await user.save();

    // Populate the shops and products fields of the updated user
    const updatedUser = await this.findById(userId)
      .populate("fav.shops")
      .populate("fav.products");

    return {
      success: true,
      message: "Favorites updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update favorites: ${error.message}`,
    };
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
