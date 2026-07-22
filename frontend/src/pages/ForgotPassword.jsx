import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import api from "@/lib/api";


import {
  CheckCircle,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [email, setEmail] = useState("");

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setIsLoading(true);

      const res = await api.post(
        `/user/forgot-password`,
        {
          email,
        }
      );

      if (res.data.success) {
        setIsSubmitted(true);

        toast.success(res.data.message);

        setTimeout(() => {
          navigate(`/verify-otp/${email}`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-orange-300/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 h-72 w-72 bg-green-300/20 blur-3xl rounded-full" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-md"
        >

          <Card className="border-0 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-md">

            <CardHeader className="space-y-4 text-center">

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                }}
                className="mx-auto h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center"
              >
                <ShieldCheck className="h-10 w-10 text-orange-600" />
              </motion.div>

              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-orange-700">
                  Forgot Password
                </CardTitle>

                <CardDescription className="text-gray-500 text-sm leading-6">
                  Enter your email address and we'll
                  send a reset verification OTP.
                </CardDescription>
              </div>

            </CardHeader>

            <CardContent className="space-y-5">

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {isSubmitted ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex flex-col items-center text-center space-y-4 py-4"
                >

                  <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-orange-600">
                      Email Sent Successfully
                    </h3>

                    <p className="text-sm text-gray-500 leading-6">
                      We've sent an OTP verification
                      code to:
                    </p>

                    <p className="font-medium text-gray-800 break-all">
                      {email}
                    </p>
                  </div>

                </motion.div>
              ) : (
                <motion.form
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  onSubmit={handleForgotPassword}
                  className="space-y-5"
                >

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Email Address
                    </Label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        required
                        disabled={isLoading}
                        className="
                          pl-10
                          h-12
                          rounded-xl
                          border-gray-200
                          focus-visible:ring-orange-500
                        "
                      />

                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="
                      w-full
                      h-12
                      rounded-xl
                      bg-orange-600
                      hover:bg-orange-700
                      text-white
                      font-medium
                      transition-all
                      duration-300
                    "
                  >

                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send Verification OTP"
                    )}

                  </Button>

                </motion.form>
              )}

            </CardContent>

            <CardFooter className="flex justify-center pb-6">

              <p className="text-sm text-gray-500">
                Remember your password?{" "}

                <Link
                  to="/"
                  className="
                    text-orange-600
                    hover:text-orange-700
                    hover:underline
                    font-medium
                  "
                >
                  Login
                </Link>

              </p>

            </CardFooter>

          </Card>

        </motion.div>

      </div>
    </div>
  );
};

export default ForgotPassword;