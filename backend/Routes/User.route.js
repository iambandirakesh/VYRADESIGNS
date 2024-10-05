import express from "express";
import {
  registerUser,
  loginUser,
  userDetails,
  updateUser,
  deleteUser,
  logOut,
} from "../Controllers/User.controller.js";
import { AuthMiddleware } from "../middleware/Auth.middleware.js";
const router = express.Router();
//get all users
// router.get("/", getAllUsers);
//login user
router.post("/login", loginUser);
router.post("/logout", logOut);
//get user by id
router.get("/user-details", AuthMiddleware, userDetails);
//create new user
router.post("/register", registerUser);
//update user
router.put("/update-user", AuthMiddleware, updateUser);
//delete user
router.delete("/delete-user", AuthMiddleware, deleteUser);
export default router;
