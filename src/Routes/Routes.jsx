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
import AdvertisedProperties from "../Pages/Dashboard/Admin/AdvertisedProperties";
import ReportedProperties from "../Pages/Dashboard/Admin/ReportedProperties";
import SellingStatistics from "../Pages/Dashboard/Agent/SellingStatistics";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

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
        element: <PrivateRoute>
          <DashboardHome></DashboardHome>
        </PrivateRoute>,
      },
      // admin related
      {
        path:'/dashboard/admin-profile',
        element:<PrivateRoute>
          <AdminRoute><Profile></Profile></AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/manage-properties',
        element:<PrivateRoute>
          <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/advertise-property',
        element:<PrivateRoute>
          <AdminRoute><AdvertisedProperties></AdvertisedProperties></AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/manage-users',
        element:<PrivateRoute>
          <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/manage-reviews',
        element:<PrivateRoute>
          <AdminRoute>
            <ManageReview></ManageReview>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/reported-property',
        element:<PrivateRoute>
          <AdminRoute>
            <ReportedProperties></ReportedProperties>
          </AdminRoute>
        </PrivateRoute>
      },

      // Agent related api
      {
        path: "add-property",
        element: <PrivateRoute>
          <AgentRoute>
            <AddProperty />
          </AgentRoute>
        </PrivateRoute>,
      },
      {
        path:'my-added-properties',
        element:<PrivateRoute>
          <AgentRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path:'update-property/:id',
        element:<PrivateRoute>
          <AgentRoute>
            <UpdateProperty></UpdateProperty>
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/requested-properties',
        element:<RequestedProperties></RequestedProperties>
      },
      {
        path:'/dashboard/my-sold-properties',
        element:<PrivateRoute>
          <AgentRoute>
            <MySoldProperties></MySoldProperties>
          </AgentRoute>
        </PrivateRoute>
      },
      {
        path:'/dashboard/selling-statistics',
        element:<PrivateRoute>
          <AgentRoute>
            <SellingStatistics></SellingStatistics>
          </AgentRoute>
        </PrivateRoute>
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