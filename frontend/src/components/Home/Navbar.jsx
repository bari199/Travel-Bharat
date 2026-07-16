import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BookA, LogOut, User, Search, Globe2Icon, MapPin, Menu, X } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { navItems } from "../../data/data";
import LoginDialog from "../../pages/LoginDialog";
import SignupDialog from "../../pages/SignupDialog";
import {
  DESTINATION_REGIONS,
  ACTIVITIES_COLUMNS,
  EXPERIENCES_COLUMNS,
  REGIONS,
} from "../../data/navdata";
import ThemeToggle from "@/context/ThemeToggle";

const RegionSidebar = ({ activeRegion, setActiveRegion }) => (
  <div className="w-48 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700">
    {REGIONS.map((region) => (
      <button
        key={region.label}
        onClick={() => setActiveRegion(region.label)}
        className={`
          w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100 dark:border-slate-800
          ${
            activeRegion === region.label
              ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-semibold border-r-2 border-r-orange-500"
              : "text-gray-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500"
          }
        `}
      >
        {region.label}
      </button>
    ))}
  </div>
);

const DestinationsMega = () => {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0].label);

  // Always derive fresh from state — never stale
  const destinations = DESTINATION_REGIONS[activeRegion] || [];

  return (
    <div
      className="flex bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-700 shadow-xl overflow-hidden"
      style={{ width: "650px" }}
    >
      {/* Sidebar */}
      <div className="w-48 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex-shrink-0">
        {REGIONS.map((region) => (
          <button
            key={region.label}
            onClick={() => setActiveRegion(region.label)}
            className={`
              w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100 dark:border-slate-800
              ${
                activeRegion === region.label
                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-semibold border-r-2 border-r-orange-500"
                  : "text-gray-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500"
              }
            `}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Content — key prop forces full remount on region change, no stale append */}
      <div key={activeRegion} className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className="text-orange-500 font-bold text-lg">{activeRegion}</h3>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-3">
          {destinations.map((item) => (
            <Link
              key={item.slug}
              to={`/destinations/${item.slug}`}
              className="text-sm text-gray-600 dark:text-slate-300 hover:text-orange-500 truncate"
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
const ActivitiesMega = () => {
  const [activeCategory, setActiveCategory] = useState(
    ACTIVITIES_COLUMNS[0].heading,
  );

  // Always derive fresh from state — never stale
  const items =
    ACTIVITIES_COLUMNS.find((col) => col.heading === activeCategory)?.items ||
    [];

  return (
    <div
      className="flex bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-700 shadow-xl overflow-hidden"
      style={{ width: "650px" }}
    >
      {/* Sidebar */}
      <div className="w-48 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex-shrink-0">
        {ACTIVITIES_COLUMNS.map((col) => (
          <button
            key={col.heading}
            onClick={() => setActiveCategory(col.heading)}
            className={`
              w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100 dark:border-slate-800
              ${
                activeCategory === col.heading
                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-semibold border-r-2 border-r-orange-500"
                  : "text-gray-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500"
              }
            `}
          >
            {col.heading}
          </button>
        ))}
      </div>

      {/* Content — key prop forces full remount on category change, no stale append */}
      <div key={activeCategory} className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className="text-orange-500 font-bold text-lg">
            {activeCategory}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/activities?search=${encodeURIComponent(item.slug)}`}
              className="text-sm text-gray-600 dark:text-slate-300 hover:text-orange-500 truncate"
            >
              {item.slug}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperiencesMega = () => {
  const [activeCategory, setActiveCategory] = useState(
    EXPERIENCES_COLUMNS[0].heading,
  );

  const items =
    EXPERIENCES_COLUMNS.find((col) => col.heading === activeCategory)?.items ||
    [];

  return (
    <div
      className="flex bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-700 shadow-xl overflow-hidden"
      style={{ width: "650px" }}
    >
      {/* Sidebar */}
      <div className="w-48 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex-shrink-0">
        {EXPERIENCES_COLUMNS.map((col) => (
          <button
            key={col.heading}
            onClick={() => setActiveCategory(col.heading)}
            className={`
              w-full text-left px-5 py-4 text-sm transition-all border-b border-gray-100 dark:border-slate-800
              ${
                activeCategory === col.heading
                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-semibold border-r-2 border-r-orange-500"
                  : "text-gray-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500"
              }
            `}
          >
            {col.heading}
          </button>
        ))}
      </div>

      {/* Content */}
      <div key={activeCategory} className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className="text-orange-500 font-bold text-lg">
            {activeCategory}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <Link
              key={item.title}
              to={`/experiences?search=${encodeURIComponent(item.title)}`}
              className="text-sm text-gray-600 dark:text-slate-300 hover:text-orange-500 truncate"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Mobile nav panel — mirrors the desktop mega-menus as accordions so it
 *  works below the `lg` breakpoint, where the desktop NavigationMenu is
 *  hidden. Reuses the exact same data sources and link targets as the
 *  desktop menus, so nothing about where links point changes. */
const MobileNavPanel = ({ onNavigate }) => (
  <div className="lg:hidden border-t border-orange-200 dark:border-slate-800 bg-orange-300/95 dark:bg-slate-900/98 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="destinations" className="border-b border-orange-200/60 dark:border-slate-800">
          <AccordionTrigger className="text-sm font-semibold text-gray-800 dark:text-slate-100 hover:no-underline py-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Destinations
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <Accordion type="multiple" className="w-full">
              {REGIONS.map((region) => (
                <AccordionItem
                  key={region.label}
                  value={region.label}
                  className="border-b-0"
                >
                  <AccordionTrigger className="text-xs font-medium text-gray-600 dark:text-slate-300 hover:no-underline py-2">
                    {region.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-2">
                      {(DESTINATION_REGIONS[region.label] || []).map((item) => (
                        <Link
                          key={item.slug}
                          to={`/destinations/${item.slug}`}
                          onClick={onNavigate}
                          className="text-sm text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 truncate"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="activities" className="border-b border-orange-200/60 dark:border-slate-800">
          <AccordionTrigger className="text-sm font-semibold text-gray-800 dark:text-slate-100 hover:no-underline py-3">
            Activities
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <Accordion type="multiple" className="w-full">
              {ACTIVITIES_COLUMNS.map((col) => (
                <AccordionItem key={col.heading} value={col.heading} className="border-b-0">
                  <AccordionTrigger className="text-xs font-medium text-gray-600 dark:text-slate-300 hover:no-underline py-2">
                    {col.heading}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-2 pl-2">
                      {col.items.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/activities?search=${encodeURIComponent(item.slug)}`}
                          onClick={onNavigate}
                          className="text-sm text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 truncate"
                        >
                          {item.slug}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experiences" className="border-b border-orange-200/60 dark:border-slate-800">
          <AccordionTrigger className="text-sm font-semibold text-gray-800 dark:text-slate-100 hover:no-underline py-3">
            Experiences
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <Accordion type="multiple" className="w-full">
              {EXPERIENCES_COLUMNS.map((col) => (
                <AccordionItem key={col.heading} value={col.heading} className="border-b-0">
                  <AccordionTrigger className="text-xs font-medium text-gray-600 dark:text-slate-300 hover:no-underline py-2">
                    {col.heading}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-2 pl-2">
                      {col.items.map((item) => (
                        <Link
                          key={item.title}
                          to={`/experiences?search=${encodeURIComponent(item.title)}`}
                          onClick={onNavigate}
                          className="text-sm text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 truncate"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Plain nav links — same filter as the desktop list, so
          Experiences isn't rendered twice. */}
      <div className="flex flex-col mt-2">
        {navItems
          .filter((item) => item.title?.trim().toLowerCase() !== "experiences")
          .map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={onNavigate}
              className="py-2.5 text-sm font-medium text-gray-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 border-b border-orange-200/60 dark:border-slate-800 last:border-b-0"
            >
              {item.title}
            </Link>
          ))}
      </div>

      {/* Mobile search */}
      <div className="flex items-center relative mt-4">
        <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-slate-400" />
        <Input
          type="search"
          placeholder="Search destination..."
          className="pl-10 rounded-full bg-white/80 dark:bg-slate-800 dark:text-slate-100 border-orange-200 dark:border-slate-600 focus:border-orange-400 focus:ring-orange-100"
        />
      </div>
    </div>
  </div>
);

/* ── Navbar ─────────────────────────────────────────────────────────── */
const Navbar = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (location.state?.openLogin) setOpenLogin(true);
  }, [location]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
    <nav className="sticky top-0 z-50 border-b border-orange-200 dark:border-slate-800 bg-orange-300/90 dark:bg-slate-900/95 backdrop-blur-md shadow-sm overflow-visible transition-colors duration-300">
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
                  text-gray-700/90 dark:text-slate-200 bg-transparent
                  hover:bg-orange-300/60 dark:hover:bg-slate-800 hover:text-orange-700 dark:hover:text-orange-400
                  data-[state=open]:bg-orange-300/60 dark:data-[state=open]:bg-slate-800 data-[state=open]:text-orange-700 dark:data-[state=open]:text-orange-400
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
                  text-gray-700/90 dark:text-slate-200 bg-transparent
                  hover:bg-orange-300/60 dark:hover:bg-slate-800 hover:text-orange-700 dark:hover:text-orange-400
                  data-[state=open]:bg-orange-300/60 dark:data-[state=open]:bg-slate-800 data-[state=open]:text-orange-700 dark:data-[state=open]:text-orange-400
                  transition-all duration-200
                "
              >
                Activities
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-0">
                <ActivitiesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Experiences ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="
                  flex items-center gap-1.5 px-4 py-2 rounded-md text-[15px] font-medium
                  text-gray-700/90 dark:text-slate-200 bg-transparent
                  hover:bg-orange-300/60 dark:hover:bg-slate-800 hover:text-orange-700 dark:hover:text-orange-400
                  data-[state=open]:bg-orange-300/60 dark:data-[state=open]:bg-slate-800
                  data-[state=open]:text-orange-700 dark:data-[state=open]:text-orange-400
                  transition-all duration-200
                  "
              >
                Experiences
              </NavigationMenuTrigger>

              <NavigationMenuContent className="p-0">
                <ExperiencesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Plain nav links ── */}
            {/* Experiences already has its own mega-menu item above
                (ExperiencesMega), so it's excluded here to avoid it
                rendering twice in the navbar. */}
            {navItems
              .filter(
                (item) => item.title?.trim().toLowerCase() !== "experiences",
              )
              .map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="
                        px-4 py-2 text-[15px] font-medium text-gray-700/80 dark:text-slate-200/90 rounded-md
                        hover:bg-orange-300/60 dark:hover:bg-slate-800 hover:text-orange-700/80 dark:hover:text-orange-400
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
          <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Search destination..."
            className="pl-10 rounded-full bg-white/80 dark:bg-slate-800 dark:text-slate-100 border-orange-200 dark:border-slate-600 focus:border-orange-400 focus:ring-orange-100 dark:placeholder:text-slate-400"
          />
        </div>

        {/* ── Right section ── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile nav toggle — reveals Destinations/Activities/Experiences
              below the lg breakpoint, where the desktop menu is hidden */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-gray-700 dark:text-slate-200 hover:bg-orange-300/60 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-orange-300 dark:border-slate-600 shadow-sm hover:ring-2 hover:ring-orange-400 transition-all">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-orange-100 dark:bg-slate-700 text-orange-700 dark:text-orange-300 font-semibold">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl border-orange-100 dark:border-slate-700 dark:bg-slate-900 shadow-lg"
              >
                <DropdownMenuLabel className="text-gray-700 dark:text-slate-200">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-orange-100 dark:bg-slate-700" />

                <DropdownMenuItem
                  className="cursor-pointer rounded-lg dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer rounded-lg dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400">
                  <BookA className="mr-2 h-4 w-4" /> My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-orange-100 dark:bg-slate-700" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600"
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

      {mobileMenuOpen && (
        <MobileNavPanel onNavigate={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;