import { createBrowserRouter } from "react-router-dom";
import DashBoard from "../Layout/DashBoard";
import Main from "../Layout/Main";
import MySelectedClass from "../Pages/DashBoard/MySelectedClass/MySelectedClass";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/Shared/Classes/Classes";
import Instuctors from "../Pages/Shared/Instuctors/Instuctors";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";

import AddClass from "../Pages/DashBoard/AddClass/AddClass";
import ManageClasses from "../Pages/DashBoard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/DashBoard/ManageUsers/ManageUsers";
import MyClasses from "../Pages/DashBoard/MyClasses/MyClasses";
import MyEnrolledClass from "../Pages/DashBoard/MyEnrolledClass/MyEnrolledClass";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import UnderConstruction from "../Pages/Shared/FourOfour/FourOfour";
import AdminRoute from "./AdminRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/instuctors",
        element: <Instuctors></Instuctors>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashBoard></DashBoard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "MySelectedClass",
        element: <MySelectedClass></MySelectedClass>,
      },

      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "PaymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "MyEnrolledClass",
        element: <MyEnrolledClass></MyEnrolledClass>,
      },

      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <UnderConstruction />,
  },
]);
