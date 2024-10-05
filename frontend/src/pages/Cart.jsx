import React, { useState } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHeart,
  faTrashAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../apiCalls/User";
import { setUser } from "../Redux/UserSlice";
import { Link } from "react-router-dom";
import { setCheckout } from "../Redux/ProductsSlice";

const TopBar = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <label className="text-sm opacity-75" htmlFor={"vyradesigns"}>
              Vyra Designs
            </label>
          </div>
          <button className="hover:text-blue-600 hover:bg-gray-100 dark:hover-bg-slate-600 py-1 px-2 rounded flex items-center opacity-75">
            <FontAwesomeIcon icon={faEnvelope} className=" text-sm mr-1" />
            Contact
          </button>
        </div>
        <div className="ml-auto">
          <button className="hover:text-blue-600 hover:bg-gray-100 dark:hover-bg-slate-600 py-1 px-2 rounded">
            Get Coupons
          </button>
        </div>
      </div>

      <hr className="dark:border-slate-700 my-4" />
    </>
  );
};

TopBar.propTypes = {
  data: PropTypes.object.isRequired,
};

const SideBar = ({ products }) => {
  console.log(products, "sidebar");
  let SubTotal = 0;
  for (let i = 0; i < products.length; i++) {
    SubTotal += products[i].product.price * products[i].quantity;
  }
  return (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-md p-3 md:p-6">
      <h5 className="text-2xl font-bold mb-6">Order Summary</h5>

      <div className="flex gap-2 justify-between items-center">
        <span>Subtotal</span>
        <span>Rs.{SubTotal}</span>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <span>Shipping</span>
        <span>Rs.0</span>
      </div>

      <hr className="dark:border-slate-700 my-6" />
      <div className="flex gap-2 justify-between items-center">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-bold">Rs.{SubTotal}</span>
      </div>

      <Link to="/checkout">
        <button className="py-3 px-4 leading-none bg-blue-600 rounded hover:bg-opacity-90 text-white w-full mt-6 lg:mt-12">
          BUY ({products.length})
        </button>
      </Link>
    </div>
  );
};

const ProductItem = ({ item, index, index2 }) => {
  console.log(item, "item");
  const UserData = useSelector((state) => state.userData.userData);
  const CartData = UserData?.Cart;
  const dispatch = useDispatch();

  console.log(CartData, "CartData");
  const [quantity, setQuantity] = useState(item?.quantity);
  const handleQunatityDec = async (e) => {
    e.preventDefault();
    if (quantity > 1) {
      const res = await UpdateUser({
        ...UserData,
        Cart: CartData.map((val) =>
          val.product._id === item.product._id
            ? { ...val, quantity: quantity - 1 }
            : val
        ),
      });
      dispatch(
        setUser({
          ...UserData,
          Cart: CartData.map((val) =>
            val.product._id === item.product._id
              ? { ...val, quantity: quantity - 1 }
              : val
          ),
        })
      );
      setQuantity((prev) => prev - 1);
      console.log(res, "res");
    } else {
      const res = await UpdateUser({
        ...UserData,
        Cart: CartData.filter((val) => val.product._id !== item.product._id),
      });
      dispatch(
        setUser({
          ...UserData,
          Cart: CartData.filter((val) => val.product._id !== item.product._id),
        })
      );
      setQuantity((prev) => prev - 1);
      console.log(res, "res");
    }
  };
  const handleQunatityInc = async (e) => {
    e.preventDefault();
    const res = await UpdateUser({
      ...UserData,
      Cart: CartData.map((val) =>
        val.product._id === item.product._id
          ? { ...val, quantity: quantity + 1 }
          : val
      ),
    });
    dispatch(
      setUser({
        ...UserData,
        Cart: CartData.map((val) =>
          val.product._id === item.product._id
            ? { ...val, quantity: quantity + 1 }
            : val
        ),
      })
    );
    setQuantity((prev) => prev + 1);
    console.log(res, "res");
  };
  const checkOutdata = useSelector((state) => state.products.checkout);
  const handleCheckboxChange = async (e) => {
    if (e.target.checked) {
      dispatch(setCheckout([...checkOutdata, item]));
    } else {
      dispatch(setCheckout(checkOutdata.filter((val) => val !== item)));
    }
  };
  return (
    <div className="flex flex-col sm:flex-row mb-4">
      <div className="mr-3">
        <div className="flex items-center">
          <div className="flex items-center">
            <input
              className="w-5 h-5"
              type="checkbox"
              value=""
              id={item?.product?._id}
              onChange={handleCheckboxChange}
            />
            <label className="" htmlFor={item?.product?._id}></label>
          </div>
          <div className="w-32 p-1">
            <Link to={`/product/${item?.product?._id}`}>
              <img
                src={item?.product?.images[0]}
                alt=""
                className="w-full h-auto rounded-md"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row">
          <div className="">
            <div className="hover:text-blue-600 text-[15px] leading-5 mb-1">
              <Link to={`/product/${item?.product?._id}`}>
                {item?.product?.name}
              </Link>
            </div>
            <p className="text-[12px] mb-2">
              <span className="flex items-center mr-3">
                <b>Rating</b>:{" "}
                {item?.product?.rating === 0
                  ? "Your the first one to review this product"
                  : item?.product?.rating}
              </span>
              <span>
                <b>Ships From</b>: {"Tirupati, India"}
              </span>
            </p>
            <div className="mb-2">
              <span className="font-bold text-[17px] mr-2">
                Rs {item?.product?.price}
              </span>
              <div className="flex items-center">
                <span className="line-through text-sm opacity-50 mr-2">
                  Rs {Math.floor(parseFloat(item?.product?.price)) + 5000}
                </span>
                <span className="py-1 px-2 bg-stone-200 dark:bg-stone-800 text-[12px]">
                  -81%
                </span>
              </div>
            </div>
            <p className="text-[12px]">
              <span className="text-blue-600 hover:underline">Shipping:</span>
              via Vyradesigns Delivery Time: 2-4 Working Days
            </p>
          </div>
          <div className="md:w-auto mt-3 md:mt-0">
            <div className="flex sm:justify-end mb-3">
              {/* <button className="hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-slate-600 py-1 px-2 rounded p-0 flex justify-center items-center text-decoration-none mr-2">
                <FontAwesomeIcon icon={faHeart} className="text-sm" />
              </button> */}
              <button className="hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-slate-600 py-1 px-2 rounded p-0 flex justify-center items-center text-decoration-none">
                <FontAwesomeIcon icon={faTrashAlt} className="text-sm" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleQunatityDec}
                className="w-6 h-6 bg-gray-300 hover:text-red-600 rounded-full text-center text-md"
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                onClick={handleQunatityInc}
                className="w-6 h-6 bg-gray-300 hover:text-blue-700 rounded-full text-center text-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  index2: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Cart = () => {
  const productList = useSelector((state) => state.userData.userData.Cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([...productList]);
  console.log(products, "productList");
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      dispatch(setCheckout([...productList]));
    } else {
      dispatch(setCheckout([]));
    }
  };
  return (
    <section className="ezy__epcart6 px-8 py-14 md:py-12 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:w-2/3">
            {/* cart head */}
            <div className="bg-gray-200 dark:bg-gray-900 p-4 md:px-6 mb-4">
              <h5 className="text-2xl font-bold mb-4">Shopping Cart (3)</h5>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value=""
                  className="w-5 h-5 mr-2"
                  onChange={handleCheckboxChange}
                />
                <label className="opacity-75" htmlFor="ezy__epcart6-check-all">
                  Select All
                </label>
              </div>
            </div>
            <div
              className="bg-gray-200 dark:bg-slate-800 p-4 md:px-6 mb-4"
              key={"ezy__epcart6-cart-1"}
            >
              <TopBar />

              {products.map((item, j) => (
                <ProductItem item={item} index={j} index2={j} key={j} />
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="w-full lg:w-1/3">
            <SideBar products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Layout(Cart);
