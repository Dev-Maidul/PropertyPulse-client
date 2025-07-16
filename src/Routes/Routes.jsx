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
import MakeOffer from "../Pages/Dashboard/User/MakeOffer";
import PropertyBought from "../Pages/Dashboard/User/PropertyBought";
import PaymentPage from "../Shared/PaymentPage";
import ManageProperties from "../Pages/Dashboard/Admin/ManageProperties";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import RequestedProperties from "../Pages/Dashboard/Agent/RequestedProperties";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import MySoldProperties from "../Pages/Dashboard/Agent/MySoldProperties";
import ManageReview from "../Pages/Dashboard/Admin/ManageReview";

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
        path:'/dashboard/admin-profile',
        element:<Profile></Profile>
      },
      {
        path:'/dashboard/manage-properties',
        element:<ManageProperties></ManageProperties>
      },
      {
        path:'/dashboard/manage-users',
        element:<ManageUsers></ManageUsers>
      },
      {
        path:'/dashboard/manage-reviews',
        element:<ManageReview></ManageReview>
      },

      // Agent related api
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
        path:'/dashboard/requested-properties',
        element:<RequestedProperties></RequestedProperties>
      },
      {
        path:'/dashboard/my-sold-properties',
        element:<MySoldProperties></MySoldProperties>
      },
      // user related
      {
        path:'profile',
        element:<Profile></Profile>
      },
      {
        path:'/dashboard/wishlist',
        element:<Wishlist></Wishlist>
      },
      {
        path:'make-offer/:propertyId',
        element:<MakeOffer></MakeOffer>
      },
      {
        path:'/dashboard/property-bought',
        element:<PropertyBought></PropertyBought>
      },
      {
        path:'/dashboard/payment/:offerId',
        element:<PaymentPage></PaymentPage>
      },
      {
        path:'/dashboard/my-reviews',
        element:<MyReviews></MyReviews>
      },
      
    ],
  },
 
  {
    path: "*",
    element: <ErrorPage />,
  },
]);