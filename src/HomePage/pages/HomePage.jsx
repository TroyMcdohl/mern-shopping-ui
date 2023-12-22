import React from "react";
import HomeCategory from "../components/HomeCategory";
import HomeDisplay from "../components/HomeDisplay";
import HomeFeacture from "../components/HomeFeacture";
import HomeTop from "../components/HomeTop";
import useFetchGet from "../../hooks/useFetchGet";

const HomePage = () => {
  const { data, loading, error, errMsg, success } = useFetchGet(
    "https://mern-shopping-backend-server.vercel.app/api/v1/products"
  );

  return (
    <>
      <HomeTop />
      <HomeFeacture />
      <HomeCategory />
      <HomeDisplay data={data} />
    </>
  );
};

export default HomePage;
