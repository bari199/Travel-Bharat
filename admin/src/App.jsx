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
import Experiences from "./pages/admin/Experiences";
import EditExperience from "./pages/admin/EditExperience";
import AddExperience from "./pages/admin/AddExperience";
import Activities from "./pages/admin/Activities";
import AddActivity from "./pages/admin/AddActivity";
import EditActivity from "./pages/admin/EditActivity";
import Events from "./pages/admin/Events";
import AddEvents from "./pages/admin/AddEvents";
import EditEvents from "./pages/admin/EditEvents";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
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
        path="/experiences"
        element={
          <ProtectedRoute>
            <Experiences />
          </ProtectedRoute>
        }
      />

      <Route
        path="/experiences/edit/:id"
        element={
          <ProtectedRoute>
            <EditExperience />
          </ProtectedRoute>
        }
      />

      <Route
        path="/experiences/add"
        element={
          <ProtectedRoute>
            <AddExperience />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <Activities />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities/add"
        element={
          <ProtectedRoute>
            <AddActivity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activities/edit/:id"
        element={
          <ProtectedRoute>
            <EditActivity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/add"
        element={
          <ProtectedRoute>
            <AddEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/edit/:id"
        element={
          <ProtectedRoute>
            <EditEvents />
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
