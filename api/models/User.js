const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 50,
    unique: true,
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
      enum: ["user", "shopAdmin", "siteAdmin"],
      default: "user",
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
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
  await newUser.save();

  const token = newUser.createJWT();

  // Exclude password from user object
  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
