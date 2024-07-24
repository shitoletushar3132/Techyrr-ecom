import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../pages/SignUp";
import Register from "../pages/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <SignUp />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default Router;
