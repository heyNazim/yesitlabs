import productModel from "../models/productModel.js"



// Create Product
export const createProduct = async(req,res)=>{
    try {
        const { name, description, price, category, brand, quantity, available, countInStock, rating, numReviews } = req.body;
        const images = req.files.map(file => file.path);
        // validation
        if(!name || !description || !price){
            return res.status(400).send({
                success:false,
                message:"Plz add all fields"
            })
        }

        
        const product = await new productModel({ name,description,price,images,category,brand,quantity,available,countInStock,rating, numReviews }).save()
            res.status(201).send({
                success:true,
                message:"New Product created",
                product
            })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong", 
            error
        })
    }
}


// Update Product
export const updateProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, description, price, category, brand, quantity, available, countInStock, rating, numReviews } = req.body;

         // Log incoming data
    console.log('Request Body:', req.body);
    console.log('Files:', req.files);

      
      // If new images are uploaded, handle them
      const images = req.files.map(file => file.path);
  
      // Find the product by ID and update it with the new data
      const product = await productModel.findByIdAndUpdate(
        id, 
        { 
          name, 
          description, 
          price, 
          category, 
          brand, 
          quantity, 
          available, 
          countInStock, 
          rating, 
          numReviews,
          ...(images && { images }) // If images exist, update them
        }, 
        { new: true }
      );
  
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send({
        success: false,
        message: "Something went wrong....",
        error: error.message
      });
    }
  };
  

// Get ALL Products
export const allProducts = async(req,res)=>{
    try {
        const products = await productModel.find({})
        if(products){
            res.status(200).send({
                success:true,
                message:"Get All Products Successfully",
                products
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong", 
            error
        })
    }
}


// Delete Product
export const deleteProduct = async(req,res)=>{
    try {
       const {id} = req.params
       const product = await productModel.findByIdAndDelete(id)
       if(product){
        res.status(200).send({
            success:true,
            message:"Product Deleted",
            product
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong", 
            error
        })
    }
}

// Single Product
export const Product = async(req,res)=>{
    try {
       const product = await productModel.find({_id: req.params.id})
       if(product){
        res.status(200).send({
            success:true,
            message:"Get Product Successfull",
            product
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong", 
            error
        })
    }
}

