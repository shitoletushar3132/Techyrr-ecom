import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import summaryApi from "../common";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";

const Header = () => {
  const { currentUser, fetchUserDetails, setCurrentUser } =
    useContext(userContext);

  const [adminActive, setAdminActive] = useState(true);
  const navigate = useNavigate();
  const handlelogOut = async () => {
    try {
      const data = await fetch(summaryApi.logOut.url, {
        credentials: "include",
        method: "get",
      });

      const dataApi = await data.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setCurrentUser((prev) => ({
          ...prev,
          userName: "",
          userId: "",
          role: "",
        }));
        navigate("/");
      }
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link
          to={"/"}
          className="font-semibold text-lg rounded shadow-sm shadow-violet-500 bg-white cursor-pointer p-1"
        >
          {currentUser.userName}
        </Link>
        <div className="flex gap-5">
          {currentUser.userId && currentUser.role === "admin" && (
            <>
              <Link className="px-1 py-1 rounded-full border border-violet-500 text-violet-500 hover:bg-violet-700 hover:text-white text-center cursor-pointer">
                Add Product
              </Link>

              <div
                className=" text-3xl text-violet-500 hover:bg-violet-700  text-center cursor-pointer"
                title="See Your Products"
                on
              >
                <div className="relative flex flex-col items-center">
                  <div onClick={() => setAdminActive((prev) => !prev)}>
                    <FaCircleUser
                      className="hover:scale-110 bg-white"
                      title="See Your Products"
                    />
                  </div>

                  {adminActive && (
                    <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                      <Link
                        to={"/"}
                        className="text-sm whitespace-nowrap hover:bg-slate-100 p-2"
                        onClick={() => setAdminActive((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {currentUser.userId ? (
            <button
              to={"/"}
              onClick={handlelogOut}
              className="px-3 py-1 rounded-full text-white bg-violet-500 hover:bg-violet-700 text-center cursor-pointer"
            >
              logout
            </button>
          ) : (
            <Link
              to={"login"}
              className="px-3 py-1 rounded-full text-white bg-violet-500 hover:bg-violet-700 text-center cursor-pointer"
            >
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
