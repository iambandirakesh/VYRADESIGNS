import React, { useEffect } from "react";
import Layout from "./Layout";
import gold2 from "../assets/Banner Images/jewellery-2HD.png";
import img1 from "../assets/Banner Images/diamonds-1.png";
import img2 from "../assets/Banner Images/jewellery-1.png";
import img3 from "../assets/Banner Images/jewellery-3.png";
import { MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlineLocalShipping, MdContactPage } from "react-icons/md";
import { FaRecycle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { memo } from "react";
// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from "../Products/ProductSlider";
import { Link } from "react-router-dom";
const HomePage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="flex flex-col py-10 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row py-5 justify-around">
        {/* Slider for Images */}
        <div className="w-full lg:w-1/3">
          <Slider {...settings}>
            <div>
              <img src={gold2} alt="Jewellery" className="w-full h-auto" />
            </div>
            <div>
              <img src={img1} alt="Diamonds" className="w-full h-auto" />
            </div>
            <div>
              <img src={img2} alt="Jewellery" className="w-full h-auto" />
            </div>
            <div>
              <img src={img3} alt="Jewellery" className="w-full h-auto" />
            </div>
          </Slider>
        </div>

        {/* Text Section */}
        <div className="flex flex-col px-8 lg:px-4 lg:py-16 items-center gap-5 dark:text-slate-200">
          <div className="font-bold text-lg">Best Quality Products</div>
          <div className="text-4xl font-bold flex gap-2 flex-col md:flex-row">
            <div>Design Your Way,</div>
            <div>Wear Your Style!</div>
          </div>
          <p
            className="text-md font-semibold"
            style={{ fontFamily: "inherit" }}
          >
            "Discover the beauty of sustainable fashion at VyraDesigns.
            Personalize your style with <br className="hidden lg:block" />{" "}
            stylish designs, crafted just for you. At VyraDesigns,
            sustainability meets creativity — <br className="hidden lg:block" />
            because your fashion should reflect your values."
          </p>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center">
            <FaCartShopping className="mr-2" />
            <div>SHOP NOW</div>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row gap-10 px-20 py-10 dark:text-slate-200 w-full justify-between">
        <div className="flex flex-row gap-2 justify-center items-center rounded-lg p-5 hover:text-green-500 bg-gray-300 dark:bg-gray-600">
          <div>
            <MdOutlineLocalShipping size={30} />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Free Shipping</div>
            <div className="font-semibold text-md">Above 500 only</div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center rounded-lg p-5 hover:text-green-500 bg-gray-300 dark:bg-gray-600">
          <div>
            <MdContactPage size={30} />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Certified Products</div>
            <div className="font-semibold text-md">100% Guarantee</div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center rounded-lg p-5 hover:text-green-500 bg-gray-300 dark:bg-gray-600">
          <div>
            <FaMoneyBillAlt size={30} />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Huge Savings</div>
            <div className="font-semibold text-md">At Lowest Price</div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center rounded-lg p-5 hover:text-green-500 bg-gray-300 dark:bg-gray-600">
          <div>
            <FaRecycle size={30} />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Easy Returns</div>
            <div className="font-semibold text-md">No Questions Asked</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 md:px-20 py-5 dark:text-slate-200 w-full gap-2">
        <Link to="/products/Bangels">
          <div className=" flex gap-0 items-center cursor-pointer">
            <div className="text-xl font-semibold">Best Price on Bangels</div>
            <MdNavigateNext size={25} className="translate-y-[2px]" />
          </div>
        </Link>

        <ProductSlider
          ProductsFilter={{
            categoryName: "Bangels",
          }}
        />
      </div>

      <div className="flex flex-col px-10 md:px-20 py-5 dark:text-slate-200 w-full gap-2">
        <Link to="/products/Rings">
          <div className=" flex gap-0 items-center cursor-pointer">
            <div className="text-xl font-semibold">Best Price on Rings</div>
            <MdNavigateNext size={25} className="translate-y-[2px]" />
          </div>
        </Link>
        <ProductSlider
          ProductsFilter={{
            categoryName: "Bangels",
          }}
        />
      </div>

      <div className="flex flex-col px-10 md:px-20 py-5 dark:text-slate-200 w-full gap-2">
        <Link to="/products/Chains">
          <div className=" flex gap-0 items-center cursor-pointer">
            <div className="text-xl font-semibold">Best Price on Chains</div>
            <MdNavigateNext size={25} className="translate-y-[2px]" />
          </div>
        </Link>
        <ProductSlider
          ProductsFilter={{
            categoryName: "Bangels",
          }}
        />
      </div>
    </div>
  );
};

export default memo(Layout(HomePage));
