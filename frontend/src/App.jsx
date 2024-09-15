import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Layout from "../layout/Layout";
import Booking from "./components/Bookings/Booking";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { adminActions, userActions } from "./store";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
    setIsLoading(false); // Set loading to false after authentication check
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  }

  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/movies", element: <Movies /> },
        { path: "/admin", element: <Admin /> },
        { path: "/auth", element: <Auth /> },
        {
          path: "/booking/:id",
          element: (
            <ProtectedRoute requireUser>
              <Booking />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user",
          element: (
            <ProtectedRoute requireUser>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add",
          element: (
            <ProtectedRoute requireAdmin>
              <AddMovie />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-admin",
          element: (
            <ProtectedRoute requireAdmin>
              <AdminProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
