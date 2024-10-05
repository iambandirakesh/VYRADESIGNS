import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { GoPackageDependencies } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { PiCurrencyInrBold } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CheckPincode } from "../apiCalls/PineCodeCheck";
import { useDispatch } from "react-redux";
import { setCheckout } from "../Redux/ProductsSlice";
import "./index.css";
import { UpdateUser } from "../apiCalls/User";
import { setUser } from "../Redux/UserSlice";

const ProductInfo = () => {
  const { id } = useParams(); // Destructure id from useParams
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.userData.userData);
  const [currImage, setCurrImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null); // To store product data
  const products = useSelector((state) => state.products.products);
  const cartData = useSelector((state) => state.userData.userData.Cart);
  const [pinCodeData, setPinCodeData] = useState(null);
  const [pincodeValue, setPincodeValue] = useState("");
  const [pincode, setPinCode] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  console.log(cartData, "cartData test");
  const handlePinCodeCheck = async (e) => {
    e.preventDefault();
    const res = await CheckPincode(pincodeValue);
    console.log(res);
    setPinCodeData(res[0]);
    setPinCode(true);
  };
  const handleAddToCart = async () => {
    try {
      if (isProductInCart) {
        // If product is already in the cart, remove it
        const newCart = cartData.filter(
          (val) => val.product._id !== productData._id
        );

        // Update user data in Redux and backend
        dispatch(setUser({ ...UserData, Cart: newCart }));
        await UpdateUser({ ...UserData, Cart: newCart });

        // Set state to reflect that the product is no longer in the cart
        setIsProductInCart(false);
      } else {
        // If product is not in the cart, add it
        const newCart = [...cartData, { product: productData, quantity: 1 }];

        // Update user data in Redux and backend
        dispatch(setUser({ ...UserData, Cart: newCart }));
        await UpdateUser({ ...UserData, Cart: newCart });

        // Set state to reflect that the product is now in the cart
        setIsProductInCart(true);
      }
    } catch (error) {
      console.error("Error updating the cart:", error);
    }
  };

  // Effect for fetching product data only when `id` or `products` change
  useEffect(() => {
    const product = products?.find((val) => val._id === id);
    if (product) {
      setProductData(product);
      console.log("Error Check", product);
      setLoading(false);
      if (cartData?.find((val) => val.product._id === product._id)) {
        setIsProductInCart(true);
      }
    }
  }, [id, products, cartData]); // This only runs when `id` or `products` changes
  const handleCheckOut = () => {
    dispatch(setCheckout([{ product: productData, quantity: 1 }]));
    console.log(productData);
    navigate("/checkout");
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-16 dark:bg-gray-900">
      <div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-row gap-2">
            <div>
              <table>
                <thead></thead>
                <tbody>
                  {productData?.images?.map((url, idx) => (
                    <tr key={idx}>
                      <td>
                        <img
                          src={url}
                          alt={productData.name}
                          className="w-20 lg:w-32 rounded hover:border to-blue-500 cursor-pointer hover:cursor-pointer transition-transform duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-80"
                          onClick={() => setCurrImage(idx)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4">
              <img
                src={productData?.images[currImage]}
                alt={productData.name}
                className="max-w-sm lg:max-w-2xl rounded-md"
              />
            </div>
          </div>
          <hr className="w-full h-[2px] bg-gray-200 border-none lg:hidden" />

          <div className="flex flex-col gap-2 dark:text-gray-300 ">
            <div className="font-semibold text-lg">{productData.name}</div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row justify-center items-center gap-1 bg-green-600 w-10 rounded-sm text-white">
                <div>{productData.rating}</div>
                <CiStar size={20} />
              </div>
              <div className="text-gray-500 dark:text-gray-300">
                {productData.totalRaings} Ratings & {productData.totalReviews}{" "}
                Reviews
              </div>
            </div>
            <div className="text-green-600 font-semibold">Exclusive offer</div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center">
                <PiCurrencyInrBold size={22} className="translate-y-[1px]" />
                <div className="text-2xl font-bold">{productData.price}</div>
              </div>
              <div className="flex flex-row gap-4 lg:hidden">
                <div className="w-36 h-10 rounded-md text-white bg-orange-400 hover:bg-orange-500 flex flex-row justify-center items-center gap-2">
                  <IoCartOutline size={20} />
                  <button>ADD TO CART</button>
                </div>
                <div className="w-36 h-10 rounded-md text-white bg-green-500 hover:bg-green-600 flex flex-row justify-center items-center gap-2">
                  <GoPackageDependencies />
                  <button>BUY NOW</button>
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold">Offers</div>
              <div className="text-gray-500 dark:text-gray-300">
                Coming Soon....
              </div>
            </div>
            <div className="flex flex-row gap-8">
              <div className="text-gray-500 dark:text-gray-300">
                Delivery to:
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-transparent relative">
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={pincodeValue}
                    className={`border-b-2 bg-transparent ember-view ember-text-field border-gray-300 outline-none w-34 text-center text-gray-600 dark:text-gray-300 dark:bg-gray-900 focus:border-blue-500 transition-colors duration-300`}
                    placeholder="Enter Pincode"
                    inputMode="numeric"
                    onInput={(e) =>
                      setPincodeValue(e.target.value.replace(/[^0-9]/g, ""))
                    } // Only allows numbers
                  />
                  <div className="absolute top-1">
                    <IoLocationOutline />
                  </div>

                  <button
                    className="text-green-400 w-16"
                    onClick={handlePinCodeCheck}
                  >
                    {pincode ? "Change" : "Check"}
                  </button>
                </div>
                {/* Add margin-top to create gap between pincode result and input */}
                {pincode && (
                  <div className="flex flex-row gap-1 text-gray-500 dark:text-gray-300 mt-2">
                    <div>
                      {pinCodeData.area} {pinCodeData.district}{" "}
                      {pinCodeData.state}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/** Desktop buttons */}
            <div className="flex-row gap-4 justify-center items-center hidden lg:flex mt-5">
              <div className="w-36 h-10 rounded-md text-white bg-orange-400 hover:bg-orange-500 flex flex-row justify-center items-center gap-2">
                <IoCartOutline size={20} />
                <button onClick={handleAddToCart}>
                  {isProductInCart ? "REMOVE" : "ADD TO CART"}
                </button>
              </div>
              <div className="w-36 h-10 rounded-md text-white bg-green-500 hover:bg-green-600 flex flex-row justify-center items-center gap-2">
                <GoPackageDependencies />
                <div onClick={handleCheckOut}>
                  <button>BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>Review Component</div>
      </div>
    </div>
  );
};

export default Layout(ProductInfo);
