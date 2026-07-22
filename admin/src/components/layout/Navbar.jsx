import { Bell, HelpCircle, Menu, Moon, Search, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { useLocation, useNavigate } from "react-router-dom";

/* ============================================================
   Business logic below — routeLabels, currentLabel resolution,
   onToggle wiring — is unchanged from the original. Only color
   tokens have been swapped to match the orange/amber brand used
   across the rest of the app (sidebar, login, form sections).
============================================================ */

const routeLabels = {
  "/": "Dashboard",
  "/destinations": "Destinations",
  "/users": "Users",
  "/comments": "Comments",
  "/ratings": "Ratings",
  "/wishlist": "Wishlist",
  "/reactions": "Reactions",
  "/profile": "Profile",
  "/settings": "Settings",
};

const Navbar = ({ collapsed, onToggle }) => {
  const { admin, logout } = useAdminAuth();
  const { pathname } = useLocation();
  const currentLabel = routeLabels[pathname] ?? "Admin";

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-14 shrink-0 bg-white dark:bg-stone-900 border-b border-orange-100 dark:border-stone-800 flex items-center px-5 gap-4 z-20 transition-colors"
    >
      {/* Sidebar toggle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-stone-500 dark:text-stone-400 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-500">
        <span>Admin</span>
        <span className="text-stone-300 dark:text-stone-600">/</span>
        <motion.span
          key={currentLabel}
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-stone-800 dark:text-stone-100"
        >
          {currentLabel}
        </motion.span>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50/60 dark:bg-stone-800 border border-orange-100 dark:border-stone-700 text-stone-400 dark:text-stone-500 text-sm cursor-pointer hover:bg-orange-50 dark:hover:bg-stone-700 hover:border-orange-200 dark:hover:border-stone-600 transition-colors">
          <Search size={14} />
          <span>Search...</span>
          <kbd className="text-xs bg-white dark:bg-stone-900 border border-orange-100 dark:border-stone-700 rounded px-1 py-0.5 text-stone-400 dark:text-stone-500 ml-2">⌘K</kbd>
        </div>

        {/* Help */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-stone-400 dark:text-stone-500 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400">
                <HelpCircle size={17} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-stone-400 dark:text-stone-500 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400"
                aria-label="Notifications (3 unread)"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600 border-2 border-white dark:border-stone-900" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications (3 unread)</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Theme toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-orange-50 dark:hover:bg-stone-800 transition-colors">
                <Sun
                  size={15}
                  className={isDark ? "text-stone-300" : "text-orange-500"}
                />
                <Switch
                  checked={isDark}
                  onCheckedChange={setIsDark}
                  aria-label="Toggle dark mode"
                  className="data-[state=checked]:bg-orange-600 data-[state=unchecked]:bg-orange-200"
                />
                <Moon
                  size={15}
                  className={isDark ? "text-orange-500" : "text-stone-300"}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>{isDark ? "Switch to light mode" : "Switch to dark mode"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white text-xs font-bold flex items-center justify-center border-2 border-orange-100 dark:border-stone-700 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
              aria-label="Open user menu"
            >
              A
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="font-semibold text-stone-800 dark:text-stone-100">Admin User</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-normal">admin@travelbharat.in</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-orange-50 dark:focus:bg-stone-800 focus:text-orange-700 dark:focus:text-orange-400">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-orange-50 dark:focus:bg-stone-800 focus:text-orange-700 dark:focus:text-orange-400">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-600 dark:focus:text-red-400">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Navbar;