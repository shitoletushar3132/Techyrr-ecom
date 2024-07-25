import React, { useEffect, useContext, useState } from "react";
import userContext from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategroy";
import imageTobase64 from "../helpers/imageToBase64";
import { RxCross2 } from "react-icons/rx";
import summaryApi from "../common";

const EditProduct = () => {
  const { currentUser } = useContext(userContext);
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

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      toast.error("Upload Image less than 1mb");
      return;
    }
    const imagePic = await imageTobase64(file);
    setData((prev) => ({ ...prev, imgUrl: imagePic }));
    setFileName(file.name);
  };

  const cancelImage = () => {
    setData((prev) => ({ ...prev, imgUrl: "" }));
    setFileName("");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiData = await fetch(summaryApi.updateProduct.url, {
        method: summaryApi.updateProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, updateData: data }),
      });

      const response = await apiData.json();
      if (response.success) {
        toast.success(response.message);
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser || !currentUser.userId) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (productId) {
      getProductData();
    }
  }, [productId]);

  console.log(data);

  return (
    <div className="mx-auto container p-1">
      <div className="bg-white p-5 w-full max-w-sm md:max-w-md mx-auto shadow">
        <p className="text-center font-semibold text-xl bg-violet-300 p-3 rounded">
          Edit Product
        </p>

        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
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
            <label htmlFor="description">Product Description:</label>
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
            <label htmlFor="price">Product Price:</label>
            <div className="bg-slate-200 p-2">
              <input
                type="number"
                placeholder="Enter Product Price"
                name="price"
                className="w-full h-full outline-none bg-transparent"
                required
                min="0"
                value={data.price}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category">Product Category:</label>
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
            <label htmlFor="company">Product Company:</label>
            <div className="bg-slate-200 p-2">
              <input
                type="text"
                placeholder="Enter Product Company"
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
                <img src={data?.imgUrl} width={30} height={30} alt="Product" />
                <span
                  className="text-xl hover:text-red-500"
                  onClick={cancelImage}
                >
                  <RxCross2 />
                </span>
              </div>
            )}

            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
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

          <button
            type="submit"
            className="w-full p-3 mt-3 bg-violet-400 rounded-full hover:scale-105 duration-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
