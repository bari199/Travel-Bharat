import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";

import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";

import Navbar from "./components/Navbar";
import LoginDialog from "./pages/LoginDialog";
import SignupDialog from "./pages/SignupDialog";
import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";

import AuthSuccess from "./pages/AuthSuccess";
import Destination from "./pages/Destination";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />

      </>
    ),
  },


  {
    path:"/login",
    element:<LoginDialog/>
  },

  {
    path:"/signup",
    element:<SignupDialog/>
  },


  {
    path: "/verify",
    element: <VerifyEmail />,
  },

  {
    path: "/verify/:token",
    element: <Verify />,
  },

  {
    path: "/auth-success",
    element: <AuthSuccess />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/verify-otp/:email",
    element: <VerifyOTP />,
  },

  {
    path: "/change-password/:email",
    element: <ChangePassword />,
  },
  {
  path: "/destinations",
  element: (
    <>
      <Navbar />
      <Destination />
    </>
  ),
}
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;