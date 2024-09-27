import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, gender, DateOfBirth, profilePic } =
      req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      DateOfBirth,
      profilePic,
    };
    const newUser = await User.create(payload);
    return res.status(200).send({
      status: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.statuss(500).json({ status: false, message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    return res.cookie("token", token, cookieOptions).status(200).json({
      status: true,
      message: "User logged in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const userDetails = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    return res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const newData = req.body;
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const updatedUser = await User.updateOne({ _id: user._id }, newData);
    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const deletedUser = await User.deleteOne({ _id: user._id });
    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
