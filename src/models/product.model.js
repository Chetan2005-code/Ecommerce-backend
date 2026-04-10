import mongoose from "mongoose";
const productSchema = new mongoose.Schema({

          name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    image: {
      type: String, // URL (Cloudinary later)
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product",productSchema)
export default productModel;