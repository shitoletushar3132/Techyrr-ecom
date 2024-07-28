import React from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Product = ({ imgUrl, name, description, price, category, company }) => {

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden my-4 p-4">
      <div className="w-full p-2">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={name || "Product Image"}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-48 rounded-lg text-xl flex justify-center items-center bg-violet-200">
            <p className="text-3xl text-slate-400">{category}</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="w-full p-2 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 truncate">
          {name || "Product Name"}
        </h2>
        <p className="text-md text-gray-600 mt-1 ">
          Description : {description || "No description available"}
        </p>
        <p className="text-lg font-bold text-green-600 mt-2">
          ${price?.toFixed(2) || "0.00"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {category || "Category"} | {company || "Company"}
        </p>

        <div className="flex gap-4 mt-4 text-2xl text-slate-500 ml-auto">
          <p className="hover:text-black hover:scale-110">
            <MdModeEdit />
          </p>
          <p className="hover:text-red-500  hover:scale-110">
            <MdDelete />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
