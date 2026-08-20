import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

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

import Event from "@/pages/Event";
import EventListing from "@/pages/EventListing";
import ProtectedRoute from "./components/Home/ProtectedRoute";

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
      <ProtectedRoute>
        <Navbar />
        <DestinationListing />
      </ProtectedRoute>
    ),
  },
  {
  path: "/experience/:id",
  element: (
    <ProtectedRoute>
      <Navbar />
      <Experience />
    </ProtectedRoute>
  ),
},

  {
    path: "/experiences",
    element: (
      <ProtectedRoute>
        <Navbar />
        <ExperienceListing />
      </ProtectedRoute>
    ),
  },

  /* EVENTS */

{
  path: "/events/:id",
  element: (
    <ProtectedRoute>
      <Navbar />
      <Event />
    </ProtectedRoute>
  ),
},

{
  path: "/events",
  element: (
    <ProtectedRoute>
      <Navbar />
      <EventListing />
    </ProtectedRoute>
  ),
},

  

  {
    path: "/activity/:slug",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Activity />
      </ProtectedRoute>
    ),
  },

  {
    // Scoped to a state (all activities in that state)
    path: "/activities/:stateSlug",
    element: (
      <ProtectedRoute>
        <Navbar />
        <ActivityListing />
      </ProtectedRoute>
    ),
  },

  {
    // Scoped to a state + city
    path: "/activities/:stateSlug/:citySlug",
    element: (
      <ProtectedRoute>
        <Navbar />
        <ActivityListing />
      </ProtectedRoute>
    ),
  },

  {
    // Unscoped — all activities, filterable via the sidebar
    path: "/activities",
    element: (
      <ProtectedRoute>
        <Navbar />
        <ActivityListing />
      </ProtectedRoute>
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
      <ProtectedRoute>
        <Navbar />
        <Destination />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
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