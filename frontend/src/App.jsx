import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";

import Navbar from "./components/Home/Navbar";
import LoginDialog from "./pages/LoginDialog";
import SignupDialog from "./pages/SignupDialog";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";

import AuthSuccess from "./pages/AuthSuccess";

import Destination from "./pages/Destination";

import Profile from "./pages/Profile";

import DestinationListing from "./pages/DestinationListing";


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
   path: "/destinations/:stateSlug",
    element:(
      <>
      <Navbar />
      <DestinationListing/>
      </>
    ),
  },

  {
    path: "/login",
    element: <LoginDialog />,
  },

  {
    path: "/signup",
    element: <SignupDialog />,
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

  /* DESTINATION PAGE */
  {
    path: "/destination/:id",
    element: (
      <>
        <Navbar />
        <Destination />
      </>
    ),
  },

  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
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