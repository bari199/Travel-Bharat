// SignupDialog.jsx

import React, { useState } from "react";

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

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import api from "@/services/axios";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const SignupDialog = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
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

    try {
      setIsLoading(true);

      const {data} = await api.post(
        "/user/register",
        formData,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setOpen(false);

        navigate("/verify");
      }
    } catch (error) {
      console.log(error);

      toast.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button className="rounded-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 dark:text-white">
          Signup
        </Button>

      </DialogTrigger>

      <DialogContent className="bg-transparent border-none shadow-none p-2 sm:max-w-[390px]">

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

          <Card className="bg-white border border-orange-100 rounded-3xl shadow-xl dark:bg-slate-900 dark:border-slate-700 dark:shadow-black/40">

            <CardHeader className="space-y-2 pb-4">

              <CardTitle className="text-2xl text-center font-bold text-orange-600 dark:text-orange-400">
                Create Account
              </CardTitle>

              <p className="text-sm text-center text-orange-400 dark:text-slate-400">
                Start your journey with us
              </p>

            </CardHeader>

            <CardContent>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Username */}
                <div className="space-y-2">

                  <Label className="text-orange-700 dark:text-slate-300">
                    Full Name
                  </Label>

                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your full name"
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

                {/* Email */}
                <div className="space-y-2">

                  <Label className="text-orange-700 dark:text-slate-300">
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

                {/* Password */}
                <div className="space-y-2">

                  <Label className="text-orange-700 dark:text-slate-300">
                    Password
                  </Label>

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

              </form>

            </CardContent>

            <CardFooter className="flex flex-col gap-3">

              {/* Signup Button */}
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >

                <Button
                  onClick={handleSubmit}
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
                      Creating...
                    </>
                  ) : (
                    "Signup"
                  )}

                </Button>

              </motion.div>

            </CardFooter>

          </Card>

        </motion.div>

      </DialogContent>

    </Dialog>
  );
};

export default SignupDialog;