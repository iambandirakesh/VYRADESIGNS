import React from "react";
import VyraDesignsBlackLogo from "../assets/logos/vyradesigns-logo.png";
import VyraDesignsWhiteLogo from "../assets/logos/vyradesigns-white-transparent.png";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
const Footer = () => {
  const mode = useSelector((state) => state.mode.mode);
  const logo = mode === "dark" ? VyraDesignsWhiteLogo : VyraDesignsBlackLogo;
  const darkMode = mode === "dark";
  console.log(darkMode);

  return (
    <div className="w-full flex flex-col gap-[0.5px] ">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-0 px-5 md:px-10 py-10 bg-white dark:bg-gray-900 ">
        <div className="flex flex-col gap-12 px-10 items-center md:items-start">
          <img src={logo} alt="Vyra Designs" className=" h-10 w-52" />
          <div className=" w-80 dark:text-slate-300">
            VyraDesigns brings your creativity to life with personalized,
            stylish designs. From apparel to accessories, customize products
            that stand out. Easy to create, unique to you. Let your imagination
            shine with VyraDesigns!
          </div>
        </div>
        <div className="flex flex-col gap-5 px-10 items-center md:items-start">
          <div className=" text-2xl font-bold dark:text-slate-300">
            Quick Links
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white ">
              About
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Cart
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Checkout
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Contact
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Home
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              My account
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white  ">
              Shop
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className=" dark:text-slate-300 text-2xl font-bold">
              Site Links
            </div>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
                Privacy Policy
              </div>
              <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
                Shipping Details
              </div>
              <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
                Offers Coupons
              </div>
              <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
                Terms & Conditions
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-10 items-center md:items-start">
          <div className="dark:text-slate-300 text-2xl font-bold">
            Download Our Mobile App
          </div>

          <div className="dark:text-slate-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Donec aliquam gravida sollicitudin. Praesent porta <br />
            enim mi, non tincidunt libero interdum sit amet.
          </div>
          <div className="dark:text-slate-300 text-2xl font-bold">
            Quick Links
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Know More About Us
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Visit Store
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Let’s Connect
            </div>
            <div className="dark:text-slate-300 cursor-pointer hover:font-semibold dark:hover:text-white">
              Locate Stores
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <img
              src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/play-store.png"
              alt="PlayStore"
              className="w-40 h-12 cursor-pointer"
            />
            <img
              src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/app-store.png"
              alt="AppStore"
              className="w-40 h-12 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center bg-white dark:bg-gray-900  h-24">
        <div className="flex flex-row  items-center gap-1 h-full px-5">
          <div className="dark:text-slate-300">Copyright © 2024</div>
          <div className="dark:text-slate-300">|</div>
          <div className="dark:text-slate-300">Vyra Designs</div>
        </div>
        <div className=" flex flex-row gap-5 px-5">
          <Tooltip title="Instagram">
            <div>
              <FaInstagram
                size={20}
                className="dark:text-slate-300 cursor-pointer dark:hover:text-green-500 hover:text-green-500"
              />
            </div>
          </Tooltip>
          <Tooltip title="Whatsapp">
            <div>
              <FaWhatsapp
                size={20}
                className="dark:text-slate-300 cursor-pointer dark:hover:text-green-500 hover:text-green-500"
              />
            </div>
          </Tooltip>
          <Tooltip title="Facebook">
            <div>
              <FaFacebook
                size={20}
                className="dark:text-slate-300 cursor-pointer dark:hover:text-green-500 hover:text-green-500"
              />
            </div>
          </Tooltip>
          <Tooltip title="Twitter">
            <div>
              <FaSquareXTwitter
                size={20}
                className="dark:text-slate-300 cursor-pointer dark:hover:text-green-500 hover:text-green-500"
              />
            </div>
          </Tooltip>
          <Tooltip title="Gmail">
            <div>
              <CiMail
                size={20}
                className="dark:text-slate-300 cursor-pointer dark:hover:text-green-500 hover:text-green-500"
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Footer;
