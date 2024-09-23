import Category from "../models/Category.model.js";
import {
  AllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/Category.controller.js";
import exprees from "express";
const router = exprees.Router();
// get all category's
router.get("/", AllCategorys);
// get category by id
router.get("/:id", getCategory);
// create category
router.post("/", createCategory);
// update category
router.put("/:id", updateCategory);
// delete category
router.delete("/:id", deleteCategory);
export default router;
