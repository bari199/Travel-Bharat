import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";

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

import Activity from "./pages/Activity";

import DestinationListing from "./pages/DestinationListing";

import ActivityListing from "./pages/ActivityListing";

import ExperienceListing from "./pages/ExperienceListing";

import Experience from "./pages/Experience";

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
    element: (
      <>
        <Navbar />
        <DestinationListing />
      </>
    ),
  },
  {
  path: "/experience/:id",
  element: (
    <>
      <Navbar />
      <Experience />
    </>
  ),
},

  {
    path: "/experiences",
    element: (
      <>
        <Navbar />
        <ExperienceListing />
      </>
    ),
  },

  

  {
    path: "/activity/:slug",
    element: (
      <>
        <Navbar />
        <Activity />
      </>
    ),
  },

  {
    // Scoped to a state (all activities in that state)
    path: "/activities/:stateSlug",
    element: (
      <>
        <Navbar />
        <ActivityListing />
      </>
    ),
  },

  {
    // Scoped to a state + city
    path: "/activities/:stateSlug/:citySlug",
    element: (
      <>
        <Navbar />
        <ActivityListing />
      </>
    ),
  },

  {
    // Unscoped — all activities, filterable via the sidebar
    path: "/activities",
    element: (
      <>
        <Navbar />
        <ActivityListing />
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
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground transition-colors duration-300">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;