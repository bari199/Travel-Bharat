import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BookA, LogOut, User, Search, Globe2Icon, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getData } from "@/context/userContext";
import logo from "../../assets/travel-bharat-logo.svg";
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
import {
  DESTINATION_REGIONS,
  ACTIVITIES_COLUMNS,
  REGIONS,
} from "../../data/navdata";

const RegionSidebar = ({ activeRegion, setActiveRegion }) => (
  <div className="w-48 bg-white border-r border-gray-200">
    {REGIONS.map((region) => (
      <button
        key={region.label}
        onClick={() => setActiveRegion(region.label)}
        className={`
          w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100
          ${
            activeRegion === region.label
              ? "bg-orange-50 text-orange-500 font-semibold border-r-2 border-r-orange-500"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
          }
        `}
      >
        {region.label}
      </button>
    ))}
  </div>
);

const MegaColumn = ({ heading, items }) => (
  <div className="flex-1 min-w-[180px]">
    <p className="mb-4 text-[12px] font-bold uppercase tracking-widest text-orange-500">
      {heading}
    </p>

    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item}>
          <Link
            to="#"
            className="
              text-sm
              text-gray-600
              hover:text-orange-500
              transition-colors
            "
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const DestinationsMega = () => {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0].label);

  // Always derive fresh from state — never stale
  const destinations = DESTINATION_REGIONS[activeRegion] || [];

  return (
    <div
      className="flex bg-white rounded-xl border shadow-xl overflow-hidden"
      style={{ width: "650px" }}
    >
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex-shrink-0">
        {REGIONS.map((region) => (
          <button
            key={region.label}
            onClick={() => setActiveRegion(region.label)}
            className={`
              w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100
              ${
                activeRegion === region.label
                  ? "bg-orange-50 text-orange-500 font-semibold border-r-2 border-r-orange-500"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              }
            `}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Content — key prop forces full remount on region change, no stale append */}
      <div key={activeRegion} className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 pb-3">
          <h3 className="text-orange-500 font-bold text-lg">{activeRegion}</h3>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-3">
          {destinations.map((item) => (
            <Link
              key={item.slug}
              to={`/destinations/${item.slug}`}
              className="text-sm text-gray-600 hover:text-orange-500 truncate"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Activities mega-panel */
const ActivitiesMega = () => (
  <div
    className="flex bg-white rounded-b-xl shadow-xl border border-gray-100 overflow-hidden p-5"
    style={{ width: 460 }}
  >
    {ACTIVITIES_COLUMNS.slice(0, 3).map((col, i) => (
      <React.Fragment key={col.heading}>
        {i > 0 && (
          <div className="w-px bg-gray-100 mx-4 self-stretch flex-shrink-0" />
        )}
        <MegaColumn heading={col.heading} items={col.items} />
      </React.Fragment>
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
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      if (res.data.success) {
        setUser(null);
        localStorage.clear();

        toast.success("Logged out successfully");

        navigate("/");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-200 bg-orange-300/90 backdrop-blur-md shadow-sm overflow-visible">
      {/*
        Fixed-height row (instead of letting py-3 + the logo's own height
        determine it). The logo is taken out of normal flow (absolute) and
        vertically centered, so making it bigger no longer stretches the
        navbar — it just overflows the bar's top/bottom edges instead.
      */}
      <div className="relative max-w-7xl mx-auto px-4 h-16 lg:h-[72px] flex items-center justify-between gap-4">
        {/* ── Logo ── */}
        <Link
          to="/"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center shrink-0 transition-all duration-300 hover:opacity-90"
        >
          <img
            src={logo}
            alt="Travel Bharat"
            className="h-20 lg:h-24 w-auto object-contain"
          />
        </Link>

        {/* Spacer reserving horizontal room for the now-absolute logo,
            so the nav items below don't slide underneath it */}
        <div className="w-[130px] lg:w-[150px] shrink-0" aria-hidden="true" />

        <NavigationMenu
          className="hidden lg:flex [&>div]:overflow-visible"
          delayDuration={100}
        >
          <NavigationMenuList className="flex gap-1">
            {/* ── Destinations ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  flex items-center gap-1.5 px-2 py-2 rounded-md text-[15px] font-medium
                  text-gray-700/90 bg-transparent
                  hover:bg-orange-300/60 hover:text-orange-700
                  data-[state=open]:bg-orange-300/60 data-[state=open]:text-orange-700
                  transition-all duration-200
                "
              >
                <MapPin className="h-3.5 w-3.5" />
                Destinations
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-0">
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

              <NavigationMenuContent className="p-0">
                <ActivitiesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Plain nav links ── */}
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

        {/* ── Search ── */}
        <div className="hidden md:flex items-center relative w-[260px]">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search destination..."
            className="pl-10 rounded-full bg-white/80 border-orange-200 focus:border-orange-400 focus:ring-orange-100"
          />
        </div>

        {/* ── Right section ── */}
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

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl border-orange-100 shadow-lg"
              >
                <DropdownMenuLabel className="text-gray-700">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-orange-100" />

                <DropdownMenuItem
                  className="cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-600">
                  <BookA className="mr-2 h-4 w-4" /> My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-orange-100" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                >
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