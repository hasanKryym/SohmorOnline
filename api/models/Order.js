const mongoose = require("mongoose");
const userPositions = require("../Enums/userEnums/positionsEnums");
const User = require("./User");
const sendEmail = require("../mailer");

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
      name: {
        type: String,
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

    const customerInfo = await User.findById(userId);
    const shopAdminInfo = await User.findOne({
      "role.position": userPositions.SHOP_ADMIN,
      "role.shop": shopId,
    });

    const shopAdminEmailBody = `
Hello,

We're excited to inform you that ${customerInfo.name} has just placed an order (${order._id}) from your shop. Here are the customer details:
- Phone number: ${customerInfo.number}
- Email: ${customerInfo.email}
- Address: ${customerInfo.address}

Please log in to your admin panel to view and process the order accordingly.

Best Regards,
Sohmor Online Team
`;

    const customerEmailBody = `
Dear ${customerInfo.name},

Thank you for your order! We've successfully received it and it's being processed. Here are the details:

Order ID: ${order._id}

For any inquiries or assistance regarding your order, please feel free to contact the shop directly using the following information:
- Phone number: ${shopAdminInfo.number}
- Email: ${shopAdminInfo.email}
- Address: ${shopAdminInfo.address}

We appreciate your business and look forward to serving you again soon.

Best Regards,
Sohmor Online Team
`;

    await sendEmail(
      "",
      [shopAdminInfo.email],
      `New Order Received: Order ID - ${order._id}`,
      shopAdminEmailBody
    );
    await sendEmail(
      "",
      [customerInfo.email],
      `Order Confirmation: Order ID - ${order._id}`,
      customerEmailBody
    );

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

    const customerInfo = await User.findById(order.userId);
    const shopAdminInfo = await User.findOne({
      "role.position": userPositions.SHOP_ADMIN,
      "role.shop": order.shopId,
    });

    const customerEmailBody = `
Dear ${customerInfo.name},

Your order (${order._id}) status has been updated to ${order.status}

For any inquiries or assistance regarding your order, please feel free to contact the shop directly using the following information:
- Phone number: ${shopAdminInfo.number}
- Email: ${shopAdminInfo.email}
- Address: ${shopAdminInfo.address}

We appreciate your business and look forward to serving you again soon.

Best Regards,
Sohmor Online Team
`;

    await sendEmail(
      "",
      [customerInfo.email],
      `Order status Updated: Order ID - ${order._id}`,
      customerEmailBody
    );

    return { success: true, order, message: "Order updated successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Define and export the Order model
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
