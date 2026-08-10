import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookA, LogOut, User, Search, MapPin, Menu, X } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
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
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { getExperienceNavbar } from "@/services/Experienceapi";
import { navItems } from "../../data/data";
import {
  DESTINATION_REGIONS,
  ACTIVITIES_COLUMNS,
  EVENTS_COLUMNS,
  REGIONS,
} from "../../data/navdata";

import LoginDialog from "../../pages/LoginDialog";
import SignupDialog from "../../pages/SignupDialog";
import ThemeToggle from "../../context/ThemeToggle";

/* ============================================================
   SHARED STYLE TOKENS
   Centralized so every mega menu / mobile panel stays in sync
   and light-mode text never silently falls back to white.
============================================================ */

const styles = {
  sidebarItem: (active) =>
    [
      "w-full text-left px-5 py-4 text-sm transition-colors",
      "border-b border-gray-100 dark:border-slate-800",
      active
        ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold border-r-2 border-r-orange-500"
        : "text-gray-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400",
    ].join(" "),

  megaLink:
    "text-sm text-gray-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors truncate",

  megaPanel:
    "flex bg-white dark:bg-slate-900 rounded-xl border border-orange-100 dark:border-slate-700 shadow-xl overflow-hidden",

  megaHeading: "text-orange-600 dark:text-orange-400 font-bold text-lg",

  navTrigger:
    "px-4 py-2 rounded-md text-[15px] font-medium text-gray-700 dark:text-slate-200 bg-transparent " +
    "hover:bg-orange-100 dark:hover:bg-slate-800 hover:text-orange-700 dark:hover:text-orange-400 " +
    "data-[state=open]:bg-orange-100 dark:data-[state=open]:bg-slate-800 " +
    "data-[state=open]:text-orange-700 dark:data-[state=open]:text-orange-400",

  navLink:
    "px-4 py-2 text-[15px] font-medium text-gray-700 dark:text-slate-200 rounded-md " +
    "hover:bg-orange-100 dark:hover:bg-slate-800 hover:text-orange-700 dark:hover:text-orange-400 " +
    "transition-colors duration-200 inline-block",

  mobileTop:
    "text-sm font-semibold text-gray-800 dark:text-slate-100 hover:no-underline py-3",

  mobileSub:
    "text-xs font-medium text-gray-600 dark:text-slate-300 hover:no-underline py-2",

  mobileLink:
    "text-sm text-gray-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400",
};

/* ============================================================
   SIDEBAR MEGA MENU (shared shape for Destinations/Activities/Events)
============================================================ */

const SidebarMegaMenu = ({ columns, activeKey, onSelect, heading, items, renderLink }) => (
  <div className={styles.megaPanel} style={{ width: "650px" }}>
    <div className="w-[190px] shrink-0 border-r border-gray-100 dark:border-slate-800">
      {columns.map((column) => (
        <button
          key={column.key}
          type="button"
          onClick={() => onSelect(column.key)}
          className={styles.sidebarItem(activeKey === column.key)}
        >
          {column.label}
        </button>
      ))}
    </div>

    <div className="flex-1 p-6 overflow-hidden">
      <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
        <h3 className={styles.megaHeading}>{heading}</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3">{items.map(renderLink)}</div>
    </div>
  </div>
);

/* ============================================================
   DESTINATIONS MEGA MENU
============================================================ */

const DestinationsMega = () => {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0]?.label || "");
  const destinations = DESTINATION_REGIONS[activeRegion] || [];

  return (
    <div className={styles.megaPanel} style={{ width: "650px" }}>
      <div className="w-[190px] shrink-0 border-r border-gray-100 dark:border-slate-800">
        {REGIONS.map((region) => (
          <button
            key={region.label}
            type="button"
            onClick={() => setActiveRegion(region.label)}
            className={styles.sidebarItem(activeRegion === region.label)}
          >
            {region.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className={styles.megaHeading}>{activeRegion}</h3>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-3">
          {destinations.map((item) => (
            <Link key={item.slug} to={`/destinations/${item.slug}`} className={styles.megaLink}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ACTIVITIES MEGA MENU
============================================================ */

const ActivitiesMega = () => {
  const [activeCategory, setActiveCategory] = useState(ACTIVITIES_COLUMNS[0]?.heading || "");
  const items = ACTIVITIES_COLUMNS.find((c) => c.heading === activeCategory)?.items || [];

  return (
    <div className={styles.megaPanel} style={{ width: "650px" }}>
      <div className="w-[190px] shrink-0 border-r border-gray-100 dark:border-slate-800">
        {ACTIVITIES_COLUMNS.map((column) => (
          <button
            key={column.heading}
            type="button"
            onClick={() => setActiveCategory(column.heading)}
            className={styles.sidebarItem(activeCategory === column.heading)}
          >
            {column.heading}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className={styles.megaHeading}>{activeCategory}</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/activities?search=${encodeURIComponent(item.slug)}`}
              className={styles.megaLink}
            >
              {item.slug}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   EXPERIENCES MEGA MENU
============================================================ */

const ExperiencesMega = ({ experienceColumns }) => {
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (experienceColumns.length > 0) {
      setActiveCategory((previous) => {
        const stillExists = experienceColumns.some((c) => c.heading === previous);
        return stillExists ? previous : experienceColumns[0].heading;
      });
    }
  }, [experienceColumns]);

  if (!experienceColumns.length) {
    return (
      <div
        className={`${styles.megaPanel} items-center justify-center text-gray-500 dark:text-slate-400`}
        style={{ width: "650px", height: "250px" }}
      >
        Loading experiences...
      </div>
    );
  }

  const items = experienceColumns.find((c) => c.heading === activeCategory)?.items || [];

  return (
    <div className={styles.megaPanel} style={{ width: "650px" }}>
      <div className="w-[190px] shrink-0 border-r border-gray-100 dark:border-slate-800">
        {experienceColumns.map((column) => (
          <button
            key={column.heading}
            type="button"
            onClick={() => setActiveCategory(column.heading)}
            className={styles.sidebarItem(activeCategory === column.heading)}
          >
            {column.heading}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className={styles.megaHeading}>{activeCategory}</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <Link
              key={item._id || item.title}
              to={`/experiences?search=${encodeURIComponent(item.title)}`}
              className={styles.megaLink}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   EVENTS MEGA MENU
============================================================ */

const EventsMega = () => {
  const [activeRegion, setActiveRegion] = useState(EVENTS_COLUMNS[0]?.heading || "");
  const items = EVENTS_COLUMNS.find((c) => c.heading === activeRegion)?.items || [];

  return (
    <div className={styles.megaPanel} style={{ width: "650px" }}>
      <div className="w-[190px] shrink-0 border-r border-gray-100 dark:border-slate-800">
        {EVENTS_COLUMNS.map((column) => (
          <button
            key={column.heading}
            type="button"
            onClick={() => setActiveRegion(column.heading)}
            className={styles.sidebarItem(activeRegion === column.heading)}
          >
            {column.heading}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-center items-center mb-6 border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className={styles.megaHeading}>{activeRegion} Events</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {items.map((item) => (
            <Link
              key={item.title}
              to={`/events?search=${encodeURIComponent(item.title)}`}
              className={styles.megaLink}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SEARCH INPUT (shared between desktop and mobile)
============================================================ */

const SearchField = ({ className = "" }) => (
  <div className={`flex items-center relative ${className}`}>
    <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-slate-400" />
    <Input
      type="search"
      placeholder="Search destination..."
      className="pl-10 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 border-orange-200 dark:border-slate-600"
    />
  </div>
);

/* ============================================================
   MOBILE NAVIGATION
============================================================ */

const MobileAccordionSection = ({ value, title, columns, itemsFor, keyFor, labelFor, linkFor, onNavigate }) => (
  <AccordionItem value={value} className="border-b border-orange-200/60 dark:border-slate-800">
    <AccordionTrigger className={styles.mobileTop}>{title}</AccordionTrigger>

    <AccordionContent className="pb-3">
      <Accordion type="multiple">
        {columns.map((column) => (
          <AccordionItem key={keyFor(column)} value={keyFor(column)} className="border-b-0">
            <AccordionTrigger className={styles.mobileSub}>{labelFor(column)}</AccordionTrigger>

            <AccordionContent className="pb-2">
              <div className="flex flex-col gap-2 pl-2">
                {itemsFor(column).map((item) => (
                  <Link
                    key={item.slug || item._id || item.title}
                    to={linkFor(item)}
                    onClick={onNavigate}
                    className={styles.mobileLink}
                  >
                    {item.name || item.slug || item.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AccordionContent>
  </AccordionItem>
);

const MobileNavPanel = ({ onNavigate, experienceColumns }) => {
  const plainNavItems = navItems.filter((item) => {
    const title = item.title?.trim().toLowerCase();
    return title !== "experiences" && title !== "events";
  });

  return (
    <div className="lg:hidden border-t border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 shadow-lg">
      <Accordion type="multiple" className="w-full">
        <MobileAccordionSection
          value="destinations"
          title="Destinations"
          columns={REGIONS}
          keyFor={(r) => r.label}
          labelFor={(r) => r.label}
          itemsFor={(r) => DESTINATION_REGIONS[r.label] || []}
          linkFor={(item) => `/destinations/${item.slug}`}
          onNavigate={onNavigate}
        />

        <MobileAccordionSection
          value="activities"
          title="Activities"
          columns={ACTIVITIES_COLUMNS}
          keyFor={(c) => c.heading}
          labelFor={(c) => c.heading}
          itemsFor={(c) => c.items}
          linkFor={(item) => `/activities?search=${encodeURIComponent(item.slug)}`}
          onNavigate={onNavigate}
        />

        <MobileAccordionSection
          value="experiences"
          title="Experiences"
          columns={experienceColumns}
          keyFor={(c) => c.heading}
          labelFor={(c) => c.heading}
          itemsFor={(c) => c.items}
          linkFor={(item) => `/experiences?search=${encodeURIComponent(item.title)}`}
          onNavigate={onNavigate}
        />

        <MobileAccordionSection
          value="events"
          title="Events"
          columns={EVENTS_COLUMNS}
          keyFor={(c) => c.heading}
          labelFor={(c) => c.heading}
          itemsFor={(c) => c.items}
          linkFor={(item) => `/events?search=${encodeURIComponent(item.title)}`}
          onNavigate={onNavigate}
        />
      </Accordion>

      <div className="flex flex-col mt-2">
        {plainNavItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            onClick={onNavigate}
            className="py-2.5 text-sm font-medium text-gray-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 border-b border-orange-200/60 dark:border-slate-800"
          >
            {item.title}
          </Link>
        ))}
      </div>

      <SearchField className="mt-4" />
    </div>
  );
};

/* ============================================================
   NAVBAR
============================================================ */

const Navbar = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const location = useLocation();

  const [openLogin, setOpenLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experienceColumns, setExperienceColumns] = useState([]);

  /* Load Experience Navbar */
  useEffect(() => {
    const loadNavbar = async () => {
      try {
        const { data } = await getExperienceNavbar();
        setExperienceColumns(data || []);
      } catch (error) {
        console.error("Experience navbar error:", error);
      }
    };

    loadNavbar();
  }, []);

  /* Open Login Dialog From Route State */
  useEffect(() => {
    if (location.state?.openLogin) {
      setOpenLogin(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  /* Close Mobile Menu After Route Change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  /* Logout */
  const logoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await api.post(
        "/user/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const plainNavItems = navItems.filter((item) => {
    const title = item.title?.trim().toLowerCase();
    return title !== "experiences" && title !== "events";
  });

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-100/80 dark:border-slate-800 bg-orange-300/90 dark:bg-slate-950/95 backdrop-blur-md shadow-sm">
      <div className="relative flex items-center h-20 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10">
          <img src={logo} alt="Travel Bharat" className="w-[110px] lg:w-[130px] h-auto" />
        </Link>

        <div className="w-[120px] lg:w-[145px] shrink-0" />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex [&>div]:overflow-visible" delayDuration={100}>
          <NavigationMenuList className="flex gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={`flex items-center gap-1.5 ${styles.navTrigger}`}>
                <MapPin className="h-3.5 w-3.5" />
                Destinations
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <DestinationsMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.navTrigger}>Activities</NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <ActivitiesMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.navTrigger}>Experiences</NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <ExperiencesMega experienceColumns={experienceColumns} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.navTrigger}>Events</NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <EventsMega />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {plainNavItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link to={item.path} className={styles.navLink}>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Search */}
        <SearchField className="hidden xl:flex w-[240px] ml-auto" />

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto xl:ml-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-gray-700 dark:text-slate-200 hover:bg-orange-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="outline-none">
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-orange-300 dark:border-slate-600 shadow-sm hover:ring-2 hover:ring-orange-400">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-orange-100 dark:bg-slate-700 text-orange-700 dark:text-orange-300 font-semibold">
                      {user?.username?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl border-orange-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg"
              >
                <DropdownMenuLabel className="text-gray-700 dark:text-slate-200">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-orange-100 dark:bg-slate-700" />

                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer rounded-lg text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/bookings")}
                  className="cursor-pointer rounded-lg text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  <BookA className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-orange-100 dark:bg-slate-700" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
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
        <MobileNavPanel experienceColumns={experienceColumns} onNavigate={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;