import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation().search;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.searchProduct.url + query, {
        method: summaryApi.searchProduct.method,
      });
      const responseData = await response.json();
      setLoading(false);
      setData(responseData.data);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}

      <p className="text-lg font-semibold my-3">
        search Result : {data?.length}
      </p>

      {data?.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found...</p>
      )}

      {data?.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
