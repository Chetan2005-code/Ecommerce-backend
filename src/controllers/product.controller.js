import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    // 1. Validate fields
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Create product
    const product = await productModel.create({
      name,
      description,
      price,
      stock,
      category,
      image,
      createdBy: req.user._id, // from auth middleware
    });

    // 3. Response
    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllProduct = async (req,res)=>{
     try{
     const products = await productModel.find();

    res.status(200).json({
        message:"All product fetched successfully",
        products,
    })
     } catch(error){
        console.error("Get products error:",error);
        res.status(500).json({
            message:"Server error",
        });
     }
   
};

export const getProductById = async(req,res)=>{
   try {
      const productId = req.params.id;
    
    const product = await productModel.findById(productId)

     if(!product){
        return res.status(404).json({
            message:"Product not found",
        });
     }

    res.status(200).json({
        message:"Product fetched succesfully",
        product,
    });

   } catch (error) {
     console.error("Get product error:", error);
    res.status(500).json({
      message: "Server error",
    });
   }
  
};

export const deleteProduct = async (req,res) => {
     try{
   const id = req.params.id;

   const product = await productModel.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
        message:"Product Deleted Successfully"
    });
     }catch(error){
        console.error("Delete product Error:",error);
        res.status(500).json({message:"Server error"});
     }
 
};

export const updateProduct = async(req,res)=>{
   try{
  const id  = req.params.id;

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    req.body,//new data
    { returnDocument: "after" }//return updated data
);

 if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
   }catch(error){
    console.error("Update error:", error);
    res.status(500).json({
      message: "Server error",
    });
   }
  

};