import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BasicRating from "../helpers.jsx/Rating";
import "./Products.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductSlider = ({ ProductsFilter }) => {
  const Products = useSelector((state) =>
    state.products.products.filter((val) => {
      return val.categoryName === ProductsFilter.categoryName;
    })
  );
  // console.log("from Filter", products);
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 6, // Default number of slides to show on larger screens
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Screens below 1024px
        settings: {
          slidesToShow: 4, // Show 4 slides at a time
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // Screens below 768px
        settings: {
          slidesToShow: 2, // Show 2 slides at a time
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 480, // Screens below 480px (smaller screens, mobile)
        settings: {
          slidesToShow: 2, // Show 1 slide at a time
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings} className="dark:bg-gray-900">
        {Products.map((product) => (
          <Link to={`/product/${product._id}`}>
            <div
              key={product._id}
              className=" px-4 flex flex-col mt-6 hover:cursor-pointer transition-transform duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 "
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto rounded-md"
              />
              <div className="px-2 text-ellipsis line-clamp-1">
                {product.name}
              </div>
              <div>
                <div className="px-2">${product.price}</div>
                <BasicRating rating={product.rating || 0} />
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
