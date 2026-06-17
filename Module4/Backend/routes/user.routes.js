const express = require('express');
const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.Middleware");

const router = express.Router();

const { getAllUser, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');

//router.use(verifyToken);

router.get("/",verifyToken,
     authorizeRoles("admin"),
     getAllUser);
router.get("/:id",verifyToken,authorizeRoles("admin","user"), getUserById);
router.put("/:id",verifyToken,authorizeRoles("admin"), updateUser);
router.delete("/:id",verifyToken,authorizeRoles("admin"), deleteUser);


module.exports = router;
