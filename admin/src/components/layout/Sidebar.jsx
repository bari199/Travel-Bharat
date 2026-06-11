import {
  LayoutDashboard,
  MapPinned,
  Users,
  MessageSquare,
  Star,
  Heart,
  ThumbsUp,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Destinations",
    path: "/destinations",
    icon: MapPinned,
  },
  {
    name: "Users",
    path: "/users",
    icon: Users,
  },
  {
    name: "Comments",
    path: "/comments",
    icon: MessageSquare,
  },
  {
    name: "Ratings",
    path: "/ratings",
    icon: Star,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    icon: Heart,
  },
  {
    name: "Reactions",
    path: "/reactions",
    icon: ThumbsUp,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        Travel Bharat
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-muted"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mt-10 flex items-center gap-3 text-red-500"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;