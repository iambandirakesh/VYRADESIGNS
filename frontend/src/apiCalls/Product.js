import axios from "axios";
export const CreateProduct = async (value) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/product`;
    const response = await axios.post(URL, value);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const GetAllProducts = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/product`;
    const response = await axios.get(URL);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const GetAllProductsBasedOnFilter = async (filters) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/filter`;
    console.log(filters);
    console.log(URL);
    // Pass filters as query parameters
    const response = await axios.get(URL, { params: filters });

    return response;
  } catch (err) {
    console.log(err);
    return { status: false, message: err.message }; // Return error response
  }
};

export const DeleteProduct = async (val) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/delete-product`;
    const response = await axios.delete(URL, { data: val });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const UpdateProduct = async (val) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/product/update-product`;
    console.log(val);
    const response = await axios.put(URL, val); // Pass val directly
    return response;
  } catch (err) {
    console.log(err);
  }
};
