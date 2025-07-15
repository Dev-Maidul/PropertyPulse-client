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
import UpdateProperty from "../Dashboard/Agent/UpdateProperty";
import Profile from "../Dashboard/Profile/Profile";
import PropertyDetails from "../Pages/AllProperties/PropertyDetails";
import Wishlist from "../Pages/Dashboard/User/Wishlist";

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
      {
        path:'/property-details/:id',
        element:<PropertyDetails></PropertyDetails>

      }
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
      },
      {
        path:'update-property/:id',
        element:<UpdateProperty></UpdateProperty>
      },
      {
        path:'profile',
        element:<Profile></Profile>
      },
      {
        path:'/dashboard/wishlist',
        element:<Wishlist></Wishlist>
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);