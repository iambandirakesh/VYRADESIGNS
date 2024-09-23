import Product from "../models/Products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).send({ status: true, data: Products });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res
        .status(401)
        .send({ status: false, message: "Product not found!" });
    }
    res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const ProductData = req.body;
    const newProduct = new Product(ProductData);
    const result = await newProduct.save();
    res.status(200).send({ status: true, data: result });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // req.body.slug = req.body.name.toLowerCase().trim().replace(/ /g, "-");
    // req.body.image = req.body.image || "";
    const ProductData = req.body;
    const Product = await Product.findByIdAndUpdate(
      req.params.id,
      ProductData,
      {
        new: true,
      }
    );
    res.status(200).send({ status: true, data: Product });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ status: true, data: "Product Deleted Successfully" });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
