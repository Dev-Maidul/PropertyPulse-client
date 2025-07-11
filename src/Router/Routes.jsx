import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import PrivateRoute from '../Context/PrivateRoute';
import AllProperties from "../Pages/AllProperties/AllProperties";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Components/Login";
import Register from "../Components/Signup";
import ErrorPage from "../Components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'/login',
            Component:Login
        },
        {
            path:'/signup',
            Component:Register
        },
        {
            path:'/all-properties',
            element:(<PrivateRoute><AllProperties></AllProperties></PrivateRoute>)
        },
        {
            path:'/dashboard',
            element:(<PrivateRoute><Dashboard></Dashboard></PrivateRoute>)
        },
    ]
  },
  {
    path:'*',
    Component:ErrorPage
  }
]);