const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Refunded",
    ],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Add a virtual property to format the createdAt field with the desired timezone
OrderSchema.virtual("createdAtFormatted").get(function () {
  return moment(this.createdAt).tz("Asia/Beirut").format("YYYY-MM-DD HH:mm:ss");
});

// Static function to create an order
OrderSchema.statics.createOrder = async function (userId, products) {
  try {
    const order = await this.create({
      userId,
      products,
    });

    return { success: true, order, message: "order created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Define and export the Order model
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
