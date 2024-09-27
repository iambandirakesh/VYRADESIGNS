import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllFilteredProducts,
} from "../Controllers/Product.controller.js";
const router = express.Router();
//get all products
router.get("/", getAllProducts);
router.get("/filter", getAllFilteredProducts);
//get product by id
router.get("/:id", getProduct);
//create new product
router.post("/", createProduct);
//update product
router.put("/update-product", updateProduct);
//delete product
router.delete("/delete-product", deleteProduct);
//export router
export default router;
