import axios from "axios";
export const CheckPincode = async (pincode) => {
  console.log(
    "from Check pineCode",
    process.env.REACT_APP_PIN_CODE_RAPIDAPI_KEY
  );
  console.log(process.env.REACT_APP_PIN_CODE_RAPIDAPI_HOST);
  const options = {
    method: "GET",
    url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_PIN_CODE_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.REACT_APP_PIN_CODE_RAPIDAPI_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
