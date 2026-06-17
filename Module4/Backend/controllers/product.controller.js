const productModel = require('../models/products.model');



//method: POST
//process: Creating a new product
//route: for admin only
const createProduct = async (req , res, next) => {
    try{
       
        const newProduct  = await productModel.create(req.body);
        res.status(201).json({message: "Product Created", newProduct});
    }catch(err) {
       next(err);
    }
}


//method: Get
//process: Get all Products
//route: access to all admin, user and guest
const getAllProducts = async (req , res, next) => {
    try{
        const products = await productModel.find();
        res.status(200).json(products);

    }catch(err) {
       next(err);
    }
}

//method: Get
//process: Get Product by id
//route: access to all admin, user and guest
const getProductById = async (req , res, next) => {
    try{
        const product = await productModel.findById( req.params.id );
        res.status(200).json(product);

    }catch(err) {
       next(err);
    }
}

//method: Get
//process: Get Product by category
//route: access to all admin, user and guest
const getProductByCategory = async (req , res, next) => {
    try{
        const product = await productModel.findOne( { category:  req.params.category  } );
        res.status(200).json(product);

    }catch(err) {
       next(err);
    }
}

//method: PUT
//process: Update a Product
//route: for admin only
const updateProduct = async (req , res, next) => {
    try{
       

        const updateProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // upadtes only the edited one
                runValidators: true //used to check the validators
            }
        );

        if(!updateProduct) {
            return res.status(404).json({ success: false, message : "Product not found"});
        }

        res.status(200).json({success: true, message: "Product Updated", updateProduct})

    }catch(err) {
       next(err);
    }
}

//method: DELETE
//process: Delete a Product
//route: for admin only
const deleteProduct = async (req , res, next) => {
    try{
        
      
        const deleteProduct = await productModel.findByIdAndDelete(
            req.params.id
        )

         if(!deleteProduct) {
            return res.status(404).json({ success: false, message : "Product not found"});
        }

         res.status(200).json({success: true, message: "Product Deleted"});

    }catch(err) {
       next(err);
    }
}

module.exports = { createProduct, getAllProducts, getProductById, getProductByCategory, updateProduct, deleteProduct};