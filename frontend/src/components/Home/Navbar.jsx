import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BookA, LogOut, User, Search, Globe2Icon, ChevronDown, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getData } from "@/context/userContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { navItems } from "../../data/data";
import LoginDialog from "../../pages/LoginDialog";
import SignupDialog from "../../pages/SignupDialog";

/* ── Mega-menu data ──────────────────────────────────────────────────── */
const REGIONS = [
  { label: "North",         active: false },
  { label: "North East",    active: false },
  { label: "East",          active: false },
  { label: "Central", active: false },
  { label: "West ",        active: false },
  { label: "South",       active: false },
  { label: "Polar",         active: false },
  { label: "Regions",       active: true  },
];

const DESTINATION_COLUMNS = [
  {
    heading: "Popular Destinations",
    items: [
      "Rajasthan Tours", "Kerala Tours", "Goa Tours",
      "Himachal Tours", "Kashmir Tours", "Uttarakhand Tours",
      "Tamil Nadu Tours", "Karnataka Tours", "Andaman Tours",
      "Sikkim Tours", "Meghalaya Tours",
    ],
  },
  {
    heading: "Hill Stations",
    items: [
      "Manali Tours", "Shimla Tours", "Ooty Tours",
      "Darjeeling Tours", "Munnar Tours", "Coorg Tours",
      "Mussoorie Tours", "Nainital Tours", "Lansdowne Tours",
      "Chikmagalur Tours", "Kodaikanal Tours",
    ],
  },
  {
    heading: "Heritage & Culture",
    items: [
      "Varanasi Tours", "Agra Tours", "Jaipur Tours",
      "Mysore Tours", "Hampi Tours", "Khajuraho Tours",
      "Madurai Tours", "Mahabalipuram Tours", "Puri Tours",
      "Bodh Gaya Tours", "Ajanta Ellora Tours",
    ],
  },
];

const ACTIVITIES_COLUMNS = [
  {
    heading: "Adventure",
    items: [
      "Trekking", "River Rafting", "Rock Climbing",
      "Paragliding", "Bungee Jumping", "Skiing",
      "Scuba Diving", "Surfing",
    ],
  },
  {
    heading: "Wellness",
    items: [
      "Yoga Retreats", "Ayurveda Stays", "Meditation Tours",
      "Spa Holidays", "Detox Retreats",
    ],
  },
  {
    heading: "Wildlife",
    items: [
      "Tiger Safari", "Bird Watching", "Jungle Camping",
      "Wildlife Photography", "Whale Watching",
    ],
  },
];

/* ── Sub-components ─────────────────────────────────────────────────── */

/** Left sidebar of region pills */
const RegionSidebar = ({ active, onHover }) => (
  <div className="w-48 flex-shrink-0 border-r border-orange-100 bg-orange-50/40 py-3">
    {REGIONS.map((r) => (
      <button
        key={r.label}
        onMouseEnter={() => onHover(r.label)}
        className={`
          w-full text-left px-5 py-2.5 text-sm font-medium transition-all duration-150
          ${active === r.label || (r.active && !active)
            ? "bg-white text-orange-600 border-r-2 border-orange-500 font-semibold"
            : "text-gray-600 hover:bg-white hover:text-orange-500"}
        `}
      >
        {r.label}
      </button>
    ))}
  </div>
);

/** Column of destination/activity links */
const MegaColumn = ({ heading, items }) => (
  <div className="min-w-[200px]">
    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-orange-500">
      {heading}
    </p>
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item}>
          <Link
            to="#"
            className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-150 hover:underline underline-offset-2"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** Full destinations mega-panel */
const DestinationsMega = () => {
  const [hovered, setHovered] = useState("Regions");

  return (
    <div className="flex overflow-hidden rounded-xl shadow-xl border border-orange-100 bg-white" style={{ width: 860 }}>
      <RegionSidebar active={hovered} onHover={setHovered} />
      <div className="flex flex-1 gap-8 p-7 overflow-y-auto max-h-[420px]">
        {DESTINATION_COLUMNS.map((col) => (
          <MegaColumn key={col.heading} heading={col.heading} items={col.items} />
        ))}
      </div>
    </div>
  );
};

/** Full activities mega-panel */
const ActivitiesMega = () => (
  <div
    className="flex overflow-hidden rounded-xl shadow-xl border border-orange-100 bg-white p-7 gap-8"
    style={{ width: 640 }}
  >
    {ACTIVITIES_COLUMNS.map((col) => (
      <MegaColumn key={col.heading} heading={col.heading} items={col.items} />
    ))}
  </div>
);

/* ── Navbar ─────────────────────────────────────────────────────────── */
const Navbar = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogin, setOpenLogin] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (location.state?.openLogin) setOpenLogin(true);
  }, [location]);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success(res.data.message);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-200 bg-orange-300/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Globe2Icon className="h-7 w-7 text-orange-700/80" />
          <h1 className="font-bold text-2xl">
            <span className="text-orange-600">Travel</span>Bharat
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center relative w-[280px]">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search destination..."
            className="pl-10 rounded-full bg-white/80 border-orange-200 focus:border-orange-400 focus:ring-orange-100"
          />
        </div>

        {/* Navigation — shadcn NavigationMenu with mega dropdowns */}
        <NavigationMenu className="hidden lg:flex" delayDuration={100}>
          <NavigationMenuList className="flex gap-1">

            {/* ── Destinations ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  flex items-center gap-1.5 px-4 py-2 rounded-md text-[15px] font-medium
                  text-gray-700/90 bg-transparent
                  hover:bg-orange-300/60 hover:text-orange-700
                  data-[state=open]:bg-orange-300/60 data-[state=open]:text-orange-700
                  transition-all duration-200
                "
              >
                <MapPin className="h-3.5 w-3.5" />
                Destinations
              </NavigationMenuTrigger>

              <NavigationMenuContent className="!p-0 !rounded-xl overflow-visible">
                <DestinationsMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Activities ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  flex items-center gap-1.5 px-4 py-2 rounded-md text-[15px] font-medium
                  text-gray-700/90 bg-transparent
                  hover:bg-orange-300/60 hover:text-orange-700
                  data-[state=open]:bg-orange-300/60 data-[state=open]:text-orange-700
                  transition-all duration-200
                "
              >
                Activities
              </NavigationMenuTrigger>

              <NavigationMenuContent className="!p-0 !rounded-xl overflow-visible">
                <ActivitiesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Other nav items (plain links) ── */}
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className="
                      px-4 py-2 text-[15px] font-medium text-gray-700/80 rounded-md
                      hover:bg-orange-300/60 hover:text-orange-700/80
                      transition-all duration-200 inline-block
                    "
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-orange-300 shadow-sm hover:ring-2 hover:ring-orange-400 transition-all">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52 rounded-xl border-orange-100 shadow-lg">
                <DropdownMenuLabel className="text-gray-700">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-orange-100" />

                <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-600" onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-600">
                  <BookA className="mr-2 h-4 w-4" /> My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-orange-100" />

                <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <LoginDialog open={openLogin} setOpen={setOpenLogin} />
              <SignupDialog />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;