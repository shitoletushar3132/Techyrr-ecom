import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import summaryApi from "../common";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { GrSearch } from "react-icons/gr";

const Header = () => {
  const { currentUser, fetchUserDetails, setCurrentUser } =
    useContext(userContext);

  const [adminActive, setAdminActive] = useState(false);
  const navigate = useNavigate();
  const searchInput = useLocation();

  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogOut = async () => {
    try {
      const response = await fetch(summaryApi.logOut.url, {
        credentials: "include",
        method: "GET",
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setCurrentUser({
          userName: "",
          userId: "",
          role: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          {currentUser.userName ? (
            <Link
              to="/"
              className="font-semibold text-lg rounded shadow-sm shadow-violet-500 bg-white cursor-pointer p-1"
            >
              {currentUser.userName}
            </Link>
          ) : (
            <Link to="/">
              <div className="h-20 w-20 rounded p-1">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                />
              </div>
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here...."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-violet-500 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex gap-5">
          {currentUser.userId && currentUser.role === "admin" && (
            <>
              <Link
                to="/addProduct"
                className="px-1 py-1 rounded-full border border-violet-500 text-violet-500 hover:bg-violet-700 hover:text-white text-center cursor-pointer"
              >
                Add Product
              </Link>

              <div className="relative flex flex-col items-center">
                <div
                  onClick={() => setAdminActive((prev) => !prev)}
                  className="text-3xl text-violet-500 hover:bg-violet-700 text-center cursor-pointer"
                >
                  <FaCircleUser
                    className="hover:scale-110 bg-white"
                    title="See Your Products"
                  />
                </div>

                {adminActive && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                    <Link
                      to="/admin"
                      className="text-sm whitespace-nowrap hover:bg-slate-100 p-2"
                      onClick={() => setAdminActive((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {currentUser.userId ? (
            <button
              onClick={handleLogOut}
              className="px-3 py-1 rounded-full text-white bg-violet-500 hover:bg-violet-700 text-center cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-full text-white bg-violet-500 hover:bg-violet-700 text-center cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
