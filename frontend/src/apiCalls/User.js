import axios from "axios";
export const RegisterUser = async (value) => {
  try {
    console.log(value);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/register`;
    const response = await axios.post(URL, value);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const LoginUser = async (value) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;
    const response = await axios.post(URL, value, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const LogoutUser = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`;
    const response = await axios.post(URL, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const GetUser = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/user-details`;
    const response = await axios.get(URL, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const UpdateUser = async (value) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/update-user`;
    const response = await axios.put(URL, value, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const DeleteUser = async () => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user/delete-user`;
    const response = await axios.delete(URL, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
