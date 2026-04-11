import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema(
  {
    product: {
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
      min: 1,
      default: 1,
    },

    image: {
      type: String,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },

    items: [cartItemSchema],

    totalPrice: {
      type: Number,
      default: 0,
    },

    totalItems: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const cartModel = mongoose.model("cart",cartSchema)

export default cartModel;