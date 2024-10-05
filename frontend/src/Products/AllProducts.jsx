import React, { useState } from "react";
import { DeleteProduct, UpdateProduct } from "../apiCalls/Product";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import FreeSoloCreateOptionDialog from "../helpers.jsx/AutoComplete";
import uploadFile from "../apiCalls/UploadFile";
import { RxCross2 } from "react-icons/rx";
import { setProducts } from "../Redux/ProductsSlice";
import { useDispatch } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import AddNewProduct from "./AddNewProduct";
function AllProducts() {
  const products = useSelector((state) => state.products.products);
  const [Images, setImages] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [editProductData, setEditProductData] = useState({
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
  const handleEditProduct = (product) => {
    setCurrentPage(2);
    setId(product._id);
    setEditProductData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      category: product.category,
      categoryName: product.categoryName,
      quantity: product.quantity,
      images: product.images,
    });
    setImages(product.images);
  };

  const handleChange = (e) => {
    setEditProductData({ ...editProductData, [e.target.name]: e.target.value });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const cloudinaryPhoto = await uploadFile(file);
    console.log(cloudinaryPhoto.secure_url);
    setImages([...Images, cloudinaryPhoto.secure_url]);
    console.log(Images);
  };
  const handleDeleteProduct = async (id) => {
    console.log(id);
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    const response = await DeleteProduct({ _id: id });
    if (response.data.status) {
      toast.success("Product deleted successfully");
      dispatch(setProducts(products.filter((product) => product._id !== id)));
    } else {
      toast.error("Product not deleted");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const response = await UpdateProduct({
      productId: id,
      ProductData: { ...editProductData, images: { ...Images } },
    });
    if (response.data.status) {
      toast.success("Product updated successfully");

      dispatch(
        setProducts(
          products.map((product) =>
            product._id === id
              ? { ...product, ...editProductData, images: { ...Images } }
              : product
          )
        )
      );

      setCurrentPage(1);
    } else {
      toast.error("Product not updated");
    }
  };

  return (
    <div className="w-full dark:bg-gray-800">
      {currentPage === 1 && (
        <div className="p-2 flex flex-col w-full gap-4">
          <div className="flex items-center gap-5 dark:dark:text-white">
            <h1 className="font-bold text-lg">All Products</h1>
            <button
              className="bg-gray-200 w-36 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
              onClick={() => setCurrentPage(3)}
            >
              Add New Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.brand}</td>
                      <td className="px-4 py-3 text-sm">
                        {product.description}
                      </td>
                      <td className="px-4 py-3 text-sm">{product.price}</td>
                      <td className="px-4 py-3 text-sm">{product.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        {product.categoryName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            handleEditProduct(product);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={() => {
                            handleDeleteProduct(product._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <Loading data={"products"} />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div className="w-full relative">
          <div className="absolute top-[-40px] left-1 lg:top-2 lg:left-44 xl:left-72 cursor-pointer dark:text-white ">
            <IoMdArrowRoundBack size={25} onClick={() => setCurrentPage(1)} />
          </div>
          <section class="bg-white dark:bg-gray-900">
            <div class="px-4 mx-auto max-w-2xl">
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Update your ProductData
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
                      value={editProductData.name}
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
                      value={editProductData.brand}
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
                      value={editProductData.price}
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
                      value={editProductData.quantity}
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
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
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
                  {Images.length > 0 && (
                    <div className=" flex flex-wrap justify-center gap-3 w-full">
                      {Images.map((image, idx) => {
                        return (
                          <div className="relative">
                            <img
                              src={image}
                              width={120}
                              height={120}
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
                      value={editProductData.description}
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
      )}
      {currentPage === 3 && <AddNewProduct />}
    </div>
  );
}

export default AllProducts;
