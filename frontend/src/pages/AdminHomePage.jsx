import React, { useState } from "react";
import Layout from "./Layout";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

import AddNewProduct from "../Products/AddNewProduct";
import AllProducts from "../Products/AllProducts";

const AdminHomePage = () => {
  // const mode = useSelector((state) => state.mode.mode);

  const [selectbutton, setSelectButton] = useState(0);
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
          }}
        >
          All Orders
        </button>
        <button
          className={`dark:text-slate-200 h-8 w-28 rounded-lg font-semibold dark:hover:text-white hover:bg-gray-300 ${
            selectbutton === 1
              ? "bg-gray-300 dark:bg-gray-500"
              : "bg-gray-100  dark:bg-gray-700 "
          }`}
          onClick={() => {
            setSelectButton(1);
          }}
        >
          All Products
        </button>
      </div>
      <div>
        {selectbutton === 0 && <div>All Orders</div>}
        {selectbutton === 1 && <AllProducts />}
      </div>
    </div>
  );
};

export default Layout(AdminHomePage);
