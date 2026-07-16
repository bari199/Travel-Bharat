import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  Star,
  Activity,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    Icon: LayoutDashboard,
    color: "text-orange-500",
  },
  {
    key: "wishlist",
    label: "Wishlist",
    Icon: Heart,
    color: "text-rose-500",
  },
  {
    key: "reviews",
    label: "Reviews",
    Icon: MessageSquare,
    color: "text-blue-500",
  },
  {
    key: "ratings",
    label: "Ratings",
    Icon: Star,
    color: "text-amber-500",
  },
  {
    key: "activity",
    label: "Activity",
    Icon: Activity,
    color: "text-emerald-500",
  },
  {
    key: "settings",
    label: "Settings",
    Icon: Settings,
    color: "text-gray-500",
  },
];