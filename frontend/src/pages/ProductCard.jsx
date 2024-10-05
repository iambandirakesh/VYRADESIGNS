import React from "react";
import { IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <div className="dark:text-gray-300 w-48 lg:w-72 cursor-pointer">
      <Link to={`/product/${product._id}`}>
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-md"
          />
        </div>
        <div className="px-4 flex flex-col gap-1 ">
          <div className="text-ellipsis line-clamp-1 text-gray-600 dark:text-gray-300 font-semibold">
            {product.name}
          </div>
          <div className="flex font-semibold justify-between ">
            <div>Rs.{product.price}</div>
            <div className="flex justify-center items-center gap-0 bg-green-500 w-8 rounded-md text-white">
              <div>{product.rating}</div>
              <IoIosStarHalf />
            </div>
          </div>
          <div className="flex font-semibold justify-between ">
            <div className="flex text-[10px] lg:text-[12px] text-gray-500">
              Fastest Delivery:<div>Today</div>
            </div>
            <div className="">
              <div className="text-[10px] lg:text-[12px] text-gray-500">
                {product.totalReviews} Reviews
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
