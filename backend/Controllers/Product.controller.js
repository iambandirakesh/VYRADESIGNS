import Category from "../models/Category.model.js";
import Product from "../models/Products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).send({ status: true, data: Products });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
export const getAllFilteredProducts = async (req, res) => {
  try {
    // Extract filters from the query parameters
    console.log(req.query);
    const { categoryName, brand, minPrice, maxPrice } = req.query;

    // Build the filter object dynamically
    let filter = {};

    if (categoryName) {
      let category = await Category.findOne({ name: categoryName });
      filter.category = category._id; // Assuming category is the ObjectId in the database
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    // Fetch filtered products from the database
    const filteredProducts = await Product.find(filter);

    res.status(200).send({ status: true, data: filteredProducts });
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
  console.log("In the Backend", req.body);
  try {
    const { productId, ProductData } = req.body; // Use lowercase 'productData' for consistency
    console.log("Product ID: ", productId);
    console.log("Product Data: ", ProductData);

    // Ensure you are referencing the correct Product model (if you imported it as Product)
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      ProductData,
      {
        new: true, // Return the updated product
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ status: false, message: "Product not found" });
    }

    res.status(200).send({ status: true, data: updatedProduct });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.body._id;
    console.log(productId);
    await Product.deleteOne({ _id: productId });
    res
      .status(200)
      .send({ status: true, data: "Product Deleted Successfully" });
  } catch (err) {
    res.status(401).send({ status: false, message: err.message });
  }
};
