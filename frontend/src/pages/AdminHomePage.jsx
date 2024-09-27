import React, { useState } from "react";
import Layout from "./Layout";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

import AddNewProduct from "../Products/AddNewProduct";
import AllProducts from "../Products/AllProducts";

const AdminHomePage = () => {
  // const mode = useSelector((state) => state.mode.mode);
  let OrderDetails = [
    "All Orders",
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const ProductOptions = [
    "All products",
    "Add New Product",
    "Edit Product",
    "Delete Product",
  ];
  const [selectCategory, setSelectCategory] = useState("");
  const [expand, setExpand] = useState(false);
  const [selectbutton, setSelectButton] = useState(0);
  console.log(selectCategory);
  return (
    <div className="flex flex-col">
      {/* Left side with the table */}
      {/* select the category */}

      <div className="flex flex-row justify-center items-center gap-2 p-5 dark:bg-gray-900">
        <button
          className={`dark:text-slate-200 h-8 w-24 rounded-lg font-semibold dark:hover:text-white hover:bg-gray-300 ${
            selectbutton === 0
              ? "bg-gray-300 dark:bg-gray-500"
              : "bg-gray-100  dark:bg-gray-700 "
          }`}
          onClick={() => {
            setSelectButton(0);
            setSelectCategory("");
            setExpand(true);
          }}
        >
          Orders Info
        </button>
        <button
          className={`dark:text-slate-200 h-8 w-28 rounded-lg font-semibold dark:hover:text-white hover:bg-gray-300 ${
            selectbutton === 1
              ? "bg-gray-300 dark:bg-gray-500"
              : "bg-gray-100  dark:bg-gray-700 "
          }`}
          onClick={() => {
            setSelectButton(1);
            setSelectCategory("");
            setExpand(true);
          }}
        >
          Products Info
        </button>
      </div>
      <div className="w-full  flex flex-row gap-2 lg:gap-20 p-5 lg:p-10 dark:bg-gray-900">
        <TbLayoutSidebarLeftExpandFilled
          className={`cursor-pointer ${
            expand ? "hidden" : "flex"
          } lg:hidden  dark:text-slate-200`}
          size={30}
          onClick={() => {
            setExpand(!expand);
          }}
        />
        <div
          className={` ${
            !expand ? "hidden" : ""
          } w-1/2 lg:w-1/4 h-full lg:flex flex-col gap-2 p-2  z-50`}
        >
          <table className="w-full border border-gray-400 border-collapse dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 ">
                <th className="dark:text-slate-200 text-center text-xl font-semibold py-4 dark:hover:bg-gray-600 hover:bg-gray-300">
                  Categories
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Line between cells */}
              {selectbutton === 0
                ? OrderDetails.map((val) => {
                    return (
                      <tr
                        className={` p-2 ${
                          selectCategory === val
                            ? "bg-gray-300 dark:bg-gray-600"
                            : "bg-gray-50 dark:bg-gray-700 "
                        }`}
                        onClick={() => {
                          setSelectCategory(val);
                          setExpand(!expand);
                        }}
                      >
                        <td className="dark:text-slate-300 text-center text-lg font-medium p-6 dark:hover:bg-gray-600 hover:bg-gray-300 ">
                          {val}
                        </td>
                      </tr>
                    );
                  })
                : ProductOptions.map((val) => {
                    return (
                      <tr
                        className={`  ${
                          selectCategory === val
                            ? "bg-gray-300 dark:bg-gray-600 "
                            : " bg-gray-50 dark:bg-gray-700"
                        }`}
                        onClick={() => {
                          setSelectCategory(val);
                          setExpand(!expand);
                        }}
                      >
                        <td className="dark:text-slate-200 text-center text-lg font-medium p-6 dark:hover:bg-gray-600 hover:bg-gray-300">
                          {val}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Placeholder for the right-side content */}
        <div
          className={` ${
            expand ? "hidden" : ""
          } w-full lg:flex bg-slate-100 dark:bg-gray-700 rounded-lg h-full`}
        >
          {selectCategory === "Add New Product" && <AddNewProduct />}
          {selectCategory === "All products" && <AllProducts />}
          {selectCategory === "Edit Product" && <div>Edit Product</div>}
          {selectCategory === "Delete Product" && <div>Delete Product</div>}
          {selectCategory === "All Orders" && <div>All Orders</div>}
          {selectCategory === "Pending" && <div>Pending</div>}
          {selectCategory === "Shipped" && <div>Shipped</div>}
          {selectCategory === "Delivered" && <div>Delivered</div>}
          {selectCategory === "Cancelled" && <div>Cancelled</div>}
        </div>
      </div>
    </div>
  );
};

export default Layout(AdminHomePage);
