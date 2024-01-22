import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RegisterHero from "../Pages/RegisterHero/RegisterHero";
import Login2 from "../Pages/Login2/Login2";
import Reg2 from "../Pages/Reg2/Reg2";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/Register",
        element: <Register></Register>,
      },
      {
        path: "/Hero",
        element: <RegisterHero></RegisterHero>,
      },
      {
        path: "/Log",
        element: <Login2></Login2>,
      },
      {
        path: "/Reg",
        element: <Reg2></Reg2>,
      },
    ],
  },
]);

export default route;
