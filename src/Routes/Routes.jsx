import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import FourOfour from "../Pages/Shared/fourOfour/fourOfour";
import Classes from "../Pages/Shared/Classes/Classes";
import Main from "../Layout/Main";
import Instuctors from "../Pages/Shared/Instuctors/Instuctors";
import DashBoard from "../Layout/DashBoard";
import MySelectedClass from "../Pages/DashBoard/MySelectedClass/MySelectedClass";
import PrivateRoutes from "./PrivateRoutes";

import ManageUsers from "../Pages/DashBoard/ManageUsers/ManageUsers";
import AddClass from "../Pages/DashBoard/AddClass/AddClass";
import AdminRoute from "./AdminRoute";
import MyClasses from "../Pages/DashBoard/MyClasses/MyClasses";
import ManageClasses from "../Pages/DashBoard/ManageClasses/ManageClasses";
import Payment from "../Pages/DashBoard/Payment/Payment";
import MyEnrolledClass from "../Pages/DashBoard/MyEnrolledClass/MyEnrolledClass";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>

            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/instuctors',
                element: <Instuctors></Instuctors>
            },

        ],

    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        children: [
            {
                path: 'MySelectedClass',
                element: <MySelectedClass></MySelectedClass>
            },

            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'MyEnrolledClass',
                element: <MyEnrolledClass></MyEnrolledClass>
            },

            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'addClass',
                element: <AddClass></AddClass>
            },
            {
                path: 'myclasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
        ],
    },
    {
        path: '*',
        element: <FourOfour></FourOfour>
    },
]);