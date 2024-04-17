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

// Static function to retrieve orders based on provided criteria
OrderSchema.statics.getOrders = async function (orderData) {
  try {
    // Construct the query object based on provided criteria
    const query = {};
    if (orderData.shopId) query["products.shopId"] = orderData.shopId;
    if (orderData.userId) query.userId = orderData.userId;
    if (orderData.status) query.status = orderData.status;

    // Find orders that match the query
    // const orders = await this.find(query);

    // Find orders that match the query and populate the shops and products fields
    const orders = await this.find(query)
      .populate("products.productId", "-_id") // Populate the products field with data from the Product model
      .populate("products.shopId", "-_id"); // Populate the shops field with data from the Shop model

    return {
      success: true,
      orders,
      message: "Orders retrieved successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Define and export the Order model
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
