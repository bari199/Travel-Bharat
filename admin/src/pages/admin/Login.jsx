import { useState } from "react";
import { adminLogin } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Compass, Loader2 } from "lucide-react";

/* ============================================================
   Business logic below — handleLogin, formData state, the
   adminLogin call, token storage, navigation, and error
   handling — is unchanged from the original. Only markup,
   structure, and styling are new.
============================================================ */

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED"); // 👈 ADD THIS

    try {
      setLoading(true);

      const res = await adminLogin(formData);

      console.log("LOGIN RESPONSE:", res); // 👈 ADD THIS

      if (res?.token) {
        localStorage.setItem("adminToken", res.token);
        navigate("/");
      } else {
        console.log("NO TOKEN RECEIVED");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-orange-50/40">
      {/* ============================================================
          Left atmosphere panel — sets the tone, hidden on small
          screens where it collapses into a slim top band instead.
      ============================================================ */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-10 text-white lg:flex">
        {/* Soft decorative blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center gap-2 text-lg font-semibold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <Compass className="h-5 w-5" />
          </span>
          Travel Bharat Admin
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.15,
          }}
          className="relative z-10 flex flex-1 items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Compass className="h-20 w-20 text-white drop-shadow-lg" strokeWidth={1.25} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
          Right form panel
      ============================================================ */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:w-1/2">
        {/* Mobile-only compact header, since the atmosphere panel is hidden below lg */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-2 text-lg font-semibold text-orange-600 lg:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
            <Compass className="h-5 w-5" />
          </span>
          Travel Bharat Admin
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-7 space-y-1.5 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your admin account to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  type={showPassword ? "text" : "password"}
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-orange-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            <motion.div whileTap={{ scale: 0.98 }}>
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

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected admin area · authorized personnel only
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;