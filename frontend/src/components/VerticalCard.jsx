import React, { useContext } from "react";

import { Link } from "react-router-dom";

const VerticalCard = ({ data }) => {
  console.log("data varical", data);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {data?.map((product, index) => (
        <Link
          to={"/product/" + product?._id}
          key={index}
          className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow  mb-4"
        >
          <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
            <img
              src={product?.imgUrl}
              alt={product?.name}
              className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
            />
          </div>

          <div className="p-4 grid gap-3 ">
            <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ">
              {product?.name}
            </h2>

            <p className="capitalize text-slate-500">{product?.category}</p>
            <div className="flex gap-2 md:gap-3">
              <p className="text-black">
                Price :  {localStorage.getItem("toCountry")}{" "}
                {(product?.price * localStorage.getItem("rate")).toFixed(3)}
              </p>
            </div>

            <button className="text-sm bg-violet-500 hover:bg-violet-700 text-white px-2 py-1 m-2 rounded-full">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCard;
