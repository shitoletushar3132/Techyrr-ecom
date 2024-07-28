import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import currencyConvertor from "../helpers/currencyConvertor";
import summaryApi from "../common";
import Loading from "../components/Loading";
import CategoryList from "../components/CategoryList";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [currency, setCurrency] = useState(
    localStorage.getItem("toCountry") || "INR"
  );
  const [rate, setRate] = useState(1); // Default rate to 1

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiData = await fetch(
        `${summaryApi.getProducts.url}?page=${page}&limit=9`,
        { method: "GET" }
      );
      const responseData = await apiData.json();
      const products = responseData.data;
      setTotalPages(responseData.pagination.totalPages);

      const updatedProducts = products.map((product) => ({
        ...product,
        price: product.price * rate,
      }));
      setData(updatedProducts);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      navigate(`/?page=${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      navigate(`/?page=${newPage}`);
    }
  };

  const supportedCurrencies = [
    "USD",
    "CNY",
    "JPY",
    "EUR",
    "INR",
    "GBP",
    "BRL",
    "CAD",
  ];

  const handleCurrencyConversion = async (e) => {
    const selectedCurrency = e.target.value;
    localStorage.setItem("toCountry", selectedCurrency);
    setCurrency(selectedCurrency);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rate]);

  useEffect(() => {
    const rateChange = async () => {
      const newRate = await currencyConvertor(currency);
      setRate(newRate);
    };

    rateChange();
  }, [currency]);

  return (
    <div className="w-full mt-4 px-4">
      <div className="text-md md:text-lg flex gap-2 items-center">
        <label className="font-semibold" htmlFor="country">
          Select currency:
        </label>
        <select
          className="border-2 border-grey-700 rounded"
          id="country"
          name="country"
          onChange={handleCurrencyConversion}
          value={currency}
        >
          {supportedCurrencies.map((curr, index) => (
            <option key={index} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <div>
        <CategoryList />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg overflow-hidden my-4 p-4"
            >
              <div className="w-full p-2 min-w-min">
                {product.imgUrl ? (
                  <img
                    src={product.imgUrl}
                    alt={product.name || "Product Image"}
                    className="w-full h-48 object-scale-down rounded-lg mix-blend-multiply"
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
                <h2 className="text-xl font-semibold text-gray-800 text-ellipsis line-clamp-1">
                  {product.name || "Product Name"}
                </h2>
                <p className="text-md text-gray-600 mt-1 text-ellipsis line-clamp-1">
                  {product.description || "No description available"}
                </p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  {currency} {product.price?.toFixed(2) || "0.00"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {product.category || "Category"} |{" "}
                  {product.company || "Company"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-center"></p>
      ) : (
        <div className="flex justify-center gap-4 m-3 mt-28 ">
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
                    navigate(`/?page=${number}`);
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
      )}
    </div>
  );
};

export default Home;
