import Category from "../models/Category.model.js";

export const AllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find({});
    res.status(200).send({ status: true, data: categorys });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res
        .status(401)
        .send({ status: false, message: "Category not found!" });
    }
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const CategoryName = req.body;
    const newCategory = await Category.create(CategoryName);
    res.status(200).send({ status: true, data: newCategory });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      categoryData,
      {
        new: true,
      }
    );
    res.status(200).send({ status: true, data: category });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ status: true, data: "Category Deleted Successfully" });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
