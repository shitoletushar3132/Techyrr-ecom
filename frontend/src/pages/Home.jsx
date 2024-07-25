import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import summaryApi from "../common";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const Home = () => {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const apiData = await fetch(`${summaryApi.getProducts.url}`, {
        method: "GET",
      });

      const responseData = await apiData.json();
      console.log("response dat ", responseData);
      setData(responseData.data);
      setTotalPages(responseData.pagination.totalPages);
    } catch (error) {
      console.log("Error fetching admin products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => {
        const newPage = prevPage - 1;
        navigate(`/?page=${newPage}`);
        return newPage;
      });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        navigate(`/?page=${newPage}`);
        return newPage;
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full text-center font-semibold text-xl p-4 bg-slate-200 shadow z-40 sticky top-16">
        Admin Product
      </div>
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="flex items-center bg-white shadow-md rounded-lg overflow-hidden my-4 p-4"
            >
              <div className="w-full p-2">
                {product.imgUrl ? (
                  <img
                    src={product.imgUrl}
                    alt={product.name || "Product Image"}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 rounded-lg text-xl flex justify-center items-center bg-violet-200">
                    <p className="text-3xl text-slate-400">
                      {product.category}
                    </p>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="w-full p-2 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold text-gray-800 truncate">
                  {product.name || "Product Name"}
                </h2>
                <p className="text-md text-gray-600 mt-1 ">
                  Description :{" "}
                  {product.description || "No description available"}
                </p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  ${product.price?.toFixed(2) || "0.00"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {product.category || "Category"} |{" "}
                  {product.company || "Company"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-xl font-semibold">Loading Data...</p>
        )}
      </div>
      <div className="flex justify-center gap-4 m-3">
        <button
          onClick={handlePreviousPage}
          className="text-2xl hover:scale-110"
          disabled={page === 1}
        >
          <FaCircleArrowLeft />
        </button>

        {/* Pagination Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => {
                  setPage(number);
                  navigate(`/admin?page=${number}`);
                }}
                className={`px-2 py-1 rounded ${
                  number === page ? "bg-blue-500 text-white" : "bg-gray-200"
                } hover:bg-blue-300`}
              >
                {number}
              </button>
            )
          )}
        </div>

        <button
          onClick={handleNextPage}
          className="text-2xl hover:scale-110"
          disabled={page === totalPages}
        >
          <FaCircleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
