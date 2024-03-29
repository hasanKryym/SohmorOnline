const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require("../errors");

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

UserSchema.statics.register = async function (userData) {
  const { name, email } = userData;
  const userEmail = await this.findOne({ email });
  const username = await this.findOne({ name });

  if (userEmail) throw new BadRequestError("email already exists");
  if (username) throw new BadRequestError("username already exists");

  const newUser = new this(userData);
  newUser.password = await newUser.hashPassword(userData.password); // Assign hashed password
  await newUser.save();
  // Exclude password from user object
  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  if (userData?.role?.position === "shopAdmin")
    return { user: userWithoutPassword, token: null };

  const token = newUser.createJWT();

  return { user: userWithoutPassword, token };
};

//CART

// Static method to update the user's cart
// UserSchema.statics.updateCart = async function (userId, cartItems) {
//   try {
//     const User = this;
//     const user = await User.findById(userId);

//     if (!user) {
//       throw new NotFoundError("User not found");
//     }

//     // Update the user's cart based on the provided cart items
//     cartItems.forEach((item) => {
//       const index = user.cart.findIndex((cartItem) =>
//         cartItem.product.equals(item.product)
//       );
//       if (index !== -1) {
//         // If the product already exists in the cart, update its quantity
//         user.cart[index].quantity = item.quantity;
//       } else {
//         // If the product is not in the cart, add it
//         user.cart.push(item);
//       }
//     });

//     // Save the updated user document
//     await user.save();

//     return user.cart; // Return the updated cart
//   } catch (error) {
//     throw new InternalServerError(`Failed to update cart: ${error.message}`);
//   }
// };

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

const User = mongoose.model("User", UserSchema);

module.exports = User;
