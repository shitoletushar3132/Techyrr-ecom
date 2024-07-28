import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VerticalCard from "../components/VerticalCard";
import summaryApi from "../common";
function CategoryProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategory = urlSearch.get("category");
  console.log("urlSearch", urlCategory);

  const fetchData = async () => {
    const dataApi = await fetch(
      `${summaryApi.allCategoryWiseProduct.url}?category=${urlCategory}`
    );

    const response = await dataApi.json();
    setData(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, [urlCategory]);
  return (
    <div className="container mx-auto p-3">
      {/* desktop version */}
      <div className="px-4">
        <p className="font-medium text-slate-800 text-lg my-2">
          Search Results : {data?.length}
        </p>
        <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] ">
          {data?.length !== 0 && !loading && (
            <VerticalCard data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
