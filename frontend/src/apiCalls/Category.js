import axios from "axios";
export const CreateCategory = async (value) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/category`;
    const response = await axios.post(URL, value);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const GetAllCategorys = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/category`;
    const response = await axios.get(URL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
