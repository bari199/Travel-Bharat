import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import travelBharatLogo from "../../assets/tb.png";

const Login = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginAdmin(
        formData.email,
        formData.password
      );

      if (res.success) {
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error(res.message || "Login Failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:flex bg-orange-300/90">

      {/* ============================================================
          LEFT ATMOSPHERE PANEL
      ============================================================ */}
      <div className="relative hidden w-1/2 overflow-hidden bg-orange-600 px-10 py-10 text-white lg:flex lg:flex-col">

        {/* Decorative background blobs */}
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/40 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-orange-700/40 blur-3xl" />

        {/* ========================================================
            LOGO
        ======================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-10 flex items-center"
        >
         
        </motion.div>

        {/* ========================================================
            CENTER LOGO ANIMATION
        ======================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative z-10 flex flex-1 items-center justify-center"
        >
          <motion.img
            src={travelBharatLogo}
            alt="Travel Bharat"
            initial={{
              rotate: -4,
            }}
            animate={{
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-[340px] max-w-[80%] object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* ========================================================
            DESCRIPTION
        ======================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-10 space-y-2"
        >
          <p className="text-2xl font-semibold leading-snug">
            Manage every destination,
            <br />
            experience, and highlight in one place.
          </p>

          <p className="text-sm text-white/80">
            Sign in to curate the content travelers will see next.
          </p>
        </motion.div>
      </div>

      {/* ============================================================
          RIGHT FORM PANEL
      ============================================================ */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2">

        {/* ========================================================
            MOBILE LOGO
        ======================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-8 flex justify-center lg:hidden"
        >
          <img
            src={travelBharatLogo}
            alt="Travel Bharat"
            className="h-auto w-[210px] object-contain"
          />
        </motion.div>

        {/* ========================================================
            LOGIN FORM
        ======================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-sm"
        >

          {/* Heading */}
          <div className="mb-7 space-y-1.5 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back
            </h1>

            <p className="text-sm text-muted-foreground">
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-orange-400" />

                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="border-orange-100 transition-colors focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Lock className="h-3.5 w-3.5 text-orange-400" />

                  Password
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="border-orange-100 pr-10 transition-colors focus-visible:border-orange-400 focus-visible:ring-orange-200 dark:border-orange-900/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-orange-600"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <motion.div
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full bg-orange-600 text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected admin area · authorized personnel only
          </p>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;