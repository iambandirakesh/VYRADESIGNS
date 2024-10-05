import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faTrashAlt,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faCheckCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { useSelector } from "react-redux";

const billingInfo = [
  {
    icon: faMapMarkerAlt,
    value: "Provati-73, East Pirmoholla, Amborkhana, Sylhet",
  },
  {
    icon: faFileInvoiceDollar,
    value: "Bill to the same address",
  },
  {
    icon: faPhoneAlt,
    value: "1742***080",
  },
  {
    icon: faEnvelope,
    value: "xyz@gmail.com",
  },
];

const orders = [
  {
    seller: "NIDIN Factory Online Store",
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio17.jpg",
    title:
      "2022 Europe And America Hot Sell Stainless Steel Hot Sell Spoon Gift Coffee Stir Spoon Gold-plated Dessert Spoon",
    color: "Red",
    country: "Chili",
    bdPrice: "34,243",
    subTotal: "34,243",
    shipping: "0.00",
    total: "34,243",
  },
  {
    seller: "NIDIN Factory Online Store",
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio_1_1.png",
    title:
      "3150A Withdrawable Type Indoor AC High Voltage Vacuum Circuit Breaker High Quality With Professional Manufacturer",
    color: "black",
    country: "China",
    bdPrice: "76,456",
    subTotal: "76,456",
    shipping: "0.00",
    total: "76,456",
  },
  {
    seller: "NIDIN Factory Online Store",
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio13.jpg",
    title:
      "Luxury Black Matte Paint Custom Laser Logo Square Wooden Gift Box Watch Men for your Luxury Brand Heren Horloge",
    color: "black",
    country: "China",
    bdPrice: "27,351",
    subTotal: "27,351",
    shipping: "0.00",
    total: "27,351",
  },
];

const BillingItem = ({ bill }) => (
  <div className="text-sm flex mb-4">
    <div>
      <FontAwesomeIcon icon={bill.icon} />
    </div>
    <div className="flex-grow px-2">
      <p className="mb-0">{bill.value}</p>
    </div>
    <div>
      <a href="#!" className="text-blue-600 hover:underline font-bold">
        Edit
      </a>
    </div>
  </div>
);
BillingItem.propTypes = {
  bill: PropTypes.object.isRequired,
};

const PromoCode = () => (
  <div className="mt-3">
    <p className="text-sm mb-1">Promo Code</p>
    <div className="flex h-10">
      <input
        type="text"
        className="bg-blue-100 dark:bg-slate-700 border-none focus:outline-none h-full flex-grow rounded-md p-3 mr-2"
        placeholder="Recipient's username"
      />
      <button
        className="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 px-4 py-2 leading-none h-full rounded-md"
        type="button"
      >
        Apply
      </button>
    </div>
  </div>
);

const SideBar = () => {
  return (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-4 md:p-6">
      <div>
        <h6 className="text-2xl font-bold mb-4">Shipping {"&"} Billing</h6>
        {billingInfo.map((bill, i) => (
          <BillingItem bill={bill} key={i} />
        ))}

        <h6 className="text-2xl font-bold my-6">Order Summary</h6>
        <div className="flex justify-between items-center mb-2">
          <span>
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              className="mr-2 text-blue-600"
            />
            Store Coupons
          </span>
          <span>
            <a href="#!" className="text-blue-600 hover:underline font-medium">
              View <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </a>
          </span>
        </div>

        <PromoCode />

        <hr className="dark:border-slate-700 my-6" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-bold">US $1231.00</span>
        </div>
        <p className="text-sm text-end opacity-50">
          Approximately BDT 94,856.76
        </p>

        <button className="bg-blue-600 text-white hover:bg-opacity-90 w-full rounded-md py-3 px-4 mt-6">
          Place Order
        </button>
      </div>
    </div>
  );
};

const Quantity = () => {
  return (
    <div className="h-10 border dark:border-slate-700 rounded-full flex w-36 relative mt-4 overflow-hidden">
      <button
        className="px-4 py-1 font-bold inline-flex justify-center border-r dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10"
        type="button"
      >
        -
      </button>
      <input
        type="number"
        className="px-4 pl-5 font-bold py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none"
        value="2"
      />
      <button
        className="px-4 py-1 font-bold inline-flex justify-center border-l dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10"
        type="button"
      >
        +
      </button>
    </div>
  );
};

const OrderItem = ({ item, index }) => {
  return (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-4 md:p-6 mb-4">
      <div className="flex justify-between text-sm">
        <p>
          Package {index + 1} of {orders.length}
        </p>
        <p>
          Shipped by <b>Vyra Designs</b>
        </p>
      </div>
      <hr className="dark:border-slate-700 my-4" />

      <div className="flex max-w-xs bg-slate-200 dark:bg-slate-700 rounded-md mb-6 p-4">
        <div className="mr-2">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <div>
          <p className="font-bold mb-2">Vyra Designs</p>
          <p className="text-sm opacity-75">Home Delivery</p>
          <p className="text-sm opacity-75">
            Estimated Delivery Time: 2-4 days
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-32 sm:mr-4 ">
          <a href="#!">
            <img
              src={item?.product?.images[0]}
              alt=""
              className="w-full h-auto rounded"
            />
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-grow w-full md:w-auto">
            <div className="text-lg leading-6 font-medium hover:text-blue-600 mb-2">
              <a href="#!">{item?.product?.name}</a>
            </div>
            <p className="text-sm mb-2">
              <span className="mr-3">
                <b>Rating</b>:
                {item?.product?.rating === 0
                  ? "Your the first one to review this product"
                  : item?.product?.rating}
              </span>
              <span>
                <b>Ships From</b>: Tirupati India
              </span>
            </p>
            <div className="mb-2">
              <span className="text-xl text-blue-600 font-bold mr-2">
                Rs. {item?.product?.price}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-10 h-10 text-blue-600 hover:bg-blue-200 dark:bg-opacity-20 inline-flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <Quantity />
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const CheckOut = () => {
  const product = useSelector((state) => state.products.checkout);
  console.log("CheckOut", product);

  return (
    <section className="py-8 md:py-12 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:w-2/3">
            {product.map((item, i) => (
              <OrderItem item={item} index={i} key={i} />
            ))}
          </div>
          <div className="w-full lg:w-1/3">
            <SideBar />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Layout(CheckOut);
