import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Login from "../Components/Login";
import Register from "../Components/Signup";
import ErrorPage from "../Components/ErrorPage";
import AddProperty from "../Dashboard/Agent/AddProperty";
import PrivateRoute from "./PrivateRoute";
import MyAddedProperties from "../Dashboard/Agent/MyAddedProperties";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/all-properties",
        element: (
          
            <PrivateRoute><AllProperties /></PrivateRoute>
         
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <p>Hello Dashboard</p>,
      },
      {
        path: "add-property",
        element: <AddProperty />,
      },
      {
        path:'my-added-properties',
        element:<MyAddedProperties></MyAddedProperties>
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);