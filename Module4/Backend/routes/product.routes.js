const express = require('express')
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.Middleware");

const productController = require('../controllers/product.controller');


//Admin access
router.post("/create",verifyToken,    
     authorizeRoles("admin"),
     productController.createProduct);
router.put("/:id", verifyToken,
     authorizeRoles("admin"),
     productController.updateProduct);
router.delete("/:id", verifyToken, 
     authorizeRoles("admin"),
    productController.deleteProduct);

//All access
router.get("/",productController.getAllProducts);
router.get("/:id",productController.getProductById);
router.get("/category/:category",productController.getProductByCategory);



module.exports = router;