const express = require("express");
const Controller = require("../controllers");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

//get all users
router.get("/", Controller.index);
//register new user
router.post("/register", Controller.register);
//confirmation email
router.post("/confirmation", Controller.confirmationEmail);
//finde or create user
router.post("/find-or-create", Controller.findOrCreateUser);
//login user
router.post("/login", Controller.login);
//get detail user by id
router.get("/detail", isLoggedIn, Controller.getUserById);
//change password
router.patch("/change-password", isLoggedIn, Controller.changePassword);
//update user
router.put("/update", isLoggedIn, Controller.updateUser);
//delete user
router.delete("/delete/:id", Controller.deleteUser);
//change role user
router.patch("/change-role/:id", Controller.changeRole);
//change status active user
router.patch("/change-status/:id", Controller.changeStatusActive);
//change status verified user
router.patch("/change-verified/:id", Controller.changeStatusVerified);
//check duplicate username
router.get("/check-username", Controller.checkDuplicateUsername);

module.exports = router;
