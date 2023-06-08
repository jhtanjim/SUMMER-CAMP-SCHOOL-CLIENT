import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import FourOfour from "../Pages/Shared/fourOfour/fourOfour";
import Classes from "../Pages/Shared/Classes/Classes";
import Main from "../Layout/Main";



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

        ]
    },
    {
        path: '*',
        element: <FourOfour></FourOfour>
    },
]);