const express = require("express");
const {LoginUser,createUser,getUsers,deleteUser} = require("../controllers/userController");
const { isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/login").post(LoginUser);
router.route("/createUser").post( isAuthenticatedUser,createUser);
router.route("/allusers").get( isAuthenticatedUser,getUsers);
router.route("/allusers/:id").delete( isAuthenticatedUser,deleteUser);


module.exports = router;