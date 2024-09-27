import express from "express";
import {
  registerUser,
  loginUser,
  userDetails,
  updateUser,
  deleteUser,
} from "../Controllers/User.controller.js";
const router = express.Router();
//get all users
// router.get("/", getAllUsers);
//login user
router.post("/login", loginUser);
//get user by id
router.get("/user-details", userDetails);
//create new user
router.post("/register", registerUser);
//update user
router.put("/update-user", updateUser);
//delete user
router.delete("/delete-user", deleteUser);
export default router;
