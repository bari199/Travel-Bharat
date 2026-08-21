import React, { useState } from "react";
import api from "@/lib/api";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getData } from "@/context/userContext";
import Google from "../assets/googleLogo.png";
import { motion } from "framer-motion";

const LoginDialog = ({
  open,
  setOpen,
  showTrigger = true,
}) => {
  const { setUser } = getData();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=================================");
    console.log("🔐 LOGIN FORM SUBMITTED");
    console.log("=================================");
    console.log("Email:", formData.email);

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);

      console.log("📡 Sending login request...");
      console.log("API URL:", import.meta.env.VITE_BACKEND_URL);
      console.log("Endpoint:", "/api/user/login");

      const res = await api.post(
        "/api/user/login",
        formData
      );

      console.log("✅ Login Response:", res.data);

      if (res.data.success) {
        const {
          user,
          accessToken,
          refreshToken,
          message,
        } = res.data;

        // Save user
        setUser(user);

        // Save tokens
        localStorage.setItem(
          "accessToken",
          accessToken
        );

        if (refreshToken) {
          localStorage.setItem(
            "refreshToken",
            refreshToken
          );
        }

        // Success message
        toast.success(
          message || "Login successful"
        );

        // Close dialog
        setOpen(false);

        // Reset form
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error(
          res.data.message || "Login failed"
        );
      }
    } catch (error) {
      console.error("❌ LOGIN ERROR:", error);

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Status:",
        error.response?.status
      );

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {showTrigger && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="
              rounded-full
              border-orange-200
              hover:bg-orange-50
              hover:text-orange-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
              dark:hover:text-orange-400
            "
          >
            Login
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className="
          bg-transparent
          border-none
          shadow-none
          p-2
          sm:max-w-[390px]
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Card
            className="
              bg-white
              border
              border-orange-100
              rounded-3xl
              shadow-xl
              dark:bg-slate-900
              dark:border-slate-700
              dark:shadow-black/40
            "
          >
            <CardHeader className="space-y-2 pb-4">
              <CardTitle
                className="
                  text-2xl
                  text-center
                  font-bold
                  text-orange-600
                  dark:text-orange-400
                "
              >
                Welcome Back
              </CardTitle>

              <p
                className="
                  text-sm
                  text-center
                  text-orange-400
                  dark:text-slate-400
                "
              >
                Login to continue your journey
              </p>
            </CardHeader>

            {/* IMPORTANT: FORM WRAPS LOGIN BUTTON */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <CardContent className="space-y-4">
                {/* EMAIL */}
                <div className="space-y-2">
                  <Label
                    className="
                      text-orange-700
                      dark:text-slate-300
                    "
                  >
                    Email
                  </Label>

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                    className="
                      h-10
                      rounded-xl
                      border-orange-200
                      bg-orange-50
                      focus-visible:ring-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-100
                      dark:placeholder:text-slate-500
                      dark:focus-visible:ring-orange-500
                      dark:focus-visible:border-orange-500
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      className="
                        text-orange-700
                        dark:text-slate-300
                      "
                    >
                      Password
                    </Label>

                    <Link
                      to="/forgot-password"
                      className="
                        text-xs
                        text-orange-500
                        hover:text-orange-700
                        dark:text-orange-400
                        dark:hover:text-orange-300
                      "
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                      className="
                        h-10
                        rounded-xl
                        border-orange-200
                        bg-orange-50
                        pr-10
                        focus-visible:ring-orange-500
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-100
                        dark:placeholder:text-slate-500
                        dark:focus-visible:ring-orange-500
                        dark:focus-visible:border-orange-500
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-orange-500
                        dark:text-slate-400
                        dark:hover:text-orange-400
                        transition-colors
                      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>

              {/* LOGIN BUTTON MUST BE INSIDE FORM */}
              <CardFooter className="flex flex-col gap-3">
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="
                      w-full
                      h-10
                      rounded-xl
                      bg-orange-600
                      hover:bg-orange-700
                      dark:bg-orange-600
                      dark:hover:bg-orange-500
                      dark:text-white
                      dark:disabled:bg-slate-700
                      dark:disabled:text-slate-400
                    "
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </motion.div>

                {/* GOOGLE LOGIN */}
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="w-full"
                >
                  <Button
                    type="button"
                    onClick={() =>
                      window.open(
                        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
                        "_self"
                      )
                    }
                    variant="outline"
                    className="
                      w-full
                      h-10
                      rounded-xl
                      border-orange-200
                      hover:bg-orange-50
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-200
                      dark:hover:bg-slate-800
                    "
                  >
                    <img
                      src={Google}
                      alt="google"
                      className="w-4"
                    />

                    Login with Google
                  </Button>
                </motion.div>

                <p
                  className="
                    text-xs
                    text-center
                    text-orange-500
                    dark:text-slate-400
                  "
                >
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="
                      font-medium
                      hover:text-orange-700
                      dark:text-orange-400
                      dark:hover:text-orange-300
                    "
                  >
                    Signup
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;