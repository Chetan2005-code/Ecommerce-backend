import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
export const addToCart = async (req,res) => {
    try {
        
    const userId = req.user._id; // get logged-in user's ID from auth middleware to link cart with correct user
    const { productId, name, price, quantity } = req.body; // extract product ID and quantity sent by client to add/update item in cart

     // ✅ fetch product from DB to get name & price
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }  


    let cart = await cartModel.findOne({user:userId});

    if(!cart){
        cart = await cartModel.create({
            user:userId,
            items: [],
        });
    }
    // check if product exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
       cart.items.push({
        product: productId,
        name: product.name,   // ✅ from DB
        price: product.price, // ✅ from DB
        quantity,
      });
    }

    // 🔥 ADD HERE
   cart.totalItems = cart.items.reduce(
   (acc, item) => acc + item.quantity,
   0
    );

   cart.totalPrice = cart.items.reduce(
   (acc, item) => acc + item.price * item.quantity,
   0
    );

    await cart.save();

      res.status(200).json({
        message:"Product Added to cart",
        cart,
      });
    } catch (error) {
        console.error("",error)
        return res.status(500).json({
            message:"Server Error",
        });
    }
};

export const getCart = async (req,res) => {
    
    try {
        const userId = req.user._id;//get logged-in user's ID from auth middleware
        const cart = await cartModel.findOne({user: userId});//// fetch only this user's cart from database

        res.status(200).json({
            message:"Cart fetched successfully",
            cart,
        });


    } catch (error) {
        console.error("",error);
        return res.status(500).json({
            message:"Server Error",
        });
    }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // remove product
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // recalculate totals
    cart.totalItems = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });

  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItem = async (req,res) => {
    try {
        
     const userId = req.user._id;
     const {productId,quantity} = req.body;

    const cart = await cartModel.findOne({user: userId});

    if(!cart){
        return res.status(404).json({message:"Cart not found"});
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // 🔥 update quantity
    if (quantity <= 0) {
      // remove item
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    // recalculate totals
    cart.totalItems = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });

    } catch (error) {
        console.error("Update cart error:",error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};