const express = require('express')
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.Middleware");

const orderController = require('../controllers/oder.controller');


//Admin Access
router.get("/",verifyToken,
      authorizeRoles("admin"),
    orderController.getAllOrders);

router.delete("/:id",verifyToken,
      authorizeRoles("admin"),
    orderController.deleteOrder);

//Admin and User Access
router.get("/:id",verifyToken,
     authorizeRoles("admin","user"),
    orderController.getOrderById);
router.get("/user/:id",verifyToken,
     authorizeRoles("admin","user"),
    orderController.getOrderByUserId);
router.post("/create", verifyToken, authorizeRoles("admin","user"),orderController.createOrder);
router.put("/:id",verifyToken,
     authorizeRoles("admin","user"),
    orderController.updateOrder);



module.exports = router;