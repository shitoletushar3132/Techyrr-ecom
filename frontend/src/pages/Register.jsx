import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import toast from "react-hot-toast";
import summaryApi from "../common";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("register data", data);
      const dataResponse = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section id="register">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto text-6xl ">
            <FaUserLarge />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <div className="grid">
              <label>UserName :</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="enter username"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role">Role :</label>
              <div className="bg-slate-200 p-2 flex">
                <select
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={handleOnChange}
                  className="w-full h-full bg-slate-200 outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type="password"
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-violet-500 text-white px-6 py-3 w-full max-w-[150px] rounded-full hover:bg-violet-700 hover:scale-110 transition-all mx-auto block mt-6"
            >
              Register
            </button>
          </form>

          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
