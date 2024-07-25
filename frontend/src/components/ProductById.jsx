import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import summaryApi from "../common";

const ProductById = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    price: 0,
    category: "airpods",
    company: "",
  });

  const getProductData = async () => {
    try {
      const response = await fetch(
        `${summaryApi.getProductById.url}${productId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const productData = await response.json();
      setData(productData.data);
    } catch (error) {
      toast.error("Error fetching product data");
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden my-4 p-4">
      <div className="w-full p-2">
        {data.imgUrl ? (
          <img
            src={data.imgUrl}
            alt={data.name || "Product Image"}
            className="w-2/3  h-60 object-cover rounded-lg hover:scale-125 duration-700"
          />
        ) : (
          <div className="w-2/3 h-60 rounded-lg text-xl flex justify-center items-center bg-violet-200">
            <p className="text-3xl text-slate-400">{data.category}</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="w-full p-2 flex flex-col justify-between gap-2">
        <h2 className="text-2xl font-semibold text-gray-800 truncate">
          {data.name || "Product Name"}
        </h2>
        <p className="text-md text-gray-600 mt-1 ">
          Description : {data.description || "No description available"}
        </p>
        <p className="text-lg font-bold text-green-600 mt-2">
          Price : ${data.price?.toFixed(2) || "0.00"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Category : {data.category || "Category"}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Company:{"  "}
          <span className="bg-red-400 text-white rounded-full px-3 py-1">
            {data.company || "Company"}
          </span>
        </p>

        <div className="w-full flex justify-evenly mt-10 text-lg  mx-auto">
          <button className="border border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 rounded-full animate-bounce px-3 py-2">
            Add to Cart
          </button>
          <button className="bg-violet-500 hover:bg-white hover:text-violet-500 hover:border hover:border-violet-500 rounded-full hover:scale-110 animate-bounce px-3 py-2 text-white">
            Buy Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
