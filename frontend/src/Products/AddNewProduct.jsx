import React, { useState } from "react";
import FreeSoloCreateOptionDialog from "../helpers.jsx/AutoComplete";
import uploadFile from "../apiCalls/UploadFile";
import { useSelector } from "react-redux";
import { CreateProduct } from "../apiCalls/Product";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
const AddNewProduct = () => {
  const category = useSelector((state) => state.category.category);
  console.log(category);
  const [Images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    categoryName: "",
    quantity: "",
    images: [],
  });
  const handleDeleteImage = (idx) => {
    const newImages = [...Images];
    newImages.splice(idx, 1);
    setImages(newImages);
  };
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const cloudinaryPhoto = await uploadFile(file);
    setImages([...Images, cloudinaryPhoto.secure_url]);
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateProduct({
      ...productData,
      images: Images,
      category: category._id,
      categoryName: category.name,
    });
    console.log(response);
    if (response.data.status) {
      setProductData({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        categoryName: "",
        quantity: "",
        images: [],
      });
      setImages([]);
      toast.success("Product added successfully");
    } else {
      toast.error("Product not added");
    }
  };
  return (
    <div className="w-full">
      <section class="bg-white dark:bg-gray-900">
        <div class="px-4 mx-auto max-w-2xl">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={productData?.name}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div class="w-full">
                <label
                  for="brand"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={productData?.brand}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={productData?.price}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <FreeSoloCreateOptionDialog />
              </div>
              <div>
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Qunatity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={productData?.quantity}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required={true}
                  onChange={handleChange}
                />
              </div>

              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="images"
                    class="hidden"
                    onChange={handleUploadPhoto}
                  />
                </label>
              </div>
              {Images?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 w-full">
                  {Images?.map((image, idx) => {
                    return (
                      <div className="relative">
                        <img
                          src={image}
                          width={100}
                          height={100}
                          alt={`Cloudinary ${idx}`}
                        />
                        <div
                          className="absolute top-0 right-0 cursor-pointer text-red-500"
                          onClick={() => handleDeleteImage(idx)}
                        >
                          <RxCross2 size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={productData?.description}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              onClick={handleProductSubmit}
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddNewProduct;
