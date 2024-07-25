import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../pages/SignUp";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import AdminPanel from "../pages/AdminPanel";
import EditProduct from "../components/EditProduct";
import ProductById from "../components/ProductById";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <SignUp />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      },
      {
        path: "admin/edit/:productId",
        element: <EditProduct />,
      },
      {
        path: "product/:productId",
        element: <ProductById />,
      },
    ],
  },
]);

export default Router;
