import React, { useEffect, useContext, useState } from "react";
import userContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategroy";
import imageTobase64 from "../helpers/imageToBase64";
import { RxCross2 } from "react-icons/rx";
import summaryApi from "../common";
const AddProduct = () => {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    imgUrl: "",
    price: 0,
    category: "airpodes",
    company: "",
  });
  const [fileName, setFileName] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    if (file.size > 1048576) {
      toast.error("Upload Image less than 1mb");
      return;
    }
    setData((prev) => {
      return {
        ...prev,
        imgUrl: imagePic,
      };
    });
    setFileName(file.name);
  };

  const cancelImage = async (e) => {
    setData((prev) => {
      return {
        ...prev,
        imgUrl: "",
      };
    });
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataapi = await fetch(summaryApi.addProduct.url, {
        method: summaryApi.addProduct.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const dataRes = await dataapi.json();

      if (dataRes?.success) {
        toast.success(dataRes.message);
        navigate("/");
      } else {
        toast.error(dataRes.message);
      }
    } catch (error) {
      console.log("add product error", error);
    }
  };

  useEffect(() => {
    if (!currentUser || !currentUser.userId) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="mx-auto containe p-1 ">
      <div className="bg-white p-5 w-full max-w-sm md:max-w-md mx-auto shadow">
        <p className="text-center font-semibold text-xl bg-violet-300 p-3 rounded">
          Add Product
        </p>

        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name : </label>
            <div className="bg-slate-200 p-2">
              <input
                type="text"
                placeholder="Enter Product Name"
                name="name"
                className="w-full h-full outline-none bg-transparent"
                required
                value={data.name}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Product Description : </label>
            <div className="bg-slate-200 p-2">
              <input
                type="text"
                placeholder="Enter Product Description"
                name="description"
                className="w-full h-full outline-none bg-transparent"
                required
                value={data.description}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price">Product Price : </label>
            <div className="bg-slate-200 p-2">
              <input
                type="number"
                placeholder="Enter Product price"
                name="price"
                className="w-full h-full outline-none bg-transparent"
                required
                value={data.price}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category">Product category:</label>
            <div className="bg-slate-200 p-2">
              <select
                name="category"
                id="category"
                className="w-full h-full outline-none bg-transparent"
                required
                value={data.category}
                onChange={handleOnChange}
              >
                {productCategory.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="company">Product company : </label>
            <div className="bg-slate-200 p-2">
              <input
                type="text"
                placeholder="Enter Product company"
                name="company"
                className="w-full h-full outline-none bg-transparent"
                required
                value={data.company}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="productImage" className="mt-3">
              Product Image
            </label>

            {fileName && (
              <div className="max-w-sm bg-slate-200 m-2 flex justify-between items-center p-2">
                <img src={data?.imgUrl} width={30} height={30} />
                <span
                  className="text-xl hover:text-red-500"
                  onClick={() => cancelImage()}
                >
                  <RxCross2 />
                </span>
              </div>
            )}

            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl ">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Product Image</p>

                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={uploadImage}
                  />
                </div>
              </div>
            </label>
          </div>

          <button className="w-full p-3 mt-3 bg-violet-400 rounded-full hover:scale-105 duration-700 ">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
