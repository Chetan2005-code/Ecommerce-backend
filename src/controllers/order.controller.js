import orderModel from "../models/order.model.js";
import cartModel from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, paymentMethod } = req.body;

    // 1. Get user's cart
    const cart = await cartModel.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // 2. Create order from cart
    const order = await orderModel.create({
      user: userId,
      items: cart.items,           // snapshot from cart
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
      paymentMethod,
      address,
    });

    // 3. Clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;

    await cart.save();

    // 4. Response
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};



export const getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🔐 security check
    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });

  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🔥 update status
    order.status = status;

    // optional: mark paid
    if (status === "paid") {
      order.isPaid = true;
      order.paidAt = new Date();
    }

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });

  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await orderModel.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};