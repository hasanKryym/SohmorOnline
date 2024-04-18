const mongoose = require("mongoose");
const userPositions = require("../Enums/userEnums/positionsEnums");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
OrderSchema.statics.createOrder = async function (userId, shopId, products) {
  try {
    const order = await this.create({
      userId,
      shopId,
      products,
    });

    return { success: true, order, message: "Order created successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Static function to retrieve orders based on provided criteria
OrderSchema.statics.getOrders = async function (orderData, userPosition) {
  try {
    // Construct the query object based on provided criteria
    const query = {};
    if (orderData.shopId) query.shopId = orderData.shopId;
    if (orderData.userId) query.userId = orderData.userId;
    if (orderData.status) query.status = orderData.status;

    // Find orders that match the query and populate the products field
    let ordersQuery = this.find(query)
      .populate("products.productId") // Populate the products field with data from the Product model
      .populate("shopId"); // Populate the shopId field with data from the Shop model

    // Conditionally populate the userId field based on userPosition
    if (userPosition === userPositions.SHOP_ADMIN) {
      ordersQuery = ordersQuery.populate(
        "userId",
        "-password -fav -cart -role -__v"
      );
    }
    const orders = await ordersQuery;

    return {
      success: true,
      orders,
      message: "Orders retrieved successfully",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Static function to update an order
OrderSchema.statics.updateOrder = async function (orderId, updatedFields) {
  try {
    // Find the order by orderId and update it with the provided fields
    const order = await this.findByIdAndUpdate(orderId, updatedFields, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Run validators to ensure updated fields meet schema requirements
    });

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    return { success: true, order, message: "Order updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Define and export the Order model
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
