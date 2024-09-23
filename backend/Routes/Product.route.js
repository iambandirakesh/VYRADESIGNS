import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product.controller.js";
const router = express.Router();
//get all products
router.get("/", getAllProducts);
//get product by id
router.get("/:id", getProduct);
//create new product
router.post("/", createProduct);
//update product
router.put("/:id", updateProduct);
//delete product
router.delete("/:id", deleteProduct);
//export router
export default router;
