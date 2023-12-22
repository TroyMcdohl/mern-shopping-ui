import React, { useState } from "react";
import ProductPage from "../components/ProductPage";
import useFetchGet from "../../hooks/useFetchGet";
import ErrorLoadingShow from "../../hooks/ErrorLoadingShow";

const Products = () => {
  const [changeValue, setChangeValue] = useState();
  const [sortValue, setSortValue] = useState();

  const queryValue = (value) => {
    setChangeValue(value);
  };

  const sortValueHandler = (value) => {
    setSortValue(value);
  };

  const url =
    changeValue && changeValue !== "all"
      ? sortValue
        ? `https://mern-shopping-backend-server.vercel.app/api/v1/products?kind=${changeValue}&&sort=${sortValue}`
        : `https://mern-shopping-backend-server.vercel.app/api/v1/products?kind=${changeValue}`
      : `https://mern-shopping-backend-server.vercel.app/api/v1/products?sort=${sortValue}`;

  const { data, loading, error, errMsg, success } = useFetchGet(
    url,
    changeValue
  );

  return (
    <>
      <ErrorLoadingShow loading={loading} error={error} errMsg={errMsg} />
      <ProductPage
        products={data}
        queryValue={queryValue}
        sortValueChange={sortValueHandler}
      />
    </>
  );
};

export default Products;
