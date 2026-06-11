import { Routes, Route } from "react-router-dom";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

import Destinations from "./pages/admin/Destinations";
import User from "./pages/admin/User";
import Comments from "./pages/admin/Comments";
import Ratings from "./pages/admin/Rating";
import Wishlist from "./pages/admin/Wishlist";
import Reactions from "./pages/admin/Reactions";
import Profile from "./pages/admin/Profile";
import AddDestination from "./pages/admin/AddDestinations";
import EditDestinations from "./pages/admin/EditDestinations";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/destinations"
        element={
          <ProtectedRoute>
            <Destinations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comments"
        element={
          <ProtectedRoute>
            <Comments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ratings"
        element={
          <ProtectedRoute>
            <Ratings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reactions"
        element={
          <ProtectedRoute>
            <Reactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/destinations/add"
        element={
          <ProtectedRoute>
            <AddDestination />
          </ProtectedRoute>
        }
      />
      <Route
        path="/destinations/edit/:id"
        element={
          <ProtectedRoute>
            <EditDestinations />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
