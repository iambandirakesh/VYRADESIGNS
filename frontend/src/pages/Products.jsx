import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { GetAllProductsBasedOnFilter } from "../apiCalls/Product";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
const Products = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let ProductsFilter = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetAllProductsBasedOnFilter(ProductsFilter);
        console.log(res.data.data);
        setProducts(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [ProductsFilter]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>Error Loading</div>;
  } else {
    return <div>Products</div>;
  }
};

export default Layout(Products);
