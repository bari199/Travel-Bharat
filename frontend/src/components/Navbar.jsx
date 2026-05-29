import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useLocation } from "react-router-dom";

import {
  BookA,
  LogOut,
  User,
  Search,
  Globe2Icon,
} from "lucide-react";

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
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

import { navItems } from "../data/data";

import LoginDialog from "../pages/LoginDialog";
import SignupDialog from "../pages/SignupDialog";

const Navbar = () => {
  const { user, setUser } = getData();

  const location = useLocation();

  const [openLogin, setOpenLogin] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (location.state?.openLogin) {
      setOpenLogin(true);
    }
  }, [location]);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUser(null);

        localStorage.clear();

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
        >
          <Globe2Icon className="h-7 w-7 text-orange-700" />

          <h1 className="font-bold text-2xl">
            <span className="text-orange-600">
              Travel
            </span>
            Bharat
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center relative w-[280px]">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />

          <Input
            type="search"
            placeholder="Search destination..."
            className="pl-10 rounded-full"
          />
        </div>

        {/* Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-2">

            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>

                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className="
                      px-4 py-2
                      text-[16px]
                      font-medium
                      rounded-md
                      hover:bg-green-100
                      hover:text-green-700
                      transition-all
                      duration-200
                    "
                  >
                    {item.title}
                  </Link>

                </NavigationMenuLink>

              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {user ? (
            <DropdownMenu>

              <DropdownMenuTrigger className="outline-none">

                <Avatar className="cursor-pointer h-10 w-10 border">
                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback>
                    {user?.username
                      ?.slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52"
              >
                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  <BookA className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <div className="flex gap-3">

              <LoginDialog
                open={openLogin}
                setOpen={setOpenLogin}
              />

              <SignupDialog />

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;