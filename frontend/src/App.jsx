import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import summaryApi from "./common";
import userContext from "../context/userContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    userName: "",
    role: "",
  });

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.userDetail.url, {
        method: summaryApi.userDetail.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser({
          userId: data.data._id,
          userName: data.data.username,
          role: data.data.role,
        });
      }
      console.log("Current user:", data);
    } catch (error) {
      console.error("Error fetching user details:");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <userContext.Provider
      value={{ fetchUserDetails, currentUser, setCurrentUser }}
    >
      <Toaster />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </userContext.Provider>
  );
}

export default App;
